"use client";

import { motion } from "framer-motion";
import { Brain, Database, Sparkles, Server } from "lucide-react";

const techStack = [
  {
    icon: Brain,
    title: "Deep Learning Model",
    desc: "Convolutional neural network trained on 87,000+ images from the PlantVillage dataset with 98% validation accuracy.",
  },
  {
    icon: Sparkles,
    title: "Google Gemini AI",
    desc: "Gemini 2.0 Flash generates detailed, context-aware treatment plans tailored to each specific disease diagnosis.",
  },
  {
    icon: Server,
    title: "FastAPI Backend",
    desc: "High-performance async Python backend with intelligent caching and model-pooling for minimal latency.",
  },
  {
    icon: Database,
    title: "Smart Caching",
    desc: "In-memory response caching ensures repeated queries are answered instantly without extra API calls.",
  },
];

export function AITechnology() {
  return (
    <section className="py-20" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
              Technology
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
              State-of-the-Art AI Under the Hood
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              LeafIQ combines a purpose-built convolutional neural network with
              Google&apos;s latest generative AI to deliver accurate diagnoses and
              actionable treatment plans in seconds.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {techStack.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <t.icon size={20} style={{ color: "var(--primary)" }} className="mb-2" />
                  <h4 className="text-sm font-semibold">{t.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {t.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            <div
              className="relative h-64 w-64 md:h-80 md:w-80 rounded-full animate-pulse-glow flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, var(--primary-dark), var(--primary))",
              }}
            >
              <div
                className="h-48 w-48 md:h-60 md:w-60 rounded-full flex items-center justify-center"
                style={{ background: "var(--bg)" }}
              >
                <div
                  className="h-32 w-32 md:h-40 md:w-40 rounded-full flex items-center justify-center animate-spin-slow"
                  style={{
                    background: "linear-gradient(135deg, var(--primary), var(--accent))",
                  }}
                >
                  <div
                    className="h-20 w-20 md:h-28 md:w-28 rounded-full flex items-center justify-center"
                    style={{ background: "var(--bg)" }}
                  >
                    <Brain className="h-8 w-8 md:h-10 md:w-10" style={{ color: "var(--primary)" }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
