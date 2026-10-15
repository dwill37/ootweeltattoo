"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { CtaButton } from "@/components/ui/CtaButton";
import { Ph } from "@/components/ui/Placeholder";
import { PHONE_DISPLAY, PHONE_TEL, SITE } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

export function Location() {
  const reduce = useReducedMotion();
  return (
    <section id="location" aria-labelledby="location-title" className="px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <motion.div className="lg:col-span-7" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.35 }}>
        <motion.div
          className="relative h-full min-h-[380px] overflow-hidden rounded-[var(--radius-card)] bg-paper-2 ring-1 ring-ink/8 lg:min-h-[560px]"
          variants={
            reduce
              ? undefined
              : {
                  hidden: { clipPath: "inset(0% 100% 0% 0% round 20px)" },
                  shown: { clipPath: "inset(0% 0% 0% 0% round 20px)", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } },
                }
          }
        >
          <iframe
            title="Map: Oot Weel Tattoo on Avenida 10, Playa del Carmen"
            src={SITE.links.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[12%]"
          />
        </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col lg:col-span-5 lg:py-4"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
        >
          <h2 id="location-title" className="display text-[clamp(2.3rem,5vw,4.25rem)]">
            Find us on Avenida 10
          </h2>

          <address className="mt-10 grid gap-7 not-italic">
            <div className="flex gap-4">
              <MapPin size={24} className="mt-0.5 shrink-0 text-jade" aria-hidden />
              <div>
                <p className="text-lg font-medium leading-snug">{SITE.address.line1}</p>
                <p className="text-lg leading-snug">{SITE.address.line2}</p>
                <p className="mt-2 text-[15px] text-ink-soft">Plus code: {SITE.plusCode}</p>
                <p className="mt-1 text-[15px] text-ink-soft">
                  <Ph>confirm address format and street number</Ph>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock size={24} className="mt-0.5 shrink-0 text-jade" aria-hidden />
              <div>
                <p className="text-lg font-medium leading-snug">Open until {SITE.hours.closes}</p>
                <p className="mt-1 text-[15px] text-ink-soft">
                  <Ph>opening days</Ph> <Ph>opening time</Ph>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone size={24} className="mt-0.5 shrink-0 text-jade" aria-hidden />
              <a href={PHONE_TEL} className="text-lg font-medium underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-jade">
                {PHONE_DISPLAY}
              </a>
            </div>
          </address>

          <div className="mt-10 lg:mt-auto lg:pt-10">
            <CtaButton href={SITE.links.directions} variant="ink" size="lg" icon="pin" magnetic>
              Get directions
            </CtaButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
