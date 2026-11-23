"use client";

import { motion } from "motion/react";
import { products } from "@/data/products";
import { ProductMark } from "@/components/products/ProductMark";

/*
 * Diagram of the Alfa Calix product family: each product, with its own mark,
 * connected to the company. Decorative (aria-hidden): the products are
 * described in text and shown in real screenshots further down the page.
 * Geometry uses a 500x440 coordinate space that matches the panel's aspect ratio.
 */

const rows = [
  { top: "7%", y: 92 },
  { top: "37.5%", y: 220 },
  { top: "68%", y: 348 },
];

const ease = [0.22, 1, 0.36, 1];
const CORE_X = 392;
const CORE_Y = 220;
const MODULE_EDGE_X = 305;

export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative aspect-[500/440] w-full select-none">
      <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-lift">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
        <div className="absolute top-1/2 right-0 h-72 w-72 translate-x-1/4 -translate-y-1/2 rounded-full bg-accent-500/25 blur-3xl" />

        <svg
          viewBox="0 0 500 440"
          className="absolute inset-0 h-full w-full"
          fill="none"
          preserveAspectRatio="none"
        >
          {rows.map(({ y }, i) => {
            const d = `M${MODULE_EDGE_X} ${y} C ${MODULE_EDGE_X + 45} ${y}, ${CORE_X - 75} ${CORE_Y}, ${CORE_X - 40} ${CORE_Y}`;
            return (
              <g key={y}>
                <path d={d} className="stroke-white/15" strokeWidth="1.5" />
                <motion.path
                  d={d}
                  className="stroke-accent-300"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.15, ease }}
                />
              </g>
            );
          })}
        </svg>

        {/* The company */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
          style={{ left: `${(CORE_X / 500) * 100}%` }}
          className="absolute top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/15 bg-navy-800 sm:size-20 lg:size-24 lg:rounded-3xl"
        >
          <span className="absolute inset-0 rounded-[inherit] ring-1 ring-accent-400/50 [animation:ping_3s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:hidden" />
          <span className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">AC</span>
        </motion.div>

        {/* The products */}
        {products.slice(0, rows.length).map((product, i) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease }}
            style={{ top: rows[i].top }}
            className="absolute left-[6%] flex h-[25%] w-[55%] items-center gap-3 rounded-xl border border-white/10 bg-surface px-3 shadow-lift sm:rounded-2xl sm:px-4"
          >
            <ProductMark product={product} className="size-8 rounded-lg text-[0.65rem] sm:size-10 sm:rounded-xl sm:text-[0.75rem]" />
            <span className="min-w-0">
              <span className="block font-display text-sm leading-tight font-bold text-navy-900 sm:text-base">
                {product.name}
              </span>
              <span className="block truncate text-xs text-subtle">{product.shortLabel}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
