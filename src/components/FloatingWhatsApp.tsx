"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { MESSAGES, wa } from "@/lib/site";
import { INTRO } from "@/lib/motion";

/** Always visible on mobile; smaller and quieter on desktop. Enters after the hero intro. */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={wa(MESSAGES.quote)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Oot Weel Tattoo on WhatsApp"
      initial={reduce ? false : { opacity: 0, scale: 0.4, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : INTRO.floating, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      className="fixed bottom-4 right-4 z-30 grid size-16 place-items-center rounded-full bg-jade text-[#faf8f3] shadow-[0_14px_34px_-10px_rgb(14_80_41/0.7)] md:bottom-6 md:right-6 md:size-14 md:opacity-90 md:hover:opacity-100"
    >
      <WhatsappLogo size={30} weight="fill" aria-hidden />
    </motion.a>
  );
}
