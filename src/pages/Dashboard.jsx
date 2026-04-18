import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setUserData({
              email: user.email,
              trustScore: 0
            });
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1f14] text-white p-8">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-green-400 mb-8"
      >
        Dashboard 🚀
      </motion.h1>

      {/* LOADING STATE */}
      {loading && (
        <p className="text-gray-400">Loading user data...</p>
      )}

      {/* NO USER */}
      {!loading && !userData && (
        <p className="text-red-400">Please login first</p>
      )}

      {/* USER DATA */}
      {!loading && userData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* EMAIL */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#0f2a1c] border border-green-700/30 rounded-xl p-5 shadow-lg"
          >
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-lg font-semibold text-white mt-1">
              {userData.email}
            </p>
          </motion.div>

          {/* TRUST SCORE */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#0f2a1c] border border-green-700/30 rounded-xl p-5 shadow-lg"
          >
            <p className="text-gray-400 text-sm">Trust Score</p>
            <p className="text-3xl font-bold text-green-400 mt-1">
              {userData.trustScore || 0}
            </p>
          </motion.div>

          {/* STATUS */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#0f2a1c] border border-green-700/30 rounded-xl p-5 shadow-lg"
          >
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-lg font-semibold text-green-300 mt-1">
              Active User
            </p>
          </motion.div>

        </div>
      )}

      {/* WELCOME SECTION */}
      {!loading && userData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 bg-[#0f2a1c] border border-green-700/30 p-6 rounded-xl"
        >
          <h2 className="text-green-400 text-xl font-semibold mb-2">
            Welcome back 👋
          </h2>
          <p className="text-gray-300">
            Keep helping others to increase your trust score and rank up on leaderboard.
          </p>
        </motion.div>
      )}

    </div>
  );
}

export default Dashboard;