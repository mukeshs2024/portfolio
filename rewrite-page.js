const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/components/portfolio-page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// The goal is to wrap the components into the 5 main sections: home, projects, skills, resume, profiles

// Let's replace the ids of the original sections so they don't conflict with the new navigation wrappers
content = content.replace(/<section\s+id="hero"/g, '<section id="hero-inner"');
content = content.replace(/<section id="about"/g, '<section id="about-inner"');
content = content.replace(/<section id="experience"/g, '<section id="experience-inner"');
content = content.replace(/<section id="education"/g, '<section id="education-inner"');
content = content.replace(/<section id="hackathons"/g, '<section id="hackathons-inner"');
content = content.replace(/<section id="projects"/g, '<section id="projects-inner"');
content = content.replace(/<section id="skills"/g, '<section id="skills-inner"');
content = content.replace(/<section id="certifications"/g, '<section id="certifications-inner"');
content = content.replace(/<section id="contact"/g, '<section id="contact-inner"');

// 1. HOME section: Wrap Hero, About, Experience, Education, Hackathons
const homeWrapperStart = `
        {/* --- HOME SECTION WRAPPER --- */}
        <div id="home" className="pt-2">
`;
const homeWrapperEnd = `
        </div>
        {/* --- END HOME SECTION WRAPPER --- */}
`;

// Where does home start? Just before Hero
content = content.replace(/{[\s]*\/\* HERO SECTION \*\//, homeWrapperStart + '        {/* HERO SECTION */');

// Where does home end? After Hackathons.
// Hackathons is a conditional section: {hasAnyEvents && ( ... )}
// Let's find the end of the hackathons section.
// It ends right before {/* CONTACT SECTION */}
content = content.replace(/{[\s]*\/\* CONTACT SECTION \*\//, homeWrapperEnd + '\n        {/* CONTACT SECTION */');

// 2. We need to move SKILLS and PROJECTS.
// Currently the order is: Hero, About, Skills, Projects, Experience, Education, Certifications, Hackathons, Contact
// Wait, Skills and Projects are currently BEFORE Experience.
// We need to move Experience, Education, Hackathons to be part of HOME, BEFORE Projects and Skills.
// This is getting tricky to just regex. Let's rewrite the layout section in the script.

const newLayout = `
        {/* --- HOME SECTION WRAPPER --- */}
        <div id="home" className="flex flex-col">
          {/* HERO */}
          <section id="hero-inner" className="relative py-20 md:py-28 flex flex-col items-start justify-center border-b border-bordercol min-h-[85vh] overflow-hidden">
             {/* Copy hero content here... actually I will build the whole file string to be safe */}
`;

// It's much safer to just provide the complete file content.
