import { motion } from "framer-motion";

function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0f2a1c] border border-green-700/30 rounded-xl p-5 shadow-lg"
    >
      {children}
    </motion.div>
  );
}

export default Card;