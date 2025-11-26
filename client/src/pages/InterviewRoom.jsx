import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mic, MicOff, Volume2, Send, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

const InterviewRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [interimResult, setInterimResult] = useState("");
  const [voiceMode, setVoiceMode] = useState(false);

  const recognitionRef = useRef(null);

  // Fetch interview data
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/interviews/${id}`
        );
        setInterview(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load interview");
        navigate("/");
      }
    };
    fetchInterview();
  }, [id, navigate]);

  // Voice mode: auto‑speak question and start listening
  useEffect(() => {
    if (voiceMode && interview && !isListening && !feedback) {
      speakQuestion(interview.questions[currentQuestionIndex].question, () => {
        if (voiceMode) startListening();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceMode, currentQuestionIndex, interview, feedback]);

  const speakQuestion = (text, onEnd) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      if (onEnd) utterance.onend = onEnd;
      window.speechSynthesis.speak(utterance);
    } else if (onEnd) {
      onEnd();
    }
  };

  const speakFeedback = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Auto‑speak feedback when received
  useEffect(() => {
    if (feedback && feedback.feedback) {
      speakFeedback(feedback.feedback);
    }
  }, [feedback]);

  // Initialise Speech Recognition
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
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }
        if (finalTranscript) {
          setUserAnswer((prev) => prev + finalTranscript);
        }
        setInterimResult(interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error === "not-allowed") {
          alert("Microphone access denied. Please allow access.");
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn("Web Speech API not supported");
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setUserAnswer("");
      setInterimResult("");
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Recognition already started", e);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;
    // Ensure microphone is stopped before sending answer
    if (isListening) stopListening();
    setSubmitting(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/interviews/${id}/answer`,
        {
          questionIndex: currentQuestionIndex,
          answer: userAnswer,
        }
      );
      setFeedback(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to submit answer");
    } finally {
      setSubmitting(false);
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    setUserAnswer("");
    setInterimResult("");
    if (currentQuestionIndex < interview.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      navigate("/history");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-800 dark:text-white">
        <Loader2 className="animate-spin mr-2" /> Loading Interview...
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="text-center mt-20 text-slate-800 dark:text-white">
        Interview not found
      </div>
    );
  }

  const currentQuestion = interview.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl glass-card rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {interview.jobRole} Interview
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Question {currentQuestionIndex + 1} of{" "}
              {interview.questions.length}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
              {interview.difficulty}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
              {interview.experience} Yrs
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          {/* Question Section */}
          <div className="mb-8">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white leading-tight">
                {currentQuestion.question}
              </h3>
              <button
                onClick={() => speakQuestion(currentQuestion.question)}
                className="p-3 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-600 dark:text-blue-300 transition-colors flex-shrink-0"
                title="Read Question"
              >
                <Volume2 size={24} />
              </button>
            </div>
          </div>

          {/* Answer Section */}
          <div className="space-y-6">
            {!feedback ? (
              <>
                <div className="relative">
                  <textarea
                    className="w-full h-48 p-6 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600 rounded-xl text-lg text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-slate-400"
                    placeholder="Type your answer or use the microphone..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                  />
                  {interimResult && (
                    <div className="absolute bottom-4 left-6 right-6 text-slate-500 dark:text-slate-400 text-sm italic truncate">
                      Listening: {interimResult}...
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <button
                    onClick={toggleListening}
                    className={`flex items-center justify-center w-full md:w-auto px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isListening
                        ? "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/50 animate-pulse"
                        : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="mr-2" />
                    ) : (
                      <Mic className="mr-2" />
                    )}
                    {isListening ? "Stop Recording" : "Start Recording"}
                  </button>

                  <button
                    onClick={submitAnswer}
                    disabled={submitting || !userAnswer.trim()}
                    className="flex items-center justify-center w-full md:w-auto btn-primary"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      <Send className="mr-2" size={20} />
                    )}
                    {submitting ? "Evaluating..." : "Submit Answer"}
                  </button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30 rounded-xl p-6 md:p-8"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
                      {feedback.score}
                    </span>
                  </div>
                  <h4 className="font-bold text-xl text-emerald-700 dark:text-emerald-400">
                    AI Feedback
                  </h4>
                </div>

                <div className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed mb-6">
                  <ReactMarkdown
                    components={{
                      strong: ({ node, ...props }) => (
                        <span
                          className="font-bold text-slate-900 dark:text-white"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc list-inside space-y-2 ml-4 mt-2"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="marker:text-emerald-500" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-4 last:mb-0" {...props} />
                      ),
                    }}
                  >
                    {feedback.feedback}
                  </ReactMarkdown>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={nextQuestion}
                    className="flex items-center bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                  >
                    Next Question <ArrowRight className="ml-2" size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Voice Mode Toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setVoiceMode((prev) => !prev)}
            className={`px-4 py-2 rounded ${
              voiceMode ? "bg-green-600" : "bg-gray-600"
            } text-white`}
          >
            {voiceMode ? "Voice On" : "Voice Off"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewRoom;
