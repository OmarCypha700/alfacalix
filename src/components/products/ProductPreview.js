import Image from "next/image";
import { cn } from "@/lib/utils";

/*
 * Product visuals. When a product has a real screenshot (`product.image`) it
 * is rendered with next/image. Otherwise a neutral, clearly-labelled
 * interface SKETCH is drawn in code. Sketches use placeholder bars rather than
 * realistic data and are never presented as actual product screenshots.
 */

function Bar({ className }) {
  return <span aria-hidden="true" className={cn("block h-2 rounded-full bg-navy-100", className)} />;
}

function ClinovaSketch() {
  const rows = [3, 2, 3, 1, 2];
  return (
    <div className="grid h-full grid-cols-[1fr_auto] gap-3 p-4 sm:p-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="block text-[0.65rem] font-semibold uppercase tracking-widest text-accent-700">
              Practical station
            </span>
            <Bar className="h-2.5 w-28 bg-navy-200" />
          </div>
          <div className="flex -space-x-1.5" aria-hidden="true">
            {["E1", "E2"].map((label) => (
              <span
                key={label}
                className="grid size-6 place-items-center rounded-full bg-navy-900 text-[0.55rem] font-bold text-white ring-2 ring-white"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <ul className="space-y-2" aria-hidden="true">
          {rows.map((score, index) => (
            <li key={index} className="flex items-center gap-3 rounded-lg border border-line bg-white px-3 py-2">
              <Bar className={cn("flex-1", index % 2 ? "max-w-[55%]" : "max-w-[70%]")} />
              <span className="ml-auto flex gap-1">
                {[0, 1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    className={cn("size-3 rounded-[0.25rem]", dot < score ? "bg-accent-500" : "bg-navy-100")}
                  />
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden w-24 flex-col gap-2 rounded-xl bg-navy-900 p-3 sm:flex" aria-hidden="true">
        <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-accent-300">Reconcile</span>
        <Bar className="bg-white/25" />
        <Bar className="w-3/4 bg-white/25" />
        <div className="mt-auto space-y-1.5">
          <Bar className="h-1.5 bg-accent-400" />
          <Bar className="h-1.5 w-2/3 bg-accent-400/60" />
        </div>
      </div>
    </div>
  );
}

function SisSketch() {
  return (
    <div className="grid h-full grid-cols-[auto_1fr]" aria-hidden="true">
      <div className="flex w-12 flex-col items-center gap-3 border-r border-line bg-navy-900 py-4">
        <span className="size-5 rounded-md bg-accent-400" />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cn("size-4 rounded", i === 0 ? "bg-white/70" : "bg-white/20")} />
        ))}
      </div>
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <Bar className="h-2.5 w-32 bg-navy-200" />
          <span className="size-6 rounded-full bg-navy-100" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["Records", "Courses", "Results"].map((label, i) => (
            <div key={label} className="rounded-lg border border-line bg-white p-2.5">
              <span className="block text-[0.6rem] font-semibold uppercase tracking-wider text-subtle">{label}</span>
              <span className="mt-2 flex h-6 items-end gap-0.5">
                {[40, 70, 55, 85, 60].map((h, j) => (
                  <span
                    key={j}
                    style={{ height: `${(h + i * 7) % 100}%` }}
                    className={cn("w-full rounded-sm", j === 3 ? "bg-accent-500" : "bg-navy-100")}
                  />
                ))}
              </span>
            </div>
          ))}
        </div>
        <div className="divide-y divide-line rounded-lg border border-line bg-white">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2">
              <span className="size-4 rounded-full bg-navy-100" />
              <Bar className="w-1/3" />
              <Bar className="ml-auto w-12" />
              <span className={cn("h-2 w-8 rounded-full", i === 1 ? "bg-accent-200" : "bg-navy-50")} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DrsSketch() {
  const steps = ["Request", "Payment", "Processing", "Ready"];
  return (
    <div className="space-y-4 p-4 sm:p-5" aria-hidden="true">
      <div className="flex items-center justify-between">
        <Bar className="h-2.5 w-28 bg-navy-200" />
        <span className="rounded-full bg-accent-100 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-accent-800">
          Tracking
        </span>
      </div>
      <ol className="flex items-center">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <span className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full text-[0.6rem] font-bold",
                  i < 2 ? "bg-navy-900 text-white" : i === 2 ? "bg-accent-500 text-white" : "bg-navy-100 text-subtle",
                )}
              >
                {i + 1}
              </span>
              <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-subtle">{step}</span>
            </span>
            {i < steps.length - 1 ? (
              <span className={cn("mx-1 mb-4 h-0.5 flex-1 rounded-full", i < 2 ? "bg-navy-900" : "bg-navy-100")} />
            ) : null}
          </li>
        ))}
      </ol>
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-lg border border-line bg-white p-2.5">
            <span className="grid h-7 w-5.5 shrink-0 place-items-center rounded-[0.3rem] border border-navy-200 bg-navy-50">
              <span className="h-0.5 w-2.5 rounded bg-navy-300" />
            </span>
            <span className="flex-1 space-y-1.5">
              <Bar className="h-1.5 w-4/5" />
              <Bar className="h-1.5 w-1/2 bg-navy-50" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const sketches = { clinova: ClinovaSketch, sis: SisSketch, drs: DrsSketch };

export function ProductPreview({ product, className, priority = false, showCaption = true }) {
  if (product.image) {
    return (
      <figure className={className}>
        <Image
          src={product.image}
          alt={product.imageAlt || `${product.name} interface`}
          width={1200}
          height={800}
          sizes="(min-width: 1024px) 560px, 100vw"
          priority={priority}
          className="h-auto w-full rounded-[var(--radius-card)] border border-line shadow-card"
        />
      </figure>
    );
  }

  const Sketch = sketches[product.slug];
  return (
    <figure className={cn("flex flex-col", className)}>
      <div
        role="img"
        aria-label={`Illustrative sketch representing ${product.name}. Not a product screenshot.`}
        className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-canvas shadow-card"
      >
        <div className="flex items-center gap-1.5 border-b border-line bg-white px-4 py-2.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-navy-100" />
          <span className="size-2 rounded-full bg-navy-100" />
          <span className="size-2 rounded-full bg-navy-100" />
          <span className="ml-3 font-display text-xs font-semibold text-navy-900">{product.name}</span>
        </div>
        <div className="h-64 overflow-hidden">{Sketch ? <Sketch /> : null}</div>
      </div>
      {showCaption ? (
        <figcaption className="mt-2.5 text-xs text-subtle">Illustrative preview, not a product screenshot.</figcaption>
      ) : null}
    </figure>
  );
}
