import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ------------------- DATA -------------------
const INDUSTRIES = [
  { 
    name: "E-Commerce", 
    icon: "🛒",
    gradient: "from-cyan-400/20 to-blue-500/20",
    accent: "bg-cyan-400",
    id: "e-commerce"
  },
  { 
    name: "Fin-Tech", 
    icon: "💳",
    gradient: "from-emerald-400/20 to-teal-500/20",
    accent: "bg-emerald-400",
    id: "fin-tech"
  },
  { 
    name: "Communications", 
    icon: "📡",
    gradient: "from-violet-400/20 to-purple-500/20",
    accent: "bg-violet-400",
    id: "communications"
  },
  { 
    name: "Health Tech & Life Sciences", 
    icon: "🧬",
    gradient: "from-green-400/20 to-emerald-500/20",
    accent: "bg-green-400",
    id: "health-tech"
  },
  { 
    name: "Agri-Tech", 
    icon: "🌾",
    gradient: "from-lime-400/20 to-green-500/20",
    accent: "bg-lime-400",
    id: "agri-tech"
  },
  { 
    name: "Media & Entertainment", 
    icon: "🎥",
    gradient: "from-rose-400/20 to-pink-500/20",
    accent: "bg-rose-400",
    id: "media-entertainment"
  },
  { 
    name: "Ed-Tech", 
    icon: "🎓",
    gradient: "from-blue-400/20 to-indigo-500/20",
    accent: "bg-blue-400",
    id: "ed-tech"
  },
  { 
    name: "Insurance", 
    icon: "🛡️",
    gradient: "from-slate-400/20 to-gray-500/20",
    accent: "bg-slate-400",
    id: "insurance"
  },
  { 
    name: "Automotive & Mobility", 
    icon: "🚗",
    gradient: "from-amber-400/20 to-orange-500/20",
    accent: "bg-amber-400",
    id: "automotive-mobility"
  },
  { 
    name: "Energy", 
    icon: "⚡",
    gradient: "from-yellow-400/20 to-amber-500/20",
    accent: "bg-yellow-400",
    id: "energy"
  },
  { 
    name: "Utilities", 
    icon: "🏭",
    gradient: "from-sky-400/20 to-cyan-500/20",
    accent: "bg-sky-400",
    id: "utilities"
  },
];

const SERVICES = [
  { 
    name: "Automation Engineering", 
    icon: "🤖",
    gradient: "from-purple-400/20 to-violet-500/20",
    accent: "bg-purple-400",
    id: "automation-engineering"
  },
  { 
    name: "Computer Vision", 
    icon: "👁️",
    gradient: "from-pink-400/20 to-rose-500/20",
    accent: "bg-pink-400",
    id: "computer-vision"
  },
  { 
    name: "AI & ML", 
    icon: "🧠",
    gradient: "from-indigo-400/20 to-blue-500/20",
    accent: "bg-indigo-400",
    id: "ai-ml"
  },
  { 
    name: "Cloud Hosting Services", 
    icon: "☁️",
    gradient: "from-cyan-400/20 to-sky-500/20",
    accent: "bg-cyan-400",
    id: "cloud-hosting"
  },
  { 
    name: "Data Engineering", 
    icon: "🗄️",
    gradient: "from-teal-400/20 to-emerald-500/20",
    accent: "bg-teal-400",
    id: "data-engineering"
  },
  { 
    name: "UI / UX", 
    icon: "🎨",
    gradient: "from-fuchsia-400/20 to-pink-500/20",
    accent: "bg-fuchsia-400",
    id: "ui-ux"
  },
  { 
    name: "CRM & ERP", 
    icon: "🧩",
    gradient: "from-orange-400/20 to-red-500/20",
    accent: "bg-orange-400",
    id: "crm-erp"
  },
  { 
    name: "Testing Services", 
    icon: "🧪",
    gradient: "from-lime-400/20 to-green-500/20",
    accent: "bg-lime-400",
    id: "testing-services"
  },
];

// Customer logos data - optimized for 152x96px images
const CUSTOMER_LOGOS = [
  { name: "Client 1", image: "/cus1.png" },
  { name: "Client 2", image: "/cus2.png" },
  { name: "Client 3", image: "/cus3.png" },
  { name: "Client 4", image: "/cus4.png" },
  { name: "Client 5", image: "/cus5.png" },
  { name: "Client 6", image: "/cus6.png" },
  { name: "Client 7", image: "/cus7.png" },
  { name: "Client 8", image: "/cus8.png" },
  
];

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

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

const hoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

// Infinite Scroll Component for Customers
function InfiniteScrollLogos() {
  const duplicatedLogos = [...CUSTOMER_LOGOS, ...CUSTOMER_LOGOS, ...CUSTOMER_LOGOS, ...CUSTOMER_LOGOS];

  return (
    <div className="relative overflow-hidden py-12">
      {/* First Row - Moving Right */}
      <motion.div
        className="flex gap-16 mb-16 items-center"
        animate={{ x: [0, -1920] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          }
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`row1-${index}`}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="w-36 h-20 object-contain"
            />
          </div>
        ))}
      </motion.div>

      {/* Second Row - Moving Left */}
      <motion.div
        className="flex gap-16 items-center"
        animate={{ x: [-1920, 0] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          }
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`row2-${index}`}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="w-32 h-16 object-contain"
            />
          </div>
        ))}
      </motion.div>

      {/* Third Row - Moving Right (Faster) */}
      <motion.div
        className="flex gap-14 mt-16 items-center"
        animate={{ x: [0, -1600] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`row3-${index}`}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="w-28 h-14 object-contain"
            />
          </div>
        ))}
      </motion.div>

      {/* Gradient Overlays for Smooth Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0b1020] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0b1020] to-transparent z-10" />
    </div>
  );
}

// Advanced Footer Component
function AdvancedFooter() {
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
                {FOOTER_LINKS.services.map((link, index) => (
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
                {FOOTER_LINKS.industries.map((link, index) => (
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
                {FOOTER_LINKS.company.map((link, index) => (
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
                {FOOTER_LINKS.support.map((link, index) => (
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

// ------------------- COMPONENT -------------------
export default function Home() {
  const [activeTab, setActiveTab] = useState("industries");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organization: "",
    hearAbout: "",
    location: "",
    message: ""
  });

  const navigate = useNavigate();
  const CURRENT_DATA = activeTab === "industries" ? INDUSTRIES : SERVICES;

  // Handle card click - navigate to specific service/industry
  const handleCardClick = (item) => {
    if (activeTab === "industries") {
      navigate(`/industries/${item.id}`);
    } else {
      navigate(`/services/${item.id}`);
    }
  };

  // Handle "Explore All" button click
  const handleExploreAllClick = () => {
    if (activeTab === "industries") {
      navigate('/industries');
    } else {
      navigate('/services');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      {/* ---------------------- HERO VIDEO ---------------------- */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          src="https://res.cloudinary.com/dwxkl9svj/video/upload/v1764532552/vermasa_yotyfg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
      </section>

      {/* ---------------------- WHAT WE DO ---------------------- */}
      <section className="relative py-20 px-6 bg-[#0b1020]">

        {/* PREMIUM HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white select-none">
            What We{" "}
            <span className="bg-gradient-to-r from-[#00eaff] via-[#00c8ff] to-[#8a2cff] text-transparent bg-clip-text">
              Do
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mt-3 h-[4px] w-24 rounded-full bg-gradient-to-r from-[#00eaff] to-[#8a2cff]"
          />

          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            High quality technology delivery leading to sustainable business
            impact for clients across the world.
          </p>
        </motion.div>

        {/* SWITCHER */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-full flex p-1 w-[300px] shadow-lg">
            <button
              onClick={() => setActiveTab("industries")}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "industries"
                  ? "bg-white text-[#00bcd4] shadow"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Industries
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "services"
                  ? "bg-white text-[#00bcd4] shadow"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Services
            </button>
          </div>
        </div>

        {/* PROFESSIONAL CARDS WITH LIGHT NEON GRADIENTS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {CURRENT_DATA.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => handleCardClick(item)}
                className="group relative cursor-pointer"
              >
                {/* Main Card */}
                <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 overflow-hidden">
                  
                  {/* Subtle Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl`} />
                  
                  {/* Animated Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-50 transition-all duration-500`}
                    style={{ 
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      padding: '1px'
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with Elegant Animation */}
                    <motion.div
                      className={`w-12 h-12 rounded-xl ${item.accent} bg-opacity-20 flex items-center justify-center text-xl mb-4 group-hover:bg-opacity-30 transition-all duration-300`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5
                      }}
                      animate={{
                        boxShadow: hoveredCard === index 
                          ? `0 0 20px ${item.accent.replace('bg-', '')}40`
                          : "none"
                      }}
                    >
                      {item.icon}
                    </motion.div>

                    {/* Title */}
                    <motion.h3 
                      className="text-white font-semibold text-sm mb-2"
                      animate={{
                        color: hoveredCard === index ? item.accent.replace('bg-', 'text-') : "#ffffff"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.name}
                    </motion.h3>

                    {/* Subtle CTA */}
                    <motion.div 
                      className="flex items-center justify-between"
                      animate={{
                        opacity: hoveredCard === index ? 1 : 0.7
                      }}
                    >
                      <span className="text-xs text-slate-400">Learn more</span>
                      <motion.div
                        animate={{
                          x: hoveredCard === index ? 3 : 0
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: 500,
                          damping: 15
                        }}
                      >
                        <svg 
                          className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className={`absolute top-3 right-3 w-1 h-1 ${item.accent} rounded-full opacity-0 group-hover:opacity-100`}
                    animate={{
                      scale: hoveredCard === index ? [1, 1.5, 1] : 1,
                      opacity: hoveredCard === index ? 1 : 0
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className={`absolute bottom-3 left-3 w-1 h-1 ${item.accent} rounded-full opacity-0 group-hover:opacity-100`}
                    animate={{
                      scale: hoveredCard === index ? [1, 1.3, 1] : 1,
                      opacity: hoveredCard === index ? 1 : 0
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />

                  {/* Subtle Pulse Effect */}
                  <motion.div
                    className={`absolute inset-0 ${item.accent} rounded-2xl opacity-0`}
                    animate={{
                      opacity: hoveredCard === index ? [0, 0.1, 0] : 0
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Outer Glow */}
                <motion.div
                  className={`absolute inset-0 ${item.accent} rounded-2xl opacity-0 blur-xl -z-10`}
                  animate={{
                    opacity: hoveredCard === index ? 0.1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Subtle Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={handleExploreAllClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300"
          >
            Explore All {activeTab === "industries" ? "Industries" : "Services"}
          </motion.button>
        </motion.div>
      </section>

      {/* ---------------------- OUR HAPPY CUSTOMERS ---------------------- */}
      <section className="relative py-24 px-6 bg-[#0b1020] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* PREMIUM HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white select-none mb-6">
                Our Happy{" "}
                <span className="bg-gradient-to-r from-[#00eaff] via-[#00c8ff] to-[#8a2cff] text-transparent bg-clip-text">
                  Customers
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mx-auto h-1 w-32 bg-gradient-to-r from-[#00eaff] to-[#8a2cff] rounded-full mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              Trusted by industry leaders and innovative startups worldwide
            </motion.p>
          </motion.div>

          {/* INFINITE SCROLLING LOGOS */}
          <InfiniteScrollLogos />

          {/* STATISTICS SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "150+", label: "Happy Clients" },
              { number: "50+", label: "Countries Served" },
              { number: "99%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text mb-2"
                >
                  {stat.number}
                </motion.div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------- WHY VERAMASA ---------------------- */}
      <section className="relative py-24 px-6 bg-[#0b1020]">

        {/* PREMIUM HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white select-none">
            Why{" "}
            <span className="bg-gradient-to-r from-[#00eaff] via-[#00c8ff] to-[#8a2cff] text-transparent bg-clip-text">
              Veramasa?
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mt-3 h-[4px] w-24 rounded-full bg-gradient-to-r from-[#00eaff] to-[#8a2cff]"
          />

          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            We deliver engineering excellence, innovation and seamless
            collaboration.
          </p>
        </motion.div>

        {/* WHY CARDS */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {[
            {
              title: "Client Centric Focus",
              desc: "We build long-term partnerships and solve client challenges effectively.",
              icon: "🤝",
            },
            {
              title: "Engineering & Tech Innovation",
              desc: "We create modern engineering solutions powered by new-age technology.",
              icon: "⚙️",
            },
            {
              title: "Efficient Delivery Methods",
              desc: "We deliver complex medical & tech solutions with precision and excellence.",
              icon: "🚀",
            },
            {
              title: "Streamlined Operations",
              desc: "We maintain top-notch safety, operations, IP protection and audit procedures.",
              icon: "📈",
            },
            {
              title: "Seamless Teamwork",
              desc: "Cross-domain collaboration ensures smooth and successful execution.",
              icon: "👥",
            },
            {
              title: "Dedicated Experts",
              desc: "A skilled and diverse engineering team ensures exceptional outcomes.",
              icon: "🌟",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative group p-[2px] rounded-2xl 
                bg-gradient-to-br from-[#00f2ff] via-[#0070ff] to-[#00e0b8]
                shadow-xl"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-80 
                transition-all duration-500 bg-gradient-to-br 
                from-[#00eaff66] to-[#0066ff44] blur-xl" />

              <div className="relative rounded-2xl p-7 h-full
                bg-[#0d1526]/95 backdrop-blur-xl border border-white/10
                shadow-[inset_0_-20px_40px_rgba(255,255,255,0.05)]
                group-hover:border-white/20 transition-all"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="w-14 h-14 rounded-xl bg-white/10 flex 
                    items-center justify-center text-3xl mb-5"
                >
                  {item.icon}
                </motion.div>

                <h4 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h4>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------------- CONTACT SECTION ---------------------- */}
      <section className="relative py-24 px-6 bg-[#0b1020] overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.1)_25px),linear-gradient(180deg,transparent_24px,rgba(255,255,255,0.1)_25px)] bg-[length:25px_25px]" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* HEADING SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white select-none mb-6">
                Dealing with{" "}
                <span className="bg-gradient-to-r from-[#00eaff] via-[#00c8ff] to-[#8a2cff] text-transparent bg-clip-text">
                  Tech Challenges?
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mx-auto h-1 w-32 bg-gradient-to-r from-[#00eaff] to-[#8a2cff] rounded-full mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4"
            >
              Let us help you find the <span className="text-cyan-400 font-semibold">perfect solution!</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-slate-400 max-w-3xl mx-auto"
            >
              Transform your challenges into opportunities with our expert guidance
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* LEFT SIDE - PROCESS STEPS */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-3xl font-bold text-white mb-8"
              >
                What happens <span className="text-cyan-400">next?</span>
              </motion.h3>

              {/* Process Steps */}
              {[
                {
                  number: "01",
                  title: "Initial Connection",
                  description: "Our expert team will reach out to understand your unique challenges and requirements.",
                  icon: "📞",
                  gradient: "from-cyan-500 to-blue-500"
                },
                {
                  number: "02",
                  title: "Deep Discovery",
                  description: "We conduct comprehensive analysis of your business objectives and enterprise landscape.",
                  icon: "🔍",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  number: "03",
                  title: "Strategic Execution",
                  description: "We deliver a comprehensive approach and execute the solution end-to-end with precision.",
                  icon: "🚀",
                  gradient: "from-orange-500 to-red-500"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group"
                >
                  {/* Main Card */}
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 overflow-hidden">
                    
                    {/* Animated Gradient Border */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`} />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-start gap-4">
                      {/* Number Badge */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-lg shadow-2xl`}
                      >
                        {step.number}
                      </motion.div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <motion.span 
                            className="text-2xl"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                          >
                            {step.icon}
                          </motion.span>
                          <h4 className="text-xl font-semibold text-white">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`absolute top-3 right-3 w-2 h-2 bg-gradient-to-br ${step.gradient} rounded-full opacity-0 group-hover:opacity-100`}
                    />
                  </div>

                  {/* Connecting Line (except for last item) */}
                  {index < 2 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.6, delay: 1 + index * 0.3 }}
                      className="absolute left-8 top-16 w-0.5 h-16 bg-gradient-to-b from-cyan-400 to-purple-400 opacity-50 ml-4"
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* RIGHT SIDE - CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              {/* Form Container */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">
                
                {/* Animated Border Glow */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10"
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm">First name*</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm">Last name*</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm">Phone number*</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm">Email*</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div className="space-y-2">
                    <label className="text-white font-medium text-sm">Organization</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Location & Hear About */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm">How did you hear about us?*</label>
                      <motion.select
                        whileFocus={{ scale: 1.02 }}
                        name="hearAbout"
                        value={formData.hearAbout}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none"
                      >
                        <option value="">Select an option</option>
                        <option value="search">Search Engine</option>
                        <option value="social">Social Media</option>
                        <option value="referral">Referral</option>
                        <option value="event">Event/Conference</option>
                        <option value="other">Other</option>
                      </motion.select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm">Location*</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none"
                        placeholder="Your city/country"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-white font-medium text-sm">Message*</label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none resize-none"
                      placeholder="Tell us about your challenges and how we can help..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group"
                  >
                    <span className="flex items-center justify-center gap-3">
                      Get Your Solution
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-lg"
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </form>

                {/* Floating Particles */}
                <motion.div
                  animate={{ 
                    x: [0, 20, 0],
                    y: [0, -15, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400 rounded-full blur-sm"
                />
                <motion.div
                  animate={{ 
                    x: [0, -15, 0],
                    y: [0, 20, 0],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

   
    </>
  );
}