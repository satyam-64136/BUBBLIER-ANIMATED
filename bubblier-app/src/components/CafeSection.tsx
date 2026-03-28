"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────

const FEATURED_DRINKS = [
  {
    name: "Classic Brown Sugar",
    description: "Rich brown sugar syrup with fresh milk tea & chewy tapioca pearls",
    price: "₹249",
    image: "/drinks/classic-milktea.png",
    tag: "Bestseller",
  },
  {
    name: "Taro Dream",
    description: "Creamy taro blended to perfection with a sweetness that lingers",
    price: "₹279",
    image: "/drinks/taro.png",
    tag: "New",
  },
  {
    name: "Matcha Zen",
    description: "Premium Japanese matcha layered with oat milk & honey pearls",
    price: "₹299",
    image: "/drinks/matcha.png",
    tag: "Popular",
  },
  {
    name: "Strawberry Blush",
    description: "Fresh strawberry purée with popping boba & a hint of lychee",
    price: "₹269",
    image: "/drinks/strawberry.png",
    tag: "Seasonal",
  },
];

const INGREDIENTS = [
  {
    icon: "🧋",
    name: "Tapioca Pearls",
    description: "Chewy, brown-sugar coated pearls cooked fresh every hour",
  },
  {
    icon: "🍵",
    name: "Premium Tea",
    description: "Loose leaf Assam & oolong sourced from organic farms",
  },
  {
    icon: "🥛",
    name: "Fresh Milk",
    description: "Farm-fresh whole milk — no creamer, no compromise",
  },
  {
    icon: "🍯",
    name: "Natural Sweeteners",
    description: "Brown sugar, honey, and agave — nothing artificial",
  },
];

// ─── Animation Variants ───────────────────────────

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

// ─── Main Component ───────────────────────────────

export default function CafeSection() {
  return (
    <div className="relative overflow-hidden bg-brand-dark">
      {/* Featured Drinks Section */}
      <FeaturedDrinks />

      {/* Ingredients Section */}
      <IngredientsSection />

      {/* About Section */}
      <AboutSection />

      {/* Final CTA */}
      <CTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

// ─── Featured Drinks ──────────────────────────────

function FeaturedDrinks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="featured-drinks"
      className="relative bg-brand-dark py-32 md:py-44 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-20 md:mb-28"
        >
          <motion.p
            variants={itemVariants}
            className="text-white/25 text-[11px] tracking-[0.5em] uppercase mb-5"
          >
            Our Menu
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white/90 tracking-tight leading-[0.9] mb-6"
          >
            Fan Favorites
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-white/30 text-base md:text-lg max-w-lg font-light leading-relaxed"
          >
            Each drink, a small masterpiece — handcrafted with ingredients that speak for themselves.
          </motion.p>
        </motion.div>

        {/* Drink grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {FEATURED_DRINKS.map((drink) => (
            <motion.div
              key={drink.name}
              variants={scaleInVariants}
              className="cafe-card group cursor-pointer overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-64 md:h-72 overflow-hidden rounded-t-[20px]">
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[9px] tracking-[0.15em] uppercase font-medium bg-white/10 backdrop-blur-md text-white/70 border border-white/5">
                    {drink.tag}
                  </span>
                </div>
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-white/85 tracking-tight">
                    {drink.name}
                  </h3>
                  <span className="text-white/40 font-medium text-base ml-3 whitespace-nowrap">
                    {drink.price}
                  </span>
                </div>
                <p className="text-white/25 text-sm font-light leading-relaxed">
                  {drink.description}
                </p>

                {/* Order button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-5 w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/60 hover:text-white/90 text-sm font-light tracking-wide transition-all duration-400 border border-white/[0.04]"
                >
                  Add to Order
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Ingredients Section ──────────────────────────

function IngredientsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="ingredients"
      className="relative bg-brand-dark py-32 md:py-44 px-6 md:px-10"
    >
      {/* Subtle section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.p
            variants={itemVariants}
            className="text-white/25 text-[11px] tracking-[0.5em] uppercase mb-5"
          >
            What Goes In
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white/90 tracking-tight leading-[0.9] mb-6"
          >
            Real Ingredients
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-white/30 text-base md:text-lg max-w-lg font-light leading-relaxed"
          >
            We believe great taste starts with honest ingredients. Nothing hidden, nothing fake.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"
        >
          {INGREDIENTS.map((item) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              className="flex items-start gap-5 p-7 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.08] transition-all duration-500 group"
            >
              <span className="text-3xl md:text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 opacity-80">
                {item.icon}
              </span>
              <div>
                <h3 className="text-base font-semibold text-white/80 mb-1.5 tracking-tight">
                  {item.name}
                </h3>
                <p className="text-white/30 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative bg-brand-dark py-32 md:py-44 px-6 md:px-10"
    >
      {/* Subtle section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

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
              className="text-white/25 text-[11px] tracking-[0.5em] uppercase mb-5"
            >
              Our Story
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white/90 tracking-tight leading-[0.9] mb-8"
            >
              More Than<br />a Drink
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-white/30 text-base md:text-lg font-light leading-relaxed mb-6"
            >
              Bubblier was born from a simple idea: bubble tea should be made with
              the same care as a barista&apos;s favourite espresso. We source our
              ingredients from small farms, cook our pearls fresh every hour, and
              craft every drink by hand.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-white/30 text-base md:text-lg font-light leading-relaxed mb-10"
            >
              What started as a tiny corner stand is now a community of tea
              lovers who believe flavour should never be compromised.
            </motion.p>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white/70 hover:text-white font-light text-sm tracking-wide transition-all duration-400 border border-white/[0.06]"
            >
              Visit Our Café →
            </motion.button>
          </div>

          {/* Visual side — minimal decorative card */}
          <motion.div
            variants={scaleInVariants}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.04] p-10 md:p-14 flex flex-col items-center justify-center">
              {/* Large decorative emoji/icon */}
              <span className="text-7xl md:text-8xl mb-8 opacity-60">🧋</span>
              <p className="brand-text text-3xl md:text-4xl text-white/60 mb-3">
                bubblier
              </p>
              <p className="text-white/20 text-xs tracking-[0.4em] uppercase font-light">
                Since 2024
              </p>

              {/* Floating decorative elements */}
              <div className="absolute top-8 right-10 w-3 h-3 rounded-full bg-white/[0.04] animate-float" />
              <div className="absolute bottom-14 left-10 w-5 h-5 rounded-full bg-white/[0.03] animate-float-delayed" />
              <div className="absolute top-1/3 left-8 w-2 h-2 rounded-full bg-white/[0.05] animate-float-slow" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-brand-dark py-40 md:py-56 px-6 md:px-10"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] rounded-full opacity-[0.025]"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-6"
        >
          Ready?
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white/90 tracking-tight leading-[0.9] mb-8"
        >
          Your Next<br />Favorite Drink
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-white/30 text-base md:text-lg font-light leading-relaxed mb-12 max-w-md mx-auto"
        >
          Step into a Bubblier near you, or order online. Your perfect sip is waiting.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-xl bg-white text-[#050505] font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
          >
            Order Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-xl bg-white/[0.06] text-white/60 hover:text-white/90 font-light text-sm tracking-wide hover:bg-white/[0.12] transition-all duration-300 border border-white/[0.06]"
          >
            Explore Menu
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────

function FooterSection() {
  return (
    <footer id="footer" className="relative bg-brand-dark pt-16 pb-12 px-6 md:px-10 border-t border-white/[0.03]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="brand-text text-2xl text-white/70 mb-2">
              bubblier
            </h3>
            <p className="text-white/20 text-sm font-light">
              Crafted with love, served with a smile.
            </p>
          </div>

          <div className="flex gap-10">
            {["Menu", "Locations", "About", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/25 hover:text-white/60 text-[13px] font-light tracking-wide transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-4">
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
