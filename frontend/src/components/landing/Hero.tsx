"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, ArrowRight, Sparkles, Hexagon } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] w-full overflow-hidden flex items-center pt-24"
      style={{ background: "var(--bg)" }}
    >
      {/* --- Abstract Animated Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 animate-spin-slow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
        >
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)" }} />
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-30 animate-pulse-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
        </motion.div>

        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[40vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] opacity-20">
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }} />
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12 flex flex-col items-center text-center">
        
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-5 py-2 backdrop-blur-md"
          style={{
            borderColor: "rgba(167, 198, 218, 0.3)", // accent-blue
            background: "linear-gradient(135deg, rgba(238, 252, 206, 0.1), rgba(158, 178, 93, 0.05))",
            boxShadow: "0 0 20px rgba(167, 198, 218, 0.15)",
          }}
        >
          <Sparkles size={14} style={{ color: "var(--accent)" }} />
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--text)]">
            Next-Gen AI Crop Diagnostics
          </span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.3 }}
          className="max-w-5xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-[5.5rem] leading-[1.1]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <span style={{ color: "var(--text)" }}>Protect Your Harvest</span>
          <br />
          <span
            className="inline-block text-transparent bg-clip-text animate-gradient"
            style={{
              backgroundImage: "linear-gradient(to right, var(--primary), var(--accent-light), var(--accent-blue))",
              backgroundSize: "200% auto",
            }}
          >
            with Absolute Precision
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-[var(--text-muted)] font-medium"
        >
          Upload a photo of any plant leaf and our advanced neural network will identify diseases instantly. Get tailored organic and chemical treatment plans powered by Google Gemini.
        </motion.p>

        {/* Interactive CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center w-full max-w-md sm:max-w-none"
        >
          <Link href="/detect" className="w-full sm:w-auto relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--accent-blue)] opacity-70 blur-lg transition duration-500 group-hover:opacity-100 group-hover:duration-200" />
            <button className="relative w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl px-10 py-4 font-bold text-[#1a2416] transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-light))" }}>
              <Leaf size={18} />
              Start Scanning
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </Link>

          <Link href="/about" className="w-full sm:w-auto">
            <button className="relative w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl px-10 py-4 font-bold transition-all hover:bg-[var(--surface)] hover:shadow-lg"
              style={{ color: "var(--text)", border: "1px solid var(--border-glass)", background: "var(--surface-glass)", backdropFilter: "blur(12px)" }}>
              <Hexagon size={18} style={{ color: "var(--primary)" }} />
              How it Works
            </button>
          </Link>
        </motion.div>

        {/* Glassmorphism Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 rounded-3xl p-8 w-full max-w-4xl"
          style={{
            opacity,
            background: "var(--surface-glass)",
            backdropFilter: "blur(24px)",
            border: "1px solid var(--border-glass)",
            boxShadow: "0 24px 48px -12px rgba(158, 178, 93, 0.15)",
          }}
        >
          {[
            { value: "39", label: "Diseases Detected", color: "var(--primary)" },
            { value: "14", label: "Crop Species", color: "var(--accent-blue)" },
            { value: "98%", label: "Accuracy Rate", color: "var(--accent-light)" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center justify-center relative">
              {i !== 0 && (
                <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12" style={{ background: "var(--border-glass)" }} />
              )}
              <div
                className="text-4xl font-extrabold tracking-tighter"
                style={{ color: stat.color, fontFamily: "var(--font-outfit)", textShadow: `0 0 20px ${stat.color}40` }}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-semibold tracking-wide uppercase" style={{ color: "var(--text-light)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
