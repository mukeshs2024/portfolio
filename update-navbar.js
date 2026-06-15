const fs = require('fs');

const file = 'c:/Portfolio/src/components/portfolio-page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add isScrolled state
if (!content.includes('const [isScrolled')) {
  content = content.replace(
    /const \[mobileMenuOpen, setMobileMenuOpen\] = useState\(false\);/,
    `const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n  const [isScrolled, setIsScrolled] = useState(false);`
  );
}

// 2. Add isScrolled update logic
if (!content.includes('setIsScrolled(window.scrollY > 50)')) {
  content = content.replace(
    /let currentSection = "hero";/,
    `setIsScrolled(window.scrollY > 50);\n      let currentSection = "hero";`
  );
}

// 3. Add padding to the root wrapper
content = content.replace(
  /<div className="min-h-screen bg-darkbg text-white font-sans overflow-x-hidden">/,
  `<div className="min-h-screen bg-darkbg text-white font-sans overflow-x-hidden pt-[72px]">`
);

// 4. Rewrite the header
const headerRegex = /\{\/\* Navigation \*\/\}\n\s*<header[\s\S]*?<\/header>/m;
const newHeader = `{/* Navigation */}
      <header
        className={\`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 \${
          isScrolled
            ? "bg-black/90 backdrop-blur-md border-b border-[rgba(249,115,22,0.15)]"
            : "bg-transparent border-b border-transparent"
        }\`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <a href="#hero" className="text-xl font-bold tracking-tight text-white z-10">
            Mukesh S
          </a>
          
          <nav className="hidden md:flex items-center space-x-6 z-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={\`group relative py-2 px-1 text-sm font-semibold transition-colors \${
                  activeSection === link.href.slice(1) ? "text-orange-500" : "text-white hover:text-orange-400"
                }\`}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className={\`absolute left-1/2 bottom-0 h-[2px] bg-orange-500 transition-all duration-300 -translate-x-1/2 \${
                    activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                  }\`}
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
                    className={\`text-base font-semibold py-3 px-4 rounded-lg transition-colors \${
                      activeSection === link.href.slice(1)
                        ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                        : "text-white hover:bg-white/5"
                    }\`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>`;

content = content.replace(headerRegex, newHeader);
fs.writeFileSync(file, content, 'utf8');

// Append to globals.css
const cssFile = 'c:/Portfolio/src/app/globals.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');
if (!cssContent.includes('scroll-behavior: smooth')) {
  cssContent += '\n\nhtml {\n  scroll-behavior: smooth;\n}\n';
  fs.writeFileSync(cssFile, cssContent, 'utf8');
}

console.log('Successfully updated navbar and globals.css');
