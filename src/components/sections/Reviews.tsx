"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Star } from "@phosphor-icons/react/dist/ssr";
import { CtaButton } from "@/components/ui/CtaButton";
import { SITE } from "@/lib/site";

const REVIEWS = [
  {
    name: "Mick P.",
    meta: "Google Local Guide · Translated from French",
    text: "Excellent tattoo artist in Playa del Carmen. The place is very clean and professional. They really listen to what you want. We got two beautiful tattoos for a very fair price.",
    rest: -1.6,
    from: { x: -60, y: -40, rotate: -9 },
    place: "",
  },
  {
    name: "Waldo S.",
    meta: "Google Local Guide",
    text: "Great place and great work. Prices were fair. The bald artist with big piercings (sorry, I forgot his name) is the best in my opinion: he takes the time to properly design what you ask for and does a beautiful tattoo. For a first tattoo, he made the experience awesome!",
    rest: 1.2,
    from: { x: 60, y: -60, rotate: 8 },
    place: "sm:row-span-2 sm:mt-14",
  },
  {
    name: "Adi S.",
    meta: "Google Local Guide · Translated from German",
    text: "Great shop! Elvis took the time to create our tattoos. And the price was more than reasonable.",
    rest: -0.8,
    from: { x: -30, y: -70, rotate: -6 },
    place: "",
  },
];

function Stars({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} weight="fill" />
      ))}
    </span>
  );
}

export function Reviews() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const value = useSpring(0, { stiffness: 38, damping: 16, restDelta: 0.001 });
  const label = useTransform(value, (v) => Math.min(v, SITE.rating).toFixed(1));
  const fill = useTransform(value, [0, 5], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  useEffect(() => {
    if (!inView) return;
    if (reduce) value.jump(SITE.rating);
    else value.set(SITE.rating);
  }, [inView, reduce, value]);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="overflow-x-clip px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div ref={ref} className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="reviews-title" className="display text-[clamp(2.3rem,5vw,4.25rem)]">
              In their words
            </h2>
            <p className="sr-only">
              Rated {SITE.rating} out of 5, based on {SITE.reviewCount} Google reviews.
            </p>
            <div aria-hidden className="mt-10">
              <motion.span className="display block text-[clamp(6rem,14vw,10rem)] leading-[0.85] tabular-nums">{label}</motion.span>
              <div className="relative mt-5 inline-block text-ink/15">
                <Stars />
                <motion.span className="absolute inset-0 text-jade" style={{ clipPath: fill }}>
                  <Stars />
                </motion.span>
              </div>
              <p className="mt-3 text-[15px] text-ink-soft">Based on {SITE.reviewCount} Google reviews</p>
            </div>
            <div className="mt-9">
              <CtaButton href={SITE.links.googleReviews} variant="outline" icon="arrow">
                Read all {SITE.reviewCount} reviews on Google
              </CtaButton>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:col-span-8 lg:gap-8 lg:pt-6">
          {REVIEWS.map((r, i) => (
            <motion.li
              key={r.name}
              className={`relative ${r.place}`}
              initial={reduce ? false : { ...r.from, opacity: 0 }}
              whileInView={{ x: 0, y: 0, rotate: r.rest, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 80, damping: 12, mass: 0.9, delay: i * 0.12 }}
            >
              {/* A strip of tracing paper "tapes" each note to the board. */}
              <span aria-hidden className="tracing absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 -rotate-3 rounded-[3px] shadow-[0_1px_2px_rgb(19_21_18/0.12)]" />
              <figure className="flex flex-col rounded-[var(--radius-card)] bg-[#fbf9f4] p-7 shadow-[0_24px_50px_-30px_rgb(60_50_30/0.55)] ring-1 ring-ink/6 md:p-8">
                <span className="text-jade">
                  <Stars size={18} />
                  <span className="sr-only">5 out of 5 stars</span>
                </span>
                <blockquote className="mt-5 text-[17px] leading-relaxed text-ink">“{r.text}”</blockquote>
                <figcaption className="mt-auto pt-7">
                  <span className="block font-semibold">{r.name}</span>
                  <span className="mt-0.5 block text-sm text-ink-soft">{r.meta}</span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
