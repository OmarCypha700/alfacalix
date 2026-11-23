import { company } from "@/data/company";
import { absoluteUrl } from "@/lib/seo";

const pages = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/products", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "yearly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap() {
  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: company.lastUpdated,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
