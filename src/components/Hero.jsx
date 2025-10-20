import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.height / 2) / rect.height;
      setParallax({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-[120vh] md:min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} onLoad={() => setLoaded(true)} aria-label="Interactive 3D Scene" />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-black/20 to-[#0a0f14]/90" />

      {!loaded && (
        <div className="absolute inset-0 grid place-items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.2 }} className="w-16 h-16 rounded-full border-2 border-[#64ffda]/40 border-t-[#64ffda] animate-spin-slow" aria-live="polite" aria-busy="true" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        <motion.div style={{ transform: `translate3d(${parallax.x * 10}px, ${parallax.y * 10}px, 0)` }} className="max-w-3xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-100">
            Building intelligent experiences in 3D
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="mt-5 text-lg md:text-xl text-slate-300">
            I’m an AI/ML developer specializing in interactive, performant web experiences. Explore neural-inspired visuals, data-driven projects, and immersive interactions.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="group relative inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#64ffda]">
              <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#64ffda]/20 to-cyan-400/10 blur transition-opacity duration-300 group-hover:opacity-90 pointer-events-none" />
              <span className="relative rounded-lg border border-[#64ffda]/30 bg-[#0b1a20]/70 text-[#64ffda] shadow-[inset_0_1px_0_0_rgba(100,255,218,0.15)] group-hover:translate-y-[-2px] group-active:translate-y-0 transition-transform px-6 py-3">View My Work</span>
            </a>
            <a href="#contact" className="group relative inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#64ffda]">
              <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-white/5 blur transition-opacity duration-300 group-hover:opacity-90 pointer-events-none" />
              <span className="relative rounded-lg border border-white/10 bg-white/5 text-slate-100 group-hover:translate-y-[-2px] group-active:translate-y-0 transition-transform px-6 py-3">Get In Touch</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <section id="about" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="md:col-span-2 flex items-center justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 [transform-style:preserve-3d]" aria-hidden="true">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#64ffda]/30 to-cyan-400/10" />
              <motion.div style={{ rotateX: parallax.y * -10, rotateY: parallax.x * 10 }} className="absolute inset-3 rounded-full bg-[#0f1a20] border border-white/10 shadow-2xl grid place-items-center">
                <User className="text-[#64ffda]" size={56} aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="md:col-span-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">About Me</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              I create AI-first products, blending machine learning, data visualization, and 3D to craft delightful, accessible interfaces. My focus areas include generative models, real-time inference pipelines, and intuitive human-in-the-loop tooling.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#64ffda]" /> Neural networks & LLMs</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#64ffda]" /> Real-time data viz</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#64ffda]" /> Edge + cloud inference</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#64ffda]" /> Accessible interactions</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
