# Alfa Calix Technologies: logo kit

The logo system for Alfa Calix Technologies (a technology brand operated by Alfa Calix Enterprise).
Start with **`guidelines/logo-guidelines.png`** (one-page visual guide) and **`guidelines/logo-guidelines.md`**
(full rules: clear space, minimum sizes, colours, typography, don'ts).

## Which file do I need?

| I need… | Use |
|---|---|
| The logo on a website, document or slide (light background) | `svg/alfa-calix-horizontal-color.svg` |
| The logo on a navy or dark background | `svg/alfa-calix-horizontal-dark.svg` |
| A square-ish or narrow space (poster, badge, title slide) | `svg/alfa-calix-stacked-color.svg` (or `-dark`) |
| One-colour print | `-navy`, `-black` or `-white` version of any lockup |
| Profile picture / social avatar | `web-icons/icon-512.png` (navy tile) or `svg/alfa-calix-symbol-solid.svg` |
| Website favicon and app icons | everything in `web-icons/` plus `web-icons/head-snippet.html` |
| A tool that won't accept SVG (Word, some email clients) | the matching file in `png/` (transparent; pick a width ≥ 2× the display size) |
| The symbol at 16–23 px | `svg/alfa-calix-symbol-small-*.svg` |

## Contents

| Folder | Contents |
|---|---|
| `svg/` | 23 master vector files: horizontal, stacked and symbol, each in `color`, `dark`, `navy`, `black`, `white`; symbol-only `solid` / `solid-dark` icon versions; and a `small` cut for 16–23 px. Paths only: no fonts, images or external references. |
| `png/` | Transparent PNGs of every master. Symbols: 64, 256, 512, 1024 px. Horizontal: 600, 1200, 2400 px wide. Stacked: 500, 1000, 2000 px wide. |
| `web-icons/` | `favicon.ico` (16/32/48), `favicon.svg`, `favicon-16/32/48.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `maskable-512.png`, `alfa-calix-app-icon.svg`, `site.webmanifest`, `head-snippet.html` |
| `guidelines/` | `logo-guidelines.md`, `logo-guidelines.png` / `.html` (one-page visual guide), `presentation.html` and `slides/` (the identity in use: website, business cards, app icon, signage, social, event badge) |
| `source/` | `build_logo.py` (generates every SVG), `export-png.mjs` (generates every PNG), `presentation-spec.json` |
| `concepts/` | Round-one concepts (Ligature, Held, Arch) and `concepts.png`, kept for the record |

## Specifications

- **Symbol:** disc of radius 112 on a 256-unit canvas. The A has 1:2 legs (63.4°) with a 24-unit band; the crossbar
  (24 units, the same weight) runs from the left leg out through the disc's right edge. Reversed versions open the
  A to 25.5 units to offset irradiation; the small cut uses a 120-radius disc and a 30-unit band.
- **Lockups** (D = disc diameter): name cap height 0.35 D · descriptor cap height 0.105 D · symbol-to-text gap
  0.30 D (horizontal) / 0.22 D (stacked) · name to descriptor 0.13 D.
- **Type:** Plus Jakarta Sans Bold (ALFA CALIX, +0.02 em) and SemiBold (TECHNOLOGIES, +0.42 em), outlined.
- **Colours:** Calix Navy `#0B1B33`, Alfa Cyan `#109FB0`, White `#FFFFFF`. Supporting: Slate `#4A5568`,
  Mist `#F7F8FA`.
- **Clear space:** 1x on all sides, x = height of the cyan core (≈ 0.22 D).
- **Minimum size:** horizontal 180 px / 40 mm wide · stacked 120 px / 28 mm · symbol 24 px / 8 mm · small cut 16 px / 5 mm.

## Rebuilding

The SVGs are generated, so a change (a colour, the A's weight, the spacing) is made once and applied everywhere:

1. Download **Plus Jakarta Sans** from Google Fonts (the variable `PlusJakartaSans[wght].ttf` file).
2. Install Python 3 with `pip install fonttools brotli`.
3. Edit the palette or geometry constants at the top of `source/build_logo.py`.
4. From this folder: `python source/build_logo.py --font path/to/PlusJakartaSans[wght].ttf --out svg`
5. From the project root (uses the website's `sharp` package): `node brand/logo/source/export-png.mjs`
6. Regenerate the web icons and the guideline renders if the symbol changed.

## Before going further

- **Trademark:** not yet cleared. Have a professional search done in Nice classes 9 and 42 before registering the
  mark or investing in print.
- **Print colours:** the CMYK values are calculated, not press-matched. Proof them and choose Pantone matches with
  your printer.
- **Font licence:** Plus Jakarta Sans and Inter are under the SIL Open Font License, which allows logo use.
