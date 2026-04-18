import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Landing() {
  return (
    <div className="bg-[#0b1f14] text-white min-h-screen">

      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-green-400"
        >
          Helplytics AI 🚀
        </motion.h1>

        <p className="text-gray-300 mt-4 max-w-xl">
          A smart community platform where people help each other using AI-powered matching, insights and trust system.
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            to="/signup"
            className="bg-green-500 text-black px-6 py-2 rounded-lg font-medium"
          >
            Join Now
          </Link>

          <Link
            to="/login"
            className="border border-green-500 px-6 py-2 rounded-lg"
          >
            Login
          </Link>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="px-6 py-16">

        <h2 className="text-3xl font-bold text-center text-green-400 mb-10">
          Features ⚡
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-[#0f2a1c] border border-green-700/30 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-green-300">Ask for Help</h3>
            <p className="text-gray-400 mt-2">
              Post your problems and get instant help from community.
            </p>
          </div>

          <div className="bg-[#0f2a1c] border border-green-700/30 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-green-300">AI Suggestions</h3>
            <p className="text-gray-400 mt-2">
              Smart tags, categories and urgency detection powered by AI.
            </p>
          </div>

          <div className="bg-[#0f2a1c] border border-green-700/30 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-green-300">Trust System</h3>
            <p className="text-gray-400 mt-2">
              Build reputation and unlock badges by helping others.
            </p>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <div className="text-center py-20">

        <h2 className="text-3xl font-bold text-green-400">
          Start Helping Today 💡
        </h2>

        <p className="text-gray-400 mt-2">
          Join thousands of users already solving real problems.
        </p>

        <Link
          to="/signup"
          className="inline-block mt-6 bg-green-500 text-black px-6 py-3 rounded-lg font-medium"
        >
          Join Now
        </Link>

      </div>

    </div>
  );
}

export default Landing;