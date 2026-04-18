import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { auth } from "../firebase";


const getCategory = (text) => "General";
const getTags = (text) => [];
const getUrgency = (text) => "Normal";

function CreateRequest() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !desc) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      const text = title + " " + desc;

      const category = getCategory(text);
      const tags = getTags(text);
      const urgency = getUrgency(text);

      await addDoc(collection(db, "requests"), {
        title,
        desc,
        category,
        tags,
        urgency,
        helpers: [],
        createdAt: new Date()
        
      });

      alert("Request created 🚀");

      setTitle("");
      setDesc("");

    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0b1f14] text-white flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-[#0f2a1c] border border-green-700/30 rounded-xl p-6 shadow-lg"
      >

        <h1 className="text-2xl font-bold text-green-400 mb-6">
          Create Request 🧠
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0b1f14] border border-green-700/30 text-white outline-none focus:border-green-400"
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={5}
            className="w-full p-3 rounded-lg bg-[#0b1f14] border border-green-700/30 text-white outline-none focus:border-green-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black py-3 rounded-lg font-medium hover:bg-green-400 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Submit 🚀"}
          </button>

        </form>

      </motion.div>

    </div>
  );
}

export default CreateRequest;