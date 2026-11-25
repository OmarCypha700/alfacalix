"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { products } from "@/data/products";
import { ProductMark } from "@/components/products/ProductMark";
import { cn } from "@/lib/utils";

/*
 * Diagram of the Alfa Calix product family: each product, with its own mark,
 * connected to the company. Decorative (aria-hidden): the products are
 * described in text and shown in real screenshots further down the page.
 * Geometry uses a 500x440 coordinate space that matches the panel's aspect ratio.
 *
 * The slots are computed from the number of products in src/data/products.js,
 * so adding or removing a product needs no change here. Up to three products keep
 * the original proportions; four to six get evenly spaced, more compact slots.
 * Beyond MAX_PRODUCTS, the first MAX_PRODUCTS in products.js order are shown.
 */

const VB_W = 500;
const VB_H = 440;
const PAD = 30.8; // space above the first and below the last slot
const MAX_SLOT_H = 110; // slot height with three products; never taller
const MAX_PRODUCTS = 6;

const ease = [0.22, 1, 0.36, 1];
const CORE_X = 392;
const CORE_Y = VB_H / 2;
const MODULE_EDGE_X = 305;

/** Vertical slots (in viewBox units) for n products, centred in the panel. */
function layoutSlots(n) {
  const gap = n <= 4 ? 24.2 : n === 5 ? 16 : 12;
  const h = Math.min(MAX_SLOT_H, (VB_H - 2 * PAD - (n - 1) * gap) / n);
  const start = (VB_H - (n * h + (n - 1) * gap)) / 2;
  return Array.from({ length: n }, (_, i) => {
    const top = start + i * (h + gap);
    return { top, h, y: top + h / 2 };
  });
}

const pct = (v, total) => `${(v / total) * 100}%`;

const shown = products.slice(0, MAX_PRODUCTS);
const slots = layoutSlots(shown.length);
const compact = shown.length >= 5;

if (process.env.NODE_ENV === "development" && products.length > MAX_PRODUCTS) {
  console.info(
    `[HeroVisual] ${products.length} products; the hero shows the first ${MAX_PRODUCTS} (order in src/data/products.js).`,
  );
}

export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative aspect-[500/440] w-full select-none">
      <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-lift">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
        <div className="absolute top-1/2 right-0 h-72 w-72 translate-x-1/4 -translate-y-1/2 rounded-full bg-accent-500/25 blur-3xl" />

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full"
          fill="none"
          preserveAspectRatio="none"
        >
          {slots.map(({ y }, i) => {
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
          style={{ left: pct(CORE_X, VB_W) }}
          className="absolute top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full sm:size-20 lg:size-24"
        >
          <span className="absolute inset-[6%] rounded-full ring-1 ring-accent-400/60 [animation:ping_3s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:hidden" />
          <Image
            src="/logos/alfa-calix-symbol-dark.svg"
            alt=""
            width={256}
            height={256}
            className="relative h-full w-full"
          />
        </motion.div>

        {/* The products */}
        {shown.map((product, i) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease }}
            style={{ top: pct(slots[i].top, VB_H), height: pct(slots[i].h, VB_H) }}
            className={cn(
              "absolute left-[6%] flex w-[55%] items-center border border-white/10 bg-surface shadow-lift",
              compact ? "gap-2 rounded-lg px-2 sm:gap-3 sm:rounded-xl sm:px-3" : "gap-3 rounded-xl px-3 sm:rounded-2xl sm:px-4",
            )}
          >
            <ProductMark
              product={product}
              className={cn(
                compact
                  ? "size-6 rounded-md text-[0.5rem] sm:size-8 sm:rounded-lg sm:text-[0.6rem]"
                  : "size-8 rounded-lg text-[0.65rem] sm:size-10 sm:rounded-xl sm:text-[0.75rem]",
              )}
            />
            <span className="min-w-0">
              <span
                className={cn(
                  "block font-display leading-tight font-bold text-navy-900",
                  compact ? "text-xs sm:text-sm" : "text-sm sm:text-base",
                )}
              >
                {product.name}
              </span>
              <span className={cn("truncate text-xs text-subtle", compact ? "hidden sm:block" : "block")}>
                {product.shortLabel}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
