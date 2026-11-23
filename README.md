# Alfa Calix Technologies — corporate website

The corporate marketing website for **Alfa Calix Technologies**, a technology brand operated by Alfa Calix Enterprise.

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
    products/          Product card, detail, preview sketch, link/coming-soon state
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
  images/products/<slug>/   Put real product screenshots here
  logos/                    Put the official logo here
```

## Environment variables

All variables are listed in [`.env.example`](.env.example). Anything left empty is simply **not shown** on the site and is left out of structured data.

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
- **Product screenshots**: add e.g. `public/images/products/clinova/clinova-preview.webp` (about 1200×800), then set `image` and `imageAlt` for that product in `src/data/products.js`. Until then a clearly labelled illustrative sketch is shown, not a fake screenshot.
- **Contact details and social links**: set the `NEXT_PUBLIC_CONTACT_*` and `NEXT_PUBLIC_SOCIAL_*` variables.
- **Logo**: add the file to `public/logos/` and set `logo` (and optionally `logoDark` for navy backgrounds) in `src/data/company.js`. The temporary text wordmark is replaced everywhere.
- **Leadership profiles** (About page): add verified entries to `leadership` in `src/data/company.js`. The section stays hidden while the list is empty.
- **Services**: edit `src/data/services.js`. Only list services that are confirmed.
- **Colours and type**: edit the tokens at the top of `src/app/globals.css`.
- **Privacy Policy**: `src/app/privacy/page.js`. Have it reviewed before launch (see the note at the top of the file) and update the effective date.
- **Sitemap date**: update `lastUpdated` in `src/data/company.js` after significant content changes.

## Contact form (Brevo)

The form posts to `/api/contact`, which validates input with Zod, rejects spam via a honeypot field, applies a light per-IP rate limit and sends the enquiry with the [Brevo transactional email API](https://developers.brevo.com/reference/sendtransacemail). The visitor's address is set as **Reply-To**, so you can reply directly.

1. Create a Brevo account and an API key (SMTP & API → API Keys).
2. Verify the sender address or domain you will use as `CONTACT_FROM_EMAIL` (Senders, Domains & Dedicated IPs). Authenticating the domain (SPF/DKIM) improves deliverability.
3. Set `BREVO_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (and optionally `CONTACT_FROM_NAME`) in Vercel. These are server-only and never sent to the browser.

If any of the three required values is missing, the API returns `503 not_configured` and the form tells the visitor their message was **not** sent. The form only shows success when Brevo accepts the message.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, import the repository and keep the detected Next.js settings. If the repository root is the parent folder, set **Root Directory** to `alfa-calix`.
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
