# Alfa Calix Technologies: logo guidelines

A compact guide for anyone using the logo: staff, printers, web developers and partners. When in doubt, use the
**full-colour horizontal logo on white** and leave plenty of space around it.

Alfa Calix Technologies is a technology brand operated by Alfa Calix Enterprise.

## 1. The logo

**Idea.** The A of *Alfa* is carved out of a disc, and its crossbar breaks out through the edge, opening the disc into
the C of *Calix*. Alfa, held within Calix: the first, protected and carried forward. The cyan core is what the company
builds: the product at the heart of the institution.

| Version | Use it for | Files |
|---|---|---|
| **Horizontal** (primary) | Website header, documents, presentations, email signatures, most uses | `svg/alfa-calix-horizontal-*.svg` |
| **Stacked** | Square or narrow spaces: posters, title slides, badges, signage | `svg/alfa-calix-stacked-*.svg` |
| **Symbol** | App icons, social avatars, favicons, product branding, when the name is already nearby | `svg/alfa-calix-symbol-*.svg` |
| **Symbol, small cut** | 16–23 px only (favicons, tiny UI); heavier A, larger core | `svg/alfa-calix-symbol-small-*.svg` |
| **Symbol, solid** | Icons that may sit on any background (favicon, app tile): the A is filled, not cut out | `svg/alfa-calix-symbol-solid*.svg` |

Each version comes in five colour treatments:

| Suffix | Treatment | Use on |
|---|---|---|
| `-color` | Navy disc and wordmark, cyan core | White or very light backgrounds (preferred) |
| `-dark` | White disc and wordmark, cyan core | Navy or other dark backgrounds |
| `-navy` | All navy | One-colour print, embossing, light backgrounds |
| `-black` | All black | Black-only print, faxes, stamps, newspapers |
| `-white` | All white | One-colour on dark backgrounds and photos |

Use **SVG** wherever possible (web, presentations, design tools). PNGs (`png/`, transparent) are provided in several
widths for tools that do not accept SVG. Never use a JPEG of the logo.

## 2. Clear space

Keep a clear zone of **1x** on every side of the logo, where **x is the height of the cyan core** (the A's counter):
about **22 % of the disc's diameter**. Nothing (text, edges, images, other logos) may enter this zone. The zone scales
with the logo.

## 3. Minimum size

| Version | Screen | Print |
|---|---|---|
| Horizontal | 180 px wide | 40 mm wide |
| Stacked | 120 px wide | 28 mm wide |
| Symbol | 24 px | 8 mm |
| Symbol, small cut | 16 px | 5 mm |

Below the horizontal minimum, the word TECHNOLOGIES becomes unreadable: use the symbol on its own instead.

## 4. Colour

| Name | Role | HEX | RGB | CMYK* |
|---|---|---|---|---|
| **Calix Navy** | Primary: disc, wordmark, backgrounds | `#0B1B33` | 11 27 51 | C78 M47 Y0 K80 |
| **Alfa Cyan** | Accent: the core, highlights | `#109FB0` | 16 159 176 | C91 M10 Y0 K31 |
| **White** | Backgrounds, reversed logo | `#FFFFFF` | 255 255 255 | C0 M0 Y0 K0 |
| **Slate** | Supporting text (not in the logo) | `#4A5568` | 74 85 104 | C29 M18 Y0 K59 |
| **Mist** | Light backgrounds (not in the logo) | `#F7F8FA` | 247 248 250 | C1 M1 Y0 K2 |

\*CMYK values are calculated starting points, not press-matched. Before the first print run, ask the printer to
proof them and to suggest the closest **Pantone** spot colours from a physical swatch book.

**Contrast:** navy on white 17.2:1 · white on navy 17.2:1 · cyan on navy 5.4:1 · cyan on white 3.2:1.
Cyan is for graphics and large elements, never for small text on white.

**Approved logo/background pairs:** full colour on white or Mist · dark version on Calix Navy · white version on any
dark colour or a calm, dark area of a photo · navy or black on white. On busy photos, place the symbol inside a solid
navy or white area instead.

## 5. Typography

- **Logo wordmark:** Plus Jakarta Sans Bold (ALFA CALIX, +2 % letter-spacing) and SemiBold (TECHNOLOGIES,
  +42 % letter-spacing), converted to outlines. Always use the supplied files; never retype the logo.
- **Brand typeface for documents and the web:** Plus Jakarta Sans (headings, 500–800) with Inter (body, 400–600).
  Both are free under the SIL Open Font License from Google Fonts. These are the same fonts as the company website.
- **Fallback** where the brand fonts are unavailable (e.g. Word on another computer): Segoe UI or Arial.

## 6. Don'ts

- Don't stretch, squash, skew or rotate the logo.
- Don't change the colours or use colours outside the palette; don't add gradients, shadows, outlines, glows or 3D.
- Don't remove the crossbar's opening on the right, close the C, or fill the A in the `-color` version.
- Don't rearrange, resize or re-space the parts of a lockup, or set the name in a different font.
- Don't place the full-colour logo on dark or busy backgrounds; use the dark or white version.
- Don't put the logo inside another shape, or add a tagline to it.

## 7. Files and editing

| Folder | Contents |
|---|---|
| `svg/` | Master vector files (paths only: no fonts, images or external links) |
| `png/` | Transparent PNGs of every master, in several widths |
| `web-icons/` | `favicon.ico`, `favicon.svg`, PNG icons, `apple-touch-icon.png`, `site.webmanifest`, `head-snippet.html` |
| `guidelines/` | This guide, the one-page visual guide and the presentation board |
| `source/` | `build_logo.py` (rebuilds every SVG from the design parameters) and `export-png.mjs` (rebuilds the PNGs) |
| `concepts/` | The first-round concepts, for the record |

To change the logo (for example the cyan), edit the palette or geometry at the top of `source/build_logo.py`, then run
it with a Plus Jakarta Sans font file and re-export the PNGs (see `README.md`).

**Trademark:** the logo has not been cleared. Run a professional trademark search (classes 9 and 42) before
registering it or investing in printed material.
