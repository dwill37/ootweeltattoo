"use client";

import { useId, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { Ph } from "@/components/ui/Placeholder";
import { FLAGS, MESSAGES, wa } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

const WhatsLink = ({ children }: { children: React.ReactNode }) => (
  <a href={wa(MESSAGES.quote)} target="_blank" rel="noopener noreferrer" className="font-medium text-jade underline decoration-jade/30 underline-offset-4 hover:decoration-jade">
    {children}
  </a>
);

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I get a quote?",
    a: (
      <>
        Message us on <WhatsLink>WhatsApp</WhatsLink> with your idea, a few reference images, the size and where on the body you want it.
        We will reply with a quote.
      </>
    ),
  },
  {
    q: "How much does a tattoo cost?",
    a: (
      <>
        Reviewers keep calling our prices fair, and one said “more than reasonable.” For an exact number, send your idea on WhatsApp.{" "}
        <Ph>starting prices or price ranges</Ph>
      </>
    ),
  },
  {
    q: "It’s my first tattoo. Is that OK?",
    a: (
      <>
        Absolutely. One reviewer put it simply: “For a first tattoo, he made the experience awesome!” Tell us it is your first when you
        write, and we will take it from there.
      </>
    ),
  },
  {
    q: "Can we get tattooed together?",
    a: (
      <>
        Yes. Reviewers came in pairs and left with two beautiful tattoos at a very fair price. <Ph>details for couples, friends or groups</Ph>
      </>
    ),
  },
  {
    q: "Do you take walk-ins?",
    a: (
      <>
        <Ph>walk-in policy</Ph> The quickest way to check availability is a message on <WhatsLink>WhatsApp</WhatsLink>.
      </>
    ),
  },
  ...(FLAGS.showPiercings
    ? [
        {
          q: "Do you do piercings?",
          a: (
            <>
              Yes, we are a tattoo and piercing studio. <Ph>piercing types, jewelry and prices</Ph>
            </>
          ),
        },
      ]
    : []),
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="px-5 pb-24 md:px-8 md:pb-36">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 lg:grid-cols-12">
        <h2 id="faq-title" className="display text-[clamp(2.3rem,5vw,4.25rem)] lg:col-span-4">
          Questions, answered
        </h2>

        <LayoutGroup>
          <motion.ul layout className="lg:col-span-8">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              const btnId = `${base}-q${i}`;
              const panelId = `${base}-a${i}`;
              return (
                <motion.li layout key={f.q} className="border-b border-ink/15 first:border-t" transition={{ duration: 0.45, ease: EASE_OUT }}>
                  <motion.h3 layout="position" className="m-0">
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                    >
                      <span className="display text-[clamp(1.3rem,2.2vw,1.75rem)] leading-tight">{f.q}</span>
                      <motion.span
                        aria-hidden
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                          isOpen ? "bg-jade text-[#faf8f3]" : "bg-ink/6 text-ink group-hover:bg-ink/10"
                        }`}
                      >
                        <Plus size={20} />
                      </motion.span>
                    </button>
                  </motion.h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        layout="position"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.08 }}
                      >
                        <p className="max-w-[60ch] pb-7 pr-14 text-[17px] leading-relaxed text-ink-soft">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
