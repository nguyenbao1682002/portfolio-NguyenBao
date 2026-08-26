import React, { useState, useEffect } from 'react';
import { uiTranslations, experiencesData } from './translations';
import { motion, AnimatePresence } from 'framer-motion'; // Tích hợp thư viện hiệu ứng chuyên nghiệp

// Cấu hình các biến hiệu ứng tái sử dụng
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const fadeInRightVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1 // Độ trễ xuất hiện giữa các phần tử con
    }
  }
};

// Hiệu ứng cho header/nav
const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } 
    }
  };

export default function App() {
  const [lang, setLang] = useState('vi');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [demoTab, setDemoTab] = useState('image'); 
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [currentVidIndex, setCurrentVidIndex] = useState(0);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const t = uiTranslations[lang];
  
  // Lọc trải nghiệm theo tab chọn
  const filteredExperiences = activeTab === 'all' 
    ? experiencesData 
    : experiencesData.filter(exp => exp.category === activeTab);
  
  const gmailComposeUrl = "https://mail.google.com/mail/u/0/?fs=1&to=baonguyen2002.tech@gmail.com&tf=cm";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hàm xử lý cuộn mượt lên trên cùng
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleOpenDemo = (project) => {
    setSelectedProject(project);
    setDemoTab(project.demo?.images?.length ? 'image' : 'video'); 
    setCurrentImgIndex(0);
    setCurrentVidIndex(0);
  };

  return (
    <div className="bg-[#030712] text-slate-300 min-h-screen font-sans selection:bg-cyan-500/30 relative overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-125 h-125 bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* BỘ CHUYỂN ĐỔI NGÔN NGỮ - CỐ ĐỊNH Ở GÓC PHẢI TRÊN CÙNG */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="fixed top-6 right-6 z-50 flex items-center bg-slate-950/80 backdrop-blur-md border border-slate-800/60 p-1 rounded-xl gap-1 shadow-xl"
      >
        {['vi', 'en', 'ja'].map(l => (
          <button 
            key={l}
            onClick={() => setLang(l)} 
            className={`px-2.5 py-1.5 text-[10px] font-black rounded-lg transition-all uppercase cursor-pointer ${
              lang === l ? 'bg-cyan-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {l}
          </button>
        ))}
      </motion.div>

      {/* FIXED NAVIGATION */}
      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="fixed top-6 left-1/2 -translate-x-1/2 bg-slate-950/70 backdrop-blur-xl border border-slate-800/80 px-4 md:px-6 py-3 rounded-full z-45 flex items-center gap-4 md:gap-6 shadow-2xl max-w-[95%]"
      >
        <a href="#hero" className="font-black text-sm bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-wider hover:opacity-80 transition-opacity cursor-pointer">
          TNB
        </a>
        
        <div className="hidden lg:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider">
          <a href="#about" className="hover:text-cyan-400 transition-colors">{t.navAbout}</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">{t.navExp}</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">{t.navSkills}</a>
          <a href="#education" className="hover:text-cyan-400 transition-colors">{t.navEdu}</a>
          <a href="#interests" className="hover:text-cyan-400 transition-colors">{t.navInterests}</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">{t.navContact}</a>
        </div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a href="/CV_TRAN_NGUYEN_BAO.pdf" download className="bg-linear-to-r from-purple-500/15 to-pink-500/15 text-purple-300 border border-purple-500/40 px-3 py-1.5 rounded-full text-xs font-bold hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all flex items-center gap-1 cursor-pointer">
            {t.downloadCv}
          </a>
        </motion.div>
      </motion.nav>

      {/* HERO SECTION - GIỮ NGUYÊN GỐC */}
      <section id="hero" className="max-w-6xl mx-auto px-6 pt-36 pb-20 min-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-12 target:scroll-mt-36">
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 space-y-6 text-left"
        >
          <motion.div variants={fadeInUpVariants} className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> {t.openToWork}
          </motion.div>
          <motion.h1 variants={fadeInUpVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Tran Nguyen <br />
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Bao</span>
          </motion.h1>
          <motion.p variants={fadeInUpVariants} className="text-xl text-slate-400 font-medium">Software Engineer & Industrial R&D Specialist</motion.p>
          <motion.p variants={fadeInUpVariants} className="text-slate-400 max-w-xl leading-relaxed text-sm md:text-base">{t.heroDesc}</motion.p>
          
          <motion.div variants={fadeInUpVariants} className="flex flex-wrap gap-3 pt-2">
            <motion.a href="#experience" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="bg-linear-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2 text-xs cursor-pointer">
              {t.viewProjects}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </motion.a>
            <motion.a href="https://github.com/nguyenbao1682002" target="_blank" rel="noreferrer" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="bg-slate-900 border border-slate-800 text-white font-medium px-4 py-3 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 text-xs">
              <svg className="w-4 h-4 fill-current text-slate-300" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </motion.a>
            <motion.a href="https://linkedin.com/in/baonguyen2002tech" target="_blank" rel="noreferrer" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="bg-slate-900 border border-slate-800 text-white font-medium px-4 py-3 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 text-xs">
              <svg className="w-4 h-4 fill-current text-[#0a66c2]" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>

        {/* SIDEBAR QUICK METRICS */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-96 bg-slate-900/30 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl relative"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900">
              <div className="text-2xl font-black text-cyan-400">02+</div>
              <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase">{t.statsExp}</p>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900">
              <div className="text-2xl font-black text-purple-400">10+</div>
              <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase">{t.statsSystems}</p>
            </div>
          </div>

          <motion.a 
            href="/TRAN NGUYEN BAO_CV.pdf" 
            download="TRAN NGUYEN BAO_CV.pdf" 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full block text-center bg-linear-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-xl text-xs hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-purple-500/20"
          >
            {t.downloadResume}
          </motion.a>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-20 border-t border-slate-900">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">{t.aboutSub}</motion.h2>
        <motion.h3 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl font-bold text-white mb-6">{t.aboutTitle}</motion.h3>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-6 text-slate-400 text-sm md:text-base leading-relaxed">
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
        </motion.div>
      </section>

      {/* EXPERIENCES & PROJECTS */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainerVariants}>
            <motion.h2 variants={fadeInUpVariants} className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-2">{t.expSub}</motion.h2>
            <motion.h3 variants={fadeInUpVariants} className="text-3xl font-bold text-white">{t.expTitle}</motion.h3>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
            <button onClick={() => setActiveTab('all')} className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'all' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>{t.tabAll}</button>
            <button onClick={() => setActiveTab('industrial')} className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'industrial' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>ESTEC R&D</button>
            <button onClick={() => setActiveTab('enterprise')} className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'enterprise' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>DNPC Intern</button>
            <button onClick={() => setActiveTab('academic')} className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'academic' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>Academic</button>
          </motion.div>
        </div>

        <div className="space-y-16">
          {filteredExperiences.map((experience, expIndex) => (
            <motion.div 
                key={expIndex} 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: expIndex * 0.1 }}
            >
              <div className="mb-6 space-y-2">
                <h3 className="text-2xl font-bold text-cyan-400">{experience.company}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="font-semibold text-white">{experience.role[lang]}</span>
                  <span>•</span>
                  <span>{experience.duration}</span>
                </div>
                <p className="text-slate-400 text-sm mt-2 max-w-4xl leading-relaxed">{experience.description[lang]}</p>
              </div>

              <div className="space-y-6">
                <motion.div 
                    className="grid gap-6"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                  {experience.projects.map((project, projIndex) => (
                    <motion.div 
                        key={projIndex} 
                        variants={fadeInUpVariants}
                        whileHover={{ y: -4, borderColor: "rgba(148, 163, 184, 0.5)" }}
                        className="bg-slate-900/20 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl transition-all flex flex-col md:flex-row gap-6 justify-between items-center group"
                    >
                      
                      <div className="space-y-3 flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title[lang]}</h4>
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{project.impact[lang]}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tech.map((techItem, idx) => (
                            <span key={idx} className="bg-cyan-500/5 text-cyan-400 border border-cyan-500/10 px-2 py-0.5 rounded text-[10px] font-mono">{techItem}</span>
                          ))}
                        </div>
                      </div>

                      <motion.button 
                        onClick={() => handleOpenDemo(project)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full md:w-36 p-5 rounded-xl border text-center flex flex-col justify-center items-center shrink-0 transition-all cursor-pointer group/btn duration-300 ${
                          project.demo 
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
                            : 'bg-slate-950/65 border-slate-800/80 text-slate-500 hover:bg-red-950/15 hover:border-red-500/30 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                        }`}
                      >
                        {project.demo ? (
                          <>
                            <span className="text-xs font-black uppercase tracking-wider">{t.viewDemo}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-xs font-black uppercase tracking-wider">{t.viewDemo}</span>
                          </>
                        )}
                      </motion.button>

                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TECHNICAL SKILLS - ĐÃ NÂNG CẤP ANIMATION */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2"
        >
          {t.skillsSub}
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl font-bold text-white mb-10"
        >
          {t.skillsTitle}
        </motion.h3>

        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Khối Kỹ năng 1: Languages */}
          <motion.div 
            variants={fadeInUpVariants}
            whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(6, 182, 212, 0.4)" }}
            className="bg-slate-900/40 border border-slate-800/60 p-5 rounded-xl space-y-3 transition-colors duration-300 shadow-sm"
          >
            <div className="text-cyan-400 font-bold font-mono text-xs uppercase flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Languages</div>
            <div className="flex flex-wrap gap-1.5">{["Java", "Node.js", "JavaScript", "Python", "PHP", "C#", "HTML/CSS"].map(s => (<span key={s} className="bg-slate-950 text-slate-400 border border-slate-900/80 px-2 py-0.5 rounded text-xs font-mono">{s}</span>))}</div>
          </motion.div>
          
          {/* Khối Kỹ năng 2: Frameworks */}
          <motion.div 
            variants={fadeInUpVariants}
            whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(168, 85, 247, 0.4)" }}
            className="bg-slate-900/40 border border-slate-800/60 p-5 rounded-xl space-y-3 transition-colors duration-300 shadow-sm"
          >
            <div className="text-purple-400 font-bold font-mono text-xs uppercase flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Frameworks</div>
            <div className="flex flex-wrap gap-1.5">{["Spring Boot", "Spring Framework", "ReactJS", "Vue 3", "ASP.NET"].map(s => (<span key={s} className="bg-slate-950 text-slate-400 border border-slate-900/80 px-2 py-0.5 rounded text-xs font-mono">{s}</span>))}</div>
          </motion.div>
          
          {/* Khối Kỹ năng 3: Infrastructure */}
          <motion.div 
            variants={fadeInUpVariants}
            whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(16, 185, 129, 0.4)" }}
            className="bg-slate-900/40 border border-slate-800/60 p-5 rounded-xl space-y-3 transition-colors duration-300 shadow-sm"
          >
            <div className="text-emerald-400 font-bold font-mono text-xs uppercase flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Infrastructure</div>
            <div className="flex flex-wrap gap-1.5">{["PostgreSQL", "SQL Server", "MySQL", "Docker", "RESTful API", "JSON"].map(s => (<span key={s} className="bg-slate-950 text-slate-400 border border-slate-900/80 px-2 py-0.5 rounded text-xs font-mono">{s}</span>))}</div>
          </motion.div>
          
          {/* Khối Kỹ năng 4: Tools & Soft Skills */}
          <motion.div 
            variants={fadeInUpVariants}
            whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(244, 63, 94, 0.4)" }}
            className="bg-slate-900/40 border border-slate-800/60 p-5 rounded-xl space-y-3 transition-colors duration-300 shadow-sm"
          >
            <div className="text-pink-400 font-bold font-mono text-xs uppercase flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span> Tools & Soft Skills</div>
            <div className="flex flex-wrap gap-1.5">{["Git / GitHub", "Postman", "ChatGPT", "English (B1)", "Project Planning"].map(s => (<span key={s} className="bg-slate-950 text-slate-400 border border-slate-900/80 px-2 py-0.5 rounded text-xs font-mono">{s}</span>))}</div>
          </motion.div>
        </motion.div>
      </section>

      {/* EDUCATION - ĐÃ NÂNG CẤP ANIMATION */}
      <section id="education" className="max-w-4xl mx-auto px-6 py-20 border-t border-slate-900">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-2"
        >
          {t.eduSub}
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-white mb-10"
        >
          {t.eduTitle}
        </motion.h3>

        <div className="space-y-8 relative before:absolute before:top-2 before:bottom-2 before:left-2.5 before:w-px before:bg-slate-800">
          
          {/* Duy Tan University */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative pl-8 group"
          >
            <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 z-10 transition-transform group-hover:scale-125 duration-300"></div>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
              <div>
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">Duy Tan University</h4>
                <p className="text-xs text-slate-400 font-medium">Bachelor of Information Technology - CMU Software Engineering Program</p>
                <p className="text-xs text-slate-500 mt-2 max-w-xl">{t.eduDtuDesc}</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-500/5 px-2.5 py-1 rounded border border-cyan-500/10 shrink-0">2021 - 2025</span>
            </div>
          </motion.div>

          {/* Softech Aptech */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative pl-8 group"
          >
            <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-purple-400 z-10 transition-transform group-hover:scale-125 duration-300"></div>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
              <div>
                <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300">Softech Aptech International IT Training Center</h4>
                <p className="text-xs text-slate-400 font-medium">Advanced Diploma in Software Engineering (ADSE)</p>
                <p className="text-xs text-slate-500 mt-2 max-w-xl">{t.eduAptechDesc}</p>
              </div>
              <span className="text-xs font-mono text-purple-400 font-bold bg-purple-500/5 px-2.5 py-1 rounded border border-purple-500/10 shrink-0">2022 - 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTERESTS - ĐÃ NÂNG CẤP ANIMATION */}
      <section id="interests" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-widest text-emerald-400 uppercase mb-2"
        >
          {t.interestSub}
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-3xl font-bold text-white mb-4"
        >
          {t.interestTitle}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-slate-400 max-w-2xl mb-10 text-sm"
        >
          {t.interestDesc}
        </motion.p>

        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[[ '🥋', t.interest1Title, t.interest1Desc ], [ '🎬', t.interest2Title, t.interest2Desc ], [ '📸', t.interest3Title, t.interest3Desc ], [ '🎵', t.interest4Title, t.interest4Desc ]].map(([icon, title, desc], i) => (
            <motion.div 
              key={i} 
              variants={fadeInUpVariants}
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(16, 185, 129, 0.4)" }}
              className="p-5 bg-slate-900/30 border border-slate-800 rounded-xl transition-all duration-300 shadow-xs select-none"
            >
              <div className="text-xl mb-2">{icon}</div>
              <h4 className="font-bold text-white text-sm mb-1.5">{title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-20 border-t border-slate-900 text-center">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">{t.contactSub}</motion.h2>
        <motion.h3 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl font-extrabold text-white mb-4">{t.contactTitle}</motion.h3>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="text-slate-400 max-w-md mx-auto mb-10 text-xs md:text-sm leading-relaxed">{t.contactDesc}</motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-xs mx-auto bg-slate-900/50 border border-slate-800 p-4 rounded-xl space-y-3 text-left text-xs mb-8">
          <p><span className="text-slate-500 font-mono">EMAIL:</span> <a href={gmailComposeUrl} target="_blank" rel="noreferrer" className="text-white hover:text-cyan-400">baonguyen2002.tech@gmail.com</a></p>
          <p><span className="text-slate-500 font-mono">PHONE:</span> <a href="tel:0852461608" className="text-white hover:text-purple-400">0852461608</a></p>
          <p><span className="text-slate-500 font-mono">LINKEDIN:</span> <a href="https://linkedin.com/in/baonguyen2002tech" target="_blank" rel="noreferrer" className="text-white hover:text-blue-400">baonguyen2002tech</a></p>
        </motion.div>

        <motion.a href={gmailComposeUrl} target="_blank" rel="noreferrer" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-block bg-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-xl hover:opacity-90 text-xs shadow-md shadow-cyan-500/10 cursor-pointer">
          Send Email
        </motion.a>
      </section>

      {/* INTERACTIVE DEMO MODAL */}
      <AnimatePresence>
        {selectedProject && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
                
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                <h3 className="text-xs font-bold text-white truncate max-w-[70%] uppercase tracking-wider">
                    {selectedProject.title[lang]}
                </h3>
                <motion.button 
                    onClick={() => setSelectedProject(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg cursor-pointer"
                >
                    {t.close}
                </motion.button>
                </div>

                {selectedProject.demo && (
                <div className="flex border-b border-slate-800 bg-slate-950/20 p-1.5 gap-2">
                    <button 
                    onClick={() => setDemoTab('image')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        demoTab === 'image' 
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-md' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/55'
                    }`}
                    >
                    <span>🖼️</span> {lang === 'vi' ? 'Xem Hình ảnh' : lang === 'ja' ? '画像を見る' : 'View Image'}
                    </button>
                    <button 
                    onClick={() => setDemoTab('video')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        demoTab === 'video' 
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-md' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/55'
                    }`}
                    >
                    <span>🎥</span> {lang === 'vi' ? 'Xem Video Demo' : lang === 'ja' ? 'ビデオを見る' : 'View Video'}
                    </button>
                </div>
                )}

                <div className="p-6 flex flex-col items-center justify-center min-h-[300px] bg-slate-950/20 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {selectedProject.demo ? (
                    demoTab === 'image' ? (
                      <motion.div 
                        key="image-tab"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3 }}
                        className="w-full space-y-4 flex flex-col items-center"
                      >
                        {selectedProject.demo.images && selectedProject.demo.images.length > 0 ? (
                          <>
                            <img 
                              src={selectedProject.demo.images[currentImgIndex]} 
                              alt={`Project Preview ${currentImgIndex + 1}`} 
                              className="w-full h-auto max-h-[50vh] object-contain rounded-xl border border-slate-800 shadow-xl"
                            />
                            {selectedProject.demo.images.length > 1 && (
                              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                                {selectedProject.demo.images.map((_, idx) => (
                                  <motion.button
                                    key={idx}
                                    onClick={() => setCurrentImgIndex(idx)}
                                    whileHover={{ y: -1 }}
                                    className={`px-3 py-1 text-[10px] font-mono font-black rounded-md transition-all ${
                                      currentImgIndex === idx 
                                        ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                    }`}
                                  >
                                    {lang === 'vi' ? `Ảnh ${idx + 1}` : lang === 'ja' ? `画像 ${idx + 1}` : `Img ${idx + 1}`}
                                  </motion.button>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-xs text-slate-500 font-mono">// No screenshots available</p>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="video-tab"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3 }}
                        className="w-full space-y-4 flex flex-col items-center"
                      >
                        {selectedProject.demo.videos && selectedProject.demo.videos.length > 0 ? (
                          <>
                            <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-800 bg-black shadow-xl">
                              {selectedProject.demo.videos[currentVidIndex].includes('youtube.com') || selectedProject.demo.videos[currentVidIndex].includes('youtu.be') ? (
                                <iframe 
                                  className="w-full h-full" 
                                  src={selectedProject.demo.videos[currentVidIndex]} 
                                  title={`Demo Video Preview ${currentVidIndex + 1}`} 
                                  frameBorder="0" 
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                  allowFullScreen
                                ></iframe>
                              ) : (
                                <video className="w-full h-full" controls src={selectedProject.demo.videos[currentVidIndex]}></video>
                              )}
                            </div>
                            {selectedProject.demo.videos.length > 1 && (
                              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                                {selectedProject.demo.videos.map((_, idx) => (
                                  <motion.button
                                    key={idx}
                                    onClick={() => setCurrentVidIndex(idx)}
                                    whileHover={{ y: -1 }}
                                    className={`px-3 py-1 text-[10px] font-mono font-black rounded-md transition-all ${
                                      currentVidIndex === idx 
                                        ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                    }`}
                                  >
                                    {lang === 'vi' ? `Video ${idx + 1}` : lang === 'ja' ? `ビデオ ${idx + 1}` : `Vid ${idx + 1}`}
                                  </motion.button>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-xs text-slate-500 font-mono">Không có Video demo</p>
                        )}
                      </motion.div>
                    )
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6 space-y-4 max-w-md">
                      <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400 text-2xl">
                        🔒
                      </div>
                      
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-left space-y-2">
                        <p className="text-slate-300 text-xs leading-relaxed font-medium">
                          {t.noDemoSecurity}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
            </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* NÚT LƯỚT LÊN TRÊN CÙNG (SCROLL TO TOP) */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-cyan-500/50 text-cyan-400 shadow-2xl transition-all duration-300 cursor-pointer group flex items-center justify-center ${
          showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg 
          className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-slate-900/60 text-center text-[10px] text-slate-600 flex justify-between items-center">
        <p>© 2026 Tran Nguyen Bao.</p>
      </footer>
    </div>
  );
}