import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [status, setStatus] = useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('done');
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Contact</h2>
        <p className="mt-2 text-slate-300">Let’s build something intelligent together.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c151b] to-[#0c1a22] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
          <form onSubmit={onSubmit} aria-label="Contact form">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-200">Name</label>
                <input id="name" name="name" type="text" required className="mt-2 w-full rounded-lg border border-white/10 bg-[#0a1217] px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#64ffda]" placeholder="Ada Lovelace" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-200">Email</label>
                <input id="email" name="email" type="email" required className="mt-2 w-full rounded-lg border border-white/10 bg-[#0a1217] px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#64ffda]" placeholder="ada@compute.org" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-200">Message</label>
                <textarea id="message" name="message" rows={5} required className="mt-2 w-full rounded-lg border border-white/10 bg-[#0a1217] px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#64ffda]" placeholder="Tell me about your project..." />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">I’ll get back within 1-2 business days.</p>
                <motion.button
                  type="submit"
                  disabled={status !== 'idle'}
                  whileHover={status === 'idle' ? { y: -2 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                  className={`relative inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition ${status === 'idle' ? 'text-[#64ffda] border border-[#64ffda]/40 bg-[#0b1a20]' : 'text-slate-400 border border-white/10 bg-white/5'}`}
                  aria-live="polite"
                >
                  <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: status === 'idle' ? 'inset 0 1px 0 rgba(100,255,218,0.15), 0 20px 40px -20px rgba(100,255,218,0.35)' : 'none' }} />
                  {status === 'idle' && 'Send Message'}
                  {status === 'loading' && (
                    <span className="inline-flex items-center gap-2"><span className="h-4 w-4 border-2 border-[#64ffda]/40 border-t-[#64ffda] rounded-full animate-spin" /> Sending</span>
                  )}
                  {status === 'done' && 'Sent ✓'}
                </motion.button>
              </div>
            </div>
          </form>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b141a] to-[#0a1217] p-6 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -inset-1 opacity-40 bg-[radial-gradient(400px_200px_at_20%_0%,rgba(100,255,218,0.2),transparent_60%),radial-gradient(400px_200px_at_80%_100%,rgba(100,255,218,0.1),transparent_60%)]" />
          <h3 className="relative text-xl font-semibold text-slate-100">Let’s collaborate</h3>
          <p className="relative mt-3 text-slate-300">
            I partner with startups and teams to ship AI-enabled products: prototyping, model evaluation, deployment, and delightful UX for complex systems.
          </p>
          <ul className="relative mt-5 space-y-2 text-sm text-slate-300">
            <li>• Rapid prototyping with notebooks-to-production workflows</li>
            <li>• MLOps: monitoring, evals, drift detection</li>
            <li>• Web performance: LOD, code-splitting, lazy loading</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
