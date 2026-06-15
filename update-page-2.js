const fs = require('fs');

const file = 'c:/Portfolio/src/components/portfolio-page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Hero Section update
const heroRegex = /(<section\s+id="hero"[\s\S]*?)<p className="text-xl sm:text-2xl md:text-\[24px\] text-gray-400 leading-relaxed">\s*\{heroContent\.summary\}\s*<\/p>([\s\S]*?<\/section>)/;
content = content.replace(heroRegex, (match, p1, p2) => {
    return p1 + p2 + `

        {/* ABOUT SECTION */}
        <section id="about" className="py-12 border-b border-bordercol">
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
        </section>`;
});

// 2. EXPERIENCE SECTION
const expRegex = /\{\/\* EXPERIENCE SECTION \*\/\}[\s\S]*?(?=\{\/\* PROJECTS SECTION \*\/\})/;
const expReplacement = `{/* EXPERIENCE SECTION */}
        <section id="experience" className="py-12 border-b border-bordercol relative">
          <FadeUp className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                Industry Experience
              </h2>
              <p className="text-sm text-secondary mt-1">Timeline of professional assignments and learning proofs</p>
            </div>

            <div className="relative pt-4">
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
// Reorder: Experience needs to be moved to after Projects.
// Oh wait, I will rewrite everything from SKILLS SECTION downwards.
// Let's just use string replacement for each block.

const skillsRegex = /\{\/\* SKILLS SECTION \*\/\}[\s\S]*?(?=\{\/\* CERTIFICATIONS SECTION \(Conditional\) \*\/\})/;
const projectsRegex = /\{\/\* PROJECTS SECTION \*\/\}[\s\S]*?(?=\{\/\* SKILLS SECTION \*\/\})/;

const newProjects = `{/* PROJECTS SECTION */}
        <section id="projects" className="py-12 border-b border-bordercol relative">
          <FadeUp className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                Featured Projects
              </h2>
              <p className="text-sm text-secondary mt-1">Evidence-driven case studies outlining data analytical outcomes</p>
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
                            <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold \${project.status === "Completed" ? "bg-green-950/40 text-green-400 border border-green-800/40" : "bg-orange-950/40 text-orange-400 border border-orange-800/40"}\`}>{project.status}</span>
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
        </section>
        
        `;

const newSkills = `{/* SKILLS SECTION */}
        <section id="skills" className="py-12 border-b border-bordercol">
          <FadeUp className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                Technical Skills
              </h2>
              <p className="text-sm text-secondary mt-1">Categorized tool proficiency for business analyst duties</p>
            </div>

            <div className="space-y-12">
              {skillGroups.map((group) => (
                <div key={group.title} className="space-y-5">
                  <h3 className="text-sm uppercase font-extrabold tracking-wider text-orange-500 border-b border-bordercol pb-2">
                    {group.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {group.items.map((skill) => (
                      <SkillCard key={skill} name={skill} category={group.title} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </section>

        `;

content = content.replace(expRegex, ""); // Remove Experience
content = content.replace(projectsRegex, ""); // Remove Projects
content = content.replace(skillsRegex, ""); // Remove Skills

// Now inject them in the correct order: Skills, Projects, Experience
const afterAboutRegex = /(<section id="about"[\s\S]*?<\/section>)/;
content = content.replace(afterAboutRegex, (match) => {
    return match + "\n\n" + newSkills + newProjects + expReplacement;
});


// 3. Education, Certifications, Hackathons, Contact
const bottomSectionsRegex = /\{\/\* CERTIFICATIONS SECTION \(Conditional\) \*\/\}[\s\S]*?(?=\{\/\* Footer \*\/})/m;

const newBottomSections = `{/* EDUCATION SECTION */}
        <section id="education" className="py-12 border-b border-bordercol">
          <FadeUp className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                Academic Background
              </h2>
              <p className="text-sm text-secondary mt-1">University education pathways</p>
            </div>

            <div className="max-w-4xl bg-surface border border-bordercol rounded-xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-orange-500/30 transition-colors">
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
          </FadeUp>
        </section>

        {/* CERTIFICATIONS SECTION (Conditional) */}
        {hasAnyCertImage && (
          <section id="certifications" className="py-12 border-b border-bordercol">
            <FadeUp className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                  Professional Certifications
                </h2>
                <p className="text-sm text-secondary mt-1">Verified academic courses and practical achievements</p>
              </div>

              <div className="grid gap-4 max-w-5xl">
                {certifications.map((cert, certIdx) => {
                  const hasCertImg = certExistsArray[certIdx];
                  if (!hasCertImg) return null;

                  return (
                    <div key={certIdx} className="bg-surface border border-bordercol rounded-xl p-4 flex flex-col sm:flex-row gap-6 items-center hover:border-orange-500/30 transition-colors">
                      {/* Thumbnail */}
                      <div className="w-full sm:w-1/3 aspect-[4/3] rounded-lg overflow-hidden bg-black border border-white/5 relative">
                        {cert.image.endsWith('.pdf') ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-60">
                            <FileText className="h-8 w-8 text-gray-500 mb-2" />
                            <span className="text-[10px] text-gray-500 font-semibold tracking-wider">PDF</span>
                          </div>
                        ) : (
                          <img
                            src={cert.image}
                            alt={cert.title}
                            loading="lazy"
                            className="w-full h-full object-cover opacity-80"
                          />
                        )}
                      </div>
                      
                      {/* Info */}
                      <div className="w-full sm:w-2/3 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                          <p className="text-sm font-semibold text-orange-500 mt-1">{cert.issuer}</p>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Verified credential outlining successful completion of coursework and practical assignments.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-950/40 text-green-400 border border-green-800/40">
                            Completed
                          </span>
                          <button
                            onClick={() => setSelectedImage(cert.image)}
                            className="inline-flex items-center px-4 py-2 border border-bordercol rounded-md text-xs font-bold text-white bg-gray-800/50 hover:bg-gray-800 transition-colors"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1.5 text-orange-400" />
                            View Certificate
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeUp>
          </section>
        )}

        {/* HACKATHONS & EVENTS SECTION (Conditional) */}
        {hasAnyEvents && (
          <section id="hackathons" className="py-12 border-b border-bordercol">
            <FadeUp className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                  Hackathons & Technical Events
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
                      className="bg-surface border border-bordercol rounded-xl overflow-hidden hover:border-orange-500/30 transition-colors group flex flex-col"
                    >
                      <div className="relative h-48 bg-black border-b border-white/5 overflow-hidden">
                        {images[0] && (
                          <img 
                            src={images[0]} 
                            alt={\`\${item.title} primary\`}
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

        {/* CONTACT SECTION */}
        <section id="contact" className="py-12">
          <FadeUp className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight uppercase">
                  Let's Connect
                </h2>
                <p className="text-sm text-secondary mt-1">Direct communication grids for analytics recruiters</p>
              </div>
              <a
                href={resumePath}
                className="group inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                download
              >
                <Download className="h-4 w-4 mr-2" />
                Download Full Resume
              </a>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {contactDetails.map((contact, idx) => {
                const getIcon = (label) => {
                  switch (label.toLowerCase()) {
                    case "email": return <Mail className="h-5 w-5 text-orange-500" />;
                    case "phone": return <Phone className="h-5 w-5 text-orange-500" />;
                    case "linkedin": return <Linkedin className="h-5 w-5 text-orange-500" />;
                    case "github": return <Github className="h-5 w-5 text-orange-500" />;
                    case "location": return <MapPin className="h-5 w-5 text-orange-500" />;
                    default: return null;
                  }
                };

                return (
                  <a
                    key={idx}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                    className="bg-surface border border-bordercol hover:border-orange-500/50 rounded-xl p-5 flex flex-col space-y-3 justify-between hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                        {contact.label}
                      </span>
                      {getIcon(contact.label)}
                    </div>
                    <p className="text-sm font-bold text-white truncate leading-tight mt-1">
                      {contact.value}
                    </p>
                  </a>
                );
              })}
            </div>
          </FadeUp>
        </section>

      </main>

      `;

content = content.replace(bottomSectionsRegex, newBottomSections);

fs.writeFileSync(file, content, 'utf8');
console.log("Rewrite successful!");
