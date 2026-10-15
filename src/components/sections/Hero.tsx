"use client";

import { useEffect, useState } from "react";
import { getImageProps } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Star } from "@phosphor-icons/react/dist/ssr";
import { CtaButton } from "@/components/ui/CtaButton";
import { SketchUnderline } from "@/components/ui/SketchUnderline";
import { IMG } from "@/lib/images";
import { MESSAGES, SITE, wa } from "@/lib/site";
import { INTRO } from "@/lib/motion";

const LEAD = ["Custom", "tattoos,", "designed", "with"];
const MARKED = ["time", "and", "care."];

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 900], ["0%", reduce ? "0%" : "14%"]);

  // Art direction: wide tiger piece on tablet/desktop, the portrait lion piece on phones.
  const common = { alt: "", sizes: "100vw", fetchPriority: "high" as const, loading: "eager" as const, quality: 80 };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: IMG.heroTiger.src });
  const { props: mobile } = getImageProps({ ...common, src: IMG.lion.src });

  const delay = (t: number) => ({ animationDelay: `${t}s` });
  const words = [...LEAD, ...MARKED];
  const wordDelay = (word: string) => delay(INTRO.headline + words.indexOf(word) * INTRO.wordStep);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-ink text-paper">
      <motion.div className="absolute inset-0 -z-10" style={{ y: imgY }}>
        <div className="a-zoom h-full w-full">
          <picture>
            <source media="(min-width: 768px)" srcSet={desktop} />
            <img
              {...mobile}
              alt="Close-up of a black and grey animal tattoo made at Oot Weel Tattoo in Playa del Carmen"
              className="h-full w-full object-cover object-[50%_35%] md:object-[50%_62%]"
            />
          </picture>
        </div>
      </motion.div>
      {/* Scrims keep text at AA contrast over any part of the photo. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(19_21_18/0.94)_0%,rgb(19_21_18/0.72)_38%,rgb(19_21_18/0.18)_72%,rgb(19_21_18/0.45)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_90%,rgb(19_21_18/0.6),transparent_60%)]" />

      <div className="mx-auto w-full max-w-[1360px] px-5 pb-28 pt-32 md:px-8 md:pb-20">
        <a
          href="#reviews"
          style={delay(INTRO.badge)}
          className="a-settle on-dark mb-7 inline-flex items-center gap-2.5 rounded-full bg-paper/12 py-2 pl-2.5 pr-4 text-[15px] font-medium text-paper ring-1 ring-inset ring-paper/25 transition-colors hover:bg-paper/20"
        >
          <span className="grid size-7 place-items-center rounded-full bg-jade-bright text-ink">
            <Star size={15} weight="fill" aria-hidden />
          </span>
          <span>
            {SITE.rating} <span aria-hidden>★</span>
            <span className="sr-only">stars</span> on Google · {SITE.reviewCount} reviews
          </span>
        </a>

        <h1 id="hero-title" className="display max-w-[1150px] text-[clamp(2.6rem,6.2vw,5.5rem)] leading-[1.02]">
          {LEAD.map((word) => (
            <Word key={word} word={word} style={wordDelay(word)} />
          ))}
          <span className="relative inline-block whitespace-nowrap">
            {MARKED.map((word, i) => (
              <Word key={word} word={word} style={wordDelay(word)} space={i < MARKED.length - 1} />
            ))}
            <SketchUnderline delay={reduce ? 0 : INTRO.roughLine} tone="bright" />
          </span>
        </h1>

        <p style={delay(INTRO.subtext)} className="a-rise mt-7 max-w-[34rem] text-lg leading-relaxed text-paper/85 md:text-xl">
          Tattoo and piercing studio in Playa del Carmen. Fair prices, and artists who take the time to design yours.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="a-settle" style={delay(INTRO.ctas)}>
            <CtaButton href={wa(MESSAGES.quote)} size="lg" magnetic variant="jade" className="w-full justify-between sm:w-auto">
              Get your tattoo quote on WhatsApp
            </CtaButton>
          </div>
          <div className="a-settle" style={delay(INTRO.ctas + 0.1)}>
            <CtaButton href="#work" size="lg" variant="glass" icon="none" className="w-full justify-center sm:w-auto">
              See the work
            </CtaButton>
          </div>
        </div>
      </div>

      <IntroSheets />
    </section>
  );
}

function Word({ word, style, space = true }: { word: string; style: React.CSSProperties; space?: boolean }) {
  return (
    <>
      <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
        <span className="a-word inline-block" style={style}>
          {word}
        </span>
      </span>
      {space && " "}
    </>
  );
}

/** Three translucent tracing-paper sheets slide in, stack, then slide away to reveal the photo. */
function IntroSheets() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), INTRO.sheetsGone * 1000);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;

  return (
    <div aria-hidden className="intro-sheets pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div className="tracing a-sheet a-sheet-l absolute inset-0" />
      <div className="a-sheet a-sheet-r absolute inset-[-4%] bg-paper/45" />
      <div className="tracing a-sheet a-sheet-b absolute inset-[-6%]" />
    </div>
  );
}
