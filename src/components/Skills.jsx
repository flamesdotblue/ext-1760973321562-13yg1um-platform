import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SKILLS = ['Python', 'PyTorch', 'TensorFlow', 'JAX', 'Transformers', 'LLMs', 'RAG', 'Vector DBs', 'Scikit-learn', 'NumPy', 'Pandas', 'FastAPI', 'Docker', 'Kubernetes', 'Airflow', 'Postgres', 'Redis', 'WebGL', 'Three.js', 'TypeScript', 'React', 'Next.js', 'Tailwind', 'D3'];

export default function Skills() {
  const containerRef = useRef(null);
  const [rot, setRot] = useState({ x: 15, y: -20 });

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      setRot({ x: (ny - 0.5) * -20 + 15, y: (nx - 0.5) * 30 - 20 });
    };
    const el = containerRef.current;
    el?.addEventListener('mousemove', onMove);
    return () => el?.removeEventListener('mousemove', onMove);
  }, []);

  const nodes = useMemo(() => {
    // fewer nodes on small screens for perf (LOD)
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const list = width < 640 ? SKILLS.slice(0, 12) : width < 1024 ? SKILLS.slice(0, 18) : SKILLS;
    const count = list.length;
    return list.map((label, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count); // sphere distribution
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = 220;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      return { label, x, y, z };
    });
  }, []);

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Skills</h2>
        <p className="mt-2 text-slate-300">A rotating 3D cloud of technologies I use.</p>
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-4xl h-[520px] sm:h-[560px] md:h-[600px] rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b141a] to-[#0a1217] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(600px_circle_at_50%_0%,rgba(100,255,218,0.1),transparent_60%)]" aria-hidden="true" />
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            aria-label="3D skill cloud"
            role="img"
            className="relative [transform-style:preserve-3d] will-change-transform"
            animate={{ rotateX: rot.x, rotateY: rot.y }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            style={{ width: 560, height: 560 }}
          >
            {nodes.map((n) => {
              const depth = (n.z + 300) / 600; // 0..1
              const scale = 0.8 + depth * 0.6;
              const opacity = 0.5 + depth * 0.5;
              return (
                <div
                  key={n.label}
                  className="absolute rounded-full border border-white/10 bg-white/5 text-slate-200 text-xs sm:text-sm px-3 py-1.5 select-none focus:outline-none focus:ring-2 focus:ring-[#64ffda]"
                  style={{
                    transform: `translate3d(${n.x}px, ${n.y}px, ${n.z}px) scale(${scale})`,
                    opacity,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                  }}
                  tabIndex={0}
                >
                  {n.label}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
