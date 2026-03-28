"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

export default function LoadingScreen({
  progress,
  isLoaded,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-dark"
        >
          {/* Brand text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="brand-text text-3xl md:text-5xl text-white/70 mb-16"
          >
            bubblier
          </motion.h1>

          {/* Progress container */}
          <div className="w-48 md:w-64 flex flex-col items-center gap-5">
            {/* Progress bar track */}
            <div className="w-full h-[1px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full loading-bar"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.round(progress)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Progress text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-light"
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
