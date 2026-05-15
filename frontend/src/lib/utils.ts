/**
 * Utility helpers — image compression, class name formatting, etc.
 */

/**
 * Compress an image file using an off-screen canvas.
 * Returns a new File with reduced size for faster upload.
 */
export async function compressImage(
  file: File,
  maxWidth = 1024,
  quality = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Compression failed"));
          resolve(new File([blob], file.name, { type: "image/jpeg" }));
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Format a raw class label for display.
 * "Tomato___Late_blight" → "Late Blight"
 */
export function formatDiseaseName(raw: string): string {
  if (!raw) return "";
  const parts = raw.split("___");
  if (parts.length === 2) {
    return parts[1].replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return raw.replace(/_/g, " ");
}

/**
 * Merge class names (like clsx but tiny).
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Generate a unique ID.
 */
export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
