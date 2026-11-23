"use client";

import { motion } from "motion/react";

/**
 * Subtle entrance animation. Content is fully present in the server-rendered
 * HTML; MotionConfig (reducedMotion="user") turns the movement off for people
 * who prefer reduced motion, and a <noscript> rule keeps it visible without JS.
 */
export function Reveal({ as = "div", delay = 0, y = 14, className, children, ...props }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}
