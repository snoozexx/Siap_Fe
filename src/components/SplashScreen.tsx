"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  imageSrc: string;
  text?: string;
  ready?: boolean;
  duration?: number; 
}

export default function SplashScreen({
  imageSrc,
  text = "Harap Tunggu...",
  ready = true,
  duration = 2000
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimerDone(true), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (timerDone && ready) {
      const id = requestAnimationFrame(() => setIsVisible(false));
      return () => cancelAnimationFrame(id);
    }
  }, [timerDone, ready]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F4F4F4]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.2,
            }}
            className="relative w-[280px] h-[180px] md:w-[400px] md:h-[266px]"
          >
            <Image src={imageSrc} alt="Logo" fill className="object-contain" priority />
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-center"
          >
            <p className="text-[#003366] font-medium tracking-wide animate-pulse">{text}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
