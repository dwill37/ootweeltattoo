"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CtaButton } from "@/components/ui/CtaButton";
import { Ph } from "@/components/ui/Placeholder";
import { IMG, type Pic } from "@/lib/images";
import { MESSAGES, wa } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

type StyleCard = {
  /** Set the real style name here; the WhatsApp message picks it up automatically. */
  style: string | null;
  pic: Pic;
  layout: "tall" | "wide";
};

const STYLES: StyleCard[] = [
  { style: null, pic: IMG.rose, layout: "tall" },
  { style: null, pic: IMG.lady, layout: "wide" },
  { style: null, pic: IMG.compass, layout: "wide" },
];

export function Tattoos() {
  return (
    <section id="tattoos" aria-labelledby="tattoos-title" className="overflow-x-clip bg-paper-2/60 px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1360px]">
        <h2 id="tattoos-title" className="display max-w-[14ch] text-[clamp(2.3rem,5vw,4.25rem)]">
          Tattoos drawn around your idea
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
          Every piece starts as a conversation. Pick a starting point below, or send your own idea and get a quote.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 lg:grid-cols-12 lg:grid-rows-2">
          {STYLES.map((card, i) => (
            <StyleCardView key={i} card={card} index={i} />
          ))}
        </div>

        <PairedCards />
      </div>
    </section>
  );
}

function TracedImage({ pic, sizes, className, delay = 0 }: { pic: Pic; sizes: string; className: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-photo)] bg-ink/10 ${className}`}>
      <Image src={pic.src} alt={pic.alt} fill sizes={sizes} placeholder="blur" className="object-cover" />
      {!reduce && (
        <motion.div
          aria-hidden
          className="tracing absolute inset-0"
          initial={{ x: "0%", opacity: 1 }}
          whileInView={{ x: "104%", opacity: 0.2 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ delay: 0.15 + delay, duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        />
      )}
    </div>
  );
}

function StyleCardView({ card, index }: { card: StyleCard; index: number }) {
  const reduce = useReducedMotion();
  const tall = card.layout === "tall";
  const message = card.style ? MESSAGES.style(card.style) : MESSAGES.quote;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: index * 0.08 }}
      className={`group flex flex-col gap-6 rounded-[var(--radius-card)] bg-[#f8f5ef] p-3 ring-1 ring-ink/6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-34px_rgb(60_50_30/0.5)] ${
        tall ? "lg:col-span-5 lg:row-span-2" : "sm:flex-row lg:col-span-7"
      }`}
    >
      <TracedImage
        pic={card.pic}
        delay={index * 0.12}
        sizes={tall ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw"}
        className={tall ? "aspect-[4/5] lg:aspect-auto lg:min-h-[520px] lg:flex-1" : "aspect-[4/3] sm:aspect-auto sm:min-h-[260px] sm:w-[46%] sm:shrink-0"}
      />
      <div className="flex flex-1 flex-col px-3 pb-3 sm:py-3 sm:pr-4">
        <h3 className="display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.05]">
          {card.style ?? <Ph>style name</Ph>}
        </h3>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
          <Ph>short description</Ph>
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-ink-soft">Price</dt>
            <dd className="mt-1 font-medium">
              <Ph>price or “from $…”</Ph>
            </dd>
          </div>
          <div>
            <dt className="text-ink-soft">Session</dt>
            <dd className="mt-1 font-medium">
              <Ph>approximate session time</Ph>
            </dd>
          </div>
        </dl>
        <div className="mt-auto pt-6">
          <CtaButton href={wa(message)} variant="ink">
            Get a quote
          </CtaButton>
        </div>
      </div>
    </motion.article>
  );
}

/** "Your first tattoo" and "Tattoos for two" enter as two offset layers that slide into alignment. */
function PairedCards() {
  const reduce = useReducedMotion();
  const cards = [
    {
      title: "Your first tattoo",
      body: "Never had one? You are in good hands. A reviewer called their first tattoo here an awesome experience, designed with patience.",
      pic: IMG.butterfly,
      href: wa(MESSAGES.first),
      cta: "Ask about a first tattoo",
      from: { x: "18%", y: 46, rotate: -4 },
    },
    {
      title: "Tattoos for two",
      body: "Bring a friend, a partner, a sibling. Get tattooed together, matching or not. Reviewers did, and left with two beautiful tattoos.",
      pic: IMG.matching,
      href: wa(MESSAGES.together),
      cta: "Book for two",
      from: { x: "-18%", y: -20, rotate: 3.5 },
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      {cards.map((c, i) => (
        <motion.article
          key={c.title}
          initial={reduce ? false : c.from}
          whileInView={{ x: "0%", y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1, delay: i * 0.1 }}
          style={{ zIndex: 2 - i }}
          className="relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-ink text-paper on-dark sm:flex-row"
        >
          <div className="relative aspect-[4/3] sm:aspect-auto sm:w-[44%] sm:shrink-0">
            <Image src={c.pic.src} alt={c.pic.alt} fill sizes="(min-width: 768px) 22vw, 100vw" placeholder="blur" className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col p-7 md:p-8">
            <h3 className="display text-[clamp(1.7rem,2.6vw,2.3rem)] leading-[1.05]">{c.title}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-paper/80">{c.body}</p>
            <p className="mt-3 text-sm text-paper/75">
              <Ph>any offer details</Ph>
            </p>
            <div className="mt-auto pt-7">
              <CtaButton href={c.href} variant="jade">
                {c.cta}
              </CtaButton>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
