import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Footer Data
const FOOTER_LINKS = {
  services: [
    "Automation Engineering",
    "Computer Vision", 
    "AI & ML",
    "Cloud Hosting",
    "Data Engineering",
    "UI/UX Design",
    "CRM & ERP",
    "Testing Services"
  ],
  industries: [
    "E-Commerce",
    "Fin-Tech",
    "Healthcare",
    "Agriculture",
    "Media & Entertainment", 
    "Education",
    "Insurance",
    "Automotive"
  ],
  company: [
    "About Us",
    "Our Team",
    "Careers",
    "Case Studies",
    "Blog",
    "Newsroom"
  ],
  support: [
    "Contact Us",
    "Help Center",
    "Documentation",
    "API Status",
    "System Status"
  ]
};

const SOCIAL_LINKS = [
  { name: "LinkedIn", icon: "💼", url: "#" },
  { name: "Twitter", icon: "🐦", url: "#" },
  { name: "GitHub", icon: "💻", url: "#" },
  { name: "Dribbble", icon: "🎨", url: "#" }
];

export default function AdvancedFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#070b17] border-t border-white/5 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -right-32 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.05)_25px),linear-gradient(180deg,transparent_24px,rgba(255,255,255,0.05)_25px)] bg-[length:25px_25px]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Brand & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Brand */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block"
            >
              <h3 className="text-3xl font-bold text-white mb-2">
                Veramasa
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
            </motion.div>

            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Transforming businesses through cutting-edge technology solutions 
              and innovative engineering approaches.
            </p>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">
                Stay Updated
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </form>
              
              <AnimatePresence>
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-400 text-sm"
                  >
                    ✅ Thank you for subscribing!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Services</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.services.map((link) => (
                  <motion.li key={link} whileHover={{ x: 5 }}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Industries</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.industries.map((link) => (
                  <motion.li key={link} whileHover={{ x: 5 }}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-purple-400 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link) => (
                  <motion.li key={link} whileHover={{ x: 5 }}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.support.map((link) => (
                  <motion.li key={link} whileHover={{ x: 5 }}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-orange-400 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          {/* Copyright */}
          <p className="text-slate-400 text-sm">
            © {currentYear} Veramasa Technologies. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"].map((link) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ scale: 1.05, color: "#22d3ee" }}
                className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300 flex items-center gap-2"
          >
            <span>Back to Top</span>
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↑
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-10 w-2 h-2 bg-cyan-400 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full blur-sm"
      />
    </footer>
  );
}