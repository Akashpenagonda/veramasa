import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "../components/Navbar";
import AdvancedFooter from "../components/AdvancedFooter";

// Optimized Particle System
const FloatingParticles = ({ count = 8 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 1.5 + 0.5}px`,
            height: `${Math.random() * 1.5 + 0.5}px`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
          className={`${
            i % 3 === 0 ? "bg-cyan-400/60" :
            i % 3 === 1 ? "bg-purple-400/60" :
            "bg-emerald-400/60"
          }`}
        />
      ))}
    </div>
  );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, onClick, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.03;
    const y = (clientY - (top + height / 2)) * 0.03;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
};

// Animated Section Title
const AnimatedSectionTitle = ({ title, gradient = "from-cyan-400 to-purple-400", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="relative inline-block"
  >
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
      {title.split(' ').map((word, i) => (
        <span
          key={i}
          className={`bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}
        >
          {word}{' '}
        </span>
      ))}
    </h2>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.8, delay: delay + 0.2 }}
      className="h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
    />
  </motion.div>
);

// Floating Icon Card
const FloatingIconCard = ({ icon, title, content, gradient, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="group relative"
  >
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
      {/* Floating Icon */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl mb-4`}
      >
        {icon}
      </motion.div>
      
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-300 leading-relaxed">{content}</p>
      
      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  </motion.div>
);

// Animated Form Field
const AnimatedFormField = ({ label, type = "text", name, value, onChange, required = false, textarea = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-2"
    >
      <label className="text-white font-medium text-sm">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      
      <div className="relative">
        {textarea ? (
          <textarea
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows="4"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none resize-none backdrop-blur-sm"
            placeholder={`Enter your ${label.toLowerCase()}...`}
            required={required}
          />
        ) : type === "file" ? (
          <div className="relative">
            <input
              type="file"
              name={name}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none opacity-0 absolute z-10 cursor-pointer"
              required={required}
              accept=".pdf,.docx"
            />
            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 flex items-center justify-between">
              <span>{value ? value.name : "Choose file (.pdf or .docx)"}</span>
              <span className="text-cyan-400">📁</span>
            </div>
          </div>
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none backdrop-blur-sm"
            placeholder={`Enter your ${label.toLowerCase()}...`}
            required={required}
          />
        )}
        
        {/* Focus Indicator */}
        {isFocused && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
          />
        )}
      </div>
    </motion.div>
  );
};

// Main Careers Component
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

  const { scrollYProgress } = useScroll({
    container: containerRef
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -20]);

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
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-white">
      <ScrollProgress />
      <Navbar />
      
      <main ref={containerRef} className="relative">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
          </div>
          
          <FloatingParticles count={6} />
          
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Main Title with Animated Gradient */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 text-transparent bg-clip-text">
                  JOIN US
                </span>
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto font-light"
              >
                At Veramasa, we believe in the power of innovation and technology to transform industries and create lasting impact.
              </motion.p>
              
              {/* Company Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-slate-400 mb-12 leading-relaxed max-w-4xl mx-auto"
              >
                As a leading IT company specializing in Data Science, AI, ML, Web Development, and Application Development, 
                we are always on the lookout for talented individuals who share our passion for excellence and innovation.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <MagneticButton
                  onClick={() => document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-2xl text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Apply Now
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-slate-400 text-xs font-light tracking-wide">EXPLORE MORE</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 border border-cyan-400/30 rounded-full flex justify-center"
              >
                <div className="w-1 h-2 bg-cyan-400 rounded-full mt-2" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Why Veramasa Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-[#0b1020] to-[#090d1a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <AnimatedSectionTitle title="Why Choose Veramasa?" gradient="from-cyan-400 to-purple-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Innovative Environment */}
              <FloatingIconCard
                icon="🚀"
                title="Innovative Environment"
                content="At Veramasa, you will be part of a dynamic and innovative environment where cutting-edge technologies are at the forefront of everything we do. Our projects span across various sectors, including MedTech, AgriTech, and Media & Entertainment, providing diverse opportunities to work on groundbreaking solutions."
                gradient="from-cyan-500 to-blue-500"
                index={0}
              />

              {/* Career Growth */}
              <FloatingIconCard
                icon="📈"
                title="Career Growth and Development"
                content="We are committed to the professional growth and development of our employees. Through continuous learning opportunities, mentorship programs, and career advancement pathways, we empower our team members to reach their full potential and achieve their career goals."
                gradient="from-purple-500 to-pink-500"
                index={0.1}
              />

              {/* Collaborative Culture */}
              <FloatingIconCard
                icon="👥"
                title="Collaborative Culture"
                content="Our collaborative culture fosters teamwork, creativity, and knowledge sharing. At Veramasa, you will work alongside some of the brightest minds in the industry, exchanging ideas and developing innovative solutions together. We believe that our collective success is driven by the diverse perspectives and expertise of our team."
                gradient="from-emerald-500 to-green-500"
                index={0.2}
              />

              {/* Employee Benefits */}
              <FloatingIconCard
                icon="⭐"
                title="Employee Benefits"
                content="We offer a comprehensive benefits package designed to support the well-being and work-life balance of our employees. Our benefits include competitive salaries, health insurance, flexible working hours, remote work options, and more."
                gradient="from-amber-500 to-orange-500"
                index={0.3}
              />
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="application-form" className="py-20 px-6 bg-gradient-to-b from-[#090d1a] to-[#0b1020]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <AnimatedSectionTitle title="Mail Your Resume" gradient="from-cyan-400 to-emerald-400" delay={0.1} />
            </div>

            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20"
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
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    padding: '2px',
                  }}
                />

                {/* Success Overlay */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-emerald-500/10 backdrop-blur-md rounded-3xl flex items-center justify-center z-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="text-center p-8"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ duration: 0.5 }}
                          className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto"
                        >
                          ✨
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-4">Application Sent!</h3>
                        <p className="text-slate-200">We'll review your application and contact you soon.</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatedFormField
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                    <AnimatedFormField
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatedFormField
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <AnimatedFormField
                      label="Position Applying For"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <AnimatedFormField
                    label="Upload Resume"
                    type="file"
                    name="resume"
                    onChange={handleInputChange}
                    required
                  />

                  <AnimatedFormField
                    label="Additional Comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    textarea
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-6"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-3">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <span>Submit Application</span>
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            🚀
                          </motion.span>
                        </div>
                      )}
                    </button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            >
              Ready to <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Transform</span> Your Career?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Join Veramasa and be part of an innovative team shaping the future of technology
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MagneticButton
                onClick={() => document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-lg"
              >
                Start Your Journey Today
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </main>

   
    </div>
  );
}