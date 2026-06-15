const fs = require('fs');

const file = 'c:/Portfolio/src/components/portfolio-page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace BlurReveal component with FadeUp
const blurRevealRegex = /function BlurReveal[\s\S]*?<\/motion\.div>\n\s*\}\n/m;
const fadeUpCode = `// Custom FadeUp component for a clean, professional scroll reveal
function FadeUp({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
`;
content = content.replace(blurRevealRegex, fadeUpCode);

// 2. Replace BlurReveal usages
content = content.replace(/BlurReveal/g, 'FadeUp');

// 3. Remove Top Scroll Progress Bar
const scrollBarRegex = /\{\/\* Scroll Progress Bar \*\/\}\n\s*<motion\.div\n\s*className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-50"\n\s*style=\{\{ scaleX \}\}\n\s*\/>/m;
content = content.replace(scrollBarRegex, '');

// 4. Add Hero Glow and make it relative overflow-hidden
const heroRegex = /<section\n\s*id="hero"\n\s*className="py-20 md:py-28 flex flex-col items-start justify-center border-b border-bordercol min-h-\[85vh\]"\n\s*>\n\s*<FadeUp className="flex flex-col items-start text-left space-y-8 w-full max-w-5xl">/;
const heroReplacement = `<section
          id="hero"
          className="relative py-20 md:py-28 flex flex-col items-start justify-center border-b border-bordercol min-h-[85vh] overflow-hidden"
        >
          {/* Subtle Orange Glow behind Hero */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
          
          <FadeUp className="relative z-10 flex flex-col items-start text-left space-y-8 w-full max-w-5xl">`;
content = content.replace(heroRegex, heroReplacement);

// 5. Enhance cards styling for "shine" effect
content = content.replace(/hover:border-orange-500\/40 transition-colors duration-200/g, 'hover:border-orange-500/50 hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)] transition-all duration-300');
content = content.replace(/className="group block relative bg-surface border border-bordercol rounded-2xl overflow-hidden hover:border-orange-500\/30 transition-colors"/g, 'className="group block relative bg-surface border border-bordercol rounded-2xl overflow-hidden hover:border-orange-500/50 hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)] transition-all duration-300"');

// 6. Support PDF rendering in Modal
const modalImageRegex = /<img\n\s*src=\{selectedImage\}\n\s*alt="Expanded view"\n\s*className="w-full object-contain max-h-\[90vh\] rounded-lg"\n\s*\/>/;
const modalReplacement = `{selectedImage.endsWith('.pdf') ? (
              <iframe src={selectedImage} className="w-full h-[85vh] rounded-lg" title="PDF viewer" />
            ) : (
              <img
                src={selectedImage}
                alt="Expanded view"
                className="w-full object-contain max-h-[90vh] rounded-lg"
              />
            )}`;
content = content.replace(modalImageRegex, modalReplacement);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated portfolio-page.tsx');
