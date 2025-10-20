import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Mail } from 'lucide-react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

export default function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handler = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0f14] text-slate-200 antialiased overflow-x-hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-slate-900 focus:text-[#64ffda] focus:px-3 focus:py-2 focus:rounded-md">Skip to content</a>

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/5">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Primary">
          <a href="#home" className="font-semibold tracking-tight text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#64ffda] rounded">AI/ML Developer</a>
          <div className="flex items-center gap-6">
            <a href="#projects" className="text-sm text-slate-300 hover:text-[#64ffda] focus:outline-none focus:ring-2 focus:ring-[#64ffda] rounded">Projects</a>
            <a href="#skills" className="text-sm text-slate-300 hover:text-[#64ffda] focus:outline-none focus:ring-2 focus:ring-[#64ffda] rounded">Skills</a>
            <a href="#contact" className="text-sm text-slate-300 hover:text-[#64ffda] focus:outline-none focus:ring-2 focus:ring-[#64ffda] rounded">Contact</a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-md border border-[#64ffda]/30 bg-[#11222b] px-4 py-2 text-sm font-medium text-[#64ffda] shadow-[0_0_0_0_rgba(100,255,218,0.4)] transition duration-300 hover:shadow-[0_0_40px_0_rgba(100,255,218,0.15)] focus:outline-none focus:ring-2 focus:ring-[#64ffda]">
              <Rocket size={16} /> View My Work
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section id="home" aria-label="Hero and About">
          <Hero />
        </section>

        <motion.div style={{ y: y1 }} aria-hidden="true" className="pointer-events-none select-none">
          <div className="h-24 bg-gradient-to-b from-transparent to-white/[0.02]" />
        </motion.div>

        <section id="projects" aria-label="Projects" className="relative">
          <Projects />
        </section>

        <motion.div style={{ y: y2 }} aria-hidden="true" className="pointer-events-none select-none">
          <div className="h-16 bg-gradient-to-b from-transparent to-white/[0.02]" />
        </motion.div>

        <section id="skills" aria-label="Skills" className="relative">
          <Skills />
        </section>

        <section id="contact" aria-label="Contact">
          <Contact />
        </section>
      </main>

      <footer className="py-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} AI/ML Developer. Built with React, Tailwind, and Spline.</p>
          <p className="mt-2 inline-flex items-center gap-2 text-slate-400"><Mail size={14}/> <a href="#contact" className="hover:text-[#64ffda] focus:outline-none focus:ring-2 focus:ring-[#64ffda] rounded">Get in touch</a></p>
        </div>
      </footer>
    </div>
  );
}
