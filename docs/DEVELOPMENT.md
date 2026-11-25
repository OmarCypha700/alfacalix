# Alfa Calix Technologies website: developer guide

How to run, update and deploy the corporate website of **Alfa Calix Technologies**, a technology brand operated by
Alfa Calix Enterprise. (The repository's main [README](../README.md) is the company overview for visitors.)

Built with Next.js 16 (App Router, JavaScript, Cache Components), Tailwind CSS 4, Motion (Framer Motion), Lucide icons, React Hook Form and Zod. There is no database, CMS or authentication. Product landing pages (ClinOva, SIS, DRS) are hosted separately and linked from here.

## Quick start

Requires Node.js 20.19+ or 22.13+ (some lint tooling warns on older 22.x).

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
npm run lint
npm run build && npm run start
```

## Project structure

```
src/
  app/                 Pages (App Router), API route, sitemap, robots, OG image, icon
    api/contact/       Contact form handler (Brevo)
  components/
    layout/            Header, mobile nav, footer
    home/              Homepage sections and hero visual
    products/          Product card, detail, screenshots, product marks, link/coming-soon state
    services/          Service item and detail
    contact/           Contact form (client component)
    shared/            Container, Section, headings, Reveal, CTA band, breadcrumbs, JSON-LD
    ui/                shadcn/ui-style primitives (button, input, textarea, label, select)
  data/                ← Edit content here
    company.js         Brand, legal name, mission/vision/values, contact, socials, logo
    products.js        ClinOva, SIS, DRS content and landing-page URLs
    services.js        The six services
    navigation.js      Menu items and header CTA
  lib/
    seo.js             Per-page metadata helper and JSON-LD builders
    contact-schema.js  Shared validation for the contact form and API
public/
  images/products/<slug>/   Product screenshots and product marks
  logos/                    Alfa Calix logo files used by the site (masters in brand/logo)
brand/logo/                 The full logo kit: masters, PNGs, web icons, guidelines, build scripts
docs/                       This guide
```

## Environment variables

All variables are listed in [`.env.example`](../.env.example). Anything left empty is simply **not shown** on the site and is left out of structured data.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL, e.g. `https://www.example.com` (no trailing slash). Used for canonical URLs, sitemap, robots, Open Graph and schema. |
| `NEXT_PUBLIC_CLINOVA_URL`, `NEXT_PUBLIC_SIS_URL`, `NEXT_PUBLIC_DRS_URL` | Product landing pages. Must start with `https://`. Empty shows a “site coming soon” state. |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE` | Public contact details. |
| `NEXT_PUBLIC_SOCIAL_*` | LinkedIn, X, Facebook, Instagram, GitHub profile URLs. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Optional meta-tag verification tokens. |
| `BREVO_API_KEY` | **Secret.** Brevo API v3 key for the contact form. |
| `CONTACT_TO_EMAIL` | **Secret.** Inbox that receives enquiries. |
| `CONTACT_FROM_EMAIL`, `CONTACT_FROM_NAME` | **Secret.** Verified Brevo sender address and display name. |

`NEXT_PUBLIC_*` values are inlined at **build time**, so redeploy after changing them on Vercel.

## Updating content

- **Product landing-page URLs**: set `NEXT_PUBLIC_CLINOVA_URL` / `_SIS_URL` / `_DRS_URL` in Vercel and redeploy. No code changes needed.
- **Product text, features and audiences**: edit `src/data/products.js`.
- **Product screenshots**: each product has three real screens in `public/images/products/<slug>/`, listed under `screens` in `src/data/products.js`: `card` (780×780 phone crop, homepage), `desktop` (2000×1250 crop of the main content, no sidebar) and `phone` (780 wide, overlaid on the Products page). They were taken from the actual apps using sample data only: ClinOva's own sample screens, SIS's `seed_demo` (the fictitious Northridge College) and fictitious DRS requests. To update one, replace the file or change its path, `width`, `height` and `alt`. Never use screens that show real students or a client institution's logo.
- **Product icons**: `mark` in `src/data/products.js`, each taken from the product's own project: ClinOva's shield, the SIS "Hub" symbol (`SIS Frontend/SIS-Brand-Identity/Logo/Symbol/sis-symbol-color.svg`) and DRS's "D" icon. If a product's brand changes, replace its file in `public/images/products/<slug>/`.
- **Contact details and social links**: set the `NEXT_PUBLIC_CONTACT_*` and `NEXT_PUBLIC_SOCIAL_*` variables.
- **Logo**: the full logo kit (masters, PNGs, icons, usage guidelines) is in `brand/logo/` (start with its README). The site uses copies in `public/logos/` (set in `src/data/company.js`: `logo`, `logoDark`, `logoSquare`), plus `src/app/favicon.ico`, `icon.svg`, `apple-icon.png` and the `public/icon-*.png` files listed in `src/app/manifest.js`. If the logo changes, re-export from `brand/logo` and replace those copies.
- **Leadership profiles** (About page): add verified entries to `leadership` in `src/data/company.js`. The section stays hidden while the list is empty.
- **Services**: edit `src/data/services.js`. Only list services that are confirmed.
- **Colours and type**: edit the tokens at the top of `src/app/globals.css`.
- **Privacy Policy**: `src/app/privacy/page.js`. Have it reviewed before launch (see the note at the top of the file) and update the effective date.
- **Sitemap date**: update `lastUpdated` in `src/data/company.js` after significant content changes.

After any change: `npm run build` to check it, then commit and push; Vercel redeploys automatically.

### Adding a new product

Everything about the products is driven by `src/data/products.js`; no component or page needs editing.

1. **Add an entry** to the `products` array (copy an existing one). The order of the array is the order on the site.
   - `slug` (short, lowercase, e.g. `"lms"`), `name`, `fullName`, `category`, `shortLabel` (2–3 words, shown in the
     hero diagram), `purpose` (completes "…for ___" in the search description), `tagline`
   - `summary` (homepage card), `description` (two paragraphs, Products page), `features`, `highlights` (four, on the
     card), `audience`
   - `mark`: the product's own icon, square (SVG preferred)
   - `screens`: `card` 780×780, `desktop` 2000×1250, `phone` 780 wide, each with its `alt` text
   - `url: clean(process.env.NEXT_PUBLIC_<SLUG>_URL)` and `ctaLabel`
2. **Add the images** to `public/images/products/<slug>/`. Screenshots must show demo data only: no real students,
   staff or client institutions' logos.
3. **Add the landing-page variable** `NEXT_PUBLIC_<SLUG>_URL` to `.env.example` and to Vercel. Until it is set, the
   product shows "site coming soon" instead of a link.

That one entry updates:

- the hero diagram on the homepage: slots and connecting lines are computed from the number of products. Up to three
  keep the original size; four to six become evenly spaced compact slots; beyond six, the first six in array order are
  shown
- the homepage product grid: one product is centred, two or four sit in pairs (2×2), three, five or more in rows of three
- the Products page section, its shortcut buttons, and the footer's product links
- the product names in the Products page title, search description and call to action, and on the Contact page.
  With more than three products, the Products page title becomes "Software Products for Institutions" so it stays
  short enough for search results

## Contact form (Brevo)

The form posts to `/api/contact`, which validates input with Zod, rejects spam via a honeypot field, applies a light per-IP rate limit and sends the enquiry with the [Brevo transactional email API](https://developers.brevo.com/reference/sendtransacemail). The visitor's address is set as **Reply-To**, so you can reply directly.

1. Create a Brevo account and an API key (SMTP & API → API Keys).
2. Verify the sender address or domain you will use as `CONTACT_FROM_EMAIL` (Senders, Domains & Dedicated IPs). Authenticating the domain (SPF/DKIM) improves deliverability.
3. Set `BREVO_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (and optionally `CONTACT_FROM_NAME`) in Vercel. These are server-only and never sent to the browser.

If any of the three required values is missing, the API returns `503 not_configured` and the form tells the visitor their message was **not** sent. The form only shows success when Brevo accepts the message.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, import the repository and keep the detected Next.js settings. The project sits at the repository root, so leave **Root Directory** empty.
3. Add the environment variables (Production, and Preview if wanted).
4. Deploy.

### Custom domain

1. Vercel → Project → **Settings → Domains** → add your domain (e.g. `example.com` and `www.example.com`).
2. At your DNS provider, add the records Vercel shows: usually an `A` record for the apex domain and a `CNAME` for `www` pointing to Vercel.
3. Choose one primary domain and let the other redirect to it.
4. Set `NEXT_PUBLIC_SITE_URL` to that primary domain (with `https://`) and redeploy.

## Search engine setup

After the site is live on its final domain and `NEXT_PUBLIC_SITE_URL` is set:

### Google Search Console

1. Go to <https://search.google.com/search-console> and add a property. The **Domain** property is recommended and is verified with a DNS TXT record. Alternatively use a **URL prefix** property and the HTML-tag method: put only the `content` token in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, then redeploy.
2. Open **Sitemaps** and submit `https://<your-domain>/sitemap.xml`.
3. Use **URL Inspection** on the homepage and request indexing.

### Bing Webmaster Tools

1. Go to <https://www.bing.com/webmasters> and add the site. You can **import from Google Search Console**, or verify with the meta tag (`NEXT_PUBLIC_BING_SITE_VERIFICATION`) or DNS.
2. Submit `https://<your-domain>/sitemap.xml` under **Sitemaps**.

### What is already in place

- Unique title, description and canonical URL for every page
- Open Graph and Twitter/X cards with a generated 1200×630 image (`/opengraph-image`)
- `/sitemap.xml` and `/robots.txt` (all pages allowed; only `/api/` is disallowed)
- JSON-LD: `Organization` and `WebSite` site-wide, `BreadcrumbList` on inner pages and `Service` items on `/services`. Only verified details are included; contact details and social profiles are added automatically once configured.
- A single H1 per page, semantic landmarks, server-rendered content and a custom 404 page (`noindex`)

## Future integrations

The site has no analytics or tracking cookies. If you add Google Analytics 4 or Tag Manager later, add a consent mechanism and update the Privacy Policy's cookies section first. A WhatsApp link, newsletter or CRM can be added as new config values or components without changing the architecture.
