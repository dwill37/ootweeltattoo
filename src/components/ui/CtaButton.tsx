"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, MapPin, WhatsappLogo, InstagramLogo, Star } from "@phosphor-icons/react/dist/ssr";
import { useFinePointer } from "@/hooks/useMediaQuery";

type Variant = "jade" | "ink" | "paper" | "glass" | "outline";
type Size = "md" | "lg" | "xl";
type Icon = "whatsapp" | "arrow" | "pin" | "instagram" | "star" | "none";

const VARIANTS: Record<Variant, { btn: string; dot: string }> = {
  jade: { btn: "bg-jade text-[#faf8f3] hover:bg-jade-deep", dot: "bg-[#faf8f3]/15" },
  ink: { btn: "bg-ink text-paper hover:bg-ink-2", dot: "bg-paper/12" },
  paper: { btn: "bg-paper text-ink hover:bg-[#faf8f3]", dot: "bg-ink/8" },
  glass: {
    btn: "bg-ink/45 text-paper ring-1 ring-inset ring-paper/35 hover:bg-ink/60 on-dark",
    dot: "bg-paper/12",
  },
  outline: { btn: "bg-transparent text-ink ring-1 ring-inset ring-ink/25 hover:ring-ink/60", dot: "bg-ink/6" },
};

const SIZES: Record<Size, { btn: string; dot: string; icon: number }> = {
  md: { btn: "h-12 pl-5 pr-1.5 text-[15px] gap-3", dot: "size-9", icon: 18 },
  lg: { btn: "h-14 pl-6 pr-2 text-base gap-4", dot: "size-10", icon: 20 },
  xl: { btn: "h-16 pl-7 pr-2 text-lg gap-5 md:h-[72px] md:pl-9 md:text-xl", dot: "size-12 md:size-14", icon: 24 },
};

const ICONS = { whatsapp: WhatsappLogo, arrow: ArrowUpRight, pin: MapPin, instagram: InstagramLogo, star: Star };

export function CtaButton({
  href,
  children,
  variant = "jade",
  size = "md",
  icon,
  magnetic = false,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: Icon;
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const canMagnet = magnetic && fine && !reduce;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const external = href.startsWith("http");
  const resolvedIcon: Icon = icon ?? (href.includes("wa.me") ? "whatsapp" : external ? "arrow" : "none");
  const Glyph = resolvedIcon === "none" ? null : ICONS[resolvedIcon];
  const v = VARIANTS[variant];
  const s = SIZES[size];

  function onMove(e: React.PointerEvent) {
    if (!canMagnet || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={canMagnet ? { x, y } : undefined}
      whileHover={{ y: canMagnet ? undefined : -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`group inline-flex shrink-0 items-center justify-between whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-colors duration-300 ${
        Glyph ? s.btn : s.btn.replace(/pr-\S+/, "pr-6")
      } ${v.btn} ${className}`}
    >
      <span>{children}</span>
      {Glyph && (
        <span
          aria-hidden
          className={`grid place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105 ${s.dot} ${v.dot}`}
        >
          <Glyph size={s.icon} weight={resolvedIcon === "whatsapp" ? "fill" : "regular"} />
        </span>
      )}
    </motion.a>
  );
}
