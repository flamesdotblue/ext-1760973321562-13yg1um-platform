import { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Neural Style Transfer Studio',
    tags: ['PyTorch', 'WebGL', 'Workers'],
    desc: 'Interactive, GPU-accelerated style transfer with real-time previews and batching.',
  },
  {
    title: 'LLM-Powered Code Assistant',
    tags: ['Transformers', 'RAG', 'TypeScript'],
    desc: 'Context-aware code suggestions with embeddings, chunking, and secure tools.',
  },
  {
    title: 'Anomaly Detection Dashboard',
    tags: ['Time Series', 'scikit-learn', 'D3'],
    desc: 'Streaming analytics with multivariate models and actionable alerting.',
  },
  {
    title: 'Vision Pose Tracker',
    tags: ['ONNX', 'WebAssembly', 'WebRTC'],
    desc: 'Low-latency, in-browser pose tracking with model LOD and quantization.',
  },
];

function ProjectCard({ p, index }) {
  const [open, setOpen] = useState(false);

  const onMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rx', `${py * -8}deg`);
    el.style.setProperty('--ry', `${px * 10}deg`);
  };

  const onMouseLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty('--rx', `0deg`);
    el.style.setProperty('--ry', `0deg`);
  };

  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setOpen((s) => !s)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-expanded={open}
      aria-label={`${p.title} details`}
      className="group relative w-full text-left [transform-style:preserve-3d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda] rounded-xl"
      style={{ transform: 'perspective(1000px) rotateX(var(--rx, 0)) rotateY(var(--ry, 0))' }}
    >
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#0c151b] to-[#0c1a22] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-slate-100">{p.title}</h3>
          <span className="ml-3 inline-flex items-center rounded-md border border-[#64ffda]/30 bg-[#0b1a20] px-2 py-1 text-[11px] uppercase tracking-wide text-[#64ffda]">Project</span>
        </div>
        <p className="mt-3 text-sm text-slate-300/90">{p.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-300 border border-white/10">{t}</span>
          ))}
        </div>
        <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
          <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            <ul className="list-disc pl-5 space-y-1">
              <li>Optimized LOD: dynamically reduces shader complexity on low-power devices.</li>
              <li>Texture compression: webp sprites and reduced normal map sizes.</li>
              <li>Keyboard accessible: hit Enter/Space to toggle details.</li>
            </ul>
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" style={{ background: 'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(100,255,218,0.15), transparent 40%)' }} />
    </motion.button>
  );
}

export default function Projects() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Projects</h2>
          <p className="mt-2 text-slate-300">Interactive 3D cards that reveal details on hover and click.</p>
        </div>
        <a href="#contact" className="hidden sm:inline-flex items-center rounded-md border border-[#64ffda]/30 bg-[#11222b] px-4 py-2 text-sm font-medium text-[#64ffda] hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] focus:outline-none focus:ring-2 focus:ring-[#64ffda]">Hire Me</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </div>
  );
}
