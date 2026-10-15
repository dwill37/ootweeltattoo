"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CtaButton } from "@/components/ui/CtaButton";
import { Ph } from "@/components/ui/Placeholder";
import { SketchUnderline } from "@/components/ui/SketchUnderline";
import { IMG, type Pic } from "@/lib/images";
import { MESSAGES, wa } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

type Artist = {
  show: boolean;
  name: string | null;
  pic: Pic | null;
  quote?: { text: string; who: string };
};

/**
 * Artists. Set `show: false` to hide a card.
 * [PLACEHOLDER: confirm that the artist in the studio photo is Elvis]
 */
const ELVIS: Artist = {
  show: true,
  name: "Elvis",
  pic: IMG.artistAtWork,
  quote: { text: "Elvis took the time to create our tattoos.", who: "Adi S., Google review" },
};

const OTHERS: Artist[] = [
  { show: true, name: null, pic: null },
  { show: false, name: null, pic: null },
];

const wipe = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  shown: { clipPath: "inset(0% 0% 0% 0%)" },
};

export function Artists() {
  const others = OTHERS.filter((a) => a.show);
  return (
    <section id="artists" aria-labelledby="artists-title" className="bg-paper-2/60 px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <h2 id="artists-title" className="display text-[clamp(2.3rem,5vw,4.25rem)]">Meet the artists</h2>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-soft">
          The people who listen to your idea and draw it with you.
        </p>

        <div className={`mt-14 grid grid-cols-1 gap-6 md:mt-20 ${others.length ? "lg:grid-cols-12" : ""}`}>
          {ELVIS.show && <ArtistCard artist={ELVIS} featured className={others.length ? "lg:col-span-7" : ""} />}
          {others.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {others.map((a, i) => (
                <ArtistCard key={i} artist={a} delay={0.15 + i * 0.1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ArtistCard({ artist, featured = false, className = "", delay = 0 }: { artist: Artist; featured?: boolean; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const name = artist.name;
  const href = wa(name ? (name === "Elvis" ? MESSAGES.elvis : MESSAGES.artist(name)) : MESSAGES.quote);

  return (
    <motion.article
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
      className={`flex flex-col rounded-[var(--radius-card)] bg-[#f8f5ef] p-3 ring-1 ring-ink/6 ${featured ? "" : "sm:flex-row lg:flex-row"} ${className}`}>
      <motion.div
        variants={reduce ? undefined : wipe}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1], delay }}
        className={`relative overflow-hidden rounded-[var(--radius-photo)] bg-ink ${
          featured ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-[4/3] sm:aspect-auto sm:min-h-[220px] sm:w-[42%] sm:shrink-0"
        }`}
      >
        {artist.pic ? (
          <motion.div
            className="absolute inset-0"
            variants={reduce ? undefined : { hidden: { scale: 1.15 }, shown: { scale: 1 } }}
            transition={{ duration: 1.6, ease: EASE_OUT, delay }}
          >
            <Image src={artist.pic.src} alt={artist.pic.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" className="object-cover object-[78%_40%]" />
          </motion.div>
        ) : (
          <div className="tracing grid h-full w-full place-items-center p-6 text-center text-ink">
            <Ph>artist photo</Ph>
          </div>
        )}
      </motion.div>

      <div className={`flex flex-1 flex-col ${featured ? "p-5 pt-7 md:p-8" : "p-5"}`}>
        <h3 className={`display ${featured ? "text-[clamp(2.4rem,5vw,4rem)]" : "text-[1.9rem]"}`}>
          <span className="relative inline-block">
            {name ?? <Ph>artist name</Ph>}
            {name && <SketchUnderline whenInView delay={delay + 0.4} />}
          </span>
        </h3>
        <p className="mt-4 text-[15px] text-ink-soft">
          Specialty: <Ph>specialty</Ph>
        </p>
        <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">
          <Ph>short bio</Ph>
        </p>
        {artist.quote && (
          <figure className="mt-6 border-l-2 border-jade pl-4">
            <blockquote className="text-lg font-medium leading-snug">“{artist.quote.text}”</blockquote>
            <figcaption className="mt-1 text-sm text-ink-soft">{artist.quote.who}</figcaption>
          </figure>
        )}
        <div className="mt-auto pt-7">
          <CtaButton href={href} variant={featured ? "jade" : "ink"} magnetic={featured}>
            {name ? `Book with ${name}` : "Book with this artist"}
          </CtaButton>
        </div>
      </div>
    </motion.article>
  );
}
