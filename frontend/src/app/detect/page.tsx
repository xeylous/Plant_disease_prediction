"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";
import { UploadCard } from "@/components/detect/UploadCard";
import { PredictionResult } from "@/components/detect/PredictionResult";
import { LoadingAnimation } from "@/components/detect/LoadingAnimation";
import { predictDisease } from "@/lib/api";
import { compressImage, uid } from "@/lib/utils";
import type { PredictionResponse, PredictionHistoryItem } from "@/types";

export default function DetectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError("");
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const compressed = await compressImage(file, 1024, 0.85);
      const data = await predictDisease(compressed);
      setResult(data);
      // Save to history
      setHistory((prev) => [
        { id: uid(), timestamp: Date.now(), imageUrl: preview, result: data },
        ...prev.slice(0, 9),
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Analysis failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [file, preview]);

  const handleReset = useCallback(() => {
    setFile(null);
    setPreview("");
    setResult(null);
    setError("");
  }, []);

  return (
    <section className="min-h-screen pt-28 pb-16" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
            style={{ background: "var(--primary)", color: "white" }}>
            <Leaf size={12} />
            AI Disease Scanner
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
            Detect Plant Disease
          </h1>
          <p className="mt-2 text-base" style={{ color: "var(--text-muted)" }}>
            Upload a clear photo of the affected leaf for instant AI diagnosis
          </p>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingAnimation />
            </motion.div>
          ) : result ? (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <PredictionResult result={result} imageUrl={preview} onReset={handleReset} />
            </motion.div>
          ) : (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <UploadCard
                onFile={handleFile}
                preview={preview}
                onAnalyze={handleAnalyze}
                onReset={handleReset}
                hasFile={!!file}
              />
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mt-4 rounded-xl p-4 text-center text-sm"
                  style={{ background: "rgba(220,38,38,0.1)", color: "var(--danger)" }}>
                  {error}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* History */}
        {history.length > 0 && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16">
            <h3 className="text-lg font-semibold mb-4">Recent Scans</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {history.map((h) => (
                <div key={h.id} className="flex items-center gap-3 rounded-xl p-3"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={h.imageUrl} alt="" className="h-14 w-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{h.result.crop}</p>
                    <p className="text-xs truncate" style={{ color: h.result.healthy ? "var(--success)" : "var(--danger)" }}>
                      {h.result.disease}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-light)" }}>
                      {h.result.confidence}% confidence
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
