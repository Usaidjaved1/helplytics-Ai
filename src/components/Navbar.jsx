import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (!user) return null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center px-6 py-4 
      bg-[#0f2a1c]/80 backdrop-blur border-b border-green-700/30"
    >
      <h1 className="text-green-400 font-bold text-xl">
        Helplytics AI
      </h1>

      <div className="flex gap-5 text-sm items-center">
        <Link className="hover:text-green-400" to="/dashboard">Dashboard</Link>
        <Link className="hover:text-green-400" to="/create">Create</Link>
        <Link className="hover:text-green-400" to="/explore">Explore</Link>
        <Link className="hover:text-green-400" to="/leaderboard">Leaderboard</Link>
        <Link className="hover:text-green-400" to="/profile">Profile</Link>

        <button
          onClick={logout}
          className="bg-green-500 text-black px-3 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>
    </motion.nav>
  );
}

export default Navbar;