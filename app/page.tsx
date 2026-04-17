"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import Loader from "@/components/Loader";
import ScrollToTop from "@/components/ScrollToTop";
import Services from "@/components/Services";
import Team from "@/components/Team";

const Portfolio = dynamic(() => import("@/components/Portfolio"), {
  loading: () => <div className="mx-auto mt-8 h-[320px] w-full max-w-6xl px-6 md:px-10" />,
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="mt-8 h-[280px] w-full" />,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 1500);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative">
        <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>

        <Navbar />
        <Hero />
        <div style={{ contentVisibility: "auto" }}>
          <Services />
        </div>
        <div style={{ contentVisibility: "auto" }}>
          <About />
        </div>
        <div style={{ contentVisibility: "auto" }}>
          <Team />
        </div>
        <div style={{ contentVisibility: "auto" }}>
          <Portfolio />
        </div>
        <div style={{ contentVisibility: "auto" }}>
          <Testimonials />
        </div>
        <div style={{ contentVisibility: "auto" }}>
          <Contact />
        </div>
        <Footer />
        <ScrollToTop />
        <FloatingChatButton />
      </main>
    </MotionConfig>
  );
}
