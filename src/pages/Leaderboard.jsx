import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const snap = await getDocs(collection(db, "requests"));

    const allHelpers = {};

    snap.docs.forEach((doc) => {
      const data = doc.data();

      data.helpers?.forEach((user) => {
        allHelpers[user] = (allHelpers[user] || 0) + 1;
      });
    });

    const sorted = Object.keys(allHelpers).map((user) => ({
      name: user,
      score: allHelpers[user]
    }));

    sorted.sort((a, b) => b.score - a.score);

    setUsers(sorted);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1f14] text-white p-8">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-green-400 mb-8"
      >
        Leaderboard 🏆
      </motion.h1>

      {/* LIST */}
      <div className="space-y-4">

        {users.length === 0 ? (
          <p className="text-gray-400">No data yet...</p>
        ) : (
          users.map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center justify-between 
              bg-[#0f2a1c] border border-green-700/30 
              p-4 rounded-xl shadow-lg"
            >

              {/* LEFT */}
              <div className="flex items-center gap-3">

                {/* RANK BADGE */}
                <div className="w-10 h-10 flex items-center justify-center 
                bg-green-500 text-black font-bold rounded-full">
                  #{i + 1}
                </div>

                <div>
                  <h3 className="font-semibold text-green-300">
                    {u.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Community Helper
                  </p>
                </div>

              </div>

              {/* SCORE */}
              <div className="text-right">
                <p className="text-2xl font-bold text-white">
                  {u.score}
                </p>
                <p className="text-gray-400 text-sm">
                  Helps
                </p>
              </div>

            </motion.div>
          ))
        )}

      </div>
    </div>
  );
}

export default Leaderboard;