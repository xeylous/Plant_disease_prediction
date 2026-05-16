"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Patel",
    role: "Organic Farmer, Gujarat",
    text: "GreenScan saved my entire tomato crop last season. I detected late blight early and the treatment suggestions were spot on.",
    stars: 5,
  },
  {
    name: "Maria Santos",
    role: "Agricultural Researcher",
    text: "The accuracy is impressive. I have tested it across multiple crop varieties and the AI consistently provides reliable diagnoses.",
    stars: 5,
  },
  {
    name: "James O Brien",
    role: "Vineyard Owner, California",
    text: "I use GreenScan weekly to monitor my grape vines. The Gemini-powered treatment plans are incredibly detailed and practical.",
    stars: 5,
  },
];

export function Testimonials() {
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
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
            Trusted by Farmers Worldwide
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <Quote size={24} style={{ color: "var(--primary)", opacity: 0.3 }} className="mb-3" />
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {t.text}
              </p>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} size={14} fill="var(--accent)" style={{ color: "var(--accent)" }} />
                ))}
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs" style={{ color: "var(--text-light)" }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
