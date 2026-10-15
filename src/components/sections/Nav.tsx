"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { CtaButton } from "@/components/ui/CtaButton";
import { MESSAGES, NAV_LINKS, PHONE_DISPLAY, PHONE_TEL, wa } from "@/lib/site";
import { EASE_DRAWER, EASE_OUT, INTRO } from "@/lib/motion";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Only flips state when crossing the threshold, so no per-frame re-renders.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 48;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Keep keyboard focus inside the menu while it is open.
    const behind = [document.getElementById("main"), document.querySelector("footer")];
    behind.forEach((el) => el?.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      behind.forEach((el) => el?.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  const light = !scrolled && !open; // light text over the hero photo

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5">
      <motion.nav
        aria-label="Main"
        initial={reduce ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: INTRO.nav, duration: 0.7, ease: EASE_OUT }}
        className="relative mx-auto max-w-[1360px]"
      >
        {/* Island backdrop: fades and settles in when scrolled. */}
        <motion.div
          aria-hidden
          initial={false}
          animate={scrolled && !open ? { opacity: 1, scaleX: 1, y: 0 } : { opacity: 0, scaleX: 0.94, y: -6 }}
          transition={{ duration: 0.5, ease: EASE_DRAWER }}
          className="absolute inset-0 rounded-full bg-paper/88 shadow-[0_10px_40px_-12px_rgb(19_21_18/0.25),inset_0_0_0_1px_rgb(19_21_18/0.08)] backdrop-blur-xl"
        />
        <div
          className="relative flex items-center justify-between gap-6 py-1.5 pl-5 pr-1.5"
        >
          <a
            href="#top"
            onClick={() => setOpen(false)}
            translate="no"
            className={`display relative z-10 text-[26px] leading-none transition-colors duration-500 ${light ? "text-paper on-dark" : "text-ink"}`}
            aria-label="Oot Weel Tattoo, back to top"
          >
            Oot Weel
          </a>

          <ul className="hidden items-center gap-1 min-[1120px]:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors duration-300 ${
                    light ? "text-paper/90 hover:bg-paper/12 hover:text-paper on-dark" : "text-ink/75 hover:bg-ink/6 hover:text-ink"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <CtaButton href={wa(MESSAGES.quote)} variant={light ? "paper" : "jade"} size="md">
                Get a quote on WhatsApp
              </CtaButton>
            </div>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className={`relative grid size-12 place-items-center rounded-full transition-colors duration-300 min-[1120px]:hidden ${
                light ? "bg-paper/15 text-paper ring-1 ring-inset ring-paper/30 on-dark" : "bg-ink text-paper"
              }`}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <motion.span
                aria-hidden
                className="absolute h-[1.5px] w-5 rounded-full bg-current"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              />
              <motion.span
                aria-hidden
                className="absolute h-[1.5px] w-5 rounded-full bg-current"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const firstLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => firstLink.current?.focus(), []);

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 -z-10 overflow-y-auto overscroll-contain"
      initial="closed"
      animate="open"
      exit="closed"
    >
      {/* Two sheets of tracing paper slide down, the second one lands on the first. */}
      <motion.div
        aria-hidden
        className="tracing absolute inset-0"
        variants={{ open: { y: "0%" }, closed: { y: "-100%" } }}
        transition={{ duration: 0.55, ease: EASE_DRAWER }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-paper"
        variants={{ open: { y: "0%", transition: { delay: 0.08, duration: 0.6, ease: EASE_DRAWER } }, closed: { y: "-100%", transition: { duration: 0.45, ease: EASE_DRAWER } } }}
      />
      <div className="relative flex min-h-full flex-col justify-between px-6 pb-10 pt-28">
        <motion.ul
          className="flex flex-col gap-1"
          variants={{ open: { transition: { staggerChildren: 0.05, delayChildren: 0.22 } }, closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } } }}
        >
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <motion.a
                ref={i === 0 ? firstLink : undefined}
                href={l.href}
                onClick={onClose}
                className="display block py-1 text-[clamp(2.6rem,11vw,4.5rem)] text-ink"
                variants={{ open: { y: "0%", opacity: 1 }, closed: { y: "100%", opacity: 0 } }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                {l.label}
              </motion.a>
            </li>
          ))}
        </motion.ul>
        <motion.div
          className="mt-10 flex flex-col gap-4"
          variants={{ open: { opacity: 1, y: 0, transition: { delay: 0.5 } }, closed: { opacity: 0, y: 12 } }}
        >
          <CtaButton href={wa(MESSAGES.quote)} size="lg" className="w-full">
            Get a quote on WhatsApp
          </CtaButton>
          <a href={PHONE_TEL} className="flex items-center gap-2 text-ink-soft">
            <Phone size={18} aria-hidden /> Call {PHONE_DISPLAY}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
