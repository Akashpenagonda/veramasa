import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdvancedFooter from "../components/AdvancedFooter";

// Services Data with detailed information
const SERVICES_DATA = [
  {
    id: "automation-engineering",
    title: "Automation Engineering",
    icon: "🤖",
    gradient: "from-cyan-500 to-blue-500",
    shortDesc: "Intelligent automation solutions for enhanced productivity",
    description: "Our Automation Engineering services focus on designing, implementing, and optimizing automated systems to enhance productivity and efficiency across various industries. We combine cutting-edge technologies with proven methodologies to deliver tailored automation solutions that drive operational excellence and cost reduction.",
    features: [
      "Industrial automation solutions",
      "Robotics integration",
      "Process automation",
      "SCADA systems",
      "PLC programming",
      "IoT integration",
      "Predictive maintenance"
    ],
    benefits: [
      "Increased operational efficiency by up to 60%",
      "Cost reduction through intelligent automation",
      "Enhanced productivity and accuracy",
      "24/7 operational capabilities",
      "Reduced human error and improved safety"
    ],
    technologies: ["Robotics", "IoT", "AI", "PLC", "SCADA", "Python", "ROS"],
    caseStudy: "Reduced operational costs by 40% for manufacturing client through automated quality control systems",
    stats: [
      { value: "60%", label: "Efficiency Increase" },
      { value: "40%", label: "Cost Reduction" },
      { value: "99.9%", label: "Accuracy Rate" }
    ]
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    icon: "👁️",
    gradient: "from-purple-500 to-pink-500",
    shortDesc: "Advanced visual intelligence for smart decision-making",
    description: "We offer advanced Computer Vision solutions that enable machines to interpret and understand visual information from the world. Our expertise spans across various industries including manufacturing, healthcare, retail, and autonomous systems.",
    features: [
      "Image and video analysis",
      "Object detection and recognition",
      "Facial recognition systems",
      "Autonomous vehicle vision systems",
      "Quality control and inspection automation",
      "Augmented reality integration",
      "Real-time video analytics"
    ],
    benefits: [
      "Enhanced visual data processing capabilities",
      "Real-time object recognition and tracking",
      "Improved quality control accuracy",
      "Automated visual inspections",
      "Reduced manual inspection costs"
    ],
    technologies: ["OpenCV", "TensorFlow", "PyTorch", "YOLO", "CNN", "GANs"],
    caseStudy: "Improved defect detection accuracy by 95% in automotive production line using advanced computer vision algorithms",
    stats: [
      { value: "95%", label: "Detection Accuracy" },
      { value: "80%", label: "Faster Processing" },
      { value: "50%", label: "Cost Savings" }
    ]
  },
  {
    id: "ai-ml",
    title: "AI & ML",
    icon: "🧠",
    gradient: "from-indigo-500 to-blue-500",
    shortDesc: "Intelligent systems powered by advanced algorithms",
    description: "Our Artificial Intelligence and Machine Learning services help businesses leverage the power of data-driven intelligence. We build sophisticated models that learn from data and make intelligent decisions.",
    features: [
      "Predictive analytics and forecasting",
      "Natural Language Processing (NLP)",
      "Deep learning models",
      "Recommendation systems",
      "Anomaly detection",
      "Computer vision integration",
      "Reinforcement learning"
    ],
    benefits: [
      "Data-driven decision making processes",
      "Automated complex business processes",
      "Predictive insights for strategic planning",
      "Personalized user experiences",
      "Continuous learning and improvement"
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Spark"],
    caseStudy: "Increased customer engagement by 60% with AI-powered recommendation engine for e-commerce platform",
    stats: [
      { value: "60%", label: "Engagement Boost" },
      { value: "45%", label: "Revenue Growth" },
      { value: "30%", label: "Process Automation" }
    ]
  },
  {
    id: "cloud-hosting",
    title: "Cloud Hosting Services",
    icon: "☁️",
    gradient: "from-cyan-500 to-teal-500",
    shortDesc: "Scalable and secure cloud infrastructure solutions",
    description: "We provide comprehensive Cloud Hosting Services to help organizations manage, analyze, and leverage their data effectively in the cloud. Our solutions ensure scalability, security, and high availability.",
    features: [
      "Cloud data migration and integration",
      "Big data processing and analytics",
      "Data warehousing and lakes",
      "Cloud-native database management",
      "Data governance and security",
      "Multi-cloud strategy implementation",
      "Disaster recovery solutions"
    ],
    benefits: [
      "Highly scalable infrastructure on demand",
      "Enhanced data security and compliance",
      "Cost-effective pay-as-you-go solutions",
      "High availability and reliability",
      "Global reach and low latency"
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
    caseStudy: "Achieved 99.9% uptime for enterprise client with seamless cloud migration and optimized infrastructure",
    stats: [
      { value: "99.9%", label: "Uptime" },
      { value: "50%", label: "Cost Savings" },
      { value: "3x", label: "Scalability" }
    ]
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    icon: "🗄️",
    gradient: "from-emerald-500 to-green-500",
    shortDesc: "Robust data infrastructure for intelligent insights",
    description: "Our Data Engineering services focus on building robust data infrastructure and pipelines to support analytics and decision-making. We create foundations that enable organizations to trust and act upon their data assets.",
    features: [
      "Data architecture design and implementation",
      "ETL/ELT processes optimization",
      "Data quality and cleansing frameworks",
      "Real-time data streaming pipelines",
      "Data modeling and optimization",
      "Data governance implementation",
      "Data lake and warehouse design"
    ],
    benefits: [
      "Reliable and scalable data pipelines",
      "Improved data quality and consistency",
      "Real-time analytics capabilities",
      "Future-proof data architecture",
      "Enhanced data-driven decision making"
    ],
    technologies: ["Apache Spark", "Kafka", "Airflow", "Snowflake", "dbt", "Flink"],
    caseStudy: "Processed 1TB+ daily data with 99.99% accuracy for financial client, enabling real-time risk analysis",
    stats: [
      { value: "99.99%", label: "Data Accuracy" },
      { value: "1TB+", label: "Daily Processing" },
      { value: "Real-time", label: "Analytics" }
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    icon: "🎨",
    gradient: "from-fuchsia-500 to-pink-500",
    shortDesc: "Intuitive and engaging digital experiences",
    description: "We offer comprehensive UI/UX design services to create intuitive, engaging, and user-centered digital experiences. Our designs not only look visually appealing but also provide seamless, efficient, and enjoyable user experiences.",
    features: [
      "User Research and Analysis",
      "Information Architecture Design",
      "Wireframing and Prototyping",
      "Visual Design and Branding",
      "Interaction Design",
      "Usability Testing",
      "Responsive and Adaptive Design"
    ],
    benefits: [
      "Enhanced user satisfaction and loyalty",
      "Increased conversion rates and engagement",
      "Improved usability and accessibility",
      "Strong brand identity and recognition",
      "Reduced development costs and time"
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Framer"],
    caseStudy: "Increased user engagement by 75% with redesigned interface and improved user journey mapping",
    stats: [
      { value: "75%", label: "Engagement Increase" },
      { value: "40%", label: "Conversion Boost" },
      { value: "50%", label: "Faster Development" }
    ]
  },
  {
    id: "crm-erp",
    title: "CRM & ERP",
    icon: "🧩",
    gradient: "from-orange-500 to-red-500",
    shortDesc: "Integrated business management solutions",
    description: "Our CRM & ERP solutions help organizations streamline their operations and enhance customer relationships. We leverage industry-leading platforms to drive efficiency, improve decision-making, and foster sustainable growth.",
    features: [
      "CRM implementation and customization",
      "ERP system integration and optimization",
      "Business process automation",
      "Data migration and consolidation",
      "Analytics and reporting solutions",
      "Mobile CRM applications",
      "AI-powered customer insights"
    ],
    benefits: [
      "Streamlined business operations",
      "Improved customer relationships and retention",
      "Enhanced decision-making with real-time data",
      "Business process optimization",
      "Scalable growth infrastructure"
    ],
    technologies: ["Salesforce", "HubSpot", "SAP", "Oracle", "Microsoft Dynamics", "Zoho"],
    caseStudy: "Reduced operational costs by 35% with integrated ERP system and automated business processes",
    stats: [
      { value: "35%", label: "Cost Reduction" },
      { value: "60%", label: "Process Automation" },
      { value: "25%", label: "Revenue Growth" }
    ]
  },
  {
    id: "testing-services",
    title: "Testing Services",
    icon: "🧪",
    gradient: "from-lime-500 to-green-500",
    shortDesc: "Comprehensive quality assurance for flawless performance",
    description: "We provide comprehensive Testing Services to ensure the quality, reliability, and performance of software applications and systems. Our rigorous testing methodologies help identify and resolve issues early in the development cycle.",
    features: [
      "Functional and non-functional testing",
      "Automated testing frameworks",
      "Performance and load testing",
      "Security testing and vulnerability assessment",
      "Mobile and web application testing",
      "API testing and validation",
      "Continuous testing integration"
    ],
    benefits: [
      "High-quality software delivery",
      "Early bug detection and resolution",
      "Enhanced security and compliance",
      "Optimal performance under load",
      "Reduced maintenance costs"
    ],
    technologies: ["Selenium", "Jest", "Cypress", "JMeter", "Postman", "Appium"],
    caseStudy: "Identified 200+ critical bugs before production deployment, saving $500K in potential revenue loss",
    stats: [
      { value: "200+", label: "Bugs Identified" },
      { value: "99.9%", label: "Test Coverage" },
      { value: "50%", label: "Faster Releases" }
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

// Mobile Service Selector Component
const MobileServiceSelector = ({ services, activeService, onServiceClick, isOpen, onToggle }) => {
  return (
    <div className="lg:hidden">
      {/* Mobile Dropdown Trigger */}
      <motion.button
        onClick={onToggle}
        className="w-full p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-between text-white mb-4"
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activeService.gradient} flex items-center justify-center`}>
            {activeService.icon}
          </div>
          <span className="font-semibold">{activeService.title}</span>
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
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => {
                    onServiceClick(service.id);
                    onToggle();
                  }}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                    activeService.id === service.id
                      ? `bg-gradient-to-r ${service.gradient} bg-opacity-20 border border-cyan-400/50`
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center text-sm`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{service.title}</div>
                      <div className="text-slate-400 text-xs mt-1 line-clamp-1">{service.shortDesc}</div>
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

// Service Sidebar Component
const ServiceSidebar = ({ services, activeService, onServiceClick, searchTerm, onSearchChange }) => {
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 lg:p-6 border-b border-white/10">
        <div className="relative">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 outline-none text-sm lg:text-base"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            🔍
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 lg:p-4 space-y-1 lg:space-y-2">
          {filteredServices.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => onServiceClick(service.id)}
              className={`w-full text-left p-3 lg:p-4 rounded-xl transition-all duration-300 border ${
                activeService?.id === service.id
                  ? `bg-gradient-to-r ${service.gradient} bg-opacity-20 border-cyan-400/50 text-white shadow-lg`
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center text-sm lg:text-lg flex-shrink-0`}>
                  {service.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm lg:text-base leading-tight truncate">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>
                {activeService?.id === service.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Service Content Component
const ServiceContent = ({ service }) => {
  if (!service) return null;

  return (
    <motion.div
      key={service.id}
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
            className={`w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-xl lg:text-2xl shadow-2xl flex-shrink-0`}
          >
            {service.icon}
          </motion.div>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed">
              {service.shortDesc}
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
          {service.stats.map((stat, index) => (
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
          <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">Overview</h2>
          <p className="text-slate-300 leading-relaxed text-base lg:text-lg">
            {service.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">Key Features</h2>
            <div className="space-y-2 lg:space-y-3">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/5"
                >
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${service.gradient} flex-shrink-0`} />
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
              {service.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/5"
                >
                  <div className={`w-5 h-5 lg:w-6 lg:h-6 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white text-xs lg:text-sm flex-shrink-0`}>
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
              {service.technologies.map((tech, index) => (
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
              {service.caseStudy}
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
            Get Started with {service.title}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeService, setActiveService] = useState(SERVICES_DATA[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contentRef = useRef(null);

  // Handle direct service links from URL
  useEffect(() => {
    if (serviceId) {
      const service = SERVICES_DATA.find(s => s.id === serviceId);
      if (service) {
        setActiveService(service);
      }
    } else {
      setActiveService(SERVICES_DATA[0]);
    }
  }, [serviceId]);

  // Handle service click with smooth behavior
  const handleServiceClick = (serviceId) => {
    const service = SERVICES_DATA.find(s => s.id === serviceId);
    if (service) {
      setActiveService(service);
      navigate(`/services/${serviceId}`, { replace: true });
      
      // Scroll to top on mobile when changing service
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
                SERVICES
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-2xl xl:text-3xl text-slate-300 mb-8 lg:mb-12 leading-relaxed max-w-3xl lg:max-w-4xl mx-auto font-light px-4"
            >
              Innovative technology solutions driving digital transformation and business excellence
            </motion.p>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-6 lg:py-10 px-4 lg:px-6">
          <div className="max-w-8xl mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 min-h-[600px] lg:min-h-[700px] xl:min-h-[800px]">
              {/* Mobile Service Selector */}
              <div className="lg:hidden">
                <MobileServiceSelector
                  services={SERVICES_DATA}
                  activeService={activeService}
                  onServiceClick={handleServiceClick}
                  isOpen={mobileMenuOpen}
                  onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
              </div>

              {/* Left Sidebar - Services Navigation (Desktop) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:block lg:col-span-1 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 overflow-hidden"
              >
                <div className="p-4 lg:p-6 border-b border-white/10">
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                    Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Expertise</span>
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {SERVICES_DATA.length} specialized services
                  </p>
                </div>
                <ServiceSidebar
                  services={SERVICES_DATA}
                  activeService={activeService}
                  onServiceClick={handleServiceClick}
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
                className="lg:col-span-3 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 overflow-hidden"
              >
                <ServiceContent service={activeService} />
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
              Ready to <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Transform</span> Your Business?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base lg:text-xl text-slate-300 mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Let's discuss how our innovative services can drive your digital transformation journey
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