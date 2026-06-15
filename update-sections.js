const fs = require('fs');

const file = 'c:/Portfolio/src/components/portfolio-page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add StackedCard Component right after FadeUp
const fadeUpEnd = /function FadeUp[\s\S]*?<\/motion\.div>\n\s*\}/m;
const stackedCardCode = `\n
function StackedCard({ children, index, total }: { children: React.ReactNode, index: number, total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="md:sticky z-10 w-full"
      style={{
        top: \`calc(100px + \${index * 30}px)\`,
        zIndex: index + 10,
        marginBottom: index === total - 1 ? '0' : '25vh'
      }}
    >
      <div className="bg-[#0A0A0A] border border-[rgba(249,115,22,0.20)] rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.45)] hover:-translate-y-1 transition-transform duration-500 ease-out p-6 md:p-8 will-change-transform">
        {children}
      </div>
    </motion.div>
  );
}`;
content = content.replace(fadeUpEnd, match => match + stackedCardCode);

// 2. Rewrite EXPERIENCE SECTION
const experienceRegex = /\{\/\* EXPERIENCE SECTION \*\/\}[\s\S]*?(?=\{\/\* PROJECTS SECTION \*\/\})/m;
const newExperience = `{/* EXPERIENCE SECTION */}
        <section id="experience" className="py-16 md:py-20 border-b border-bordercol relative">
          <FadeUp className="space-y-10">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                INTERNSHIPS
              </h2>
              <p className="text-sm text-secondary mt-1">Timeline of professional assignments and learning proofs</p>
            </div>

            <div className="relative pt-8">
              {experiences.map((exp, idx) => {
                const certUrl = exp.certificateImage;
                const hasCertificate = expCertExistsArray[idx];
                
                return (
                  <StackedCard key={idx} index={idx} total={experiences.length}>
                    <div className={\`grid gap-8 items-start \${hasCertificate ? "md:grid-cols-12" : "md:grid-cols-1"}\`}>
                      <div className={\`space-y-6 \${hasCertificate ? "md:col-span-7 lg:col-span-8" : ""}\`}>
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                            <p className="text-base font-semibold text-orange-500 mt-1">{exp.organization}</p>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <span
                              className={\`text-xs font-semibold px-3 py-1 rounded-full \${
                                exp.status === "Ongoing"
                                  ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                  : "bg-gray-800 text-white border border-white/5"
                              }\`}
                            >
                              {exp.status}
                            </span>
                            <span className="text-sm font-semibold text-gray-300">{exp.duration}</span>
                          </div>
                        </div>

                        <ul className="list-disc list-inside text-sm md:text-base text-gray-200 space-y-2 pl-1 leading-relaxed">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx}>{resp}</li>
                          ))}
                        </ul>

                        <div className="space-y-2 pt-2">
                          <h4 className="text-xs uppercase font-extrabold tracking-wider text-orange-500">Skills Used</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.tech.map((t) => (
                              <TechBadge key={t} name={t} compact />
                            ))}
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

        `;
content = content.replace(experienceRegex, newExperience);


// 3. Rewrite PROJECTS SECTION
const projectsRegex = /\{\/\* PROJECTS SECTION \*\/\}[\s\S]*?(?=\{\/\* SKILLS SECTION \*\/\})/m;
const newProjects = `{/* PROJECTS SECTION */}
        <section id="projects" className="py-16 md:py-20 border-b border-bordercol relative">
          <FadeUp className="space-y-10">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                PROJECTS
              </h2>
              <p className="text-sm text-secondary mt-1">Evidence-driven case studies outlining data analytical outcomes</p>
            </div>

            <div className="relative pt-8">
              {projects.map((project, idx) => {
                return (
                  <StackedCard key={idx} index={idx} total={projects.length}>
                    <div className="grid md:grid-cols-12 gap-8 items-start">
                      {/* Left: Problem, Solution, Value, Features */}
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

                      {/* Right: Status, GitHub, Demo, Tech Stack */}
                      <div className="md:col-span-5 lg:col-span-4 bg-black/40 border border-white/5 rounded-xl p-6 space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-300">Status:</span>
                            <span
                              className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold \${
                                project.status === "Completed"
                                  ? "bg-green-950/40 text-green-400 border border-green-800/40"
                                  : "bg-orange-950/40 text-orange-400 border border-orange-800/40"
                              }\`}
                            >
                              {project.status}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                          {project.githubHref ? (
                            <a
                              href={project.githubHref}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-bordercol rounded-md text-sm font-semibold text-white bg-gray-800/40 hover:bg-gray-800 transition-colors"
                            >
                              <Github className="h-4 w-4" />
                              GitHub Repository
                            </a>
                          ) : (
                            <span className="flex items-center justify-center gap-2 px-4 py-2.5 border border-white/5 rounded-md text-sm font-semibold text-gray-500 cursor-not-allowed">
                              <Github className="h-4 w-4 opacity-40" />
                              Private Repository
                            </span>
                          )}

                          {project.demoHref ? (
                            <a
                              href={project.demoHref}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-transparent rounded-md text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </a>
                          ) : (
                            <span className="flex items-center justify-center gap-2 px-4 py-2.5 border border-white/5 rounded-md text-sm font-semibold text-gray-500 cursor-not-allowed">
                              <ExternalLink className="h-4 w-4 opacity-40" />
                              Demo Unavailable
                            </span>
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
        </section>

        `;
content = content.replace(projectsRegex, newProjects);


// 4. Rewrite CERTIFICATIONS SECTION
const certRegex = /\{\/\* CERTIFICATIONS SECTION \(Conditional\) \*\/\}[\s\S]*?(?=\{\/\* HACKATHONS & EVENTS SECTION \(Conditional\) \*\/\})/m;
const newCerts = `{/* CERTIFICATIONS SECTION (Conditional) */}
        {hasAnyCertImage && (
          <section id="certifications" className="py-16 md:py-20 border-b border-bordercol relative">
            <FadeUp className="space-y-10">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                  Verified Certifications
                </h2>
                <p className="text-sm text-secondary mt-1">Valid academic courses and internship certificates</p>
              </div>

              <div className="relative pt-8">
                {certifications.map((cert, certIdx) => {
                  const hasCertImg = certExistsArray[certIdx];
                  if (!hasCertImg) return null;

                  return (
                    <StackedCard key={certIdx} index={certIdx} total={certifications.length}>
                      <div className="grid md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-5 space-y-4">
                          <h3 className="text-2xl font-bold text-white leading-snug">
                            {cert.title}
                          </h3>
                          <p className="text-sm font-semibold text-orange-500">{cert.issuer}</p>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            A verified credential outlining successful completion of coursework and practical assignments.
                          </p>
                          <button
                            onClick={() => setSelectedImage(cert.image)}
                            className="inline-flex items-center mt-4 px-4 py-2.5 border border-orange-500/50 rounded-md text-sm font-semibold text-orange-400 hover:bg-orange-500/10 transition-colors"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Full Certificate
                          </button>
                        </div>
                        
                        <div className="md:col-span-7">
                          <button
                            onClick={() => setSelectedImage(cert.image)}
                            className="group relative block w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-lg cursor-zoom-in bg-black"
                            aria-label={\`View full certificate: \${cert.title}\`}
                          >
                            {cert.image.endsWith('.pdf') ? (
                              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                                <FileText className="h-16 w-16 text-gray-500 mb-3" />
                                <span className="text-sm text-gray-500 font-semibold tracking-wider">PDF DOCUMENT</span>
                              </div>
                            ) : (
                              <img
                                src={cert.image}
                                alt={cert.title}
                                loading="lazy"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                              <FileText className="text-white opacity-0 group-hover:opacity-100 h-10 w-10 drop-shadow-md" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </StackedCard>
                  );
                })}
              </div>
            </FadeUp>
          </section>
        )}

        `;
content = content.replace(certRegex, newCerts);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated sections');
