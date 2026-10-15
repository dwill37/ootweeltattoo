"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ROUGH =
  "M3 15 C 40 9, 85 18, 130 12 S 220 9, 297 13 M8 18 C 70 13, 150 19, 210 14 S 270 12, 292 16 M14 12 C 90 16, 170 8, 286 11";
const CLEAN = "M5 14 C 80 9, 190 8, 295 12";

/**
 * A loose pencil sketch that draws itself, then gives way to one clean final line.
 * Sits absolutely under its parent's text (parent must be `relative`).
 */
export function SketchUnderline({
  delay = 0,
  whenInView = false,
  tone = "jade",
  className = "",
}: {
  delay?: number;
  whenInView?: boolean;
  tone?: "jade" | "bright" | "paper";
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const go = !whenInView || seen;

  const clean = tone === "jade" ? "var(--color-jade)" : tone === "bright" ? "var(--color-jade-bright)" : "var(--color-paper)";
  const rough = tone === "jade" ? "rgb(19 21 18 / 0.55)" : "rgb(241 236 227 / 0.7)";

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -bottom-[0.18em] left-0 h-[0.32em] w-full overflow-visible ${className}`}
    >
      {!reduce && (
        <motion.path
          d={ROUGH}
          fill="none"
          stroke={rough}
          strokeWidth={1.4}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={go ? { pathLength: 1, opacity: [1, 1, 0] } : undefined}
          transition={{
            pathLength: { delay, duration: 0.6, ease: [0.45, 0, 0.2, 1] },
            opacity: { delay, duration: 1.35, times: [0, 0.62, 1] },
          }}
        />
      )}
      <motion.path
        d={CLEAN}
        fill="none"
        stroke={clean}
        strokeWidth={4}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={go ? { pathLength: 1 } : undefined}
        transition={{ delay: delay + 0.55, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
