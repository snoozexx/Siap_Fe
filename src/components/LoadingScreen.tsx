"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  show: boolean;
  imageSrc: string;
  text?: string;
}

export default function LoadingScreen({
  show,
  imageSrc,
  text = "Harap tunggu...",
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F4F4F4]"
        >
          <motion.div
            animate={{ scale: [0.95, 1, 0.95] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-[260px] h-[160px] md:w-[360px] md:h-[220px]"
          >
            <Image
              src={imageSrc}
              alt="Loading"
              fill
              priority
              className="object-contain"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-[#003366] font-medium tracking-wide animate-pulse"
          >
            {text}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
