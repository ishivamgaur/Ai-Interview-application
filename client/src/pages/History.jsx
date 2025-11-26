import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Award,
  Loader2,
  Search,
  Filter,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const History = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/interviews/history"
        );
        setInterviews(res.data);
      } catch (err) {
        console.error(err);
        // Fallback mock data if API fails (for demonstration)
        setInterviews([
          {
            _id: "1",
            jobRole: "Senior React Developer",
            createdAt: new Date().toISOString(),
            experience: 5,
            difficulty: "hard",
            questions: [
              { question: "Explain the Virtual DOM", score: 9 },
              { question: "What are React Hooks?", score: 8 },
              { question: "Optimize a large list", score: 7 },
            ],
          },
          {
            _id: "2",
            jobRole: "Backend Engineer",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            experience: 3,
            difficulty: "medium",
            questions: [
              { question: "Explain REST vs GraphQL", score: 8 },
              { question: "Database Indexing", score: 6 },
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] relative pb-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 gap-6">
          <div>
            <Link
              to="/dashboard"
              className="flex items-center text-slate-500 dark:text-slate-400 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <ArrowLeft
                className="mr-2 group-hover:-translate-x-1 transition-transform"
                size={20}
              />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interview History
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm md:text-base">
              Track your progress and review detailed feedback from past
              sessions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search roles..."
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center">
              <Filter
                size={20}
                className="text-slate-600 dark:text-slate-400"
              />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 md:mb-12">
          <StatCard
            label="Total Sessions"
            value={interviews.length}
            icon={<Clock className="text-blue-500" />}
          />
          <StatCard
            label="Average Score"
            value="8.2/10"
            icon={<Award className="text-purple-500" />}
          />
          <StatCard
            label="Questions Solved"
            value={interviews.reduce(
              (acc, curr) => acc + curr.questions.length,
              0
            )}
            icon={<CheckCircle2 className="text-emerald-500" />}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
            <p className="text-slate-500">Loading your history...</p>
          </div>
        ) : interviews.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed px-4">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No interviews yet
            </h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Start your first mock interview to see your progress here.
            </p>
            <Link
              to="/new-session"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors inline-flex items-center"
            >
              Start Interview <ChevronRight size={18} className="ml-2" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {interviews.map((interview, index) => (
              <motion.div
                key={interview._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex flex-col"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1 min-w-0 mr-4">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {interview.jobRole}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center whitespace-nowrap">
                        <Calendar size={14} className="mr-1.5" />
                        {new Date(interview.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <span
                        className={`capitalize px-2 py-0.5 rounded-md text-xs font-medium whitespace-nowrap ${
                          interview.difficulty === "hard"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : interview.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                      >
                        {interview.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1">
                      {Math.round(
                        (interview.questions.reduce(
                          (acc, q) => acc + (q.score || 0),
                          0
                        ) /
                          (interview.questions.length * 10)) *
                          100
                      )}
                      %
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Score
                    </span>
                  </div>
                </div>

                {/* Key Questions */}
                <div className="flex-1 mb-6">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Key Questions
                  </div>
                  <div className="space-y-3">
                    {interview.questions.slice(0, 2).map((q, idx) => (
                      <div
                        key={idx}
                        className="flex items-start p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                      >
                        <div
                          className={`mt-1.5 w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                            (q.score || 0) >= 8
                              ? "bg-emerald-500"
                              : (q.score || 0) >= 5
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-2">
                            {q.question}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-slate-500 ml-2 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 flex-shrink-0">
                          {q.score}/10
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <button className="flex items-center justify-center px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    Retake
                  </button>
                  <button className="flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4 min-w-0">
    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xl flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <div className="text-2xl font-bold text-slate-900 dark:text-white truncate">
        {value}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium truncate">
        {label}
      </div>
    </div>
  </div>
);

export default History;
