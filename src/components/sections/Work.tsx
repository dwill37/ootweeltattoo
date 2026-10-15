"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react/dist/ssr";
import { CtaButton } from "@/components/ui/CtaButton";
import { Ph } from "@/components/ui/Placeholder";
import { GALLERY } from "@/lib/images";
import { SITE } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Work() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)", true);
  const parallax = useMediaQuery("(min-width: 1024px)", false) && !reduce;
  const cols = wide ? 3 : 2;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Each column drifts at its own speed, like loose sheets on a table.
  const speeds = [useTransform(scrollYProgress, [0, 1], [40, -40]), useTransform(scrollYProgress, [0, 1], [120, -120]), useTransform(scrollYProgress, [0, 1], [10, -70])];

  const [active, setActive] = useState<number | null>(null);
  const [origin, setOrigin] = useState<number | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = (i: number, el: HTMLElement) => {
    lastFocus.current = el;
    setOrigin(i);
    setActive(i);
  };
  const close = useCallback(() => {
    setActive(null);
    requestAnimationFrame(() => lastFocus.current?.focus());
  }, []);
  const step = useCallback((dir: 1 | -1) => setActive((a) => (a === null ? a : (a + dir + GALLERY.length) % GALLERY.length)), []);

  const columns: { pic: (typeof GALLERY)[number]; index: number }[][] = Array.from({ length: cols }, () => []);
  GALLERY.forEach((pic, index) => columns[index % cols].push({ pic, index }));

  return (
    <section ref={ref} id="work" aria-labelledby="work-title" className="overflow-x-clip px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1360px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="work-title" className="display text-[clamp(2.6rem,7vw,6rem)]">Real pieces, real skin.</h2>
            <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-ink-soft">
              Work from the studio. Tap any piece to see it up close.
            </p>
          </div>
          <InstagramButton />
        </div>

        <ul className="mt-14 grid gap-3 md:mt-20 md:gap-6" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {columns.map((col, c) => (
            <ColumnList key={c} y={parallax ? speeds[c] : undefined} offset={c === 1}>
              {col.map(({ pic, index }) => (
                <li key={index}>
                  <motion.button
                    type="button"
                    onClick={(e) => open(index, e.currentTarget)}
                    aria-label={`Open larger: ${pic.alt}`}
                    initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, ease: EASE_OUT, delay: (index % 3) * 0.08 }}
                    className="group block w-full cursor-zoom-in"
                  >
                    <motion.div
                      layoutId={`work-${index}`}
                      className="relative overflow-hidden rounded-[var(--radius-photo)] bg-ink/10"
                      style={{ aspectRatio: `${pic.src.width} / ${pic.src.height}` }}
                    >
                      <Image
                        src={pic.src}
                        alt=""
                        fill
                        sizes="(min-width: 1360px) 440px, (min-width: 768px) 32vw, 50vw"
                        placeholder="blur"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                    </motion.div>
                  </motion.button>
                </li>
              ))}
            </ColumnList>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active !== null && <Lightbox index={active} useLayout={active === origin} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}

function ColumnList({ y, offset, children }: { y?: MotionValue<number>; offset: boolean; children: React.ReactNode }) {
  return (
    <li className={offset ? "md:pt-16" : ""}>
      <motion.ul style={y ? { y } : undefined} className="flex flex-col gap-3 md:gap-6">
        {children}
      </motion.ul>
    </li>
  );
}

function InstagramButton() {
  if (SITE.links.instagram) {
    return (
      <CtaButton href={SITE.links.instagram} variant="outline" icon="instagram">
        See more on Instagram
      </CtaButton>
    );
  }
  return (
    <span className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-[15px] font-medium ring-1 ring-inset ring-ink/25">
      See more on Instagram <Ph>Instagram URL</Ph>
    </span>
  );
}

function Lightbox({
  index,
  useLayout,
  onClose,
  onStep,
}: {
  index: number;
  useLayout: boolean;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const pic = GALLERY[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const ratio = pic.src.width / pic.src.height;

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const nodes = document.querySelectorAll<HTMLElement>("#lightbox button");
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Tattoo photo viewer"
      className="on-dark fixed inset-0 z-[60] flex overscroll-contain flex-col items-center justify-center gap-4 p-4 md:p-10"
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <motion.button
        type="button"
        aria-label="Close viewer"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-ink/92"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.figure
          key={index}
          className="relative flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          <motion.div
            layoutId={useLayout ? `work-${index}` : undefined}
            className="relative overflow-hidden rounded-[var(--radius-photo)] bg-ink"
            style={{ aspectRatio: `${ratio}`, width: `min(92vw, calc(78dvh * ${ratio}), 1100px)` }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <Image src={pic.src} alt={pic.alt} fill sizes="92vw" quality={85} className="object-cover" />
          </motion.div>
          <figcaption className="max-w-[60ch] text-center text-[15px] text-paper/85">{pic.alt}</figcaption>
        </motion.figure>
      </AnimatePresence>

      <div className="relative flex items-center gap-3">
        <button type="button" onClick={() => onStep(-1)} aria-label="Previous piece" className="grid size-12 place-items-center rounded-full bg-paper/12 text-paper ring-1 ring-inset ring-paper/25 transition-colors hover:bg-paper/20">
          <CaretLeft size={20} aria-hidden />
        </button>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close viewer" className="grid size-12 place-items-center rounded-full bg-paper text-ink transition-transform hover:scale-105">
          <X size={20} aria-hidden />
        </button>
        <button type="button" onClick={() => onStep(1)} aria-label="Next piece" className="grid size-12 place-items-center rounded-full bg-paper/12 text-paper ring-1 ring-inset ring-paper/25 transition-colors hover:bg-paper/20">
          <CaretRight size={20} aria-hidden />
        </button>
      </div>
    </motion.div>
  );
}
