"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
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

// ─── Data ─────────────────────────────────────────

const CONTACT_CARDS = [
  {
    icon: <Phone className="w-6 h-6" strokeWidth={1.5} />,
    title: "Call Us",
    detail: "+91 8690848880",
    action: "tel:+918690848880",
    actionLabel: "Call Now",
  },
  {
    icon: <MapPin className="w-6 h-6" strokeWidth={1.5} />,
    title: "Visit Us",
    detail: "Floor 4, Horyzn Courts, Amrapali Circle, Vaishali Nagar, Jaipur",
    action: "https://maps.app.goo.gl/bFyBgppDY2rzhWiNA",
    actionLabel: "View on Maps",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white/80">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Follow Us",
    detail: "@bubbliertea",
    action: "https://www.instagram.com/bubbliertea",
    actionLabel: "Open Instagram",
  },
];

const ORDER_LINKS = [
  {
    name: "Zomato",
    href: "https://zomato.onelink.me/xqzv/y5btt5id",
    color: "#E23744",
    desc: "Order delivery or dine-in",
  },
  {
    name: "Swiggy",
    href: "https://www.swiggy.com/restaurants/1235061/dineout/menu",
    color: "#FC8019",
    desc: "Fast delivery to your door",
  },
];

// ─── Page ─────────────────────────────────────────

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-dark">
      <Navbar />
      <ContactHero />
      <ContactCards />
      <OrderOnline />
      <LocationSection />
      <ContactCTA />
      <Footer />
    </main>
  );
}

// ─── Hero ─────────────────────────────────────────

function ContactHero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 px-6 md:px-10">
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
          Contact
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="brand-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white/90 leading-[1] mb-8 tracking-tight"
        >
          get in touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/30 text-base md:text-lg font-light max-w-lg mx-auto leading-relaxed"
        >
          Whether you want to visit, order, or just say hello — we&apos;re here for you.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Contact Cards ────────────────────────────────

function ContactCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {CONTACT_CARDS.map((card) => (
            <motion.div key={card.title} variants={itemVariants}>
              <a
                href={card.action}
                target={card.action.startsWith("http") ? "_blank" : undefined}
                rel={card.action.startsWith("http") ? "noopener noreferrer" : undefined}
                className="cafe-card group block p-8 h-full"
              >
                <div className="text-white/40 group-hover:text-brand-coral transition-colors duration-300 mb-6">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-white/80 mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-white/30 text-sm font-light leading-relaxed mb-8 max-w-[24ch]">
                  {card.detail}
                </p>
                <span className="inline-flex items-center gap-2 text-brand-coral/80 group-hover:text-brand-coral text-sm font-medium transition-colors duration-300">
                  {card.actionLabel}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Order Online ─────────────────────────────────

function OrderOnline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-20 px-6 md:px-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-5 font-light"
          >
            Order Online
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white/85 tracking-tight mb-5 leading-[1]"
          >
            Can&apos;t make it?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-white/30 text-base font-light mb-12 max-w-[36ch]"
          >
            We&apos;ll bring the bubblier experience to your doorstep.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl"
        >
          {ORDER_LINKS.map((link) => (
            <motion.div key={link.name} variants={itemVariants}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cafe-card group flex items-center gap-6 p-6 md:p-8 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0"
                  style={{ backgroundColor: link.color + "15", color: link.color }}
                >
                  {link.name[0]}
                </div>
                <div>
                  <h4 className="text-white/90 font-semibold text-base mb-1 tracking-tight">
                    {link.name}
                  </h4>
                  <p className="text-white/30 text-sm font-light">
                    {link.desc}
                  </p>
                </div>
                <svg className="w-5 h-5 text-white/20 group-hover:text-white/50 ml-auto shrink-0 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Location ─────────────────────────────────────

function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 md:px-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-5 font-light">
              Find Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white/85 tracking-tight mb-5 leading-[1]">
              Our Location
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="cafe-card overflow-hidden p-8 md:p-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-coral/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-brand-coral" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white/90 font-semibold text-xl tracking-tight">Bubblier — Jaipur</h3>
                </div>
                <p className="text-white/40 text-base font-light leading-relaxed mb-2">
                  Floor 4, Horyzn Courts
                </p>
                <p className="text-white/40 text-base font-light leading-relaxed mb-2">
                  Amrapali Circle, Vaishali Nagar
                </p>
                <p className="text-white/40 text-base font-light leading-relaxed mb-8">
                  Jaipur, Rajasthan, India
                </p>

                <div className="flex items-center gap-3 text-white/30 text-sm font-light">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  <span>Open daily · 11 AM – 11 PM</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="https://maps.app.goo.gl/bFyBgppDY2rzhWiNA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#050505] font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MapPin className="w-4 h-4" strokeWidth={2} />
                  View on Maps
                </a>
                <a
                  href="tel:+918690848880"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.04] text-white/70 hover:text-white font-light text-sm tracking-wide transition-all duration-300 border border-white/[0.06] hover:border-white/[0.15] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  Call Us
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────

function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 md:px-10">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 max-w-2xl mx-auto text-center cafe-card p-12 md:p-20"
      >
        <motion.p variants={itemVariants} className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-6">
          Explore
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 tracking-tight leading-[1] mb-8"
        >
          Ready to Sip?
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-white/30 text-base font-light leading-relaxed mb-12 max-w-[32ch] mx-auto"
        >
          Browse our full menu or learn more about what makes Bubblier special.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/menu"
            className="inline-block px-10 py-3.5 rounded-xl bg-white text-[#050505] font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
          >
            View Menu
          </Link>
          <Link
            href="/about"
            className="inline-block px-10 py-3.5 rounded-xl bg-transparent text-white/60 hover:text-white/90 font-light text-sm tracking-wide transition-all duration-300 border border-white/[0.06] hover:border-white/[0.15]"
          >
            Our Story
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
