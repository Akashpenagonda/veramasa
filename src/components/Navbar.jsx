import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [hoverServices, setHoverServices] = useState(false);
  const [hoverIndustries, setHoverIndustries] = useState(false);

  const servicesRef = useRef(null);
  const industriesRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  const services = [
    { name: "Automation Engineering", id: "automation-engineering" },
    { name: "Computer Vision", id: "computer-vision" },
    { name: "AI & ML", id: "ai-ml" },
    { name: "Cloud Hosting Services", id: "cloud-hosting" },
    { name: "Data Engineering", id: "data-engineering" },
    { name: "UI/UX Design", id: "ui-ux" },
    { name: "CRM & ERP", id: "crm-erp" },
    { name: "Testing Services", id: "testing-services" },
  ];

  const industries = [
    { name: "E-commerce", id: "e-commerce" },
    { name: "Financial Technology", id: "fin-tech" },
    { name: "Communications", id: "communications" },
    { name: "Health Tech & Life Sciences", id: "health-tech" },
    { name: "Agri-Tech", id: "agri-tech" },
    { name: "Media & Entertainment", id: "media-entertainment" },
    { name: "Educational Technology", id: "ed-tech" },
    { name: "Insurance", id: "insurance" },
    { name: "Automotive & Mobility", id: "automotive-mobility" },
    { name: "Energy", id: "energy" },
    { name: "Utilities", id: "utilities" },
  ];

  const handleLeave = (setter, ref) => {
    setTimeout(() => {
      if (!ref.current.matches(":hover")) setter(false);
    }, 150);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle service click - navigate to services page with specific service
  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
    setMobileOpen(false);
    setHoverServices(false);
  };

  // Handle main services link click
  const handleServicesMainClick = () => {
    navigate('/services');
    setMobileOpen(false);
  };

  // Handle industry click - navigate to industries page with specific industry
  const handleIndustryClick = (industryId) => {
    navigate(`/industries/${industryId}`);
    setMobileOpen(false);
    setHoverIndustries(false);
  };

  // Handle main industries link click
  const handleIndustriesMainClick = () => {
    navigate('/industries');
    setMobileOpen(false);
  };

  // Handle contact click
  const handleContactClick = () => {
    navigate('/contact');
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`
          w-full fixed top-0 left-0 z-50 transition-all duration-300
          ${scrolled ? "bg-[#0b1020]/95 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <motion.div 
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            onClick={() => navigate('/')}
          >
            <span className="text-xl font-bold tracking-wide text-white">Veramasa</span>
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-white">

            {/* About Us Link */}
            <motion.li whileHover={{ y: -2 }}>
              <button 
                onClick={() => navigate('/about')}
                className="hover:text-cyan-300 transition-colors duration-300 py-2"
              >
                About Us
              </button>
            </motion.li>

            {/* SERVICES */}
            <motion.li 
              className="relative"
              ref={servicesRef}
              onMouseEnter={() => setHoverServices(true)}
              onMouseLeave={() => handleLeave(setHoverServices, servicesRef)}
              whileHover={{ y: -2 }}
            >
              <button 
                onClick={handleServicesMainClick}
                className="hover:text-cyan-300 flex items-center gap-1 py-2 transition-colors duration-300"
              >
                Services 
                <motion.span
                  animate={{ rotate: hoverServices ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence>
                {hoverServices && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="
                      absolute left-0 mt-2 w-64 rounded-xl
                      bg-[#0b1020]/95 backdrop-blur-xl
                      border border-white/20 shadow-2xl p-3 z-50
                    "
                  >
                    {services.map((service, i) => (
                      <motion.button 
                        key={service.id}
                        onClick={() => handleServiceClick(service.id)}
                        className="block w-full text-left px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {service.name}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            {/* INDUSTRIES */}
            <motion.li 
              className="relative"
              ref={industriesRef}
              onMouseEnter={() => setHoverIndustries(true)}
              onMouseLeave={() => handleLeave(setHoverIndustries, industriesRef)}
              whileHover={{ y: -2 }}
            >
              <button 
                onClick={handleIndustriesMainClick}
                className="hover:text-cyan-300 flex items-center gap-1 py-2 transition-colors duration-300"
              >
                Industries 
                <motion.span
                  animate={{ rotate: hoverIndustries ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence>
                {hoverIndustries && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="
                      absolute left-0 mt-2 w-72 rounded-xl
                      bg-[#0b1020]/95 backdrop-blur-xl
                      border border-white/20 shadow-2xl p-3 z-50
                    "
                  >
                    {industries.map((industry, i) => (
                      <motion.button 
                        key={industry.id}
                        onClick={() => handleIndustryClick(industry.id)}
                        className="block w-full text-left px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {industry.name}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            {/* Careers Link */}
            <motion.li whileHover={{ y: -2 }}>
              <button 
                onClick={() => navigate('/careers')}
                className="hover:text-cyan-300 transition-colors duration-300 py-2"
              >
                Careers
              </button>
            </motion.li>

            {/* Contact Us Button */}
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={handleContactClick}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Contact Us
              </button>
            </motion.li>
          </ul>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={mobileOpen ? "open" : "closed"}
              className="absolute w-6 h-0.5 bg-white rounded-full"
              variants={{
                closed: { rotate: 0, y: -4 },
                open: { rotate: 45, y: 0 }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={mobileOpen ? "open" : "closed"}
              className="absolute w-6 h-0.5 bg-white rounded-full"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={mobileOpen ? "open" : "closed"}
              className="absolute w-6 h-0.5 bg-white rounded-full"
              variants={{
                closed: { rotate: 0, y: 4 },
                open: { rotate: -45, y: 0 }
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Side Menu - From LEFT */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Side Menu - From LEFT */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 300 
              }}
              className="
                fixed top-0 left-0 h-full w-80 max-w-[85vw]
                bg-[#0b1020] border-r border-white/10
                z-50 md:hidden overflow-y-auto
                shadow-2xl
              "
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => {
                      navigate('/');
                      setMobileOpen(false);
                    }}
                    className="text-xl font-bold text-white"
                  >
                    Veramasa
                  </button>
                  <motion.button
                    onClick={() => setMobileOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-white text-lg">✕</span>
                  </motion.button>
                </div>
              </div>

              {/* Menu Content */}
              <div className="p-6 space-y-6">
                {/* About Us */}
                <motion.button
                  onClick={() => {
                    navigate('/about');
                    setMobileOpen(false);
                  }}
                  className="block w-full text-left py-3 px-4 rounded-xl text-white text-lg font-medium hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  About Us
                </motion.button>

                {/* Services Accordion */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <motion.button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full flex justify-between items-center py-3 px-4 rounded-xl text-white text-lg font-medium hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10"
                    whileHover={{ x: 5 }}
                  >
                    <span>Services</span>
                    <motion.span
                      animate={{ rotate: servicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▾
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 space-y-2 border-l-2 border-cyan-500/30 pl-4">
                          {/* Main Services Link */}
                          <motion.button
                            onClick={handleServicesMainClick}
                            className="block w-full text-left py-2.5 px-4 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-white/5 transition-all duration-300 text-base font-semibold"
                            whileHover={{ x: 3 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            All Services
                          </motion.button>
                          
                          {services.map((service, index) => (
                            <motion.button
                              key={service.id}
                              onClick={() => handleServiceClick(service.id)}
                              className="block w-full text-left py-2.5 px-4 rounded-lg text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 text-base"
                              whileHover={{ x: 3 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              {service.name}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Industries Accordion */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={() => setIndustriesOpen(!industriesOpen)}
                    className="w-full flex justify-between items-center py-3 px-4 rounded-xl text-white text-lg font-medium hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10"
                    whileHover={{ x: 5 }}
                  >
                    <span>Industries</span>
                    <motion.span
                      animate={{ rotate: industriesOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▾
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {industriesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 space-y-2 border-l-2 border-purple-500/30 pl-4">
                          {/* Main Industries Link */}
                          <motion.button
                            onClick={handleIndustriesMainClick}
                            className="block w-full text-left py-2.5 px-4 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-all duration-300 text-base font-semibold"
                            whileHover={{ x: 3 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            All Industries
                          </motion.button>
                          
                          {industries.map((industry, index) => (
                            <motion.button
                              key={industry.id}
                              onClick={() => handleIndustryClick(industry.id)}
                              className="block w-full text-left py-2.5 px-4 rounded-lg text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 text-base"
                              whileHover={{ x: 3 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              {industry.name}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Careers */}
                <motion.button
                  onClick={() => {
                    navigate('/careers');
                    setMobileOpen(false);
                  }}
                  className="block w-full text-left py-3 px-4 rounded-xl text-white text-lg font-medium hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  Careers
                </motion.button>

                {/* Contact Us Button */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={handleContactClick}
                    className="block w-full text-center py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Us
                  </motion.button>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  className="pt-6 border-t border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <div className="space-y-3 text-sm text-white/70">
                    <p className="flex items-center gap-2">
                      <span>📧</span>
                      <span>info@veramasa.com</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>📞</span>
                      <span>+91-9059 36 8510</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>📍</span>
                      <span>Hyderabad, INDIA</span>
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 pt-4">
                    {["💼", "🐦", "💻", "🎨"].map((icon, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}