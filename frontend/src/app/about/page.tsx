"use client";

import { motion } from "framer-motion";
import { Leaf, Brain, Code, Target, Users, Zap } from "lucide-react";

const stats = [
  { icon: Target, value: "39", label: "Disease Classes" },
  { icon: Users, value: "14", label: "Crop Species" },
  { icon: Zap, value: "<5s", label: "Inference Time" },
  { icon: Brain, value: "98%", label: "Accuracy" },
];

const techCards = [
  { title: "TensorFlow", desc: "CNN model trained on 87K+ PlantVillage images" },
  { title: "Google Gemini", desc: "Advanced AI for generating treatment plans" },
  { title: "FastAPI", desc: "High-performance async Python backend" },
  { title: "Next.js 15", desc: "React framework with App Router" },
];

export default function AboutPage() {
  return (
    <section className="min-h-screen pt-28 pb-16" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
            style={{ background: "var(--primary)", color: "white" }}>
            <Leaf size={12} /> About LeafIQ
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
            AI-Powered Crop Protection
          </h1>
          <p className="mt-4 text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            LeafIQ is an open-source AI platform that helps farmers identify plant diseases
            instantly using deep learning. Our mission is to make professional plant pathology
            tools accessible to every farmer, regardless of their technical expertise or resources.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl p-5 text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <s.icon size={24} className="mx-auto mb-2" style={{ color: "var(--primary)" }} />
              <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl p-8 mb-12"
          style={{ background: "linear-gradient(135deg, var(--primary-dark), var(--primary))" }}>
          <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-outfit)" }}>Our Mission</h2>
          <p className="text-white/80 leading-relaxed">
            Crop diseases cause billions of dollars in losses annually, disproportionately affecting
            small-scale farmers in developing regions. LeafIQ democratizes access to AI-powered
            diagnostics, enabling early detection and effective treatment to protect food security worldwide.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
            <Code size={20} style={{ color: "var(--primary)" }} /> Technology Stack
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {techCards.map((t) => (
              <div key={t.title} className="rounded-xl p-4"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <h3 className="text-sm font-semibold">{t.title}</h3>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
