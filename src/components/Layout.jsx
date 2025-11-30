import { motion } from "framer-motion";
import Navbar from "./Navbar";
import AdvancedFooter from "./AdvancedFooter";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b1020]">
      <Navbar />
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <AdvancedFooter />
    </div>
  );
}