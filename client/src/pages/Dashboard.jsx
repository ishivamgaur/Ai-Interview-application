import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  History,
  Sparkles,
  ArrowRight,
  BarChart2,
  TrendingUp,
  Calendar,
  Award,
  Mic,
} from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-[calc(100vh-5rem)]">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

      <div className="relative z-10 space-y-8 md:space-y-12 py-6 md:py-8 px-4 md:px-0">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 md:mb-4">
              Hello,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                {user?.name}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Let's get you ready for that dream offer.
            </p>
          </motion.div>
        </div>

        {/* Main Actions - Hero Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Primary Action: New Interview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-2"
          >
            <Link
              to="/new-session"
              className="group relative overflow-hidden block bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs md:text-sm font-medium mb-4 backdrop-blur-sm">
                    <Sparkles size={14} className="mr-2" /> Recommended
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Start a New Interview
                  </h2>
                  <p className="text-blue-100 text-base md:text-lg max-w-xl">
                    Simulate a real technical interview with our AI. Choose your
                    stack, difficulty, and get instant feedback.
                  </p>
                </div>
                <div className="bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold flex items-center shadow-lg group-hover:scale-105 transition-transform text-sm md:text-base">
                  Begin Session <ArrowRight size={20} className="ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Secondary Actions */}
          <DashboardCard
            to="/voice-assistant"
            icon={<Mic size={28} />}
            title="Voice Practice"
            description="Work on your communication skills with our conversational AI assistant."
            color="indigo"
            delay={0.2}
            action="Chat Now"
          />
          <DashboardCard
            to="/history"
            icon={<History size={28} />}
            title="History & Analytics"
            description="Track your progress and review past interview performance."
            color="purple"
            delay={0.3}
            action="View History"
          />
        </div>

        {/* Stats Section - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8">
            Your Progress
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              label="Total Interviews"
              value="12"
              icon={<Calendar size={20} />}
              delay={0.5}
            />
            <StatCard
              label="Avg. Score"
              value="8.5/10"
              icon={<Award size={20} />}
              delay={0.6}
            />
            <StatCard
              label="Questions Solved"
              value="45"
              icon={<BarChart2 size={20} />}
              delay={0.7}
            />
            <StatCard
              label="Current Streak"
              value="3 Days"
              icon={<TrendingUp size={20} />}
              delay={0.8}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const DashboardCard = ({
  to,
  icon,
  title,
  description,
  color,
  delay,
  action,
}) => {
  const colorClasses = {
    indigo:
      "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white",
    purple:
      "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Link
        to={to}
        className="block h-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
      >
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${colorClasses[color]}`}
        >
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          {title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          {description}
        </p>
        <span className="absolute bottom-8 left-8 font-bold text-slate-900 dark:text-white flex items-center group-hover:translate-x-2 transition-transform">
          {action} <ArrowRight size={18} className="ml-2" />
        </span>
      </Link>
    </motion.div>
  );
};

const StatCard = ({ label, value, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="text-slate-500 dark:text-slate-400">{icon}</div>
      <div className="text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
        +12%
      </div>
    </div>
    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
      {value}
    </div>
    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
      {label}
    </div>
  </motion.div>
);

export default Dashboard;
