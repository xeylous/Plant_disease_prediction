"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, CheckCircle, AlertTriangle, Sprout, FlaskConical,
  Shield, Lightbulb, Activity, ChevronDown, ChevronUp, Download,
} from "lucide-react";
import type { PredictionResponse } from "@/types";

interface Props {
  result: PredictionResponse;
  imageUrl: string;
  onReset: () => void;
}

function Section({ icon: Icon, title, children, defaultOpen = false }: {
  icon: React.ElementType; title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
      <button onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[var(--bg-alt)]">
        <div className="flex items-center gap-3">
          <Icon size={18} style={{ color: "var(--primary)" }} />
          <span className="text-sm font-semibold">{title}</span>
        </div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function formatText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold" style={{ color: "var(--text)" }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <strong key={i} className="font-semibold" style={{ color: "var(--text)" }}>{part.slice(1, -1)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function ListItems({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--primary)" }} />
          <div>{formatText(item)}</div>
        </li>
      ))}
    </ul>
  );
}

export function PredictionResult({ result, imageUrl, onReset }: Props) {
  const ai = result.ai_solution;

  const handleDownload = () => {
    const text = [
      `GreenScan AI - Plant Disease Report`,
      `================================`,
      `Crop: ${result.crop}`,
      `Disease: ${result.disease}`,
      `Confidence: ${result.confidence}%`,
      `Status: ${result.healthy ? "Healthy" : "Diseased"}`,
      ``,
      `Overview: ${ai?.overview || "N/A"}`,
      `Severity: ${ai?.severity || "N/A"}`,
      `Recovery: ${ai?.recovery_chance || "N/A"}`,
      ``,
      `Causes:`, ...(ai?.causes || []).map(c => `  - ${c}`),
      ``, `Symptoms:`, ...(ai?.symptoms || []).map(s => `  - ${s}`),
      ``, `Organic Treatment:`, ...(ai?.organic_treatment || []).map(t => `  - ${t}`),
      ``, `Chemical Treatment:`, ...(ai?.chemical_treatment || []).map(t => `  - ${t}`),
      ``, `Prevention:`, ...(ai?.prevention || []).map(p => `  - ${p}`),
      ``, `Farmer Tips:`, ...(ai?.farmer_tips || []).map(t => `  - ${t}`),
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `GreenScan-report-${result.crop}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Top Card */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="grid sm:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Analyzed leaf" className="w-full h-56 sm:h-full object-cover" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              {result.healthy ? (
                <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: "var(--success)" }}>
                  <CheckCircle size={12} /> Healthy
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: "var(--danger)" }}>
                  <AlertTriangle size={12} /> Disease Detected
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>{result.crop}</h2>
            <p className="text-base font-medium mt-1" style={{ color: result.healthy ? "var(--success)" : "var(--danger)" }}>
              {result.disease}
            </p>
            {/* Confidence bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: "var(--text-muted)" }}>Confidence</span>
                <span className="font-semibold">{result.confidence}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${result.confidence}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: result.confidence > 80 ? "var(--success)" : result.confidence > 50 ? "var(--warning)" : "var(--danger)" }} />
              </div>
            </div>
            {ai?.severity && (
              <div className="mt-3 flex items-center gap-4 text-xs">
                <span style={{ color: "var(--text-light)" }}>Severity: <strong>{ai.severity}</strong></span>
                <span style={{ color: "var(--text-light)" }}>Recovery: <strong>{ai.recovery_chance}</strong></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Details */}
      {ai && (
        <div className="mt-5 space-y-3">
          {ai.overview && (
            <div className="rounded-xl p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{formatText(ai.overview)}</p>
            </div>
          )}
          {ai.causes.length > 0 && <Section icon={AlertTriangle} title="Causes" defaultOpen><ListItems items={ai.causes} /></Section>}
          {ai.symptoms.length > 0 && <Section icon={Activity} title="Symptoms" defaultOpen><ListItems items={ai.symptoms} /></Section>}
          {ai.organic_treatment.length > 0 && <Section icon={Sprout} title="Organic Treatment" defaultOpen><ListItems items={ai.organic_treatment} /></Section>}
          {ai.chemical_treatment.length > 0 && <Section icon={FlaskConical} title="Chemical Treatment"><ListItems items={ai.chemical_treatment} /></Section>}
          {ai.prevention.length > 0 && <Section icon={Shield} title="Prevention"><ListItems items={ai.prevention} /></Section>}
          {ai.farmer_tips.length > 0 && <Section icon={Lightbulb} title="Farmer Tips"><ListItems items={ai.farmer_tips} /></Section>}
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto justify-center"
          style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>
          <ArrowLeft size={14} /> Scan Another
        </button>
        <button onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-colors w-full sm:w-auto justify-center"
          style={{ background: "var(--primary)" }}>
          <Download size={14} /> Download Report
        </button>
      </div>
    </div>
  );
}
