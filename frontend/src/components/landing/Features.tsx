"use client";

import { motion } from "framer-motion";
import { Scan, Zap, Shield, Brain, Smartphone, Cloud } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Instant Detection",
    desc: "Upload a leaf photo and get AI diagnosis in under 5 seconds with our optimized inference engine.",
  },
  {
    icon: Brain,
    title: "AI Treatment Plans",
    desc: "Google Gemini generates personalized organic and chemical treatment recommendations.",
  },
  {
    icon: Shield,
    title: "39 Disease Classes",
    desc: "Our deep learning model covers 39 disease categories across 14 crop species.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized TensorFlow model with single-pass inference for real-time results.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    desc: "Fully responsive design works on any device — scan leaves right in the field.",
  },
  {
    icon: Cloud,
    title: "Cloud Powered",
    desc: "No installation needed. Access from any browser, anywhere in the world.",
  },
];

export function Features() {
  return (
    <section className="py-20" style={{ background: "var(--bg-alt)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--primary)" }}
          >
            Features
          </span>
          <h2
            className="mt-3 text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Everything You Need to Protect Your Crops
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--text-muted)" }}>
            Professional-grade plant pathology tools, accessible to every farmer.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl p-6 transition-all hover:shadow-lg"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-colors group-hover:text-white"
                style={{
                  background: "var(--bg-alt)",
                  color: "var(--primary)",
                }}
              >
                <f.icon size={20} />
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
