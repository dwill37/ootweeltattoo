"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Ph } from "@/components/ui/Placeholder";
import { IMG } from "@/lib/images";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Studio() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)", false);
  const pinned = desktop && !reduce;
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!pinned || !track.current) return;
    const el = track.current;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <section id="studio" aria-labelledby="studio-title" className="bg-ink text-paper on-dark">
      <div ref={outer} style={pinned ? { height: `calc(100dvh + ${distance}px)` } : undefined} className="relative">
        <div className={pinned ? "sticky top-0 flex h-[100dvh] items-center overflow-hidden" : "py-24"}>
          <motion.div
            ref={track}
            style={pinned ? { x } : undefined}
            {...(pinned ? {} : { tabIndex: 0, role: "region", "aria-label": "Photos of the studio, scroll sideways" })}
            className={`flex items-center gap-5 px-5 md:gap-8 md:px-8 lg:pl-[max(2rem,calc((100vw-1360px)/2+2rem))] ${
              pinned ? "w-max pr-[8vw]" : "no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-2"
            }`}
          >
            <div className="w-[min(86vw,30rem)] shrink-0 snap-start pr-4 lg:w-[34rem] lg:pr-10">
              <h2 id="studio-title" className="display text-[clamp(2.3rem,5vw,4.25rem)]">
                The studio on Avenida 10
              </h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-paper/80">
                Between Av. Juárez and Calle 2 Norte, Playa del Carmen. Reviewers describe it as very clean and
                professional. Come see it for yourself.
              </p>
              <a href="#location" className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-jade-bright">
                How to find us
                <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <Frame className="aspect-[571/1016] h-[62vh] max-h-[640px] min-h-[380px] lg:h-[70vh]">
              <Image src={IMG.storefront.src} alt={IMG.storefront.alt} fill sizes="(min-width: 1024px) 40vh, 70vw" placeholder="blur" className="object-cover" />
            </Frame>

            <figure className="flex aspect-square w-[min(78vw,22rem)] shrink-0 snap-center flex-col justify-between rounded-[var(--radius-card)] bg-jade p-8 lg:w-[24rem]">
              <blockquote className="display text-[clamp(2rem,3vw,2.6rem)] leading-[1.02] text-[#faf8f3]">“Great place and great work.”</blockquote>
              <figcaption className="text-[15px] text-[#faf8f3]/85">Waldo S., Google review</figcaption>
            </figure>

            <Frame className="aspect-[762/1354] h-[62vh] max-h-[640px] min-h-[380px] lg:h-[70vh]">
              <Image src={IMG.artistAtWork.src} alt={IMG.artistAtWork.alt} fill sizes="(min-width: 1024px) 40vh, 70vw" placeholder="blur" className="object-cover" />
            </Frame>

            <Frame className="aspect-[640/484] h-[38vh] min-h-[240px] max-h-[420px]">
              <Image src={IMG.logo.src} alt={IMG.logo.alt} fill sizes="(min-width: 1024px) 50vh, 80vw" placeholder="blur" className="object-cover" />
            </Frame>

            <div className="tracing grid aspect-[3/4] h-[48vh] min-h-[300px] max-h-[520px] shrink-0 snap-center place-items-center rounded-[var(--radius-card)] p-8 text-center text-ink">
              <p className="text-[15px]">
                <Ph>more interior photos of the studio</Ph>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Frame({ className, children }: { className: string; children: React.ReactNode }) {
  return <div className={`relative shrink-0 snap-center overflow-hidden rounded-[var(--radius-card)] bg-ink-2 ${className}`}>{children}</div>;
}
