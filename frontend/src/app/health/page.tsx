"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Activity, Server, Database, Clock, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { checkHealth } from "@/lib/api";
import type { HealthResponse } from "@/types";

export default function HealthPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await checkHealth();
      setHealth(data);
      setLastChecked(new Date());
    } catch {
      setError("Unable to reach the API server. It may be starting up (cold start takes ~30-60s on free tier).");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, [fetchHealth]);

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <section className="min-h-screen pt-28 pb-16" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
            style={{ background: "var(--primary)", color: "white" }}>
            <Activity size={12} /> System Status
          </div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>API Health</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            Real-time status of the GreenScan backend service
          </p>
        </motion.div>

        {/* Status Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          {loading && !health ? (
            <div className="text-center py-8">
              <RefreshCw size={24} className="mx-auto mb-3 animate-spin" style={{ color: "var(--primary)" }} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Checking API status...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <XCircle size={32} className="mx-auto mb-3" style={{ color: "var(--danger)" }} />
              <p className="text-sm font-semibold" style={{ color: "var(--danger)" }}>API Unreachable</p>
              <p className="mt-2 text-xs max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>{error}</p>
            </div>
          ) : health ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} style={{ color: health.status === "healthy" ? "var(--success)" : "var(--warning)" }} />
                  <span className="font-semibold capitalize">{health.status}</span>
                </div>
                <span className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    background: health.status === "healthy" ? "rgba(22,163,74,0.1)" : "rgba(245,158,11,0.1)",
                    color: health.status === "healthy" ? "var(--success)" : "var(--warning)",
                  }}>
                  v{health.version}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Server, label: "Model", value: health.model_loaded ? "Loaded" : "Not loaded" },
                  { icon: Clock, label: "Uptime", value: formatUptime(health.uptime_seconds) },
                  { icon: Database, label: "Cache Entries", value: String(health.cache_size) },
                  { icon: Activity, label: "Input Shape", value: health.model_input_shape?.join(" x ") || "N/A" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl p-3"
                    style={{ background: "var(--bg-alt)" }}>
                    <item.icon size={16} style={{ color: "var(--primary)" }} />
                    <div>
                      <div className="text-xs" style={{ color: "var(--text-light)" }}>{item.label}</div>
                      <div className="text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-4 flex items-center justify-between pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <span className="text-xs" style={{ color: "var(--text-light)" }}>
              {lastChecked ? `Last checked: ${lastChecked.toLocaleTimeString()}` : ""}
            </span>
            <button onClick={fetchHealth}
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: "var(--primary)" }}>
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
