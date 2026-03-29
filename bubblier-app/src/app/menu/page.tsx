"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GlassWater, Citrus, CupSoda, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Data ─────────────────────────────────────────

const FAN_FAVORITES = [
  { name: "Matcha Milk Tea", image: "/assets/products/matcha.png", price: "₹299" },
  { name: "Taro Milk Tea", image: "/assets/products/taro.png", price: "₹279" },
  { name: "Earl Grey Milk Tea", image: "/assets/products/earl-grey.png", price: "₹269" },
  { name: "Strawberry Glaze Smoothie", image: "/assets/products/strawberry.png", price: "₹289" },
];

const MENU_CATEGORIES = [
  {
    id: "milk-teas",
    title: "Milk Teas",
    icon: <GlassWater className="w-4 h-4" strokeWidth={1.5} />,
    items: [
      { name: "Classic Brown Sugar", price: "₹249", desc: "Rich brown sugar syrup with fresh milk tea & tapioca pearls" },
      { name: "Taro Dream", price: "₹279", desc: "Creamy taro blended to perfection" },
      { name: "Matcha Zen", price: "₹299", desc: "Premium Japanese matcha with oat milk & honey pearls" },
      { name: "Earl Grey Bliss", price: "₹269", desc: "Fragrant Earl Grey with fresh milk and boba" },
      { name: "Oolong Supreme", price: "₹289", desc: "Roasted oolong tea with caramelized pearls" },
      { name: "Jasmine Latte", price: "₹259", desc: "Delicate jasmine green tea with silky milk" },
    ],
  },
  {
    id: "fruit-teas",
    title: "Fruit Teas",
    icon: <Citrus className="w-4 h-4" strokeWidth={1.5} />,
    items: [
      { name: "Passion Mango Burst", price: "₹249", desc: "Tropical mango with passionfruit popping boba" },
      { name: "Lychee Rose", price: "₹269", desc: "Rose-infused tea with lychee jelly" },
      { name: "Strawberry Glaze", price: "₹279", desc: "Fresh strawberry purée with rainbow jelly" },
      { name: "Peach Oolong", price: "₹259", desc: "Light peach-infused oolong tea with aloe vera" },
    ],
  },
  {
    id: "smoothies",
    title: "Smoothies",
    icon: <CupSoda className="w-4 h-4" strokeWidth={1.5} />,
    items: [
      { name: "Taro Smoothie", price: "₹299", desc: "Thick, creamy taro blended with ice & cream" },
      { name: "Matcha Frappe", price: "₹319", desc: "Icy matcha blended smooth with cream top" },
      { name: "Strawberry Glaze Smoothie", price: "₹289", desc: "Strawberry purée smoothie with jelly bits" },
      { name: "Mango Coconut", price: "₹279", desc: "Tropical mango and coconut cream blend" },
    ],
  },
  {
    id: "toppings",
    title: "Toppings",
    icon: <Sparkles className="w-4 h-4" strokeWidth={1.5} />,
    items: [
      { name: "Tapioca Pearls", price: "+₹30", desc: "Classic brown sugar coated boba" },
      { name: "Popping Boba", price: "+₹40", desc: "Fruit-flavored bursting boba" },
      { name: "Coconut Jelly", price: "+₹35", desc: "Soft, chewy coconut jelly cubes" },
      { name: "Cream Cheese Foam", price: "+₹50", desc: "Rich and salty-sweet foam layer" },
      { name: "Aloe Vera", price: "+₹25", desc: "Fresh aloe vera cubes" },
    ],
  },
];

// ─── Animation Variants ───────────────────────────

const EASE_OUT: [number, number, number, number] = [0.25, 1, 0.5, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

// ─── Page ─────────────────────────────────────────

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-brand-dark">
      <Navbar />
      <MenuHero />
      <FanFavorites />
      <TabbedMenu />
      <MenuCTA />
      <Footer />
    </main>
  );
}

// ─── Hero ─────────────────────────────────────────

function MenuHero() {
  return (
    <section className="relative pt-40 pb-20 px-6 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-coral text-[11px] tracking-[0.5em] uppercase mb-6 font-medium"
        >
          Our Menu
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="brand-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white/90 leading-[1] mb-8 tracking-tight"
        >
          crafted for you
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/30 text-base md:text-lg font-light max-w-[42ch] mx-auto leading-relaxed"
        >
          Every drink is made fresh, by hand, with real ingredients. Find your new favorite.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Fan Favorites ────────────────────────────────

function FanFavorites() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-10 lg:mb-14"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-white/90 tracking-tight leading-[1] mb-5"
          >
            Fan Favorites
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/30 text-base font-light max-w-sm">
            The drinks our regulars can&apos;t stop ordering.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {FAN_FAVORITES.map((drink) => (
            <motion.div key={drink.name} variants={itemVariants}>
              <div className="cafe-card group cursor-pointer p-6 relative h-[320px] md:h-[380px] flex flex-col justify-end overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-[1s] ease-out z-0 pointer-events-none"
                />
                
                <div className="relative z-10 pt-4 border-t border-white/[0.04]">
                  <h3 className="text-white/90 font-semibold text-sm sm:text-base leading-tight drop-shadow-md mb-2">
                    {drink.name}
                  </h3>
                  <p className="text-brand-coral/90 font-semibold text-sm drop-shadow-md">
                    {drink.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Tabbed Menu ──────────────────────────────────

function TabbedMenu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section ref={ref} className="relative py-20 px-6 md:px-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="text-brand-coral text-[11px] tracking-[0.5em] uppercase mb-5 font-medium"
          >
            Full Menu
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white/90 tracking-tight leading-[1] mb-6"
          >
            Everything We Make
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-white/30 text-base font-light mb-14 max-w-[48ch]"
          >
            All drinks are customizable. Ask us about sugar levels, ice preferences, and extra toppings.
          </motion.p>
        </motion.div>

        {/* ── Category Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide"
        >
          {MENU_CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(i)}
              className={`relative flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm tracking-wide whitespace-nowrap transition-all duration-300 ${
                activeTab === i
                  ? "bg-brand-cream text-brand-dark font-semibold shadow-lg"
                  : "bg-white/[0.02] text-white/50 hover:bg-white/[0.06] hover:text-white/80 border border-white/[0.04] font-medium"
              }`}
            >
              {cat.icon}
              {cat.title}
              {activeTab === i && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-brand-cream rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Menu Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          >
            {MENU_CATEGORIES[activeTab].items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE_OUT }}
                className="cafe-card group p-6 md:p-8 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="text-base font-semibold text-white/80 group-hover:text-white transition-colors leading-tight">
                    {item.name}
                  </h4>
                  <span className="text-brand-coral/90 font-semibold text-sm whitespace-nowrap pt-0.5">
                    {item.price}
                  </span>
                </div>
                <p className="text-white/30 text-sm font-light leading-relaxed group-hover:text-white/40 transition-colors max-w-[28ch]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────

function MenuCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 md:px-10">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
      </div>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <motion.p variants={itemVariants} className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-6">
          Curious?
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 tracking-tight leading-[1] mb-8"
        >
          Know Our Story
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-white/30 text-base font-light leading-relaxed mb-12 max-w-[36ch] mx-auto"
        >
          From Taiwan-sourced ingredients to Jaipur-crafted drinks — discover what makes Bubblier different.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/about"
            className="inline-block px-10 py-3.5 rounded-xl bg-white text-[#050505] font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
          >
            Our Story
          </Link>
          <Link
            href="/contact"
            className="inline-block px-10 py-3.5 rounded-xl bg-transparent text-white/60 hover:text-white/90 font-light text-sm tracking-wide hover:border-white/[0.15] transition-all duration-300 border border-white/[0.06]"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
