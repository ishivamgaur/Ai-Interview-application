import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Loader2,
  Briefcase,
  Clock,
  Zap,
  Code2,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const NewSession = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobRole: "Full Stack Developer",
    experience: "1-3",
    difficulty: "Medium",
    techStack: "",
    questionCount: 5,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const startInterview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/interviews/start",
        formData
      );
      navigate(`/interview/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to start session");
    } finally {
      setLoading(false);
    }
  };

  const difficulties = [
    {
      value: "Easy",
      label: "Easy",
      color:
        "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    },
    {
      value: "Medium",
      label: "Medium",
      color:
        "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
    },
    {
      value: "Hard",
      label: "Hard",
      color:
        "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    },
  ];

  const experienceLevels = ["0-1", "1-3", "3-5", "5-10", "10+"];

  return (
    <div className="min-h-[calc(100vh-5rem)] relative pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-slate-500 dark:text-slate-400 mb-8 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
        >
          <ArrowLeft
            className="mr-2 group-hover:-translate-x-1 transition-transform"
            size={20}
          />
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Panel: Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

              <h1 className="text-3xl font-extrabold mb-4 relative z-10">
                New Session
              </h1>
              <p className="text-blue-100 mb-8 relative z-10">
                Configure your mock interview settings to simulate a real-world
                scenario tailored to your goals.
              </p>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mr-4">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-blue-200 uppercase font-bold">
                      Target Role
                    </div>
                    <div className="font-semibold">{formData.jobRole}</div>
                  </div>
                </div>
                <div className="flex items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mr-4">
                    <Layers size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-blue-200 uppercase font-bold">
                      Experience
                    </div>
                    <div className="font-semibold">
                      {formData.experience} Years
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <Zap className="mr-2 text-yellow-500" size={20} /> Pro Tips
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start">
                  <CheckCircle2
                    size={16}
                    className="mr-2 text-emerald-500 mt-0.5"
                  />
                  <span>
                    Choose a difficulty that challenges you but doesn't
                    overwhelm you.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2
                    size={16}
                    className="mr-2 text-emerald-500 mt-0.5"
                  />
                  <span>
                    Be specific with your tech stack for more relevant
                    questions.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Panel: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <form onSubmit={startInterview} className="space-y-8">
              {/* Job Role */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                  <Briefcase size={18} className="mr-2 text-blue-500" /> Job
                  Role
                </label>
                <div className="relative">
                  <select
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none font-medium text-slate-900 dark:text-white"
                  >
                    <option>Frontend Developer</option>
                    <option>Backend Developer</option>
                    <option>Full Stack Developer</option>
                    <option>MERN Stack Developer</option>
                    <option>DevOps Engineer</option>
                    <option>Data Scientist</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                  <Code2 size={18} className="mr-2 text-purple-500" /> Tech
                  Stack (Optional)
                </label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, AWS, Python"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                  <Clock size={18} className="mr-2 text-emerald-500" />{" "}
                  Experience Level (Years)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleSelect("experience", level)}
                      className={`py-2 px-1 rounded-xl text-sm font-bold border transition-all ${
                        formData.experience === level
                          ? "bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-500 ring-2 ring-emerald-500/20"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                  <Layers size={18} className="mr-2 text-orange-500" />{" "}
                  Difficulty
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.value}
                      type="button"
                      onClick={() => handleSelect("difficulty", diff.value)}
                      className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-center ${
                        formData.difficulty === diff.value
                          ? `${diff.color} ring-2 ring-offset-2 dark:ring-offset-slate-900 ring-current`
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform hover:-translate-y-1 ${
                    loading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/25"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="animate-spin mr-2" /> Creating
                      Session...
                    </span>
                  ) : (
                    "Start Interview Session"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewSession;
