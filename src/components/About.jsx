import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Avatar3D() {
  return (
    <div aria-label="3D avatar" role="img" className="mx-auto w-40 h-40 sm:w-48 sm:h-48 [perspective:800px]">
      <div className="relative w-full h-full mx-auto [transform-style:preserve-3d] animate-[spinY_14s_linear_infinite]">
        {[0,1,2,3,4,5].map((face) => (
          <div
            key={face}
            className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-lg shadow-black/40"
            style={{
              transform:
                face === 0 ? 'translateZ(40px)' :
                face === 1 ? 'rotateY(90deg) translateZ(40px)' :
                face === 2 ? 'rotateY(180deg) translateZ(40px)' :
                face === 3 ? 'rotateY(-90deg) translateZ(40px)' :
                face === 4 ? 'rotateX(90deg) translateZ(40px)' :
                'rotateX(-90deg) translateZ(40px)'
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(100,255,218,0.25),transparent_60%)]" />
          </div>
        ))}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-black/50 blur-xl" aria-hidden />
      </div>
    </div>
  );
}

function SkillCloud() {
  const skills = [
    'Python','TensorFlow','PyTorch','scikit-learn','NLP','Computer Vision','MLOps','Docker','Kubernetes','FastAPI','Pandas','NumPy','XGBoost','LLMs','Transformers','LangChain','RAG','Vector DBs','Data Viz','Time Series'
  ];
  return (
    <div aria-label="3D skill cloud" className="relative mx-auto w-full max-w-3xl h-72 sm:h-80 [perspective:1000px]">
      <div className="absolute inset-0 mx-auto [transform-style:preserve-3d] animate-[spinY_30s_linear_infinite]">
        {skills.map((s, i) => {
          const angle = (i / skills.length) * Math.PI * 2;
          const y = Math.sin(angle) * 80;
          const x = Math.cos(angle) * 140;
          const z = Math.sin(angle * 2) * 80;
          const depth = Math.max(0.4, (z + 100) / 200);
          return (
            <span
              key={s}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm font-medium"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                color: `rgba(255,255,255,${0.6 + depth * 0.4})`,
                background: `rgba(100,255,218,${0.05 + depth * 0.1})`,
                border: `1px solid rgba(100,255,218,${0.2 + depth * 0.2})`,
                filter: `blur(${(1 - depth) * 0.5}px)`
              }}
            >{s}</span>
          );
        })}
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(100,255,218,0.10),transparent)] pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 id="about-title" className="text-3xl sm:text-4xl font-bold text-white">About Me</h2>
          <p className="mt-4 text-zinc-300 leading-relaxed">
            I am an AI/ML developer focused on transforming complex data into intuitive products. I design robust training pipelines, scalable inference services, and human-centered interfaces. I love bringing models to life with interactive 3D visualizations and thoughtful UX.
          </p>
          <ul className="mt-6 space-y-2 text-zinc-300">
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#64ffda]" /><span>End-to-end ML: data engineering, modeling, evaluation, and deployment</span></li>
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#64ffda]" /><span>Experience with LLMs, RAG systems, and real-time inference</span></li>
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#64ffda]" /><span>Performance-minded: quantization, batching, caching, LOD for web 3D</span></li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center gap-8"
        >
          <Avatar3D />
          <SkillCloud />
        </motion.div>
      </div>
    </section>
  );
}

// Keyframes
const style = document.createElement('style');
style.innerHTML = `@keyframes spinY { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }`;
document.head.appendChild(style);
