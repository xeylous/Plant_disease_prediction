import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GreenScan: Deep Learning-Powered Agricultural Disease Analytics",
  description:
    "Advanced deep-learning platform for agricultural disease analytics. Upload crop images for instant, high-precision detection and expert treatment recommendations.",
  keywords: [
    "GreenScan",
    "deep learning agriculture",
    "agricultural disease analytics",
    "crop disease detection",
    "agritech AI",
    "precision agriculture",
  ],
  openGraph: {
    title: "GreenScan: Deep Learning-Powered Agricultural Disease Analytics",
    description: "Advanced deep-learning platform for agricultural disease analytics.",
    type: "website",
    siteName: "GreenScan",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-24">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
