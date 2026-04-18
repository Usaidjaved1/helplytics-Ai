import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

function Profile() {
  const [stats, setStats] = useState({
    totalRequests: 0,
    helped: 0
  });

  const fetchStats = async () => {
    const snap = await getDocs(collection(db, "requests"));

    let total = snap.size;
    let helped = 0;

    snap.docs.forEach((doc) => {
      const data = doc.data();
      if (data.helpers?.length > 0) {
        helped += data.helpers.length;
      }
    });

    setStats({
      totalRequests: total,
      helped
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1f14] text-white p-8">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-green-400 mb-8"
      >
        Profile 👤
      </motion.h1>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0f2a1c] border border-green-700/30 rounded-xl p-6 shadow-lg max-w-md"
      >

        <h3 className="text-xl font-semibold text-green-300 mb-4">
          User Profile
        </h3>

        <div className="space-y-3 text-gray-300">

          <p>
            <span className="text-gray-400">Username:</span>{" "}
            <span className="text-white font-medium">User1</span>
          </p>

          <p>
            <span className="text-gray-400">Total Requests:</span>{" "}
            <span className="text-white font-medium">
              {stats.totalRequests}
            </span>
          </p>

          <p>
            <span className="text-gray-400">Help Given:</span>{" "}
            <span className="text-green-400 font-bold">
              {stats.helped}
            </span>
          </p>

          <p>
            <span className="text-gray-400">Trust Score:</span>{" "}
            <span className="text-yellow-400 font-bold text-lg">
              {stats.helped * 10} ⭐
            </span>
          </p>

        </div>

      </motion.div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#0f2a1c] border border-green-700/30 p-5 rounded-xl"
        >
          <p className="text-gray-400">Total Requests</p>
          <h2 className="text-3xl text-white font-bold">
            {stats.totalRequests}
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#0f2a1c] border border-green-700/30 p-5 rounded-xl"
        >
          <p className="text-gray-400">Help Given</p>
          <h2 className="text-3xl text-green-400 font-bold">
            {stats.helped}
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#0f2a1c] border border-green-700/30 p-5 rounded-xl"
        >
          <p className="text-gray-400">Trust Score</p>
          <h2 className="text-3xl text-yellow-400 font-bold">
            {stats.helped * 10}
          </h2>
        </motion.div>

      </div>

    </div>
  );
}

export default Profile;