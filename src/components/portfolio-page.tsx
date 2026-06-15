"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  ArrowRight,
  ExternalLink,
  Download,
  FileText,
  X,
  Menu,
} from "lucide-react";
import {
  navLinks,
  heroContent,
  experiences,
  projects,
  skillGroups,
  certifications,
  hackathonsAndEvents,
  education,
  resumePath,
  contactDetails,
  footerLinks,
} from "@/lib/portfolio";
import { TechBadge, SkillCard } from "@/components/tech-badge";
import { useImageExists, useExistingImages } from "@/lib/images";

// Custom Blur Reveal component to reuse animations once on scroll
function FadeUp({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StackedCard({ children, index, total }: { children: React.ReactNode, index: number, total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="md:sticky z-10 w-full"
      style={{
        top: `calc(100px + ${index * 30}px)`,
        zIndex: index + 10,
        marginBottom: index === total - 1 ? '0' : '25vh'
      }}
    >
      <div className="bg-[#0A0A0A] border border-[rgba(249,115,22,0.20)] rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.45)] hover:-translate-y-1 transition-transform duration-500 ease-out p-6 md:p-8 will-change-transform">
        {children}
      </div>
    </motion.div>
  );
}

export function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Progress Bar hooks
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Client-side image exist validations
  const profileExists = useImageExists(heroContent.profileImage);
  const cert1Exists = useImageExists(certifications[0]?.image);
  const cert2Exists = useImageExists(certifications[1]?.image);
  const cert3Exists = useImageExists(certifications[2]?.image);
  const cert4Exists = useImageExists(certifications[3]?.image);
  const certExistsArray = [cert1Exists, cert2Exists, cert3Exists, cert4Exists];
  const hasAnyCertImage = certExistsArray.some(Boolean);

  const exp1CertExists = useImageExists(experiences[0]?.certificateImage);
  const exp2CertExists = useImageExists(experiences[1]?.certificateImage);
  const expCertExistsArray = [exp1CertExists, exp2CertExists];

  const event1Images = useExistingImages(hackathonsAndEvents[0]?.images);
  const event2Images = useExistingImages(hackathonsAndEvents[1]?.images);
  const hasAnyEvents = event1Images.length > 0 || event2Images.length > 0;

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = navLinks.map((l) => l.href.slice(1));
      setIsScrolled(window.scrollY > 50);
      let currentSection = "home";
      const scrollPosition = window.scrollY + 250;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          currentSection = id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden pt-[72px]">
      
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md border-b border-[rgba(249,115,22,0.15)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <a href="#home" className="text-xl font-bold tracking-tight text-white z-10">
            Mukesh S
          </a>
          
          <nav className="hidden md:flex items-center space-x-6 z-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`group relative py-2 px-1 text-sm font-semibold transition-colors ${
                  activeSection === link.href.slice(1) ? "text-orange-500" : "text-white hover:text-orange-400"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className={`absolute left-1/2 bottom-0 h-[2px] bg-orange-500 transition-all duration-300 -translate-x-1/2 ${
                    activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-orange-500 focus:outline-none z-10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[rgba(249,115,22,0.15)] bg-black overflow-hidden"
            >
              <nav className="flex flex-col py-4 px-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-semibold py-3 px-4 rounded-lg transition-colors ${
                      activeSection === link.href.slice(1)
                        ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Content wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================= HOME SECTION ======================= */}
        <div id="home" className="flex flex-col pb-12 border-b border-bordercol">
          
          {/* HERO */}
          <section className="relative py-20 md:py-28 flex flex-col items-start justify-center min-h-[85vh] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <FadeUp className="relative z-10 flex flex-col items-start text-left space-y-8 w-full max-w-5xl">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                Open to Data Analyst Opportunities
              </span>

              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl md:text-[90px] md:leading-none tracking-tight font-extrabold text-white">
                  {heroContent.name}
                </h1>
                <p className="text-2xl sm:text-3xl md:text-[42px] font-bold text-orange-500">
                  {heroContent.role}
                </p>
              </div>
              
              <p className="text-[#94A3B8] font-semibold tracking-wider text-base sm:text-lg">
                {heroContent.techInline}
              </p>

              <div className="flex flex-wrap gap-4 pt-4 justify-start">
                <a
                  href="#projects"
                  className="group inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                >
                  View Projects
                  <motion.span className="ml-1.5" whileHover={{ x: 3 }} transition={{ type: "tween", duration: 0.15 }}>
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </a>
                <a
                  href={resumePath}
                  className="group inline-flex items-center px-5 py-2.5 border border-bordercol text-sm font-semibold rounded-md text-white bg-[#111] hover:bg-gray-800 transition-colors"
                  download
                >
                  Download Resume
                  <motion.span className="ml-1.5" whileHover={{ x: 3 }} transition={{ type: "tween", duration: 0.15 }}>
                    <Download className="h-4 w-4" />
                  </motion.span>
                </a>
                <a
                  href={heroContent.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center px-5 py-2.5 border border-bordercol text-sm font-semibold rounded-md text-white bg-[#111] hover:bg-gray-800 transition-colors"
                >
                  LinkedIn
                  <motion.span className="ml-1.5" whileHover={{ x: 3 }} transition={{ type: "tween", duration: 0.15 }}>
                    <ExternalLink className="h-4 w-4" />
                  </motion.span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full pt-8 mt-8 border-t border-bordercol">
                {heroContent.stats.map((stat) => (
                  <div key={stat.label} className="bg-[#111] border border-bordercol rounded-xl p-5 hover:border-orange-500/50 hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)] transition-all duration-300">
                    <p className="text-3xl sm:text-4xl md:text-[32px] font-extrabold text-orange-500">{stat.value}</p>
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mt-1.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </section>

          {/* ABOUT */}
          <section className="py-12 border-t border-bordercol mt-12">
            <FadeUp className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                  Data Analyst Profile
                </h2>
                <p className="text-sm text-secondary mt-1">Professional overview</p>
              </div>
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-medium">
                {heroContent.summary}
              </p>
            </FadeUp>
          </section>

          {/* HACKATHONS */}
          {hasAnyEvents && (
            <section className="py-12 border-t border-bordercol mt-12">
              <FadeUp className="space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                    Achievements & Hackathons
                  </h2>
                  <p className="text-sm text-secondary mt-1">Prototyping runs and team competitions</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
                  {hackathonsAndEvents.map((item, idx) => {
                    const images = idx === 0 ? event1Images : event2Images;
                    if (images.length === 0) return null;

                    return (
                      <div
                        key={idx}
                        className="bg-[#111] border border-bordercol rounded-xl overflow-hidden hover:border-orange-500/30 transition-colors group flex flex-col"
                      >
                        <div className="relative h-48 bg-black border-b border-white/5 overflow-hidden">
                          {images[0] && (
                            <img 
                              src={images[0]} 
                              alt={`${item.title} primary`}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{item.title}</h3>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <p className="text-sm text-gray-300 leading-relaxed mb-4">{item.description}</p>
                          
                          {images.length > 1 && (
                            <div className="flex gap-2 mt-auto">
                              {images.slice(1, 4).map((img, imgIdx) => (
                                <button
                                  key={imgIdx}
                                  onClick={() => setSelectedImage(img)}
                                  className="h-12 w-16 rounded border border-white/10 overflow-hidden hover:border-orange-500 transition-colors"
                                >
                                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FadeUp>
            </section>
          )}

          {/* EXPERIENCE */}
          <section className="py-12 border-t border-bordercol relative mt-12">
            <FadeUp className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                  Internship Experience
                </h2>
                <p className="text-sm text-secondary mt-1">Timeline of professional assignments</p>
              </div>

              <div className="relative pt-4">
                {experiences.map((exp, idx) => {
                  const certUrl = exp.certificateImage;
                  const hasCertificate = expCertExistsArray[idx];
                  return (
                    <StackedCard key={idx} index={idx} total={experiences.length}>
                      <div className={`grid gap-8 items-start ${hasCertificate ? "md:grid-cols-12" : "md:grid-cols-1"}`}>
                        <div className={`space-y-6 ${hasCertificate ? "md:col-span-7 lg:col-span-8" : ""}`}>
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                              <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                              <p className="text-base font-semibold text-orange-500 mt-1">{exp.organization}</p>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${exp.status === "Ongoing" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "bg-gray-800 text-white border border-white/5"}`}>
                                {exp.status}
                              </span>
                              <span className="text-sm font-semibold text-gray-300">{exp.duration}</span>
                            </div>
                          </div>

                          <ul className="list-disc list-inside text-sm md:text-base text-gray-200 space-y-2 pl-1 leading-relaxed">
                            {exp.responsibilities.map((resp, rIdx) => <li key={rIdx}>{resp}</li>)}
                          </ul>

                          <div className="space-y-2 pt-2">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-orange-500">Skills Used</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.tech.map((t) => <TechBadge key={t} name={t} compact />)}
                            </div>
                          </div>
                        </div>

                        {hasCertificate && certUrl && (
                          <div className="md:col-span-5 lg:col-span-4 flex flex-col space-y-4">
                            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-gray-900 flex items-center justify-center">
                              {certUrl.endsWith('.pdf') ? (
                                <div className="flex flex-col items-center justify-center">
                                  <FileText className="h-10 w-10 text-gray-500 mb-2" />
                                  <span className="text-xs text-gray-500 font-semibold">PDF DOCUMENT</span>
                                </div>
                              ) : (
                                <img src={certUrl} alt="Certificate preview" className="w-full h-full object-cover opacity-80" />
                              )}
                            </div>
                            <button
                              onClick={() => setSelectedImage(certUrl)}
                              className="w-full flex items-center justify-center px-4 py-2.5 border border-bordercol rounded-md text-sm font-semibold text-white bg-gray-800/50 hover:bg-gray-800 transition-colors"
                            >
                              <FileText className="h-4 w-4 mr-2 text-orange-400" />
                              View Certificate
                            </button>
                          </div>
                        )}
                      </div>
                    </StackedCard>
                  );
                })}
              </div>
            </FadeUp>
          </section>

          {/* EDUCATION (Brief) */}
          <section className="py-12 border-t border-bordercol mt-12">
            <FadeUp className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                  Education
                </h2>
                <p className="text-sm text-secondary mt-1">Academic pathway</p>
              </div>
              <div className="max-w-4xl bg-[#111] border border-bordercol rounded-xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-orange-500/30 transition-colors">
                <div>
                  <h3 className="text-xl font-bold text-white">{education.college}</h3>
                  <p className="text-base font-semibold text-orange-500 mt-1">{education.degree}</p>
                </div>
                <div className="sm:text-right sm:border-l border-bordercol sm:pl-6 py-2">
                  <p className="text-3xl font-extrabold text-orange-500 mt-1">{education.duration}</p>
                </div>
              </div>
            </FadeUp>
          </section>
        </div>

        {/* ======================= PROJECTS SECTION ======================= */}
        <div id="projects" className="py-16 border-b border-bordercol relative">
          <FadeUp className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                Featured Projects
              </h2>
              <p className="text-sm text-secondary mt-1">All project case studies</p>
            </div>

            <div className="relative pt-4">
              {projects.map((project, idx) => {
                return (
                  <StackedCard key={idx} index={idx} total={projects.length}>
                    <div className="grid md:grid-cols-12 gap-8 items-start">
                      <div className="md:col-span-7 lg:col-span-8 space-y-6">
                        <div>
                          <h4 className="text-xs uppercase font-extrabold tracking-wider text-orange-500 mb-1.5">Problem</h4>
                          <p className="text-gray-200 text-sm md:text-base leading-relaxed">{project.problem}</p>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase font-extrabold tracking-wider text-orange-500 mb-1.5">Solution</h4>
                          <p className="text-gray-200 text-sm md:text-base leading-relaxed">{project.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase font-extrabold tracking-wider text-orange-500 mb-1.5">Business Value</h4>
                          <p className="text-gray-200 text-sm md:text-base leading-relaxed">{project.businessValue}</p>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase font-extrabold tracking-wider text-orange-500 mb-1.5">Key Features</h4>
                          <ul className="list-disc list-inside text-gray-200 text-sm md:text-base space-y-1 pl-0.5 leading-relaxed">
                            {project.keyFeatures.map((feat, fIdx) => (
                              <li key={fIdx}>{feat}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="md:col-span-5 lg:col-span-4 bg-black/40 border border-white/5 rounded-xl p-6 space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white tracking-tight mb-3">{project.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-300">Status:</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${project.status === "Completed" ? "bg-green-950/40 text-green-400 border border-green-800/40" : "bg-orange-950/40 text-orange-400 border border-orange-800/40"}`}>{project.status}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                          {project.githubHref ? (
                            <a href={project.githubHref} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-bordercol rounded-md text-sm font-semibold text-white bg-gray-800/40 hover:bg-gray-800 transition-colors"><Github className="h-4 w-4" /> GitHub Repository</a>
                          ) : (
                            <span className="flex items-center justify-center gap-2 px-4 py-2.5 border border-white/5 rounded-md text-sm font-semibold text-gray-500 cursor-not-allowed"><Github className="h-4 w-4 opacity-40" /> Private Repository</span>
                          )}

                          {project.demoHref ? (
                            <a href={project.demoHref} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-transparent rounded-md text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-colors"><ExternalLink className="h-4 w-4" /> Live Demo</a>
                          ) : (
                            <span className="flex items-center justify-center gap-2 px-4 py-2.5 border border-white/5 rounded-md text-sm font-semibold text-gray-500 cursor-not-allowed"><ExternalLink className="h-4 w-4 opacity-40" /> Demo Unavailable</span>
                          )}
                        </div>

                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs uppercase font-extrabold tracking-wider text-orange-500">Tech Stack</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t) => (
                              <TechBadge key={t} name={t} compact />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </StackedCard>
                );
              })}
            </div>
          </FadeUp>
        </div>

        {/* ======================= SKILLS SECTION ======================= */}
        <div id="skills" className="py-16 border-b border-bordercol">
          <FadeUp className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                Technical Skills
              </h2>
              <p className="text-sm text-secondary mt-1">Categorized tool proficiency</p>
            </div>

            <div className="space-y-12">
              {skillGroups.map((group) => (
                <div key={group.title} className="space-y-5">
                  <h3 className="text-sm uppercase font-extrabold tracking-wider text-orange-500 border-b border-bordercol pb-2">
                    {group.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {group.items.map((skill) => (
                      <SkillCard key={skill} name={skill} category={group.title} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* ======================= RESUME SECTION ======================= */}
        <div id="resume" className="py-16 border-b border-bordercol">
          <FadeUp className="space-y-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                  Resume
                </h2>
                <p className="text-sm text-secondary mt-1">Academic details, certifications, and download</p>
              </div>
              <a
                href={resumePath}
                className="group inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-md shadow-lg text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                download
              >
                <Download className="h-5 w-5 mr-2" />
                Download Resume
              </a>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white border-b border-bordercol pb-2">Education</h3>
              <div className="max-w-4xl bg-[#111] border border-bordercol rounded-xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-orange-500/30 transition-colors">
                <div>
                  <h3 className="text-xl font-bold text-white">{education.college}</h3>
                  <p className="text-base font-semibold text-orange-500 mt-1">{education.degree}</p>
                  <p className="text-sm text-gray-400 mt-1">{education.duration}</p>
                </div>
                <div className="sm:text-right sm:border-l border-bordercol sm:pl-6 py-2">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-gray-400">CGPA</p>
                  <p className="text-3xl font-extrabold text-orange-500 mt-1">{education.cgpa}</p>
                </div>
              </div>
            </div>

            {hasAnyCertImage && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white border-b border-bordercol pb-2">Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
                  {certifications.map((cert, certIdx) => {
                    const hasCertImg = certExistsArray[certIdx];
                    if (!hasCertImg) return null;

                    return (
                      <div key={certIdx} className="bg-[#111] border border-bordercol rounded-xl p-4 flex items-center gap-4 hover:border-orange-500/50 transition-colors">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-black border border-white/5 flex-shrink-0 flex items-center justify-center relative cursor-pointer" onClick={() => setSelectedImage(cert.image)}>
                          {cert.image.endsWith('.pdf') ? (
                            <FileText className="h-6 w-6 text-gray-500" />
                          ) : (
                            <img src={cert.image} alt={cert.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-white truncate">{cert.title}</h3>
                          <p className="text-xs font-semibold text-orange-500 mt-0.5 truncate">{cert.issuer}</p>
                        </div>

                        <button
                          onClick={() => setSelectedImage(cert.image)}
                          className="p-2 border border-bordercol rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors flex-shrink-0"
                          aria-label="View Certificate"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </FadeUp>
        </div>

        {/* ======================= PROFILES SECTION ======================= */}
        <div id="profiles" className="py-16">
          <FadeUp className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                Profiles
              </h2>
              <p className="text-sm text-secondary mt-1">Direct communication and professional links</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {contactDetails.map((contact, idx) => {
                const getIcon = (label: string) => {
                  switch (label.toLowerCase()) {
                    case "email": return <Mail className="h-6 w-6 text-orange-500" />;
                    case "phone": return <Phone className="h-6 w-6 text-orange-500" />;
                    case "linkedin": return <Linkedin className="h-6 w-6 text-orange-500" />;
                    case "github": return <Github className="h-6 w-6 text-orange-500" />;
                    case "location": return <MapPin className="h-6 w-6 text-orange-500" />;
                    case "leetcode": return <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" className="h-6 w-6 filter invert opacity-80 hue-rotate-180 sepia brightness-150 text-orange-500" alt="LeetCode" />;
                    default: return <ExternalLink className="h-6 w-6 text-orange-500" />;
                  }
                };

                return (
                  <a
                    key={idx}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                    className="bg-[#111] border border-bordercol hover:border-orange-500/50 rounded-xl p-5 flex flex-col items-center text-center space-y-4 justify-center hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="p-3 bg-black/40 rounded-full border border-white/5">
                      {getIcon(contact.label)}
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        {contact.label}
                      </span>
                      <p className="text-sm font-bold text-white truncate w-full max-w-[100px] leading-tight">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </FadeUp>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-bordercol py-10 text-center text-xs text-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="font-bold text-white text-sm">
            Mukesh S · Data Analyst Candidate · Coimbatore
          </p>
          <div className="flex justify-center space-x-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-500 transition-colors font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-[10px] pt-2">
            &copy; {new Date().getFullYear()} Mukesh S. Data Analyst Candidate. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Fullscreen Certificate/Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[90vh] bg-[#111] rounded-xl p-2 shadow-2xl overflow-hidden border border-bordercol"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/80 hover:bg-black text-white rounded-full shadow-md transition-colors z-10 border border-white/5"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
              {selectedImage.endsWith('.pdf') ? (
                <iframe
                  src={selectedImage}
                  className="w-full h-[85vh] rounded-lg bg-white"
                  title="PDF preview"
                />
              ) : (
                <img
                  src={selectedImage}
                  alt="Certificate / Image Preview"
                  className="max-w-full max-h-[85vh] object-contain rounded-lg"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
