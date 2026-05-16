"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/detect", label: "Detect Disease" },
  { href: "/about", label: "About" },
  { href: "/health", label: "API Status" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="glass mx-auto max-w-6xl rounded-2xl px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm transition-transform group-hover:scale-105 border border-white/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="GreenScan Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Green<span className="text-[var(--primary)]">Scan</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-2 py-2 text-sm font-semibold transition-colors",
                  pathname === l.href
                    ? "text-[var(--primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                )}
              >
                {pathname === l.href && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute -inset-x-3 inset-y-0 rounded-xl"
                    style={{ background: "var(--primary)", opacity: 0.1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-[var(--bg-alt)]"
              aria-label="Toggle theme"
            >
              <Sun size={16} className="hidden dark:block text-[var(--accent)]" />
              <Moon size={16} className="block dark:hidden text-[var(--text-muted)]" />
            </button>

            {/* CTA button */}
            <Link
              href="/detect"
              className="hidden md:inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--primary)" }}
            >
              <Leaf size={14} />
              Scan Now
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl hover:bg-[var(--bg-alt)]"
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden md:hidden mt-3 border-t pt-3"
              style={{ borderColor: "var(--border)" }}
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    pathname === l.href
                      ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/detect"
                onClick={() => setOpen(false)}
                className="block mt-2 text-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                style={{ background: "var(--primary)" }}
              >
                Scan Now
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
