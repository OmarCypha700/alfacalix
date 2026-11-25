"""
Alfa Calix Technologies: logo kit builder.

Builds every master SVG of the logo system from one set of parameters:
  - the symbol ("Held": an A carved out of a disc, its crossbar breaking out to open the disc into a C),
  - the wordmark (ALFA CALIX + TECHNOLOGIES, set in Plus Jakarta Sans and converted to outlines),
  - horizontal, stacked and symbol-only lockups,
  - colour, dark-background, black, white and navy one-colour variants,
  - a simplified small-size symbol for 16-32 px use.

Usage (Python 3, needs fontTools + brotli):
    python build_logo.py --font PlusJakartaSans[wght].woff2|ttf --out ../svg

The font is Plus Jakarta Sans (SIL Open Font License), free from Google Fonts. Any file of the variable
font works; the script instantiates the weights it needs. Output SVGs contain only paths: no <text>,
no external references.
"""

import argparse
import math
import os

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

# ----------------------------------------------------------------------------- palette
NAVY = "#0B1B33"   # Calix Navy: primary
CYAN = "#109FB0"   # Alfa Cyan: accent (the A's core)
WHITE = "#FFFFFF"
BLACK = "#000000"

# ----------------------------------------------------------------------------- symbol geometry
# Designed on a 256-unit canvas: disc r=112 centred at (128,128).
SYMBOL = dict(R=112, y0=40, w=24, bar_top=142, bar_h=24, feet=184)
# Reversed use (light disc on a dark ground) looks heavier: the cut-out A is opened up slightly.
SYMBOL_REVERSED = dict(SYMBOL, w=25.5, bar_h=25.5)
# Small-size cut (favicon, 16-32 px): bigger disc, heavier A, larger counter, shorter feet.
SYMBOL_SMALL = dict(R=120, y0=28, w=30, bar_top=140, bar_h=28, feet=188)

SQRT5 = math.sqrt(5.0)


def f(v):
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def symbol_geometry(R, y0, w, bar_top, bar_h, feet, cx=128.0, cy=128.0, scale=1.0, ox=0.0, oy=0.0):
    """Return (disc_d, a_outline_d, counter_d) path strings, mapped from the 256 canvas to (ox, oy, scale).

    The A has 1:2 legs (63.43 deg), a band of perpendicular width w, apex at y0 and feet at `feet`.
    Its crossbar (bar_top .. bar_top+bar_h) runs from the left leg out through the disc edge on the right.
    """
    yi = y0 + w * SQRT5               # inner apex: the band is w wide measured perpendicular to the legs
    yb = bar_top + bar_h

    def outer(y):
        return (y - y0) / 2.0

    def inner(y):
        return (y - yi) / 2.0

    def edge(y):
        return math.sqrt(R * R - (y - cy) ** 2)

    def P(x, y):
        return f"{f(ox + x * scale)} {f(oy + y * scale)}"

    r = R * scale
    disc = (f"M{P(cx, cy - R)} A{f(r)} {f(r)} 0 1 1 {P(cx, cy + R)} "
            f"A{f(r)} {f(r)} 0 1 1 {P(cx, cy - R)} Z")
    a_outline = (
        f"M{P(cx, y0)} L{P(cx + outer(bar_top), bar_top)} L{P(cx + edge(bar_top), bar_top)} "
        f"A{f(r)} {f(r)} 0 0 1 {P(cx + edge(yb), yb)} L{P(cx + outer(yb), yb)} "
        f"L{P(cx + outer(feet), feet)} L{P(cx + inner(feet), feet)} L{P(cx + inner(yb), yb)} "
        f"L{P(cx - inner(yb), yb)} L{P(cx - inner(feet), feet)} L{P(cx - outer(feet), feet)} Z")
    counter = (f"M{P(cx, yi)} L{P(cx + inner(bar_top), bar_top)} L{P(cx - inner(bar_top), bar_top)} Z")
    return disc, a_outline, counter


def symbol_svg_parts(params, scheme, ox, oy, scale):
    """SVG elements for the symbol in a colour scheme, positioned so the disc's bounding box starts at (ox, oy)."""
    R = params["R"]
    # map the disc's top-left (128-R, 128-R) to (ox, oy)
    dx = ox - (128 - R) * scale
    dy = oy - (128 - R) * scale
    disc, a_outline, counter = symbol_geometry(**params, scale=scale, ox=dx, oy=dy)
    coloured_core = scheme.get("core") and scheme["core"] != scheme["disc"]
    parts = []
    if scheme.get("afill"):
        # Solid version for icons: the A is filled instead of cut out, so it holds on any background.
        parts.append(f'<path fill="{scheme["afill"]}" d="{a_outline}"/>')
    if coloured_core:
        # Disc with the whole A (counter included) cut out; the counter is then drawn on its own,
        # so no disc-coloured fringe shows around it.
        parts.append(f'<path fill="{scheme["disc"]}" fill-rule="evenodd" d="{disc} {a_outline}"/>')
        parts.append(f'<path fill="{scheme["core"]}" d="{counter}"/>')
    else:
        parts.append(f'<path fill="{scheme["disc"]}" fill-rule="evenodd" d="{disc} {a_outline} {counter}"/>')
    return parts


# ----------------------------------------------------------------------------- type

class Face:
    def __init__(self, path, wght):
        font = TTFont(path)
        self.font = instancer.instantiateVariableFont(font, {"wght": wght}) if "fvar" in font else font
        self.upm = self.font["head"].unitsPerEm
        self.cap = self.font["OS/2"].sCapHeight
        self.cmap = self.font.getBestCmap()
        self.glyphs = self.font.getGlyphSet()
        self.hmtx = self.font["hmtx"]
        self._kern_cache = {}

    def kern(self, left, right):
        key = (left, right)
        if key in self._kern_cache:
            return self._kern_cache[key]
        value = 0
        if "GPOS" in self.font:
            for lookup in self.font["GPOS"].table.LookupList.Lookup:
                for st in lookup.SubTable:
                    ltype = lookup.LookupType
                    if ltype == 9:
                        ltype, st = st.ExtensionLookupType, st.ExtSubTable
                    if ltype != 2 or left not in st.Coverage.glyphs:
                        continue
                    v = None
                    if st.Format == 1:
                        ps = st.PairSet[st.Coverage.glyphs.index(left)]
                        for rec in ps.PairValueRecord:
                            if rec.SecondGlyph == right:
                                v = rec.Value1
                                break
                    elif st.Format == 2:
                        c1 = st.ClassDef1.classDefs.get(left, 0)
                        c2 = st.ClassDef2.classDefs.get(right, 0)
                        v = st.Class1Record[c1].Class2Record[c2].Value1
                    if v is not None and getattr(v, "XAdvance", 0):
                        value = v.XAdvance
                        break
                if value:
                    break
        self._kern_cache[key] = value
        return value

    def layout(self, text, tracking_em=0.0, pair_adjust=None):
        """Glyph names and pen positions in font units (kerning + tracking)."""
        pair_adjust = pair_adjust or {}
        names = [self.cmap[ord(ch)] for ch in text]
        x, out = 0.0, []
        for i, name in enumerate(names):
            out.append((name, x))
            if i < len(names) - 1:
                x += self.hmtx[name][0] + self.kern(name, names[i + 1])
                x += tracking_em * self.upm + pair_adjust.get(text[i:i + 2], 0)
        return out

    def ink_bounds(self, placed):
        xmin = ymin = math.inf
        xmax = ymax = -math.inf
        for name, x in placed:
            bp = BoundsPen(self.glyphs)
            self.glyphs[name].draw(bp)
            if bp.bounds:
                a, b, c, d = bp.bounds
                xmin, xmax = min(xmin, a + x), max(xmax, c + x)
                ymin, ymax = min(ymin, b), max(ymax, d)
        return xmin, ymin, xmax, ymax

    def text_path(self, text, cap_height, left, baseline, tracking_em=0.0, pair_adjust=None):
        """Outlined path for `text`, ink starting exactly at `left`; returns (d, ink_width)."""
        s = cap_height / self.cap
        placed = self.layout(text, tracking_em, pair_adjust)
        xmin, _, xmax, _ = self.ink_bounds(placed)
        d = []
        for name, x in placed:
            pen = SVGPathPen(self.glyphs, ntos=f)
            tpen = TransformPen(pen, (s, 0, 0, -s, left + (x - xmin) * s, baseline))
            self.glyphs[name].draw(tpen)
            d.append(pen.getCommands())
        return " ".join(c for c in d if c), (xmax - xmin) * s


# ----------------------------------------------------------------------------- schemes
SCHEMES = {
    # name: symbol disc, symbol core (A counter), wordmark, descriptor, symbol params, background (preview only)
    "color": dict(disc=NAVY, core=CYAN, name=NAVY, desc=NAVY, params=SYMBOL),
    "dark": dict(disc=WHITE, core=CYAN, name=WHITE, desc=WHITE, params=SYMBOL_REVERSED),
    "black": dict(disc=BLACK, core=None, name=BLACK, desc=BLACK, params=SYMBOL),
    "white": dict(disc=WHITE, core=None, name=WHITE, desc=WHITE, params=SYMBOL_REVERSED),
    "navy": dict(disc=NAVY, core=None, name=NAVY, desc=NAVY, params=SYMBOL),
}

# Symbol-only schemes for icons (favicon, app icon, avatars): the A is filled, not cut out.
ICON_SCHEMES = {
    "solid": dict(disc=NAVY, afill=WHITE, core=CYAN),          # any background, incl. dark browser tabs
    "solid-dark": dict(disc=WHITE, afill=NAVY, core=CYAN),     # on a navy tile
}

# Lockup proportions, in units of the disc diameter D.
D = 224.0                 # symbol (disc) size in lockup units
NAME_CAP = 0.35 * D       # ALFA CALIX cap height
DESC_CAP = 0.105 * D      # TECHNOLOGIES cap height
LINE_GAP = 0.13 * D       # baseline of the name to cap top of the descriptor
H_GAP = 0.30 * D          # symbol to wordmark (horizontal)
V_GAP = 0.22 * D          # symbol to wordmark (stacked)
NAME_TRACK = 0.02         # em
DESC_TRACK = 0.42         # em; sized so TECHNOLOGIES spans the width of ALFA CALIX


def svg_doc(width, height, title, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(width)} {f(height)}" '
            f'width="{f(width)}" height="{f(height)}" role="img" aria-labelledby="title">\n'
            f'  <title id="title">{title}</title>\n' + "".join(f"  {b}\n" for b in body) + "</svg>\n")


def wordmark(name_face, desc_face, left, top, align="left", block_width=None):
    """Return (elements_fn(scheme), width, height) for the two-line wordmark whose cap top is at `top`."""
    name_base = top + NAME_CAP
    desc_top = name_base + LINE_GAP
    desc_base = desc_top + DESC_CAP
    _, name_w = name_face.text_path("ALFA CALIX", NAME_CAP, 0, 0, NAME_TRACK)
    _, desc_w = desc_face.text_path("TECHNOLOGIES", DESC_CAP, 0, 0, DESC_TRACK)
    width = max(name_w, desc_w)
    if align == "center":
        bw = block_width or width
        name_x, desc_x = left + (bw - name_w) / 2, left + (bw - desc_w) / 2
    else:
        name_x, desc_x = left, left
    name_d, _ = name_face.text_path("ALFA CALIX", NAME_CAP, name_x, name_base, NAME_TRACK)
    desc_d, _ = desc_face.text_path("TECHNOLOGIES", DESC_CAP, desc_x, desc_base, DESC_TRACK)

    def elements(scheme):
        return [f'<path id="name" fill="{scheme["name"]}" d="{name_d}"/>',
                f'<path id="descriptor" fill="{scheme["desc"]}" d="{desc_d}"/>']

    return elements, width, desc_base - top, (name_w, desc_w)


def build(font_path, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    name_face = Face(font_path, 700)
    desc_face = Face(font_path, 600)
    written = []

    def write(fname, content):
        path = os.path.join(out_dir, fname)
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(content)
        written.append(fname)

    for key, scheme in SCHEMES.items():
        p = scheme["params"]
        label = {"color": "full colour", "dark": "for dark backgrounds", "black": "black",
                 "white": "white, for dark backgrounds", "navy": "navy one-colour"}[key]

        # Symbol only: 256 canvas, disc r=112 (16-unit margin all round)
        s = 1.0
        parts = symbol_svg_parts(p, scheme, 128 - p["R"], 128 - p["R"], s)
        write(f"alfa-calix-symbol-{key}.svg",
              svg_doc(256, 256, f"Alfa Calix Technologies symbol, {label}", [f'<g id="symbol">{"".join(parts)}</g>']))

        # Horizontal lockup: disc D tall, wordmark block centred vertically on it
        scale = D / (2 * p["R"])
        sym = symbol_svg_parts(p, scheme, 0, 0, scale)
        block_h = NAME_CAP + LINE_GAP + DESC_CAP
        els, ww, _, _ = wordmark(name_face, desc_face, D + H_GAP, (D - block_h) / 2)
        write(f"alfa-calix-horizontal-{key}.svg",
              svg_doc(D + H_GAP + ww, D, f"Alfa Calix Technologies logo, horizontal, {label}",
                      [f'<g id="symbol">{"".join(sym)}</g>', '<g id="wordmark">' + "".join(els(scheme)) + "</g>"]))

        # Stacked lockup: symbol centred above the centred wordmark
        _, ww, wh, _ = wordmark(name_face, desc_face, 0, 0)
        total_w = max(ww, D)
        sym = symbol_svg_parts(p, scheme, (total_w - D) / 2, 0, scale)
        els, _, _, _ = wordmark(name_face, desc_face, (total_w - ww) / 2, D + V_GAP, align="center", block_width=ww)
        write(f"alfa-calix-stacked-{key}.svg",
              svg_doc(total_w, D + V_GAP + wh, f"Alfa Calix Technologies logo, stacked, {label}",
                      [f'<g id="symbol">{"".join(sym)}</g>', '<g id="wordmark">' + "".join(els(scheme)) + "</g>"]))

    # Icon symbols (solid A), full size
    for key, scheme in ICON_SCHEMES.items():
        p = SYMBOL_REVERSED if key == "solid-dark" else SYMBOL
        parts = symbol_svg_parts(p, scheme, 128 - p["R"], 128 - p["R"], 1.0)
        write(f"alfa-calix-symbol-{key}.svg",
              svg_doc(256, 256, f"Alfa Calix Technologies symbol, {key} (for icons)",
                      [f'<g id="symbol">{"".join(parts)}</g>']))

    # Small-size symbol (favicon / 16-32 px)
    small = dict(SCHEMES)
    small.update(ICON_SCHEMES)
    for key in ("color", "dark", "black", "white", "solid", "solid-dark"):
        scheme = small[key]
        parts = symbol_svg_parts(SYMBOL_SMALL, scheme, 128 - SYMBOL_SMALL["R"], 128 - SYMBOL_SMALL["R"], 1.0)
        write(f"alfa-calix-symbol-small-{key}.svg",
              svg_doc(256, 256, f"Alfa Calix Technologies symbol, small-size cut, {key}",
                      [f'<g id="symbol">{"".join(parts)}</g>']))

    _, _, _, (nw, dw) = wordmark(name_face, desc_face, 0, 0)
    print(f"ALFA CALIX width {nw:.1f}, TECHNOLOGIES width {dw:.1f} (ratio {dw / nw:.3f})")
    print(f"wrote {len(written)} files to {out_dir}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--font", required=True, help="Plus Jakarta Sans variable font file (.ttf or .woff2)")
    ap.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "..", "svg"))
    args = ap.parse_args()
    build(args.font, os.path.abspath(args.out))
