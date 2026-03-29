"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Leaf, Clock, Heart, Coffee, Sparkles, GlassWater } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Animation ────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.25, 1, 0.5, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

const VALUES = [
  {
    icon: <Leaf className="w-8 h-8 text-white/80" strokeWidth={1.5} />,
    title: "Quality First",
    description: "Every ingredient is carefully selected. We source premium loose-leaf tea, farm-fresh milk, and natural sweeteners — never anything artificial.",
  },
  {
    icon: <Clock className="w-8 h-8 text-white/80" strokeWidth={1.5} />,
    title: "Always Fresh",
    description: "Our tapioca pearls are cooked fresh every hour. Your drink is made to order, by hand, exactly the way you like it.",
  },
  {
    icon: <Heart className="w-8 h-8 text-white/80" strokeWidth={1.5} />,
    title: "Community",
    description: "We believe bubble tea brings people together. Bubblier is more than a drink — it's a shared moment of joy.",
  },
];

// ─── Page ─────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-dark">
      <Navbar />
      <AboutHero />
      <BrandStory />
      <ValuesSection />
      <OriginSection />
      <AboutCTA />
      <Footer />
    </main>
  );
}

// ─── Hero ─────────────────────────────────────────

function AboutHero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 md:px-10">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-coral text-[11px] tracking-[0.5em] uppercase mb-6 font-medium"
        >
          About Us
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="brand-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white/90 leading-[1] mb-8 tracking-tight"
        >
          more than<br />a drink
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/30 text-base md:text-lg font-light max-w-lg mx-auto leading-relaxed"
        >
          Bubblier was born from a simple belief: every sip should be extraordinary.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: EASE_OUT }}
          className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-12 mx-auto"
        />
      </div>
    </section>
  );
}

// ─── Brand Story ──────────────────────────────────

function BrandStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-24 md:py-36 px-6 md:px-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center"
        >
          {/* Text side */}
          <div>
            <motion.p
              variants={itemVariants}
              className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-5 font-light"
            >
              Our Journey
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 tracking-tight leading-[1] mb-8"
            >
              Sourced from<br />Taiwan
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-white/30 text-base md:text-lg font-light leading-relaxed mb-6 max-w-[36ch]"
            >
              What started as a passion for authentic Taiwanese bubble tea became a
              mission to bring the real thing to Jaipur. We import our tea leaves,
              tapioca starch, and signature flavors directly from Taiwan&apos;s finest suppliers.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-white/30 text-base md:text-lg font-light leading-relaxed mb-8 max-w-[36ch]"
            >
              Every cup is handcrafted in our kitchen using traditional techniques, blended
              with locally sourced milk and natural sweeteners. The result? A drink that&apos;s
              authentic, fresh, and uniquely Bubblier.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-2"
            >
              <div className="w-10 h-[1px] bg-brand-coral/50" />
              <p className="text-brand-coral/80 text-sm font-medium tracking-wide">
                Crafted fresh in Jaipur
              </p>
            </motion.div>
          </div>

          {/* Visual side */}
          <motion.div variants={itemVariants} className="relative">
            <div className="cafe-card aspect-square w-full p-10 md:p-14 flex flex-col items-center justify-center">
              <GlassWater className="w-20 h-20 text-white/20 mb-8" strokeWidth={1} />
              <p className="brand-text text-4xl md:text-5xl text-white/50 mb-4 tracking-tight">bubblier</p>
              <p className="text-white/20 text-xs tracking-[0.4em] uppercase font-light mb-8">
                Since 2024
              </p>
              <div className="flex items-center gap-4 opacity-50">
                <span className="text-sm tracking-wide font-medium">TW</span>
                <span className="text-white/30 text-xs font-light">→</span>
                <span className="text-sm tracking-wide font-medium">IN</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Values ───────────────────────────────────────

function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-24 md:py-36 px-6 md:px-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16 md:mb-20"
        >
          <motion.p
            variants={itemVariants}
            className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-5 font-light"
          >
            What We Believe
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 tracking-tight leading-[1]"
          >
            Built on Values
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
          {VALUES.map((value) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              className="cafe-card p-10 group text-center"
            >
              <div className="mb-8 flex justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-white/80 mb-3 tracking-tight">
                {value.title}
              </h3>
              <p className="text-white/30 text-sm font-light leading-relaxed max-w-[28ch] mx-auto">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Origin ───────────────────────────────────────

function OriginSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-24 md:py-36 px-6 md:px-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-5 font-light"
          >
            The Process
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 tracking-tight leading-[1] mb-12"
          >
            From Leaf to Cup
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { step: "01", icon: <Leaf strokeWidth={1.5} className="w-8 h-8" />, label: "Source", desc: "Premium leaves from Taiwan" },
            { step: "02", icon: <Coffee strokeWidth={1.5} className="w-8 h-8" />, label: "Brew", desc: "Steeped to perfection daily" },
            { step: "03", icon: <Sparkles strokeWidth={1.5} className="w-8 h-8" />, label: "Craft", desc: "Fresh pearls every hour" },
            { step: "04", icon: <GlassWater strokeWidth={1.5} className="w-8 h-8" />, label: "Serve", desc: "Made to order, just for you" },
          ].map((item) => (
            <motion.div
              key={item.step}
              variants={itemVariants}
              className="text-center group p-6"
            >
              <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-5 font-light">
                {item.step}
              </p>
              <div className="flex justify-center mb-5 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                {item.icon}
              </div>
              <h4 className="text-white/80 font-semibold text-base mb-2 tracking-tight">
                {item.label}
              </h4>
              <p className="text-white/30 text-sm font-light leading-relaxed max-w-[20ch] mx-auto">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────

function AboutCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-28 md:py-40 px-6 md:px-10">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 max-w-2xl mx-auto text-center cafe-card p-12 md:p-20"
      >
        <motion.p
          variants={itemVariants}
          className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-5"
        >
          Come Say Hi
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 tracking-tight leading-[1] mb-6"
        >
          Visit Us in Jaipur
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-white/30 text-base font-light leading-relaxed mb-10 max-w-[32ch] mx-auto"
        >
          We&apos;d love to serve you your next favorite drink. Find us at Horyzn Courts, Vaishali Nagar.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-block px-10 py-3.5 rounded-xl bg-white text-[#050505] font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
          >
            Get In Touch
          </Link>
          <Link
            href="/menu"
            className="inline-block px-10 py-3.5 rounded-xl bg-transparent text-white/60 hover:text-white/90 font-light text-sm tracking-wide transition-all duration-300 border border-white/[0.06] hover:border-white/[0.15]"
          >
            View Menu
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
