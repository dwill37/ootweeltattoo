"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";

const POINTS = [
  {
    title: "Prices that feel fair",
    body: "Price is the thing reviewers mention most, and every one of them calls it fair. One said “more than reasonable.”",
    quote: "Two beautiful tattoos for a very fair price.",
    who: "Mick P.",
    rotate: -3.5,
    place: "md:col-start-1 md:col-span-6 md:row-start-1",
  },
  {
    title: "Artists who listen first",
    body: "Bring an idea, a photo, a rough sketch. Your artist listens, then takes the time to design it with you.",
    quote: "He takes the time to properly design what you ask for.",
    who: "Waldo S.",
    rotate: 2.5,
    place: "md:col-start-7 md:col-span-6 md:row-start-1 md:mt-24",
  },
  {
    title: "Very clean, very professional",
    body: "Those are a reviewer’s exact words about the studio. It is the first thing you want to know before you sit down.",
    quote: "The place is very clean and professional.",
    who: "Mick P.",
    rotate: 1.8,
    place: "md:col-start-2 md:col-span-6 md:row-start-2 md:-mt-6",
  },
  {
    title: "Great for a first tattoo (or two)",
    body: "Reviewers came in for their first tattoo, or with a friend or partner to get tattooed together.",
    quote: "For a first tattoo, he made the experience awesome!",
    who: "Waldo S.",
    rotate: -2.2,
    place: "md:col-start-7 md:col-span-6 md:row-start-2 md:mt-16",
  },
];

export function Why() {
  const reduce = useReducedMotion();
  return (
    <section id="why" aria-labelledby="why-title" className="relative overflow-hidden px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <h2 id="why-title" className="display max-w-[16ch] text-[clamp(2.3rem,5vw,4.25rem)]">
          What {SITE.reviewCount} Google reviews keep saying
        </h2>

        <ol className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-12 md:gap-x-8 md:gap-y-10">
          {POINTS.map((p, i) => (
            <motion.li
              key={p.title}
              className={`ruled relative flex flex-col rounded-[var(--radius-card)] bg-[#f8f5ef] p-7 shadow-[0_1px_0_rgb(19_21_18/0.05),0_22px_50px_-28px_rgb(60_50_30/0.45)] ring-1 ring-ink/6 md:p-10 ${p.place}`}
              initial={reduce ? false : { opacity: 0, y: 70, x: i % 2 ? 40 : -40, rotate: p.rotate * 2.2 }}
              whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ type: "spring", stiffness: 70, damping: 15, mass: 1, delay: (i % 2) * 0.12 }}
            >
              <h3 className="display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.05]">{p.title}</h3>
              <p className="mt-4 max-w-[38ch] text-[17px] leading-relaxed text-ink-soft">{p.body}</p>
              <figure className="mt-8 border-t border-dashed border-ink/20 pt-5">
                <blockquote className="text-[15px] font-medium leading-snug text-jade">“{p.quote}”</blockquote>
                <figcaption className="mt-1.5 text-sm text-ink-soft">{p.who}, Google review</figcaption>
              </figure>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
