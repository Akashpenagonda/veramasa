import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

// Carousel Images
const CAROUSEL_IMAGES = [
  {
    src: "/coursal-1.png",
    alt: "Veramasa Office Environment",
    title: "Innovative Workspace",
    description: "Our state-of-the-art office designed for creativity and collaboration"
  },
  {
    src: "/coursal-2.png", 
    alt: "Veramasa Team Collaboration",
    title: "Team Collaboration",
    description: "Our diverse team working together to solve complex challenges"
  },
  {
    src: "/coursal-3.png",
    alt: "Advanced Technology",
    title: "Cutting-Edge Technology",
    description: "Leveraging the latest technologies to deliver exceptional solutions"
  }
];

// Vision Data
const VISION_SECTIONS = [
  {
    title: "Embracing Innovation",
    content: "Innovation is at the core of everything we do. We constantly push the boundaries of what is possible, exploring new ideas and technologies to develop solutions that are not only effective but also transformative. Our commitment to innovation ensures that we stay ahead of the curve and deliver value to our clients.",
    icon: "🚀",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    title: "Fostering Business Excellence",
    content: "We aim to help businesses achieve excellence by providing them with the tools and solutions they need to succeed in an increasingly competitive landscape. By leveraging advanced technologies such as Data Science, AI, and Machine Learning, we enable businesses to optimize their operations, enhance decision-making, and drive growth.",
    icon: "⭐",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Driving Digital Transformation",
    content: "Digital transformation is more than just a buzzword at Veramasa; it is a fundamental part of our vision. We believe that digital transformation is essential for businesses to stay relevant and competitive in today's fast-paced world.",
    icon: "💻",
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Impacting Industries",
    content: "We are dedicated to making a positive impact across various industries. By developing tailored solutions that address the unique challenges of each sector, we help our clients achieve their goals and drive meaningful change.",
    icon: "🌍",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Commitment to Sustainability",
    content: "At Veramasa, we recognize the importance of sustainability and are committed to developing technologies that promote environmental stewardship and social responsibility. Our solutions are designed to be efficient, sustainable, and aligned with the global goals for a better future.",
    icon: "🌱",
    gradient: "from-lime-500 to-green-500"
  },
  {
    title: "Collaborative Approach",
    content: "We believe that the best solutions are developed through collaboration. By working closely with our clients, partners, and stakeholders, we ensure that our innovations are aligned with their needs and expectations.",
    icon: "🤝",
    gradient: "from-indigo-500 to-purple-500"
  }
];

// Mission Data
const MISSION_SECTIONS = [
  {
    title: "Highly Efficient",
    content: "At Veramasa, our mission is to design and deploy cutting-edge technologies that push the limits of what is achievable. We are dedicated to empowering businesses with our tech-driven solutions.",
    icon: "⚡",
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    title: "AIMers",
    content: "Our mission is to empower businesses by providing them with the tools and technologies they need to excel. We understand that each business is unique, and we tailor our solutions to meet their specific needs.",
    icon: "🎯",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    title: "AI Solutions",
    content: "Operational excellence is at the heart of our mission. We strive to help businesses streamline their processes, reduce costs, and improve productivity through our advanced technology solutions.",
    icon: "🤖",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    title: "Strategic Approach",
    content: "In today's fast-paced and competitive market, having a technological edge is crucial. Our mission is to provide businesses with the innovative solutions they need to gain a competitive advantage.",
    icon: "♟️",
    gradient: "from-amber-500 to-orange-500"
  }
];

// Leadership Data with round images
const LEADERS = [
  {
    name: "Rajarao V Mullapudi",
    role: "Founder",
    bio: "A seasoned professional with over 15 years of expertise in AI, signal processing, and IoT. Founder of Veramasa and Cardisum, leading the development of scalable AI and image processing solutions.",
    education: "M.Tech in Electronics Engineering from IIT-Madras",
    image: "/RajaSir.jpeg",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    name: "Dileep Moguluru",
    role: "Chief Technology Officer",
    bio: "Expert in designing and implementing scalable cloud infrastructures. Committed to optimizing cloud solutions for seamless performance and security.",
    education: "M.Sc (IIT Madras)",
    image: "/DileepSir.jpg",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Dheeraj Mudunuri",
    role: "Chief Marketing & Sales Officer",
    bio: "With a unique blend of technical mastery and strategic business acumen, he revolutionizes the approach to market engagement.",
    education: "M.Sc, MTech",
    image: "/DheerajSirs.jpg",
    gradient: "from-orange-500 to-red-500"
  },
  {
    name: "Nataraju Konduru",
    role: "Chief Solutions Architect",
    bio: "The cornerstone of the technical solutions team with a deep understanding of complex systems ensures our clients receive cutting-edge solutions.",
    education: "M.Tech",
    image: "/NatrajSir.jpg",
    gradient: "from-green-500 to-emerald-500"
  }
  
];

// Team Members with round images
const TEAM_MEMBERS = [
  { 
    name: "JVD Ram Charan", 
    role: "Electronics Engineer", 
    image: "/RamCharan.jpeg"
  },
  { 
    name: "Rajesh Sammingi", 
    role: "Data Engineer", 
    image: "/Rajesh.jpeg"
  },
  { 
    name: "Ganesh Kodimoju", 
    role: "QA Engineer", 
    image: "/Ganesh.jpeg"
  },
  { 
    name: "Naveen Patidar", 
    role: "Full Stack Developer", 
    image: "/Naveen.jpeg"
  },
  { 
    name: "Sanjana Nitanvare", 
    role: "PHP Developer", 
    image: "/Sanjana.jpeg"
  },
  { 
    name: "Khushboo Nagar", 
    role: "UI/UX Designer", 
    image: "/Khushboo.jpeg"
  },
];

// Gallery Images for Life @ Veramasa - Updated with larger size
const GALLERY_IMAGES = [
  { src: "/gallery-1.jpg", alt: "Team Collaboration" },
  { src: "/gallery-2.jpg", alt: "Office Environment" },
  { src: "/gallery-3.jpg", alt: "Team Event" },
  { src: "/gallery-4.jpg", alt: "Workspace" },
  { src: "/gallery-5.jpg", alt: "Innovation Hub" },
  { src: "/gallery-6.jpg", alt: "Celebration" },
];

// Success Stories
const SUCCESS_STORIES = [
  {
    name: "Sriram Pappuri",
    content: "I'm really impressed with the results. The team clearly knows their stuff, delivering top-notch quality that exceeded my expectations. Their attention to detail and ability to understand the projects nuances made the entire process seamless.",
    emoji: "🌟"
  },
  {
    name: "Ranganadh Maramraju",
    content: "Communication was top-notch throughout the project. The team consistently kept me in the loop, ensuring I was updated on every stage of the process.",
    emoji: "💬"
  },
  {
    name: "Vamshi Akula",
    content: "They actually listened to what I wanted, which was refreshing! From the initial discussions, it was clear that they valued my input and made a genuine effort to understand my vision.",
    emoji: "👂"
  },
  {
    name: "Jagan Mohan Reddy",
    content: "Pricing was fair, and the quality exceeded my expectations. I was pleasantly surprised by how reasonable their rates were compared to the exceptional value I received.",
    emoji: "💰"
  }
];

// Wellness Data
const WELLNESS_PILLARS = [
  {
    title: "Physical Vitality",
    description: "Comprehensive access to cutting-edge benefits and programs tailored to enhance physical health. Offerings vary by region and may encompass state-of-the-art health policies, engaging team fitness challenges, and a diverse array of in-person and virtual wellness sessions, including yoga and targeted exercise routines.",
    icon: "💪",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    title: "Mental Resilience",
    description: "Robust mental health support infrastructure featuring professional clinical counseling, mindfulness training, and our pioneering Mental Health Allyship Program. These carefully curated resources are designed to foster a culture of psychological safety and promote overall mental wellbeing across our organization.",
    icon: "🧠",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Financial Empowerment",
    description: "Strategic resources and expert guidance to enhance financial wellness. Location-specific offerings may include comprehensive retirement planning, exclusive discount programs, preferred banking partnerships, and targeted educational initiatives covering estate planning, retirement strategies, continuing education, budgeting techniques, and investment insights.",
    icon: "💰",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Work-Life Synergy",
    description: "We actively promote a harmonious work-life integration, encouraging our associates to prioritize personal time and pursuits beyond the workplace. This philosophy is supported through competitive paid time off policies, flexible leave options, adaptable work arrangements, and additional benefits designed to enhance overall quality of life.",
    icon: "⚖️",
    gradient: "from-orange-500 to-amber-500"
  }
];

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("vision");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Carousel Section */}
        <section className="relative h-screen overflow-hidden pt-16">
          <div className="relative h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  {/* Background Image with Fallback */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                    <img
                      src={CAROUSEL_IMAGES[currentSlide].src}
                      alt={CAROUSEL_IMAGES[currentSlide].alt}
                      className="w-full h-full object-cover opacity-80"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center text-white px-6 max-w-4xl">
                      <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                      >
                        {CAROUSEL_IMAGES[currentSlide].title}
                      </motion.h1>
                      <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-200 mb-8"
                      >
                        {CAROUSEL_IMAGES[currentSlide].description}
                      </motion.p>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex justify-center space-x-2"
                      >
                        {CAROUSEL_IMAGES.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Vision & Mission Tabs */}
        <section className="py-20 px-6 bg-[#0b1020]">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-16">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl flex p-2 w-96 shadow-2xl">
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`flex-1 py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-500 ${
                    activeTab === "vision"
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Our Vision
                </button>
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`flex-1 py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-500 ${
                    activeTab === "mission"
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Our Mission
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "vision" && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Empowering Innovation, <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Shaping Tomorrow</span>
                  </h2>
                  <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                    Our vision for the future is one where technology and humanity work hand in hand to create a better world.
                  </p>
                </motion.div>
              )}

              {activeTab === "mission" && (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    To design and deploy <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">cutting-edge technologies</span>
                  </h2>
                  <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                    Empowering businesses with our tech-driven solutions to achieve operational excellence and competitive advantage.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {(activeTab === "vision" ? VISION_SECTIONS : MISSION_SECTIONS).map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500"
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-2xl shadow-2xl`}
                      >
                        {section.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-br ${section.gradient} rounded-full opacity-0 group-hover:opacity-100`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Our Approach */}
            {activeTab === "mission" && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
              >
                <h3 className="text-3xl font-bold text-center mb-8 text-white">Our Approach</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    "Understanding Client Needs: We start by understanding the unique challenges and goals of our clients.",
                    "Leveraging Advanced Technologies: We utilize the latest technologies in Data Science, AI, ML, and computer vision.",
                    "Collaborative Development: We work closely with our clients throughout the development process.",
                    "Continuous Improvement: We are committed to continuous improvement, constantly refining our solutions."
                  ].map((approach, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="p-6 rounded-2xl bg-white/5 text-center backdrop-blur-xl border border-white/10"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                        {index + 1}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{approach}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Founder Section with Vertical Image */}
        <section className="py-20 px-6 bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Meet Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Founder</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Vertical Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden group">
                  <div className="w-full aspect-[3/4] bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src="/RajaSir.jpeg"
                      alt="Rajarao V Mullapudi - Founder"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center text-8xl" style={{display: 'none'}}>
                      👨‍💼
                    </div>
                  </div>
                  
                  {/* Floating Badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-6 right-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-2xl"
                  >
                    Founder & Visionary
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-3xl font-bold text-cyan-400 mb-2">Rajarao V Mullapudi</h3>
                  <p className="text-xl text-purple-400 font-semibold">Founder</p>
                </div>
                
                <p className="text-slate-300 text-lg leading-relaxed">
                  Hi Everyone, I am Rajarao V Mullapudi, a seasoned professional with over 15 years of expertise in AI, signal processing, and IoT. I'm proud to be the founder of two impactful ventures: Veramasa and Cardisum.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2 text-lg">🎓 Education</h4>
                    <p className="text-slate-300">M.Tech in Electronics Engineering from IIT-Madras</p>
                    <p className="text-slate-300">AIR-6 in the Indian Engineering Service (IES) exam</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2 text-lg">💼 Career Highlights</h4>
                    <ul className="text-slate-300 space-y-2">
                      <li className="flex items-center gap-2">• Senior Engineer at General Motors, India</li>
                      <li className="flex items-center gap-2">• Divisional Engineer at Indian Railways</li>
                      <li className="flex items-center gap-2">• Founder & CMD of Veramasa</li>
                      <li className="flex items-center gap-2">• Founder of Cardisum Health Tech</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2 text-lg">🏆 Notable Achievements</h4>
                    <ul className="text-slate-300 space-y-2">
                      <li className="flex items-center gap-2">• Algorithm for shrimp sound estimation and automatic feed control</li>
                      <li className="flex items-center gap-2">• Award-winning algorithm for detecting Diabetic Retinopathy</li>
                      <li className="flex items-center gap-2">• Patent-pending algorithm for generating linear vectors from ECG images</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership Team with Round Images */}
        <section className="py-20 px-6 bg-[#0b1020]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Leaders</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {LEADERS.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500"
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${leader.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-6">
                      {/* Round Image - Maintained round styling */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden flex-shrink-0 border-4 border-white/10 group-hover:border-cyan-400/30 transition-all duration-300 shadow-xl"
                      >
                        <img 
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20" style={{display: 'none'}}>
                          👨‍💼
                        </div>
                      </motion.div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{leader.name}</h3>
                        <p className="text-cyan-400 font-semibold text-lg mb-3">{leader.role}</p>
                        <p className="text-slate-300 text-sm mb-3 leading-relaxed">{leader.bio}</p>
                        {leader.education && (
                          <p className="text-slate-400 text-xs bg-white/5 rounded-lg px-3 py-2 inline-block">
                            🎓 {leader.education}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members with Round Images */}
        <section className="py-20 px-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Go-Getters</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
              {TEAM_MEMBERS.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="text-center group"
                >
                  {/* Round Image - Maintained round styling */}
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden border-4 border-white/10 group-hover:border-cyan-400/30 transition-all duration-300 shadow-xl">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20" style={{display: 'none'}}>
                      {member.role.includes('Designer') ? '🎨' : 
                       member.role.includes('Developer') ? '💻' :
                       member.role.includes('Engineer') ? '🔧' : '👨‍💻'}
                    </div>
                  </div>
                  <h3 className="font-semibold text-white text-base mb-1 leading-tight">{member.name}</h3>
                  <p className="text-slate-400 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Life @ Veramasa Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Life @ <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Veramasa</span>
              </h2>
            </motion.div>

            {/* Global Network */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 mb-16"
            >
              <h3 className="text-3xl font-bold mb-4 text-white">Veramasa: A Global Network of 50+</h3>
              <p className="text-xl text-cyan-400 mb-4 font-semibold">Innovators Shaping the Future</p>
              <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
                At Veramasa, our strength lies in our diverse community of forward-thinking professionals. Our rich heritage and dynamic culture fuel our boundless potential, driving us to push boundaries and achieve remarkable results. With the agility of a startup and the vision of industry leaders, we've rapidly grown into a force for positive change. Here, you're not just building a career—you're crafting a journey of personal and professional growth, perfectly balanced with a fulfilling life. Join us in evolving, innovating, and making a lasting impact in a company that grows alongside you.
              </p>
            </motion.div>

            {/* Wellness Commitment */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center mb-8 text-white">
                Fostering <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Holistic Associate Wellness</span>
              </h3>
              <p className="text-xl text-slate-300 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
                Our globally integrated Be Well program is meticulously crafted to accommodate the diverse needs of each associate. This comprehensive initiative delivers essential physical, mental, and financial support, empowering our team to skillfully navigate both professional and personal spheres.
              </p>
              <p className="text-lg text-slate-300 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
                We firmly believe that holistic wellbeing and a nurturing corporate culture are the cornerstones of sustained success. To this end, we actively encourage our associates and leadership to cultivate self-awareness, prioritize personal wellness, and fully leverage the extensive resources and support systems at their disposal.
              </p>

              {/* Wellness Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {WELLNESS_PILLARS.map((pillar, index) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 text-center"
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Gallery Section - Updated with Larger Images */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <h3 className="text-3xl font-bold mb-8 text-white">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {GALLERY_IMAGES.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative overflow-hidden rounded-2xl aspect-video"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20" style={{display: 'none'}}>
                        🏢
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white text-lg font-semibold text-center px-4">
                        {image.alt}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 px-6 bg-[#0b1020]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Success Stories</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {SUCCESS_STORIES.map((story, index) => (
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {story.emoji}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-400 mb-2">{story.name}</h3>
                      <p className="text-slate-300 leading-relaxed italic">"{story.content}"</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Join Us on Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">Journey</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Together, let's create a future that is innovative, sustainable, and filled with endless possibilities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-lg"
              >
                Join Our Team
              </motion.a>
              <motion.a
                href="/Contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 text-lg"
              >
                Partner With Us
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}