"use client";

import { MotionConfig } from "framer-motion";

/** reducedMotion="user" turns transform/layout animations off for prefers-reduced-motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
