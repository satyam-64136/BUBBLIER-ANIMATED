"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const NAV_LINKS = [
    { label: "Home", href: "#hero" },
    { label: "Menu", href: "#featured-drinks" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#footer" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasScrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="brand-text text-lg md:text-xl text-white/80 hover:text-white transition-colors duration-300">
          bubblier
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] text-white/40 hover:text-white/90 tracking-[0.08em] font-light transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu icon */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
          <span className="w-5 h-[1px] bg-white/50" />
          <span className="w-3.5 h-[1px] bg-white/50" />
        </button>
      </div>
    </motion.nav>
  );
}
