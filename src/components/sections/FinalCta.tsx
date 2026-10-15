"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CtaButton } from "@/components/ui/CtaButton";
import { SketchUnderline } from "@/components/ui/SketchUnderline";
import { IMG } from "@/lib/images";
import { MESSAGES, wa } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.22, 1]);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="on-dark relative isolate overflow-hidden bg-ink px-5 py-32 text-paper md:px-8 md:py-48">
      <motion.div className="absolute inset-0 -z-10" style={{ scale }}>
        <Image src={IMG.serpent.src} alt={IMG.serpent.alt} fill sizes="100vw" placeholder="blur" className="object-cover object-[50%_40%]" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/72" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgb(19_21_18/0.7)_80%)]" />

      <motion.div className="mx-auto flex max-w-[1100px] flex-col items-center text-center" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.5 }}>
        <motion.h2
          id="cta-title"
          className="display text-[clamp(2.6rem,7vw,6.25rem)] leading-[1.02]"
          variants={
            reduce
              ? undefined
              : {
                  hidden: { clipPath: "inset(0% 0% 100% 0%)", y: 40 },
                  shown: { clipPath: "inset(-10% -5% -25% -5%)", y: 0, transition: { duration: 1.1, ease: EASE_OUT } },
                }
          }
        >
          A tattoo designed{" "}
          <span className="relative inline-block whitespace-nowrap">
            just for you.
            <SketchUnderline whenInView delay={0.7} tone="bright" />
          </span>
        </motion.h2>
        <motion.p
          className="mt-8 max-w-[42ch] text-lg leading-relaxed text-paper/85 md:text-xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.35 }}
        >
          Tell us your idea today. We will take the time to draw it with you.
        </motion.p>
        <motion.div
          className="mt-11"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.5 }}
        >
          <CtaButton href={wa(MESSAGES.quote)} size="xl" magnetic>
            Message us on WhatsApp
          </CtaButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
