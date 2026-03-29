"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const bgClass = hasScrolled
    ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]"
    : "bg-transparent";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="brand-text text-lg md:text-xl transition-colors duration-300 text-white/80 hover:text-white"
          >
            bubblier
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[13px] tracking-[0.08em] font-light transition-colors duration-300 ${
                    isActive
                      ? "text-white/80"
                      : "text-white/35 hover:text-white/70"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="h-[1px] bg-white/30 mt-1"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-5 h-3 flex flex-col justify-between">
              <motion.span
                className="block w-5 h-[1.5px] origin-center bg-white/60"
                animate={
                  isMobileMenuOpen
                    ? { rotate: 45, y: 5.25 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-3.5 h-[1.5px] bg-white/60"
                animate={
                  isMobileMenuOpen
                    ? { opacity: 0, x: -10 }
                    : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-[1.5px] origin-center bg-white/60"
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -5.25 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Fullscreen Menu Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-3xl sm:text-4xl font-light py-4 px-8 tracking-wide transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-white"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Social links in mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 flex flex-col items-center gap-4"
            >
              <div className="flex gap-6">
                <a href="https://www.instagram.com/bubbliertea" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white/50 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="https://zomato.onelink.me/xqzv/y5btt5id" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white/50 transition-colors text-xs font-semibold tracking-wider uppercase">
                  Zomato
                </a>
                <a href="https://www.swiggy.com/restaurants/1235061/dineout/menu" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white/50 transition-colors text-xs font-semibold tracking-wider uppercase">
                  Swiggy
                </a>
              </div>
              <p className="brand-text text-lg text-white/15">bubblier</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
