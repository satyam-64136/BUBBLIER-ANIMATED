"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import LoadingScreen from "./LoadingScreen";

const TOTAL_FRAMES = 197;
const FRAME_PATH = "/assets/images/sequence/frame_";
const FRAME_EXT = ".jpg";

// Scroll beat definitions — non-overlapping ranges with clean gaps
const BEATS = [
  {
    id: "pure-form",
    title: "PURE FORM",
    subtitle: "An empty canvas for flavor.",
    range: [0.02, 0.18] as [number, number],
  },
  {
    id: "ingredients",
    title: "INGREDIENTS\nFALL INTO PLACE",
    subtitle: "Every element begins with intention.",
    range: [0.26, 0.42] as [number, number],
  },
  {
    id: "flow",
    title: "FLOW IN\nMOTION",
    subtitle: "Smooth pour. Perfect balance.",
    range: [0.50, 0.66] as [number, number],
  },
  {
    id: "ready",
    title: "READY\nTO SIP",
    subtitle: "Crafted to perfection.",
    range: [0.74, 0.90] as [number, number],
  },
];

export default function BubbleTeaScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animFrameRef = useRef<number>(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let cancelled = false;

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          if (!cancelled) {
            images[index] = img;
            loadedCount++;
            setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
          }
          resolve();
        };
        img.onerror = reject;
        img.src = `${FRAME_PATH}${index}${FRAME_EXT}`;
      });
    };

    const loadBatch = async (startIdx: number, batchSize: number) => {
      const promises: Promise<void>[] = [];
      for (
        let i = startIdx;
        i < Math.min(startIdx + batchSize, TOTAL_FRAMES);
        i++
      ) {
        promises.push(loadImage(i));
      }
      await Promise.all(promises);
    };

    const loadAll = async () => {
      const batchSize = 20;
      for (let i = 0; i < TOTAL_FRAMES; i += batchSize) {
        if (cancelled) return;
        await loadBatch(i, batchSize);
      }
      if (!cancelled) {
        imagesRef.current = images;
        setIsLoaded(true);
      }
    };

    loadAll();

    return () => {
      cancelled = true;
    };
  }, []);

  // Set up canvas dimensions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render frame on canvas — shifted right on desktop
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const images = imagesRef.current;

      if (!canvas || !ctx || !images[frameIndex]) return;

      const img = images[frameIndex];
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      const isDesktop = canvasWidth >= 1024;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Contain-fit scaling
      const imgAspect = img.naturalWidth / img.naturalHeight;

      // On desktop, use only 65% right portion of screen for the product
      const viewWidth = isDesktop ? canvasWidth * 0.65 : canvasWidth;
      const viewOffsetX = isDesktop ? canvasWidth * 0.35 : 0;

      const viewAspect = viewWidth / canvasHeight;

      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

      if (viewAspect > imgAspect) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imgAspect;
        drawX = viewOffsetX + (viewWidth - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = viewWidth;
        drawHeight = drawWidth / imgAspect;
        drawX = viewOffsetX;
        drawY = (canvasHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    },
    []
  );

  // Update frame on scroll
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const frameIndex = Math.min(
      Math.floor(latest * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );

    if (frameIndex !== currentFrameIndex) {
      setCurrentFrameIndex(frameIndex);

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      animFrameRef.current = requestAnimationFrame(() => {
        renderFrame(frameIndex);
      });
    }
  });

  // Render first frame when loaded
  useEffect(() => {
    if (isLoaded && imagesRef.current[0]) {
      renderFrame(0);
    }
  }, [isLoaded, renderFrame]);

  // Beat text components
  const beatElements = useMemo(
    () =>
      BEATS.map((beat) => (
        <BeatOverlay
          key={beat.id}
          beat={beat}
          scrollProgress={smoothProgress}
        />
      )),
    [smoothProgress]
  );

  return (
    <>
      <LoadingScreen progress={loadProgress} isLoaded={isLoaded} />

      <div
        ref={containerRef}
        className="relative"
        style={{ height: "500vh" }}
      >
        {/* Sticky wrapper */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-brand-dark">
          {/* Canvas — full screen, product drawn shifted-right on desktop */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full frame-canvas"
          />

          {/* Text overlays */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {beatElements}
          </div>

          {/* Top vignette */}
          <div className="absolute top-0 left-0 right-0 h-32 z-[5] pointer-events-none bg-gradient-to-b from-[#050505]/60 to-transparent" />

          {/* Bottom vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-48 z-[5] pointer-events-none bg-gradient-to-t from-[#050505]/70 to-transparent" />

          {/* Desktop: Left panel subtle gradient for text readability */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-[42%] z-[4] pointer-events-none bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent" />
        </div>
      </div>
    </>
  );
}

// ─── Beat Overlay Component ─────────────────────
// Desktop: positioned left | Mobile: positioned bottom-center

interface BeatOverlayProps {
  beat: {
    id: string;
    title: string;
    subtitle: string;
    range: [number, number];
  };
  scrollProgress: ReturnType<typeof useSpring>;
}

function BeatOverlay({ beat, scrollProgress }: BeatOverlayProps) {
  const [start, end] = beat.range;

  // Tight fade transitions — only ONE visible at a time
  const opacity = useTransform(
    scrollProgress,
    [start, start + 0.03, end - 0.03, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollProgress,
    [start, start + 0.03, end - 0.03, end],
    [25, 0, 0, -25]
  );

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col pointer-events-none
        items-center justify-end text-center px-6 pb-20
        lg:items-start lg:justify-center lg:text-left lg:px-12 xl:px-20 2xl:px-28 lg:pb-0 lg:max-w-[40%]`}
      style={{ opacity, y }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight leading-[0.9] mb-3 lg:mb-5 whitespace-pre-line">
        <span className="text-white/90 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          {beat.title}
        </span>
      </h2>
      <p className="text-sm lg:text-base xl:text-lg text-white/35 tracking-wide max-w-xs lg:max-w-sm font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-relaxed">
        {beat.subtitle}
      </p>
      <div className="w-8 lg:w-10 h-[1px] bg-white/10 mt-5 lg:mt-8" />
    </motion.div>
  );
}
