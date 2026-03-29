"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bubbliertea",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Zomato",
    href: "https://zomato.onelink.me/xqzv/y5btt5id",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5h-2v-2h2v2zm0-3h-2V8h2v5.5zm4 3h-2v-2h2v2zm0-3h-2V8h2v5.5z" />
      </svg>
    ),
  },
  {
    label: "Swiggy",
    href: "https://www.swiggy.com/restaurants/1235061/dineout/menu",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7 3.5v7.64l-7 3.5-7-3.5V7.68l7-3.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-20 pb-10 px-6 md:px-10 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div>
            <h3 className="brand-text text-2xl text-white/80 mb-3">bubblier</h3>
            <p className="text-white/25 text-sm font-light leading-relaxed max-w-xs">
              Sourced from Taiwan. Crafted fresh in Jaipur. Every sip tells a story.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-5 font-light">
              Navigate
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/30 hover:text-white/70 text-[13px] font-light tracking-wide transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-5 font-light">
              Follow Us
            </p>
            <div className="flex gap-4">
              {SOCIALS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-white/15 text-xs mt-4 font-light">
              @bubbliertea
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/15 text-xs font-light">
            © 2024 Bubblier. All rights reserved.
          </p>
          <p className="text-white/15 text-xs font-light">
            Made with 🧋 and a lot of love
          </p>
        </div>
      </div>
    </footer>
  );
}
