"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Droplet, Leaf, Milk, Hexagon } from "lucide-react";

// ─── Data ─────────────────────────────────────────

const INGREDIENTS = [
  {
    icon: <Droplet className="w-8 h-8 md:w-10 md:h-10 text-white/80" strokeWidth={1.5} />,
    name: "Tapioca Pearls",
    description: "Chewy, brown-sugar coated pearls cooked fresh every hour",
  },
  {
    icon: <Leaf className="w-8 h-8 md:w-10 md:h-10 text-white/80" strokeWidth={1.5} />,
    name: "Premium Tea",
    description: "Loose leaf Assam & oolong sourced from organic farms",
  },
  {
    icon: <Milk className="w-8 h-8 md:w-10 md:h-10 text-white/80" strokeWidth={1.5} />,
    name: "Fresh Milk",
    description: "Farm-fresh whole milk — no creamer, no compromise",
  },
  {
    icon: <Hexagon className="w-8 h-8 md:w-10 md:h-10 text-white/80" strokeWidth={1.5} />,
    name: "Natural Sweeteners",
    description: "Brown sugar, honey, and agave — nothing artificial",
  },
];

const FAN_FAVORITES_PREVIEW = [
  { name: "Matcha Milk Tea", image: "/assets/products/matcha.png" },
  { name: "Taro Milk Tea", image: "/assets/products/taro.png" },
  { name: "Earl Grey Milk Tea", image: "/assets/products/earl-grey.png" },
  { name: "Strawberry Smoothie", image: "/assets/products/strawberry.png" },
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

// ─── Main Component ───────────────────────────────

export default function CafeSection() {
  return (
    <div className="relative overflow-hidden bg-brand-dark">
      <IngredientsSection />
      <FanFavoritesPreview />
      <AboutPreview />
      <CTASection />
    </div>
  );
}

// ─── Ingredients Section ──────────────────────────

function IngredientsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} id="ingredients" className="relative bg-brand-dark py-32 md:py-48 px-6 md:px-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start"
        >
          {/* Left: Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <motion.p variants={itemVariants} className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-5">
              What Goes In
            </motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 tracking-tight leading-[1] mb-6">
              Real Ingredients
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/30 text-base font-light max-w-sm leading-relaxed">
              We believe great taste starts with honest ingredients. Nothing hidden, nothing fake.
            </motion.p>
          </div>

          {/* Right: Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {INGREDIENTS.map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="cafe-card p-10 group"
              >
                <div className="mb-6 opacity-80">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white/90 mb-2 tracking-tight">
                  {item.name}
                </h3>
                <p className="text-white/30 text-sm font-light leading-relaxed max-w-[28ch]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Fan Favorites Preview ────────────────────────

function FanFavoritesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative bg-brand-dark py-24 md:py-36 px-6 md:px-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center"
        >
          {/* Left: Heading */}
          <div className="lg:col-span-5">
            <motion.p variants={itemVariants} className="text-brand-coral/60 text-[11px] tracking-[0.5em] uppercase mb-5">
              Fan Favorites
            </motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 tracking-tight leading-[1] mb-6">
              What People Love
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/30 text-base font-light max-w-sm mb-10 leading-relaxed">
              The drinks our regulars keep coming back for.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link href="/menu" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white font-light text-sm tracking-wide transition-all duration-400 border border-white/[0.06]">
                View Full Menu
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right: Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-5">
            {FAN_FAVORITES_PREVIEW.map((drink) => (
              <motion.div key={drink.name} variants={itemVariants} className="cafe-card group cursor-pointer overflow-hidden p-6 relative h-[280px] md:h-[320px] flex flex-col justify-end">
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay bg-gradient-to-b from-transparent via-transparent to-black/80" />
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                />
                <div className="relative z-10 pt-4 border-t border-white/[0.04]">
                  <h3 className="text-white/90 font-semibold text-sm sm:text-base leading-tight drop-shadow-md">
                    {drink.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About Preview ────────────────────────────────

function AboutPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative bg-brand-dark py-24 md:py-36 px-6 md:px-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Visual side */}
          <motion.div variants={itemVariants} className="cafe-card relative aspect-square md:aspect-[4/3] w-full overflow-hidden flex items-center justify-center p-10">
            <Image
              src="/assets/products/taro.png"
              alt="Bubblier Taro"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8 opacity-90 transition-transform duration-[1.5s] ease-out hover:scale-105"
            />
          </motion.div>

          {/* Text side */}
          <div>
            <motion.p variants={itemVariants} className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-5">
              Our Story
            </motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 tracking-tight leading-[1] mb-8">
              More Than<br />a Drink
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/30 text-base font-light leading-relaxed mb-6 max-w-md">
              Bubblier was born from a simple idea: bubble tea should be made with
              the same care as a barista&apos;s favourite espresso. We source our
              ingredients from Taiwan and craft every drink by hand in Jaipur.
            </motion.p>
            <motion.div variants={itemVariants} className="pt-4">
              <Link href="/about" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white font-light text-sm tracking-wide transition-all duration-400 border border-white/[0.06]">
                Explore Our Process
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative bg-brand-dark py-36 md:py-48 px-6 md:px-10">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 max-w-2xl mx-auto text-center cafe-card p-12 md:p-20"
      >
        <motion.p variants={itemVariants} className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-6">
          Ready?
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 tracking-tight leading-[1] mb-8">
          Your Next Favorite Drink
        </motion.h2>
        <motion.p variants={itemVariants} className="text-white/30 text-base font-light leading-relaxed mb-12 max-w-[32ch] mx-auto">
          Step into a Bubblier near you, or order online. Your perfect sip is waiting.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/menu"
            className="inline-block w-full sm:w-auto px-10 py-3.5 rounded-xl bg-white text-[#050505] font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300"
          >
            Explore Menu
          </Link>
          <Link
            href="/contact"
            className="inline-block w-full sm:w-auto px-10 py-3.5 rounded-xl bg-transparent text-white/60 hover:text-white/90 font-light text-sm tracking-wide transition-all duration-300 border border-white/[0.06] hover:border-white/[0.15]"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
