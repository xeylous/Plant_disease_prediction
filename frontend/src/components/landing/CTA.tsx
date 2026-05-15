"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-10 text-center sm:p-16"
          style={{ background: "linear-gradient(135deg, var(--primary-dark), var(--primary))" }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
              Ready to Protect Your Crops?
            </h2>
            <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">
              Join thousands of farmers using AI to detect plant diseases early and save their harvests.
            </p>
            <Link
              href="/detect"
              className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto justify-center"
              style={{ color: "var(--primary-dark)" }}
            >
              <Leaf size={16} />
              Start Free Scan
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
