import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Github,
  Linkedin,
  Twitter,
  Terminal,
  Cpu,
  Globe,
  Zap,
  Users,
  Star,
  Code,
  MessageSquare,
  BarChart,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
              AI
            </div>
            <span className="text-xl font-bold tracking-tight">MockMate</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link
                to="/dashboard"
                className="px-6 py-2.5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 dark:via-slate-950/50 dark:to-slate-950 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-8 border border-blue-200 dark:border-blue-800">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              AI-Powered Interview Prep
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Master Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Dream Job
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the future of interview preparation. Our AI adapts to
              your responses, providing real-time feedback on your technical
              skills and communication.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center w-full sm:w-auto justify-center"
              >
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all w-full sm:w-auto justify-center flex items-center"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <CheckCircle size={16} className="text-emerald-500 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="text-emerald-500 mr-2" />
                <span>10k+ developers</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 animate-float">
              <div className="flex items-center space-x-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="ml-auto text-xs text-slate-400 font-mono">
                  ai_interviewer.js
                </div>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex">
                  <span className="text-blue-500 mr-4">AI:</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    "Can you explain the difference between REST and GraphQL?"
                  </span>
                </div>
                <div className="flex">
                  <span className="text-emerald-500 mr-4">You:</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    "REST is an architectural style based on resources, while
                    GraphQL is a query language..."
                  </span>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 mt-4">
                  <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                    <Zap size={16} className="mr-2" />
                    <span className="font-bold">Feedback</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Great explanation! You correctly identified the core
                    difference. To improve, mention{" "}
                    <strong>over-fetching</strong> and{" "}
                    <strong>under-fetching</strong> as key problems GraphQL
                    solves.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -right-12 top-1/4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-float-delayed">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-800 dark:text-white">
                    98%
                  </div>
                  <div className="text-xs text-slate-500">Accuracy</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How MockMate Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Three simple steps to interview mastery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 dark:from-slate-700 dark:via-slate-700 dark:to-slate-700 -z-10" />

            <StepCard
              number="1"
              icon={<Users size={24} />}
              title="Customize Session"
              description="Select your target role, experience level, and specific topics you want to practice."
            />
            <StepCard
              number="2"
              icon={<MessageSquare size={24} />}
              title="Interactive Interview"
              description="Engage in a realistic voice or text-based interview with our adaptive AI."
            />
            <StepCard
              number="3"
              icon={<BarChart size={24} />}
              title="Get Feedback"
              description="Receive detailed analytics, actionable feedback, and a performance score."
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
              Features
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Everything you need to{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                excel
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Terminal className="text-blue-600" />}
              title="Technical Deep Dives"
              description="Practice specific stacks like React, Node.js, Python, and System Design."
            />
            <FeatureCard
              icon={<Cpu className="text-indigo-600" />}
              title="Behavioral Analysis"
              description="AI evaluates your confidence, tone, and clarity, not just your code."
            />
            <FeatureCard
              icon={<Globe className="text-purple-600" />}
              title="Global Standards"
              description="Questions curated from top tech companies (FAANG) interview loops."
            />
            <FeatureCard
              icon={<Zap className="text-yellow-600" />}
              title="Instant Feedback"
              description="No waiting. Get detailed critiques immediately after every answer."
            />
            <FeatureCard
              icon={<Code className="text-emerald-600" />}
              title="Live Coding"
              description="Write and explain code in real-time, just like a real technical screen."
            />
            <FeatureCard
              icon={<Star className="text-orange-600" />}
              title="Progress Tracking"
              description="Watch your scores improve over time with detailed performance charts."
            />
          </div>
        </div>
      </section>

      {/* Testimonials (Placeholder) */}
      <section className="py-24 relative border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Loved by Developers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="MockMate helped me land my dream job at Google. The system design feedback was a game changer."
              author="Sarah Chen"
              role="Senior Software Engineer"
              avatar="SC"
              color="bg-blue-500"
            />
            <TestimonialCard
              quote="The voice assistant feels incredibly real. It helped me get over my interview anxiety completely."
              author="Michael Ross"
              role="Frontend Developer"
              avatar="MR"
              color="bg-emerald-500"
            />
            <TestimonialCard
              quote="I love the detailed breakdowns of my answers. It's like having a senior engineer mentor you 24/7."
              author="David Park"
              role="Full Stack Developer"
              avatar="DP"
              color="bg-purple-500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-100"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950 to-blue-950 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
            Ready to Ace Your Interview?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join thousands of developers who are fast-tracking their careers
            with MockMate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all transform hover:-translate-y-1 shadow-2xl w-full sm:w-auto"
            >
              Get Started for Free
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <span className="text-xl font-bold">MockMate</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                The most advanced AI-powered interview preparation platform for
                software engineers.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-slate-900 dark:text-white">
                Product
              </h4>
              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-slate-900 dark:text-white">
                Company
              </h4>
              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm mb-4 md:mb-0">
              © 2024 MockMate. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <SocialLink href="#" icon={<Github size={20} />} label="GitHub" />
              <SocialLink
                href="#"
                icon={<Linkedin size={20} />}
                label="LinkedIn"
              />
              <SocialLink
                href="#"
                icon={<Twitter size={20} />}
                label="Twitter"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StepCard = ({ number, icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 text-center z-10 shadow-sm"
  >
    <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-inner flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 relative">
      {icon}
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white dark:border-slate-900">
        {number}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
      {description}
    </p>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all group"
  >
    <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
      {description}
    </p>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role, avatar, color }) => (
  <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 shadow-sm">
    <div className="flex items-center mb-6">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={16} className="text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-slate-700 dark:text-slate-300 mb-6 italic leading-relaxed">
      "{quote}"
    </p>
    <div className="flex items-center">
      <div
        className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm mr-3`}
      >
        {avatar}
      </div>
      <div>
        <div className="font-bold text-slate-900 dark:text-white text-sm">
          {author}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{role}</div>
      </div>
    </div>
  </div>
);

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    className="text-slate-400 hover:text-blue-600 transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);

export default LandingPage;
