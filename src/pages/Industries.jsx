import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdvancedFooter from "../components/AdvancedFooter";

// Industries Data with detailed information
const INDUSTRIES_DATA = [
  {
    id: "e-commerce",
    title: "E-commerce",
    icon: "🛒",
    gradient: "from-cyan-500 to-blue-500",
    shortDesc: "Revolutionizing online shopping experiences",
    description: "E-commerce refers to the buying and selling of goods and services over the internet. This industry has seen exponential growth in recent years, driven by increasing internet penetration, smartphone usage, and changing consumer preferences. Our team of experienced engineers combines cutting-edge technologies with proven methodologies to deliver tailored automation solutions that drive operational excellence and cost reduction.",
    features: [
      "Custom e-commerce platform development",
      "Shopping cart and payment gateway integration",
      "Order management and inventory tracking systems",
      "Mobile commerce (m-commerce) solutions",
      "AI-powered product recommendation engines",
      "Analytics and reporting tools for e-commerce insights"
    ],
    benefits: [
      "Increased conversion rates and customer engagement",
      "Streamlined inventory and order management",
      "Enhanced customer experience across all devices",
      "Data-driven business intelligence insights",
      "Scalable infrastructure for business growth"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS", "Redis"],
    caseStudy: "Increased online sales by 200% for retail client with custom e-commerce platform and AI recommendations",
    stats: [
      { value: "200%", label: "Sales Growth" },
      { value: "40%", label: "Conversion Boost" },
      { value: "99.9%", label: "Uptime" }
    ]
  },
  {
    id: "fin-tech",
    title: "Financial Technology",
    icon: "💳",
    gradient: "from-purple-500 to-pink-500",
    shortDesc: "Innovative financial solutions for the digital age",
    description: "Financial Technology, or FinTech, is revolutionizing the way financial services are delivered and consumed. This industry leverages technology to improve and automate financial processes, making them more accessible, efficient, and cost-effective. Our team of financial experts and technology innovators work together to develop cutting-edge FinTech solutions.",
    features: [
      "Digital banking platforms",
      "Blockchain-based financial systems",
      "Robo-advisory and wealth management tools",
      "Peer-to-peer lending platforms",
      "Fraud detection and prevention systems",
      "Regulatory technology (RegTech) solutions"
    ],
    benefits: [
      "Enhanced security and compliance measures",
      "Automated financial operations and reporting",
      "Improved customer financial experiences",
      "Real-time fraud detection and prevention",
      "Scalable financial infrastructure"
    ],
    technologies: ["Python", "Blockchain", "SQL", "Azure", "Docker", "Kubernetes"],
    caseStudy: "Reduced transaction processing time by 80% for banking client with blockchain implementation",
    stats: [
      { value: "80%", label: "Faster Processing" },
      { value: "99.99%", label: "Security" },
      { value: "50%", label: "Cost Reduction" }
    ]
  },
  {
    id: "communications",
    title: "Communications",
    icon: "📡",
    gradient: "from-indigo-500 to-blue-500",
    shortDesc: "Connecting the world through advanced communication",
    description: "The communications industry is vital for connecting people and businesses across the globe. It encompasses telecommunications, internet service providers, satellite communications, and emerging technologies like 5G. We specialize in developing advanced communication technologies and infrastructure that enable seamless connectivity.",
    features: [
      "5G network implementation and optimization",
      "Voice over IP (VoIP) systems",
      "Unified communications platforms",
      "Network security solutions",
      "IoT connectivity solutions",
      "Cloud-based communication services"
    ],
    benefits: [
      "Enhanced connectivity and network reliability",
      "Scalable communication infrastructure",
      "Improved security and data protection",
      "Cost-effective communication solutions",
      "Future-proof technology implementations"
    ],
    technologies: ["5G", "VoIP", "WebRTC", "Kubernetes", "Python", "React"],
    caseStudy: "Deployed 5G network reducing latency by 90% for telecommunications provider",
    stats: [
      { value: "90%", label: "Latency Reduction" },
      { value: "5x", label: "Speed Increase" },
      { value: "99.95%", label: "Network Uptime" }
    ]
  },
  {
    id: "health-tech",
    title: "Health Tech & Life Sciences",
    icon: "🧬",
    gradient: "from-emerald-500 to-green-500",
    shortDesc: "Transforming healthcare through technology innovation",
    description: "Health Tech and Life Sciences combine healthcare, biotechnology, and information technology to improve patient care, drug discovery, and medical research. This rapidly evolving field includes areas such as telemedicine, electronic health records, personalized medicine, and AI-assisted diagnostics.",
    features: [
      "Telemedicine platforms",
      "Electronic Health Record (EHR) systems",
      "AI-powered diagnostic tools",
      "Wearable health monitoring devices",
      "Bioinformatics software for genomic research",
      "Clinical trial management systems"
    ],
    benefits: [
      "Improved patient outcomes and care quality",
      "Enhanced medical research capabilities",
      "Streamlined healthcare operations",
      "Personalized treatment approaches",
      "Accelerated drug discovery processes"
    ],
    technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB", "AWS"],
    caseStudy: "Reduced diagnosis time by 70% with AI-powered medical imaging analysis",
    stats: [
      { value: "70%", label: "Faster Diagnosis" },
      { value: "95%", label: "Accuracy Rate" },
      { value: "50%", label: "Cost Savings" }
    ]
  },
  {
    id: "agri-tech",
    title: "Agri-Tech",
    icon: "🌾",
    gradient: "from-lime-500 to-green-500",
    shortDesc: "Smart farming solutions for sustainable agriculture",
    description: "Agri-Tech, or Agricultural Technology, applies modern technologies to farming and agriculture to increase efficiency, productivity, and sustainability. This industry is crucial for addressing global food security challenges and promoting environmentally friendly farming practices.",
    features: [
      "Precision agriculture systems",
      "Crop monitoring and yield prediction tools",
      "Smart irrigation systems",
      "Livestock management software",
      "Drone-based crop analysis",
      "Blockchain for food traceability"
    ],
    benefits: [
      "Increased crop yields and quality",
      "Reduced water and resource consumption",
      "Enhanced food safety and traceability",
      "Optimized farming operations",
      "Sustainable agricultural practices"
    ],
    technologies: ["IoT", "Python", "React", "Node.js", "Blockchain", "AWS"],
    caseStudy: "Increased crop yield by 35% while reducing water usage by 50% with smart farming solutions",
    stats: [
      { value: "35%", label: "Yield Increase" },
      { value: "50%", label: "Water Savings" },
      { value: "99%", label: "Traceability" }
    ]
  },
  {
    id: "media-entertainment",
    title: "Media & Entertainment",
    icon: "🎥",
    gradient: "from-fuchsia-500 to-pink-500",
    shortDesc: "Next-generation entertainment experiences",
    description: "The Media & Entertainment industry encompasses a wide range of sectors, including film, television, music, publishing, and digital media. With the rise of streaming services and digital platforms, this industry is undergoing rapid transformation, creating new opportunities and challenges.",
    features: [
      "Content management systems",
      "Streaming platform development",
      "AR & VR experiences",
      "AI-powered content recommendation engines",
      "Digital rights management solutions",
      "Analytics tools for audience engagement"
    ],
    benefits: [
      "Enhanced viewer engagement and retention",
      "Personalized content experiences",
      "Efficient content management and distribution",
      "Advanced audience analytics",
      "Multi-platform content delivery"
    ],
    technologies: ["React", "Node.js", "AWS", "Python", "Unity", "WebGL"],
    caseStudy: "Increased user engagement by 150% with AI-powered content recommendations",
    stats: [
      { value: "150%", label: "Engagement Boost" },
      { value: "3x", label: "Content Reach" },
      { value: "40%", label: "Retention Increase" }
    ]
  },
  {
    id: "ed-tech",
    title: "Educational Technology",
    icon: "🎓",
    gradient: "from-orange-500 to-red-500",
    shortDesc: "Revolutionizing learning through technology",
    description: "Educational Technology, or Ed-Tech, leverages technology to enhance learning experiences and improve educational outcomes. This industry covers a wide range of applications, from online learning platforms and virtual classrooms to adaptive learning systems and educational games.",
    features: [
      "Learning Management Systems (LMS)",
      "Virtual classroom platforms",
      "Gamified learning applications",
      "AI-powered tutoring systems",
      "Adaptive assessment tools",
      "Augmented reality educational experiences"
    ],
    benefits: [
      "Personalized learning experiences",
      "Increased student engagement",
      "Accessible education for all",
      "Enhanced teacher productivity",
      "Data-driven educational insights"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Python", "AWS", "WebRTC"],
    caseStudy: "Improved student test scores by 45% with adaptive learning platform",
    stats: [
      { value: "45%", label: "Score Improvement" },
      { value: "80%", label: "Engagement Rate" },
      { value: "3x", label: "Learning Speed" }
    ]
  },
  {
    id: "insurance",
    title: "Insurance",
    icon: "🛡️",
    gradient: "from-slate-500 to-gray-500",
    shortDesc: "Digital transformation for insurance services",
    description: "The insurance industry provides financial protection against various risks, including health, property, life, and liability. With the advent of InsurTech, this traditional sector is experiencing significant digital transformation, leading to more personalized and efficient insurance services.",
    features: [
      "Policy management systems",
      "Claims processing automation",
      "AI-powered risk assessment tools",
      "Usage-based insurance platforms",
      "Chatbots for customer service",
      "Fraud detection and prevention systems"
    ],
    benefits: [
      "Streamlined claims processing",
      "Enhanced risk assessment accuracy",
      "Improved customer satisfaction",
      "Reduced operational costs",
      "Advanced fraud prevention"
    ],
    technologies: ["Python", "React", "Node.js", "AWS", "Machine Learning", "SQL"],
    caseStudy: "Reduced claims processing time from 15 days to 2 hours with automation",
    stats: [
      { value: "98%", label: "Faster Processing" },
      { value: "40%", label: "Cost Reduction" },
      { value: "99.9%", label: "Fraud Detection" }
    ]
  },
  {
    id: "automotive-mobility",
    title: "Automotive & Mobility",
    icon: "🚗",
    gradient: "from-amber-500 to-orange-500",
    shortDesc: "Driving the future of transportation",
    description: "The Automotive & Mobility industry is undergoing a significant transformation with the advent of electric vehicles, autonomous driving technologies, and new mobility services. This sector encompasses traditional automakers, emerging EV companies, and mobility service providers.",
    features: [
      "Pedestrian Safety & Obstacle Detection Applications",
      "Advanced Driver Assistance Systems (ADAS)",
      "Electric vehicle battery management systems",
      "Connected Vehicle platforms",
      "Mobility-as-a-Service (MaaS) platforms",
      "Predictive maintenance systems"
    ],
    benefits: [
      "Enhanced vehicle safety features",
      "Improved energy efficiency",
      "Advanced connectivity solutions",
      "Predictive maintenance capabilities",
      "Seamless mobility experiences"
    ],
    technologies: ["C++", "Python", "ROS", "TensorFlow", "IoT", "Cloud"],
    caseStudy: "Reduced accidents by 60% with advanced driver assistance systems",
    stats: [
      { value: "60%", label: "Accident Reduction" },
      { value: "30%", label: "Energy Savings" },
      { value: "99%", label: "System Reliability" }
    ]
  },
  {
    id: "energy",
    title: "Energy",
    icon: "⚡",
    gradient: "from-yellow-500 to-amber-500",
    shortDesc: "Powering the future with smart energy solutions",
    description: "The energy industry is crucial for powering our modern world and is undergoing significant changes with the shift towards renewable energy sources and smart grid technologies. This sector includes oil and gas, renewable energy, power generation, and energy distribution.",
    features: [
      "Smart grid management systems",
      "Renewable energy forecasting tools",
      "Energy trading platforms",
      "IoT-based energy monitoring systems",
      "Microgrid control systems",
      "Carbon footprint tracking and reporting tools"
    ],
    benefits: [
      "Enhanced energy efficiency",
      "Optimized energy distribution",
      "Reduced carbon footprint",
      "Improved grid reliability",
      "Cost-effective energy management"
    ],
    technologies: ["Python", "IoT", "Cloud", "ML", "React", "Node.js"],
    caseStudy: "Increased renewable energy utilization by 45% with smart grid optimization",
    stats: [
      { value: "45%", label: "Renewable Utilization" },
      { value: "25%", label: "Cost Savings" },
      { value: "99.9%", label: "Grid Reliability" }
    ]
  },
  {
    id: "utilities",
    title: "Utilities",
    icon: "🏭",
    gradient: "from-sky-500 to-cyan-500",
    shortDesc: "Modernizing essential utility services",
    description: "The utilities industry provides essential services such as electricity, water, and natural gas to residential, commercial, and industrial customers. This sector is facing challenges related to aging infrastructure, increasing demand, and the need for more sustainable practices.",
    features: [
      "Advanced Metering Infrastructure (AMI) systems",
      "Outage management and restoration systems",
      "Customer engagement platforms",
      "Predictive maintenance for utility assets",
      "Demand response management systems",
      "Water leak detection and management solutions"
    ],
    benefits: [
      "Improved service reliability",
      "Enhanced customer satisfaction",
      "Reduced operational costs",
      "Proactive maintenance capabilities",
      "Sustainable resource management"
    ],
    technologies: ["IoT", "Python", "React", "AWS", "ML", "SQL"],
    caseStudy: "Reduced water leakage by 70% with smart detection systems",
    stats: [
      { value: "70%", label: "Leakage Reduction" },
      { value: "50%", label: "Faster Response" },
      { value: "99.5%", label: "Service Uptime" }
    ]
  }
];

// Floating Particles Component
const FloatingParticles = ({ count = 15 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
          className={`${
            i % 4 === 0 ? "bg-cyan-400/20" :
            i % 4 === 1 ? "bg-purple-400/20" :
            i % 4 === 2 ? "bg-emerald-400/20" :
            "bg-amber-400/20"
          }`}
        />
      ))}
    </div>
  );
};

// Mobile Industry Selector Component
const MobileIndustrySelector = ({ industries, activeIndustry, onIndustryClick, isOpen, onToggle }) => {
  return (
    <div className="lg:hidden">
      {/* Mobile Dropdown Trigger */}
      <motion.button
        onClick={onToggle}
        className="w-full p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-between text-white mb-4"
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activeIndustry.gradient} flex items-center justify-center`}>
            {activeIndustry.icon}
          </div>
          <span className="font-semibold">{activeIndustry.title}</span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▾
        </motion.span>
      </motion.button>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {industries.map((industry) => (
                <motion.button
                  key={industry.id}
                  onClick={() => {
                    onIndustryClick(industry.id);
                    onToggle();
                  }}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                    activeIndustry.id === industry.id
                      ? `bg-gradient-to-r ${industry.gradient} bg-opacity-20 border border-cyan-400/50`
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${industry.gradient} flex items-center justify-center text-sm`}>
                      {industry.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{industry.title}</div>
                      <div className="text-slate-400 text-xs mt-1 line-clamp-1">{industry.shortDesc}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Industry Sidebar Component with Custom Scrollbar
const IndustrySidebar = ({ industries, activeIndustry, onIndustryClick, searchTerm, onSearchChange }) => {
  const filteredIndustries = industries.filter(industry =>
    industry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industry.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <div className="p-6 border-b border-white/10">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">
            Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Industries</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            {INDUSTRIES_DATA.length} specialized industries
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6 border-b border-white/10">
        <div className="relative">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Search industries..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none text-sm"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </div>
      </div>

      {/* Industries List with Custom Scrollbar */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-3">
            {filteredIndustries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-slate-400"
              >
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-sm font-medium">No industries found</p>
                <p className="text-xs text-slate-500 mt-1">Try different keywords</p>
              </motion.div>
            ) : (
              filteredIndustries.map((industry, index) => (
                <motion.button
                  key={industry.id}
                  onClick={() => onIndustryClick(industry.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 border relative group ${
                    activeIndustry?.id === industry.id
                      ? `bg-gradient-to-r ${industry.gradient} bg-opacity-20 border-cyan-400/50 text-white shadow-lg`
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center text-lg flex-shrink-0 shadow-lg`}>
                      {industry.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-base leading-tight truncate">
                        {industry.title}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                        {industry.shortDesc}
                      </p>
                    </div>
                    {activeIndustry?.id === industry.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"
                      />
                    )}
                  </div>
                  
                  {/* Active Industry Indicator */}
                  <motion.div
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-10 rounded-r-lg bg-gradient-to-b ${industry.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      activeIndustry?.id === industry.id ? 'opacity-100' : ''
                    }`}
                  />
                </motion.button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="text-center">
            <div className="text-cyan-400 font-bold text-sm">11+</div>
            <div className="text-slate-400 text-xs">Industries</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-bold text-sm">100+</div>
            <div className="text-slate-400 text-xs">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-emerald-400 font-bold text-sm">98%</div>
            <div className="text-slate-400 text-xs">Success</div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 116, 139, 0.3) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          margin: 4px 0;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.4);
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.6);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: rgba(100, 116, 139, 0.8);
        }
      `}</style>
    </div>
  );
};

// Industry Content Component
const IndustryContent = ({ industry }) => {
  if (!industry) return null;

  return (
    <motion.div
      key={industry.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full overflow-y-auto"
    >
      <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex items-start gap-4 lg:gap-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className={`w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center text-xl lg:text-2xl shadow-2xl flex-shrink-0`}
          >
            {industry.icon}
          </motion.div>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 leading-tight">
              {industry.title}
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed">
              {industry.shortDesc}
            </p>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-2 lg:gap-4"
        >
          {industry.stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="text-center p-3 lg:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs lg:text-sm mt-1 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">Industry Overview</h2>
          <p className="text-slate-300 leading-relaxed text-base lg:text-lg">
            {industry.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">Our Solutions</h2>
            <div className="space-y-2 lg:space-y-3">
              {industry.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/5"
                >
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${industry.gradient} flex-shrink-0`} />
                  <span className="text-slate-300 text-sm lg:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">Business Benefits</h2>
            <div className="space-y-2 lg:space-y-3">
              {industry.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/5"
                >
                  <div className={`w-5 h-5 lg:w-6 lg:h-6 rounded-lg bg-gradient-to-br ${industry.gradient} flex items-center justify-center text-white text-xs lg:text-sm flex-shrink-0`}>
                    ✓
                  </div>
                  <span className="text-slate-300 text-sm lg:text-base">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technologies & Case Study */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 lg:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm"
          >
            <h2 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Technologies We Use</h2>
            <div className="flex flex-wrap gap-1.5 lg:gap-2">
              {industry.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-2.5 py-1.5 lg:px-3 lg:py-1.5 rounded-lg bg-white/5 text-slate-300 text-xs lg:text-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Case Study */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 lg:p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm"
          >
            <h2 className="text-lg lg:text-xl font-semibold text-white mb-2 lg:mb-3">Success Story</h2>
            <p className="text-slate-300 leading-relaxed text-sm lg:text-base">
              {industry.caseStudy}
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center pt-4 lg:pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full lg:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-base lg:text-lg"
          >
            Transform Your {industry.title} Business
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Industries() {
  const { industryId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndustry, setActiveIndustry] = useState(INDUSTRIES_DATA[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contentRef = useRef(null);

  // Handle direct industry links from URL
  useEffect(() => {
    if (industryId) {
      const industry = INDUSTRIES_DATA.find(s => s.id === industryId);
      if (industry) {
        setActiveIndustry(industry);
      }
    } else {
      setActiveIndustry(INDUSTRIES_DATA[0]);
    }
  }, [industryId]);

  // Handle industry click with smooth behavior
  const handleIndustryClick = (industryId) => {
    const industry = INDUSTRIES_DATA.find(s => s.id === industryId);
    if (industry) {
      setActiveIndustry(industry);
      navigate(`/industries/${industryId}`, { replace: true });
      
      // Scroll to top on mobile when changing industry
      if (window.innerWidth < 1024) {
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-white">
      <Navbar />
      
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-12 lg:py-20 px-4 lg:px-6 overflow-hidden">
          <FloatingParticles count={15} />
          
          {/* Background Orbs */}
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
            className="absolute top-10 left-4 lg:top-20 lg:left-10 w-40 h-40 lg:w-80 lg:h-80 bg-cyan-500/5 rounded-full blur-2xl lg:blur-3xl"
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
            className="absolute bottom-10 right-4 lg:bottom-20 lg:right-10 w-48 h-48 lg:w-96 lg:h-96 bg-purple-500/5 rounded-full blur-2xl lg:blur-3xl"
          />

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-6xl xl:text-8xl font-black mb-6 lg:mb-8 tracking-tight"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 text-transparent bg-clip-text">
                INDUSTRIES
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-2xl xl:text-3xl text-slate-300 mb-8 lg:mb-12 leading-relaxed max-w-3xl lg:max-w-4xl mx-auto font-light px-4"
            >
              Transforming industries with cutting-edge technology solutions and digital innovation
            </motion.p>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-6 lg:py-10 px-4 lg:px-6">
          <div className="max-w-8xl mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 min-h-[600px] lg:min-h-[700px] xl:min-h-[800px]">
              {/* Mobile Industry Selector */}
              <div className="lg:hidden">
                <MobileIndustrySelector
                  industries={INDUSTRIES_DATA}
                  activeIndustry={activeIndustry}
                  onIndustryClick={handleIndustryClick}
                  isOpen={mobileMenuOpen}
                  onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
              </div>

              {/* Enhanced Left Sidebar - Industries Navigation (Desktop) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:block lg:col-span-1 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl"
              >
                <IndustrySidebar
                  industries={INDUSTRIES_DATA}
                  activeIndustry={activeIndustry}
                  onIndustryClick={handleIndustryClick}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              </motion.div>

              {/* Right Content Area */}
              <motion.div
                ref={contentRef}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-3 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl"
              >
                <IndustryContent industry={activeIndustry} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-32 px-4 lg:px-6 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-white"
            >
              Ready to <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Transform</span> Your Industry?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base lg:text-xl text-slate-300 mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Let's discuss how our industry-specific solutions can drive your digital transformation journey
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-base lg:text-lg"
              >
                Start Your Project
              </motion.a>
              <motion.a
                href="/careers"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 lg:px-8 py-3 lg:py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 text-base lg:text-lg"
              >
                Join Our Team
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

     
    </div>
  );
}