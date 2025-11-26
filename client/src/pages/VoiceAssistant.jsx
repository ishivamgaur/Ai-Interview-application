import { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ArrowLeft,
  Cpu,
  Activity,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "System initialized. I am your AI technical interviewer. Ready to begin your assessment?",
    },
  ]);
  const [processing, setProcessing] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [voices, setVoices] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const transcriptBufferRef = useRef("");

  // Visualizer Refs
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const micButtonRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, interimTranscript]);

  // Load voices robustly
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Initial greeting & Cleanup
  useEffect(() => {
    speak(
      "System initialized. I am your AI technical interviewer. Ready to begin your assessment?"
    );

    // Cleanup on unmount
    return () => {
      stopVisualizer();
      if (recognitionRef.current) recognitionRef.current.stop();
      window.speechSynthesis.cancel(); // Stop speaking immediately
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const speak = (text) => {
    if (!("speechSynthesis" in window) || isMuted) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const preferredVoice = voices.find(
      (voice) =>
        voice.name.includes("Google US English") ||
        voice.name.includes("Samantha") ||
        voice.lang === "en-US"
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = "";
        let interim = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interim += transcript;
          }
        }

        if (finalTranscript) {
          transcriptBufferRef.current += finalTranscript;
        }
        setInterimTranscript(interim);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error === "not-allowed") {
          setIsListening(false);
          stopVisualizer();
        }
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          setIsListening(false);
          stopVisualizer();
        }
      };
    }
  }, []);

  // Visualizer Logic
  const startVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current =
        audioContextRef.current.createMediaStreamSource(stream);

      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      drawVisualizer();
    } catch (err) {
      console.error("Error accessing microphone for visualizer:", err);
    }
  };

  const stopVisualizer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const drawVisualizer = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Calculate average volume for visual effects
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;

      if (micButtonRef.current) {
        const intensity = Math.min(average / 100, 1);
        const scale = 1 + intensity * 0.3;
        const glow = intensity * 20;

        micButtonRef.current.style.transform = `scale(${scale})`;
        micButtonRef.current.style.boxShadow = `0 0 ${glow}px rgba(59, 130, 246, 0.6)`;
      }
    };
    render();
  };

  const handleUserMessage = async (text) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
    setProcessing(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: text,
      });
      const aiResponse = res.data.response;

      setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
      speak(aiResponse);
    } catch (error) {
      const errorMsg = "Connection interrupted. Please retry.";
      setMessages((prev) => [...prev, { role: "ai", text: errorMsg }]);
      speak(errorMsg);
    } finally {
      setProcessing(false);
    }
  };

  const toggleListening = async () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      stopVisualizer();
      setIsListening(false);

      const fullText = (transcriptBufferRef.current + interimTranscript).trim();

      if (fullText) {
        await handleUserMessage(fullText);
      }

      transcriptBufferRef.current = "";
      setInterimTranscript("");
    } else {
      transcriptBufferRef.current = "";
      setInterimTranscript("");
      try {
        if (recognitionRef.current) recognitionRef.current.start();
        setIsListening(true);
        startVisualizer();
      } catch (e) {
        console.error("Error starting recognition:", e);
      }
    }
  };

  const handleGoBack = () => {
    window.speechSynthesis.cancel();
    navigate(-1);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md">
        <button
          onClick={handleGoBack}
          className="flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="text-sm font-medium">End Session</span>
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs md:text-sm font-mono text-emerald-500 tracking-wider">
            SYSTEM ONLINE
          </span>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col max-w-5xl mx-auto w-full p-4 md:p-6">
        {/* AI Avatar / Status */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8">
          <div className="relative w-48 h-48 mb-8">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border border-purple-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-32 h-32 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-2xl transition-all duration-500 ${
                  isListening ? "shadow-blue-500/50 scale-105" : ""
                }`}
              >
                <Cpu
                  size={48}
                  className={`text-blue-500 transition-all duration-300 ${
                    processing ? "animate-pulse" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {messages.length > 0 && (
              <motion.div
                key={messages[messages.length - 1].text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-2xl"
              >
                <p className="text-2xl md:text-3xl font-light text-slate-200 leading-relaxed">
                  "
                  {messages[messages.length - 1].role === "ai"
                    ? messages[messages.length - 1].text
                    : "Processing..."}
                  "
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interaction Area */}
        <div className="w-full max-w-3xl mx-auto">
          {/* Transcript Display */}
          {(interimTranscript ||
            (messages.length > 0 &&
              messages[messages.length - 1].role === "user")) && (
            <div className="mb-8 p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2 text-xs font-mono text-slate-500 uppercase">
                <Activity size={12} />
                <span>Live Transcript</span>
              </div>
              <p className="text-lg text-slate-300">
                {interimTranscript || messages[messages.length - 1].text}
                <span className="inline-block w-2 h-5 ml-1 bg-blue-500 animate-pulse align-middle" />
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center items-center gap-8">
            <button
              ref={micButtonRef}
              onClick={toggleListening}
              className={`relative group w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isListening
                  ? "bg-red-500/10 border-red-500/50 text-red-500"
                  : "bg-blue-500/10 border-blue-500/50 text-blue-500 hover:bg-blue-500/20"
              } border-2`}
            >
              {isListening ? <MicOff size={32} /> : <Mic size={32} />}

              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-current opacity-50" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-current opacity-50" />
            </button>
          </div>

          <p className="text-center mt-6 text-slate-500 text-sm font-mono">
            {isListening ? "LISTENING MODE ACTIVE" : "TAP MICROPHONE TO SPEAK"}
          </p>
        </div>
      </main>
    </div>
  );
};

export default VoiceAssistant;
