import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { motion } from "framer-motion";

function Explore() {
  const [loadingId, setLoadingId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchRequests = async () => {
    const querySnapshot = await getDocs(collection(db, "requests"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔥 FIXED HELP FUNCTION
  const handleHelp = async (requestId) => {
  const user = auth.currentUser;

  if (!user) return;

  setLoadingId(requestId); // 👈 start loading

  try {
    const ref = doc(db, "requests", requestId);

    await updateDoc(ref, {
      helpers: arrayUnion(user.email)
    });

    fetchRequests();

  } catch (err) {
    console.log(err);
  }

  setLoadingId(null); // 👈 stop loading
};
  const filteredData =
    filter === "All"
      ? requests
      : requests.filter((r) => r.category === filter);

  return (
    <div className="min-h-screen bg-[#0b1f14] text-white p-8">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-green-400 mb-6"
      >
        Explore Requests 🔍
      </motion.h1>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 mb-6">

        {["All", "Programming", "Mathematics", "English", "General"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1 rounded-full border transition
                ${
                  filter === cat
                    ? "bg-green-500 text-black border-green-400"
                    : "border-green-700 text-gray-300 hover:border-green-400"
                }`}
            >
              {cat}
            </button>
          )
        )}

      </div>

      {/* REQUEST LIST */}
      <div className="grid md:grid-cols-2 gap-5">

        {filteredData.map((req) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#0f2a1c] border border-green-700/30 rounded-xl p-5 shadow-lg"
          >

            <h3 className="text-lg font-semibold text-green-300">
              {req.title}
            </h3>

            <p className="text-gray-400 mt-2">
              {req.desc}
            </p>

            <div className="mt-4 text-sm text-gray-300 space-y-1">

              <p>
                <span className="text-gray-500">Category:</span>{" "}
                <span className="text-white">{req.category}</span>
              </p>

              <p>
                <span className="text-gray-500">Urgency:</span>{" "}
                <span className="text-yellow-400">{req.urgency}</span>
              </p>

              <p>
                <span className="text-gray-500">Helpers:</span>{" "}
                <span className="text-green-400">
                  {req.helpers?.length || 0}
                </span>
              </p>

            </div>

            {/* 🔥 WORKING BUTTON */}
          <button
  onClick={() => handleHelp(req.id)}
  disabled={loadingId === req.id}
  className={`mt-4 w-full py-2 rounded-lg font-medium transition
    ${
      loadingId === req.id
        ? "bg-gray-500 text-white cursor-not-allowed"
        : "bg-green-500 text-black hover:bg-green-400"
    }`}
>
  {loadingId === req.id ? "Registering help..." : "I can help 🤝"}
</button>
          </motion.div>
        ))}

      </div>

    </div>
  );
}

export default Explore;