"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload, Camera, Image as ImageIcon, X, ArrowRight } from "lucide-react";

interface Props {
  onFile: (f: File) => void;
  preview: string;
  onAnalyze: () => void;
  onReset: () => void;
  hasFile: boolean;
}

export function UploadCard({ onFile, preview, onAnalyze, onReset, hasFile }: Props) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length > 0) onFile(accepted[0]);
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  return (
    <div className="mx-auto max-w-2xl">
      {!hasFile ? (
        <div
          {...getRootProps()}
          className="group cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-12 text-center transition-all hover:shadow-lg"
          style={{
            borderColor: isDragActive ? "var(--primary)" : "var(--border)",
            background: isDragActive ? "rgba(22,101,52,0.05)" : "var(--surface)",
          }}
        >
          <input {...getInputProps()} />
          <motion.div
            animate={{ y: isDragActive ? -8 : 0 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: "var(--bg-alt)", color: "var(--primary)" }}
          >
            <Upload size={28} />
          </motion.div>
          <p className="text-base font-semibold">
            {isDragActive ? "Drop your image here" : "Drag & drop a leaf image"}
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
            or click to browse — JPG, PNG, WEBP up to 10 MB
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium"
              style={{ background: "var(--bg-alt)", color: "var(--text-muted)" }}
            >
              <ImageIcon size={14} /> Browse Files
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium"
              style={{ background: "var(--bg-alt)", color: "var(--text-muted)" }}
            >
              <Camera size={14} /> Take Photo
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          {/* Preview */}
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Upload preview" className="w-full max-h-80 object-contain bg-black/5" />
            <button
              onClick={onReset}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          {/* Analyze button */}
          <div className="p-5 text-center">
            <button
              onClick={onAnalyze}
              className="group inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--primary)" }}
            >
              Analyze with AI
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="mt-2 text-xs" style={{ color: "var(--text-light)" }}>
              Image will be compressed before upload for faster results
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
