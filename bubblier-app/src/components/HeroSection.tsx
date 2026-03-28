"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    [1, 0]
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-brand-dark flex items-center justify-center"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Hero content — clean, minimal */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
        style={{ y: textY, opacity: heroOpacity }}
      >
        {/* Subtle pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/30 text-[11px] md:text-xs tracking-[0.5em] uppercase mb-8 font-light"
        >
          The art of bubble tea
        </motion.p>

        {/* Brand name — large, immersive */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="brand-text text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-white/90 leading-[0.85] mb-8"
        >
          bubblier
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-white/25 text-sm md:text-base tracking-[0.15em] font-light max-w-sm"
        >
          Crafted with intention. Sipped with joy.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent mt-10"
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 flex flex-col items-center gap-4 scroll-indicator"
        style={{ opacity: scrollIndicatorOpacity, x: "-50%" }}
      >
        <span className="text-white/20 text-[10px] tracking-[0.5em] uppercase font-light">
          Scroll
        </span>
        <div className="w-[18px] h-7 rounded-full border border-white/15 flex justify-center pt-1">
          <motion.div
            className="w-[3px] h-[3px] rounded-full bg-white/40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Bottom fade into canvas */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-dark to-transparent z-10 pointer-events-none" />
    </section>
  );
}
