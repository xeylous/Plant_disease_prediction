"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export function LoadingAnimation() {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "var(--bg)" }}>
          <Leaf size={24} style={{ color: "var(--primary)" }} />
        </div>
      </motion.div>
      <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
        Analyzing Your Plant...
      </h3>
      <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
        Our AI is examining the leaf for signs of disease
      </p>
      <div className="mt-6 mx-auto h-1.5 w-48 overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--primary)" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
