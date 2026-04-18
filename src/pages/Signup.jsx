import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1f14]">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[350px] bg-[#0f2a1c] border border-green-700/30 p-6 rounded-xl shadow-lg"
      >

        <h1 className="text-2xl font-bold text-green-400 text-center mb-6">
          Signup 🚀
        </h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-black/30 border border-green-700/30 outline-none text-white"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-black/30 border border-green-700/30 outline-none text-white"
        />

        {/* BUTTON WITH LOADING */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-500 text-black py-2 rounded-lg font-semibold hover:bg-green-400 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default Signup;