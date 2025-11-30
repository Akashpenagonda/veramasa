import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "../components/Navbar";
import AdvancedFooter from "../components/AdvancedFooter";

// Enhanced Particle System Component
const FloatingParticles = ({ count = 35 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
          }}
          animate={{
            y: [0, -100, -150, -100, 0],
            x: [0, Math.random() * 60 - 30, Math.random() * 40 - 20, 0],
            opacity: [0, 0.8, 0.6, 0],
            scale: [0, 1.2, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 12 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
          className={`${
            i % 4 === 0 ? "bg-cyan-400/50 shadow-lg shadow-cyan-400/30" :
            i % 4 === 1 ? "bg-purple-400/50 shadow-lg shadow-purple-400/30" :
            i % 4 === 2 ? "bg-emerald-400/50 shadow-lg shadow-emerald-400/30" :
            "bg-amber-400/50 shadow-lg shadow-amber-400/30"
          }`}
        />
      ))}
    </div>
  );
};

// Animated Text Character Component
const AnimatedTextChar = ({ text, delay = 0 }) => {
  const letters = Array.from(text);

  return (
    <span className="inline-block">
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.05,
            type: "spring",
            stiffness: 150,
            damping: 20
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// Professional Gradient Orb with Enhanced Animation
const GradientOrb = ({ size = 400, color = "cyan", position = {} }) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`absolute rounded-full blur-3xl ${
        color === "cyan" ? "bg-gradient-to-br from-cyan-500/25 via-blue-500/20 to-teal-500/25" :
        color === "purple" ? "bg-gradient-to-br from-purple-500/25 via-pink-500/20 to-violet-500/25" :
        "bg-gradient-to-br from-emerald-500/25 via-green-500/20 to-cyan-500/25"
      }`}
      style={{
        width: size,
        height: size,
        ...position
      }}
    />
  );
};

// Enhanced Magnetic Button with Ripple Effect
const MagneticButton = ({ children, onClick, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.1;
    const y = (clientY - (top + height / 2)) * 0.1;
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        handleMouse(e);
        setIsHovered(true);
      }}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className={`relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Ripple Effects */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="absolute inset-0 rounded-xl bg-white/20"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-100"
        animate={{
          backgroundPosition: ['0% 0%', '200% 200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: 0.5,
        }}
      />
    </motion.button>
  );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 origin-left z-50 shadow-lg"
      style={{ scaleX }}
    />
  );
};

// Enhanced Form Input Component
const AnimatedFormField = ({ label, type = "text", name, value, onChange, required = false, textarea = false, delay = 0 }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      className="space-y-3"
    >
      <label className="text-white font-semibold text-base flex items-center gap-1">
        {label}
        {required && <span className="text-cyan-400 text-sm">*</span>}
      </label>
      
      <motion.div
        className="relative"
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
      >
        {textarea ? (
          <motion.textarea
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows="4"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none resize-none text-base backdrop-blur-xl"
            placeholder={`Enter your ${label.toLowerCase()}...`}
            required={required}
          />
        ) : (
          <motion.input
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none text-base backdrop-blur-xl"
            placeholder={`Enter your ${label.toLowerCase()}...`}
            required={required}
          />
        )}
        
        {/* Animated Focus Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
          animate={isFocused ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function Careers() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
    comments: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const features = [
    {
      title: "Innovative Environment",
      content: "At Veramasa, you will be part of a dynamic and innovative environment where cutting-edge technologies are at the forefront of everything we do. Our projects span across various sectors, including MedTech, AgriTech, and Media & Entertainment, providing diverse opportunities to work on groundbreaking solutions.",
      gradient: "from-cyan-500/20 to-blue-500/20",
      icon: "🚀",
      color: "cyan"
    },
    {
      title: "Career Growth",
      content: "We are committed to the professional growth and development of our employees. Through continuous learning opportunities, mentorship programs, and career advancement pathways, we empower our team members to reach their full potential and achieve their career goals.",
      gradient: "from-purple-500/20 to-pink-500/20",
      icon: "📈",
      color: "purple"
    },
    {
      title: "Collaborative Culture",
      content: "Our collaborative culture fosters teamwork, creativity, and knowledge sharing. At Veramasa, you will work alongside some of the brightest minds in the industry, exchanging ideas and developing innovative solutions together.",
      gradient: "from-emerald-500/20 to-green-500/20",
      icon: "👥",
      color: "emerald"
    },
    {
      title: "Employee Benefits",
      content: "We offer a comprehensive benefits package designed to support the well-being and work-life balance of our employees. Our benefits include competitive salaries, health insurance, flexible working hours, remote work options, and more.",
      gradient: "from-amber-500/20 to-orange-500/20",
      icon: "⭐",
      color: "amber"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        resume: null,
        comments: ""
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-white overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      
      <main ref={containerRef}>
        {/* Enhanced Hero Section with Bigger Text */}
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
          <FloatingParticles count={40} />
          
          {/* Enhanced Background Orbs */}
          <GradientOrb size={500} color="cyan" position={{ top: '10%', left: '5%' }} />
          <GradientOrb size={450} color="purple" position={{ top: '70%', right: '8%' }} />
          <GradientOrb size={400} color="emerald" position={{ bottom: '10%', left: '20%' }} />

          {/* Animated Grid Pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 24px, rgba(0, 234, 255, 0.1) 25px),
                linear-gradient(180deg, transparent 24px, rgba(138, 44, 255, 0.1) 25px)
              `,
              backgroundSize: '25px 25px',
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-16"
            >
              {/* Main Title with Character Animation */}
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, type: "spring" }}
                className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 text-transparent bg-clip-text">
                  <AnimatedTextChar text="CAREERS" delay={0.5} />
                </span>
              </motion.h1>
              
              {/* Enhanced Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, type: "spring" }}
                className="text-3xl md:text-4xl lg:text-5xl text-slate-200 mb-8 leading-tight font-light max-w-4xl mx-auto"
              >
                <AnimatedTextChar 
                  text="Join us in shaping the future through innovation and cutting-edge technology" 
                  delay={1.0}
                />
              </motion.p>

              {/* Enhanced CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5, type: "spring" }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
              >
                <MagneticButton
                  onClick={() => document.getElementById('application').scrollIntoView({ behavior: 'smooth' })}
                  className="px-16 py-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-2xl text-xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.span
                      animate={{ 
                        x: [0, 5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🚀
                    </motion.span>
                    Start Your Journey
                    <motion.span
                      animate={{ 
                        x: [0, 5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      →
                    </motion.span>
                  </span>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-slate-400 text-sm font-light tracking-wide">DISCOVER OPPORTUNITIES</span>
              <div className="w-6 h-10 border-2 border-cyan-400/60 rounded-full flex justify-center shadow-lg shadow-cyan-400/20">
                <motion.div
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-3 bg-cyan-400 rounded-full mt-2 shadow-lg shadow-cyan-400/50"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-center mb-20"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
              >
                Why Choose <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Veramasa</span>?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-slate-300 max-w-2xl mx-auto"
              >
                Discover what makes Veramasa the perfect place to grow your career and make an impact
              </motion.p>
            </motion.div>

            {/* Enhanced Feature Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2, type: "spring" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.gradient} border border-white/10 backdrop-blur-xl overflow-hidden h-full`}>
                    
                    {/* Floating Animation */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                      className="relative z-10"
                    >
                      <div className="flex items-start gap-6 mb-6">
                        <motion.div
                          whileHover={{ 
                            scale: 1.2,
                            rotate: [0, -10, 10, 0]
                          }}
                          transition={{ duration: 0.5 }}
                          className="text-3xl flex-shrink-0"
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white flex-1">
                          {feature.title}
                        </h3>
                      </div>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-slate-200 leading-relaxed text-lg"
                      >
                        {feature.content}
                      </motion.p>
                    </motion.div>

                    {/* Enhanced Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                      whileHover={{ scale: 1.05 }}
                    />

                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-emerald-500/30 opacity-0 group-hover:opacity-100"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      style={{
                        backgroundSize: '200% 200%',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        padding: '2px',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Application Form Section */}
        <section id="application" className="py-24 px-6 relative">
          <FloatingParticles count={20} />
          
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-center mb-16"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
              >
                Ready to <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Launch</span> Your Career?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-slate-300 max-w-2xl mx-auto"
              >
                Join our team of innovators and help us build the future of technology
              </motion.p>
            </motion.div>

            {/* Enhanced Form Container */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
              className="relative"
            >
              <div className="relative p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                
                {/* Enhanced Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-emerald-500/30"
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 200%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    padding: '2px',
                  }}
                />
                <div className="absolute inset-2 rounded-2xl bg-[#0b1020]" />

                {/* Enhanced Success Overlay */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-emerald-500/10 backdrop-blur-xl rounded-3xl flex items-center justify-center z-20"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="text-center p-8"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ duration: 0.6 }}
                          className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto shadow-2xl"
                        >
                          ✨
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-4">Application Sent!</h3>
                        <p className="text-slate-200 text-lg">We'll review your application and get back to you soon.</p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-emerald-300 text-lg mt-4 font-semibold"
                        >
                          Welcome to the Veramasa family! 🎉
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatedFormField
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      delay={0.1}
                    />
                    <AnimatedFormField
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      delay={0.2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatedFormField
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      delay={0.3}
                    />
                    <AnimatedFormField
                      label="Position Applying For"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      delay={0.4}
                    />
                  </div>

                  <AnimatedFormField
                    label="Upload Resume"
                    type="file"
                    name="resume"
                    onChange={handleInputChange}
                    required
                    delay={0.5}
                  />

                  <AnimatedFormField
                    label="Tell us about yourself"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    textarea
                    delay={0.6}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="pt-8"
                  >
                    <MagneticButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 px-8 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-2xl text-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-4">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span className="text-lg">Launching Your Career...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-4">
                          <span className="text-lg">Launch My Career</span>
                          <motion.span
                            animate={{ 
                              x: [0, 6, 0],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-2xl"
                          >
                            🚀
                          </motion.span>
                        </div>
                      )}
                    </MagneticButton>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      
    </div>
  );
}