"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--bg)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
          style={{ background: "var(--bg-alt)" }}
        >
          <Leaf size={40} style={{ color: "var(--primary)" }} />
        </motion.div>

        <h1 className="text-6xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-outfit)" }}>
          404
        </h1>
        <h2 className="mt-2 text-xl font-semibold">Page Not Found</h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Looks like this leaf blew away in the wind. The page you are looking for does not exist.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            style={{ background: "var(--primary)" }}>
            <Home size={14} /> Go Home
          </Link>
          <Link href="/detect"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium"
            style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
            <Search size={14} /> Try Scanner
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
