"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { CtaButton } from "@/components/ui/CtaButton";
import { Ph } from "@/components/ui/Placeholder";
import { MESSAGES, wa } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

const STEPS = [
  {
    title: "Tell us your idea on WhatsApp",
    body: "Send references, the size you have in mind and where on the body it goes. Photos, screenshots and rough sketches all help.",
    extra: null,
  },
  {
    title: "We take the time to design it with you",
    body: "Your artist listens first, then draws your piece. This is the part reviewers mention again and again.",
    extra: "design and approval process, deposit policy",
  },
  {
    title: "Come to Avenida 10 and get inked",
    body: "Settle into the chair at the studio and leave with a tattoo made only for you.",
    extra: "aftercare info",
  },
];

// A hand-drawn vertical line with a little wobble; same path for the rough and the clean stroke.
const PATH = "M20 4 C 34 120, 6 230, 22 340 S 34 560, 18 680 S 8 900, 22 996";

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const drawn = reduce ? 1 : progress;

  return (
    <section id="how" aria-labelledby="how-title" className="bg-paper-2/60 px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1100px]">
        <h2 id="how-title" className="display max-w-[15ch] text-[clamp(2.3rem,5vw,4.25rem)]">
          How a piece comes together
        </h2>

        <ol ref={ref} className="relative mt-16 md:mt-24">
          <svg aria-hidden viewBox="0 0 40 1000" preserveAspectRatio="none" className="absolute left-0 top-0 h-full w-10 overflow-visible md:left-2">
            <path d={PATH} fill="none" stroke="rgb(19 21 18 / 0.35)" strokeWidth={1.5} strokeDasharray="3 9" strokeLinecap="round" />
            <motion.path d={PATH} fill="none" stroke="var(--color-jade)" strokeWidth={3.5} strokeLinecap="round" style={{ pathLength: drawn }} />
          </svg>

          {STEPS.map((s, i) => (
            <Step key={s.title} index={i} step={s} progress={progress} reduce={!!reduce} />
          ))}
        </ol>

        <div className="mt-6 pl-16 md:pl-28">
          <CtaButton href={wa(MESSAGES.quote)} size="lg" magnetic>
            Start with your idea
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  step,
  progress,
  reduce,
}: {
  index: number;
  step: (typeof STEPS)[number];
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const at = index / (STEPS.length - 1);
  const start = Math.max(0, at - 0.12);
  const nodeBg = useTransform(progress, [start, at], ["rgb(241 236 227)", "rgb(19 107 58)"]);
  const nodeFg = useTransform(progress, [start, at], ["rgb(19 21 18)", "rgb(250 248 243)"]);
  const nodeScale = useTransform(progress, [start, at, Math.min(1, at + 0.08)], [1, 1.18, 1]);

  return (
    <li className="relative pb-20 pl-16 last:pb-12 md:pb-28 md:pl-28">
      <motion.span
        aria-hidden
        style={reduce ? undefined : { backgroundColor: nodeBg, color: nodeFg, scale: nodeScale }}
        className={`display absolute top-0 grid size-11 place-items-center rounded-full text-lg ring-1 ring-ink/20 ${
          reduce ? "bg-jade text-[#faf8f3]" : ""
        } -left-[2px] md:left-[6px]`}
      >
        {index + 1}
      </motion.span>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <h3 className="display text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.05]">
          <span className="sr-only">Step {index + 1}: </span>
          {step.title}
        </h3>
        <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-ink-soft">{step.body}</p>
        {step.extra && (
          <p className="mt-3 text-[15px] text-ink-soft">
            <Ph>{step.extra}</Ph>
          </p>
        )}
      </motion.div>
    </li>
  );
}
