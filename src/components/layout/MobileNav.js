"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { mainNav, headerCta } from "@/data/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isActivePath } from "./NavLink";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(null);
  const pathname = usePathname();
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Close the menu after navigation (routes stay mounted with Cache Components).
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  function toggle() {
    setOpenedAt(pathname);
    setOpen((value) => !value);
  }

  useEffect(() => {
    if (!open) return undefined;
    const toggleButton = toggleRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleButton?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative z-50 grid size-11 place-items-center rounded-full text-navy-900 hover:bg-navy-50"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-line bg-canvas"
          >
            <nav aria-label="Mobile" className="px-5 pt-6 pb-10 sm:px-8">
              <ul className="divide-y divide-line">
                {mainNav.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between py-4 font-display text-2xl font-semibold tracking-tight",
                          active ? "text-navy-900" : "text-navy-700 hover:text-navy-900",
                        )}
                      >
                        {item.label}
                        {active ? (
                          <span aria-hidden="true" className="size-2 rounded-full bg-accent-500" />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href={headerCta.href}
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full")}
              >
                {headerCta.label}
                <ArrowRight aria-hidden="true" />
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
