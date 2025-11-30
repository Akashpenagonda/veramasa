import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import AdvancedFooter from "../components/AdvancedFooter";

// Floating Contact Orbs Component
const FloatingContactOrbs = () => {
  const orbs = [
    { size: 120, color: "cyan", delay: 0, x: "10%", y: "20%" },
    { size: 80, color: "purple", delay: 2, x: "85%", y: "15%" },
    { size: 100, color: "emerald", delay: 4, x: "15%", y: "70%" },
    { size: 60, color: "amber", delay: 1, x: "90%", y: "80%" },
    { size: 90, color: "pink", delay: 3, x: "75%", y: "40%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-br ${
            orb.color === 'cyan' ? 'from-cyan-500/10 to-blue-500/10' :
            orb.color === 'purple' ? 'from-purple-500/10 to-pink-500/10' :
            orb.color === 'emerald' ? 'from-emerald-500/10 to-green-500/10' :
            orb.color === 'amber' ? 'from-amber-500/10 to-orange-500/10' :
            'from-pink-500/10 to-rose-500/10'
          }`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
};

// Interactive Contact Card Component
const InteractiveContactCard = ({ icon, title, value, href, isEmail = false, isPhone = false, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="block p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 group relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-3">
          <motion.div
            animate={isHovered ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white text-lg shadow-2xl"
          >
            {icon}
          </motion.div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
        </div>
        
        <motion.p
          animate={isHovered ? { x: 5 } : { x: 0 }}
          className="text-slate-300 text-base font-medium"
        >
          {value}
        </motion.p>
        
        {/* Interactive Indicator */}
        <motion.div
          className="absolute bottom-4 right-4 text-cyan-400"
          animate={isHovered ? { x: 3, opacity: 1 } : { x: 0, opacity: 0.7 }}
        >
          {isEmail ? "📧" : isPhone ? "📞" : "📍"}
        </motion.div>
      </div>
    </motion.a>
  );
};

// Animated Form Field Component
const AnimatedFormField = ({ label, type = "text", value, onChange, required = false, textarea = false, delay = 0 }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="space-y-2"
    >
      <label className="text-white font-semibold text-lg flex items-center gap-2">
        {label}
        {required && <span className="text-cyan-400">*</span>}
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
            rows="5"
            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none resize-none text-lg backdrop-blur-xl"
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
            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none text-lg backdrop-blur-xl"
            placeholder={`Enter your ${label.toLowerCase()}...`}
            required={required}
          />
        )}
        
        {/* Focus Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
          animate={isFocused ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, onClick, disabled = false, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.1;
    const y = (clientY - (top + height / 2)) * 0.1;
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      disabled={disabled}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`relative overflow-hidden group ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: ""
      });
    }, 5000);
  };

  const contactInfo = [
    {
      icon: "💬",
      title: "Talk to Us",
      value: "info@veramasa.com",
      href: "mailto:info@veramasa.com",
      isEmail: true,
      delay: 0.1
    },
    {
      icon: "📞",
      title: "Call Us",
      value: "+91-9059 36 8510",
      href: "tel:+919059368510",
      isPhone: true,
      delay: 0.2
    },
    {
      icon: "🏢",
      title: "Registered Office",
      value: "301, ART Lakshmi, Gayatri Nagar, Hyderabad, Telangana-500018, INDIA",
      href: "https://maps.google.com",
      delay: 0.3
    },
    {
      icon: "🏬",
      title: "Branch Office",
      value: "Ground Floor, Crystal IT Park, Indrapuri Colony, Indore, Madhya Pradesh-452001, INDIA",
      href: "https://maps.google.com",
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b1020] text-white overflow-hidden">
      <Navbar />
      
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 px-4 lg:px-6 overflow-hidden">
          <FloatingContactOrbs />
          
          {/* Background Effects */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          />

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl lg:text-7xl xl:text-8xl font-black mb-6 lg:mb-8 tracking-tight"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 text-transparent bg-clip-text">
                TALK TO US
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl lg:text-2xl xl:text-3xl text-slate-300 mb-8 lg:mb-12 leading-relaxed max-w-4xl mx-auto font-light"
            >
              Veramasa values innovators who push boundaries, as we believe they will shape an exceptional future.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg lg:text-xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto"
            >
              If you share your enthusiasm for potential breakthroughs, we encourage you to reach out to us.
            </motion.p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="text-center lg:text-left">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl lg:text-5xl font-bold mb-6 text-white"
                  >
                    Let's <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Connect</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-slate-300 mb-8 leading-relaxed"
                  >
                    Reach out to start your innovation journey with Veramasa. We're excited to hear about your ideas and discuss how we can bring them to life together.
                  </motion.p>
                </div>

                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <InteractiveContactCard
                      key={index}
                      icon={info.icon}
                      title={info.title}
                      value={info.value}
                      href={info.href}
                      isEmail={info.isEmail}
                      isPhone={info.isPhone}
                      delay={info.delay}
                    />
                  ))}
                </div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-xl"
                >
                  <h3 className="text-white font-semibold text-lg mb-3">🚀 Innovation Hours</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Available for strategic discussions: <strong>Mon - Fri, 9:00 AM - 6:00 PM IST</strong>
                  </p>
                  <p className="text-slate-400 text-xs mt-2">
                    Response time: Typically within 2-4 hours during business days
                  </p>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">
                  
                  {/* Animated Form Border */}
                  <motion.div
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20"
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  />
                  <div className="absolute inset-2 rounded-2xl bg-[#0b1020]" />

                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 bg-emerald-500/10 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20"
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
                            transition={{ duration: 0.5 }}
                            className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto"
                          >
                            ✨
                          </motion.div>
                          <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                          <p className="text-slate-300 text-lg">We'll get back to you within 24 hours.</p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatedFormField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        delay={0.1}
                      />
                      <AnimatedFormField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        delay={0.2}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatedFormField
                        label="Phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        delay={0.3}
                      />
                      <AnimatedFormField
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        delay={0.4}
                      />
                    </div>

                    <AnimatedFormField
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      delay={0.5}
                    />

                    <AnimatedFormField
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      textarea
                      delay={0.6}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="pt-4"
                    >
                      <MagneticButton
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 px-8 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-3">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Sending Your Message...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <span>Start the Conversation</span>
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              🚀
                            </motion.span>
                          </div>
                        )}
                        
                        {/* Button Hover Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </MagneticButton>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 px-4 lg:px-6 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-5xl font-bold mb-6 text-white"
            >
              Ready to <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Innovate Together</span>?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg lg:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Let's build the future together. Your next breakthrough is just a conversation away.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="mailto:info@veramasa.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-lg"
              >
                Email Us Directly
              </motion.a>
              <motion.a
                href="tel:+919059368510"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 text-lg"
              >
                Call Now
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      
    </div>
  );
}