"use client";

import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { SupportedCrops } from "@/components/landing/SupportedCrops";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { AITechnology } from "@/components/landing/AITechnology";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <SupportedCrops />
      <HowItWorks />
      <AITechnology />
      <Testimonials />
      <CTA />
    </>
  );
}
