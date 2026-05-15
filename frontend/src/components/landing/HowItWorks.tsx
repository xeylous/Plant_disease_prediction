"use client";

import { motion } from "framer-motion";
import { Camera, Cpu, FileText } from "lucide-react";

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "Capture",
    desc: "Take a photo of the affected leaf or upload an existing image from your gallery.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Analyze",
    desc: "Our AI model processes the image in seconds using deep learning inference.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Treat",
    desc: "Receive detailed treatment plans with organic and chemical recommendations.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20" style={{ background: "var(--bg-alt)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
            Three Steps to Healthier Crops
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < 2 && (
                <div
                  className="absolute top-12 left-[60%] hidden h-[2px] w-[80%] md:block"
                  style={{ background: "var(--border)" }}
                />
              )}

              <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl"
                style={{ background: "var(--surface)", border: "2px solid var(--border)" }}
              >
                <s.icon size={32} style={{ color: "var(--primary)" }} />
                <span
                  className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: "var(--primary)" }}
                >
                  {s.step}
                </span>
              </div>

              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
