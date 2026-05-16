import Link from "next/link";
import { Leaf, Globe, ExternalLink, Mail } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Detect Disease", href: "/detect" },
  { label: "About", href: "/about" },
  { label: "API Status", href: "/health" },
];

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--border)", background: "var(--bg-alt)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div
                className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="GreenScan" className="h-full w-full object-cover" />
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
                Green<span className="text-[var(--primary)]">Scan</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Deep Learning-Powered Agricultural Disease Analytics helping farmers protect their
              crops with instant diagnosis and treatment recommendations.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-light)" }}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-[var(--primary)]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-light)" }}>
              Technology
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <li>TensorFlow AI</li>
              <li>Google Gemini</li>
              <li>Next.js 15</li>
              <li>FastAPI</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-light)" }}>
              Connect
            </h4>
            <div className="flex gap-3">
              {[Globe, ExternalLink, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-[var(--primary)] hover:text-white"
                  style={{ color: "var(--text-muted)", background: "var(--surface)" }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-light)" }}>
            © {new Date().getFullYear()} GreenScan. Built with 🌿 for farmers everywhere.
          </p>
          <p className="text-xs" style={{ color: "var(--text-light)" }}>
            Powered by TensorFlow & Google Gemini AI
          </p>
        </div>
      </div>
    </footer>
  );
}
