"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CtaButton } from "@/components/ui/CtaButton";
import { Ph } from "@/components/ui/Placeholder";
import { IMG } from "@/lib/images";
import { MESSAGES, wa } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

const DETAILS = [
  { label: "Piercings we do", value: "piercing types" },
  { label: "Jewelry", value: "jewelry options" },
  { label: "Prices", value: "prices" },
];

export function Piercings() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section ref={ref} id="piercings" aria-labelledby="piercings-title" className="px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10">
        <motion.div className="relative md:col-span-5" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.4 }}>
          <div aria-hidden className="absolute -inset-3 translate-x-4 translate-y-4 rounded-[var(--radius-card)] bg-jade md:-inset-4 md:translate-x-6 md:translate-y-6" />
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink"
            variants={
              reduce
                ? undefined
                : {
                    hidden: { clipPath: "circle(8% at 50% 55%)" },
                    shown: { clipPath: "circle(80% at 50% 55%)", transition: { duration: 1.3, ease: [0.65, 0, 0.35, 1] } },
                  }
            }
          >
            <motion.div className="absolute inset-[-10%]" style={{ y }}>
              <Image src={IMG.piercing.src} alt={IMG.piercing.alt} fill sizes="(min-width: 768px) 40vw, 100vw" placeholder="blur" className="object-cover object-[50%_62%]" />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="md:col-span-6 md:col-start-7">
          <h2 id="piercings-title" className="display text-[clamp(2.3rem,5vw,4.25rem)]">Piercings, too</h2>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-soft">
            Same studio, same care. Tell us what you have in mind and we will help you choose.
          </p>
          <dl className="mt-10 grid gap-3">
            {DETAILS.map((d, i) => (
              <motion.div
                key={d.label}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 + i * 0.1 }}
                className="flex flex-col gap-1 rounded-[var(--radius-photo)] bg-paper-2/70 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="text-sm font-medium text-ink-soft">{d.label}</dt>
                <dd className="text-[15px] sm:text-right">
                  <Ph>{d.value}</Ph>
                </dd>
              </motion.div>
            ))}
          </dl>
          <div className="mt-10">
            <CtaButton href={wa(MESSAGES.piercing)} variant="jade" size="lg" magnetic>
              Book a piercing
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
