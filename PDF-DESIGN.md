# Drew Neros Visuals, Print & PDF Design System

Print language for photo books, portfolio PDFs, zines, client decks and sellable guides. Two registers, one palette.
Derived from three reference spreads: *Tender Touch*, *Module / Coaching Workbook*, *Memoir / Chuyện chụp film*.

**This is NOT the website system.** See `DESIGN-SYSTEM.md` for screen. The two are deliberately different. Read "The Split" at the bottom before changing either.

## Trigger

When Drew says **"create me a PDF"**, "make a PDF", "a deck", "a lookbook", "a zine", or anything print-shaped, this file is the brief. Read it first, build to it, do not invent a look. If the request conflicts with a rule here, name the rule and ask, do not silently override.

Do not reach for `DESIGN-SYSTEM.md` on a PDF job. Wrong system.

## Pick the register first

This file holds two registers. They share paper, ink, type families and accent. They differ in size, density and how instructions are carried. Decide which one the job is before building anything.

| Job | Register | Read |
|---|---|---|
| Sellable guide, workbook, how-to, anything a buyer reads to follow steps | **Guide** | "The Guide register" below. Proven on *Model Digitals*, Sep 2026, approved by Drew. |
| Photo book, portfolio PDF, zine, lookbook, client deck | **Editorial** | Everything from "The shared DNA" down. Built from the three references. |

Unsure → ask Drew one question: "Is someone reading this to follow instructions, or to look at the work?"

---

## The Guide register

Proven on *Model Digitals* (13pp A4, canvas v17, 14 Sep 2026). Drew's brief was "clean and money worth", and his verdict was "I love it". Source: `Drew's brain/03 Projects/Model-Digitals-Guide/editorial/build.mjs`. Copy its CSS block rather than re-deriving it.

Why it differs from Editorial: a buyer reads a guide to act on it. 8pt justified text in narrow columns looks beautiful and reads badly as instructions. The guide register keeps the editorial voice (paper, serif, one accent, a lot of air) but sets text at reading size and carries steps in hairline tables instead of prose.

### The look in one line

A fashion magazine's instruction pages. Big real photographs, one idea per page, hairline tables, generous white space, one dark closer.

### Page

```
format      A4 at 96dpi, 794 x 1123px
margins     72px on all sides, content column 650px
footer      bottom 38px: publication name italic left, folio number right
top strip   none. The kicker above the headline does that job
```

### Type, in CSS px at A4 96dpi

```
headline     Playfair Display 400, 40px, leading 1.06, tracking -0.015em, text-wrap balance
             closer page may go to 54px
kicker       above every headline: italic Playfair numeral in accent, 14px,
             then section label 9.5px caps tracked 0.24em, ink-soft
accent rule  36 x 1px accent, 22px under the headline, optional
dek          EB Garamond italic 15.5px, leading 1.5, ink-soft
body         EB Garamond 13 to 13.5px, leading 1.5 to 1.6, LEFT RAGGED, never justified
small        12.5px, leading 1.55, ink-soft
table row    13px, leading 1.45, 9 to 10px vertical padding, 1px rule at 14% ink
table head   9.5px caps tracked 0.22em, 1px full-ink rule under it
row key      9.5px caps tracked 0.16em, ink-soft, fixed 88px column
caption      9px caps tracked 0.2em, ink; detail line 11.5px italic ink-soft under it
pull quote   EB Garamond italic 22px, leading 1.35, under a 1px full-ink rule
floor        nothing under 8.5px. Body never under 12.5px
```

### Carrying instructions

- **Lists become hairline tables.** Each item gets a row with a rule under it. Numbered lists use an italic accent numeral (`01`, `02`) in an 18px column. Never checkbox squares, bullet dots or icons.
- **Specs become key/value rows.** `ISO | 100 to 400`. The caps key column does the labelling.
- **Numbered items with a line of explanation** use a Playfair 17px title, an italic accent numeral, and the explanation indented 30px under it at 13px ink-soft.
- **Two lists side by side** (do / don't, before / after): two 305px columns with a 40px gap.
- **Stacked lists in one column** go in one flex column with a 30px gap. Never position them separately by guessing heights, because a wrapped label will push them flush.

### Photographs

- Real photographs only. No icons, sketches, placeholder frames, corner crop marks or decorative figures once photos exist.
- **Every page gets at most one dominant image.** Options that worked: full-bleed top band (whole width, 440 to 512px tall), full-height side column (340px wide, bleeding off one edge), or a single framed image in the right column.
- **Shot grids** (required angles): 3 over 2, each cell 196 x 280px with a 31px gutter. The sixth cell holds a short note under a full-ink rule. Caption each frame `01 FRONT` plus an italic detail line.
- Captions sit under the image, never on it.
- `object-fit: cover` for editorial frames. `contain` is allowed on a strip of reference thumbnails where the whole body must show.
- Use a "wrong" example photo on purpose where the page is about mistakes, and caption it as wrong ("A good photograph, and a failed digital").
- Low-resolution sources (under about 600px) go small, in grid cells only.
- Embed as WebP, 50 to 72 quality, each file under 70KB.

### Dark cards (links, video, featured items)

- A night-colour card (`#14130F`) 317 x 530px, with a real photograph as the background.
- **Fade:** a vertical gradient over the photo. Light at the top so the face reads, solid night from about 68% down. Starting values: `rgba(20,19,15,.45) 0%, .12 at 20%, .18 at 30%, .82 at 52%, #14130F at 68%`. The darker top edge keeps a small label legible on a light wall.
- Frame the photo so the face or body sits in the clear top half (`object-position` around `50% 8%`).
- All text sits in the solid bottom: 38px Playfair title, 13px body, then an accent underlined caps link.
- Play or action button: a 56px circle, 1px cream border, top right corner.
- This is the one place a gradient is allowed.

### The closer

The last page is dark. Headline up to 54px, a short body in `#D9D3C7`, then a verdict table (term in Playfair 21px, reason in italic, `REJECTED` caps in the night accent `oklch(0.74 0.09 38)`), ending on a 28px italic line. One dark page per document.

### Copy

- No em dashes or en dashes, anywhere, including number ranges: write "3 to 4 feet", "f/4 to f/5.6". No spaced commas.
- Plain words. Short sentences. Humanizer pass before shipping.
- Check that headline counts match their content ("six settings" when the table lists six).
- Keep every factual instruction from the source, reword freely.

### Checks that caught real bugs

Run a rendered-page check before shipping, not just a screenshot glance. The one in `editorial/verify.mjs` fails on: a page taller than A4, text off the page, text over text, text on a photo not marked `data-over`, broken images, text under 8.5px, and **two text blocks in one column closer than 16px**. That last rule caught two tables jammed flush that looked fine at thumbnail size.

### What the Guide register drops from Editorial

Deliberately not used, and why:

- **8pt justified narrow columns.** Too small to follow as steps.
- **Decorative numeric annotations.** Over a real photograph they read as a glitch or a watermark. Drew flagged it as "looking broken".
- **Running-head metadata strip.** The kicker plus the footer carry it with less noise.
- **Letter-stack page, rotated titles, diagram panels, icon panels, sketches.** The photographs do this job better. Keep the letter stack for the cover only.

The cover can stay in the Editorial register. On *Model Digitals* it is a letter stack with a framed photo, and it sits comfortably ahead of guide pages.

---

## The shared DNA

Editorial register. Every reference does these eleven things. They are the system for photo books, zines and decks. Guides follow "The Guide register" above where the two disagree.

1. Serif for everything. No sans anywhere, including captions.
2. Cream paper, never pure white.
3. Tiny body text, 7 to 9pt, in narrow columns, usually justified.
4. Exactly one huge display element per spread. A number, a word, or a rotated title.
5. Structured running heads carrying metadata: issue, date, section, folio.
6. Asymmetric image placement sitting on a strict invisible grid.
7. Numeric annotations used as pure decoration, for example `3.7 / 11.7`. Never set over a photograph.
8. Desaturated or black and white photography with visible grain.
9. Generous white space. Images rarely touch all four edges.
10. Brackets and parentheses as a typographic device, `{ }` and `( )`.
11. One accent colour maximum. Often zero.

---

## Paper and ink

Never `#FFFFFF`. Never `#000000`.

```
--paper:        #F5F2EB    warm cream, the default stock
--paper-cool:   #F2F2F0    neutral cream, for B&W heavy spreads
--paper-invert: #14130F    the black accent page
--ink:          #1A1A18    body text, near black
--ink-soft:     #5C5851    captions, secondary
--ink-faint:    #97928A    folios, running heads
--rule:         #1A1A18 at 12% opacity
--accent:       oklch(0.58 0.10 28)    rust red, used sparingly
```

**Finding:** `--accent` above is your existing `--film-red` from the website, unchanged. It already matches the rust in the *Memoir* reference almost exactly. Your palette crosses over to print without a single edit.

Accent rules. One accent per spread, maximum. Use it on a rotated title, a pull quote, or a rule. Never on body text. Never two accents on one page.

---

## Typography

### Families

Three roles, two families, one optional flourish.

```
--display:  high contrast Didone      Playfair Display / Bodoni / Freight Display
--text:     old style serif           EB Garamond / Freight Text / Lyon Text
--engraved: formal script, chapter names  Pinyon Script / Italiana / Tangerine
--hand:     one flourish only             Caveat / a real handwriting face
```

Do not introduce a fifth, and never put `--engraved` and `--hand` on the same spread. They are opposite registers. Engraved script is formal and sits on chapter titles ("Module", "Coaching Workbook" in the Module reference). Handwriting is a margin note ("goodvibe!" in Memoir). Each appears once per spread at most, as a signature, never as information.

### Scale, in points, for A4 and 240mm square

```
display-xl    120 to 160pt    the single statement per spread
display       64 to 96pt      rotated titles, giant section letters
number        48 to 72pt      section numbers, set alone or in parentheses, no dash glyph
title         24 to 32pt      article heads
pull          18 to 24pt      pull quotes, always italic
lead          11 to 12pt      opening paragraph only
body          7.5 to 9pt      the workhorse
caption       6.5 to 7.5pt    italic or small caps
meta          6 to 7pt        running heads and folios, letterspaced 0.08em
```

### Body text rules

This is the part that makes it look printed rather than exported.

```
size        8pt
leading     11.5pt          roughly 1.44x
measure     30 to 38 characters
alignment   justified, hyphenation ON
columns     2 or 3 per page, never 1 full width
tracking    0
```

A single full width column of body text at 8pt is the fastest way to break the look. The narrow measure is not decoration, it is what makes 8pt readable.

### Display rules

```
tracking    -0.03em at 64pt, tightening to -0.05em at 140pt
leading     0.86 to 0.92 of the size
alignment   left or optically centred, never justified
```

---

## Grid

### Page setup

```
format        A4 portrait (210 x 297mm) or 240mm square
margin-top    18mm
margin-out    22mm
margin-in     16mm       smaller, the gutter eats the difference
margin-bottom 26mm       larger, the folio lives here
columns       12
gutter        4mm
baseline      11.5pt      matches body leading exactly
```

### How content sits on it

Content blocks span 3, 4, 6 or 8 columns. Never 5, 7 or 11. The restriction is what produces the rhythm.

```
body column     3 or 4 columns
image, small    4 columns
image, medium   6 columns
image, large    8 columns
image, bleed    full width plus 3mm trim on the outer edge only
```

Images align to column edges horizontally and to the baseline grid vertically. Their vertical position is free, their edges are not.

---

## Running heads and folios

The metadata strip is what separates an editorial piece from a slide deck. Every reference has one.

```
Top left       section name, 6.5pt, letterspaced 0.08em, ink-faint
Top right      issue or date, same treatment
Bottom left    folio, in parentheses, (08)
Bottom centre  publication name, italic
```

Formats to steal directly:

```
{ Selected Work }          bracketed section, Memoir style
(NOV. ISSUE 01)            parenthesised issue, all caps
April 04 / Tender Touch    date then title, slash separator (no dashes, house rule)
(08) Memoir.               folio with trailing period
```

### Numeric annotations

Pure decoration, used as visual anchors in a corner. They read as data and mean nothing.

```
3.7 / 11.7
4.2 / 1.7
8.6 / 1.0
```

Set at 6.5pt, ink-faint, right aligned, stacked with 4mm leading. Maximum two per spread. Place on paper only. On *Model Digitals* one sat on top of a real photo, read as a glitch, and had to be removed.

---

## Image treatment

### Grade

```
saturation    -25 to -40%
contrast      +8%
highlights    warm shift, +4 toward amber
shadows       lifted 3 to 5%, never crushed to pure black
grain         visible, matched to the paper texture
```

### Mixing

Black and white and colour may share a spread. The *Tender Touch* reference does it on facing pages and it works because both are graded to the same contrast and the same warmth. Ungraded mixing reads as a mistake.

### Placement

Never more than four images per spread. Reference counts: 4, 5, 4. Above five it becomes a contact sheet.

One image per spread should be at least 6 columns wide. Without a dominant frame the spread reads as a grid of samples.

Gutter crossing is allowed for a single image per spread, and only when nothing important sits within 12mm of the fold.

---

## Pull quotes

```
size        18 to 24pt
style       italic, always
family      --text, not --display
measure     28 to 34 characters
position    bottom right of a spread, or adjacent to its dominant image
quote mark  optional, 3 to 4x the quote size, ink at 12%, set behind the text
```

The oversized quote mark appears in two of three references. It is a real device, not filler. Keep it decorative weight, never full ink.

---

## The black page

Every reference except *Tender Touch* uses an inverted page as a chapter break or a statement.

```
background  --paper-invert
text        --paper
accent      unchanged, rust still reads on black
images      full bleed, or a single centred frame with 40mm margins
frequency   one per 8 to 12 pages, never two consecutive
```

Use it to break a long photo run, or to carry a single line of copy. Never to carry body text.

---

## Rotated type

The *Memoir* left edge title is the single strongest move in the three references.

```
rotation    90deg counterclockwise, reading bottom to top
family      --display, condensed if available
size        48 to 72pt
position    flush to the outer margin, baseline sitting on the margin line
colour      --accent, or --ink
frequency   once per spread maximum, and not on consecutive spreads
```

---

## Six more devices, from a second read of the references

The eleven shared moves at the top are the skeleton. These six are what make a spread look art-directed rather than merely typeset. Use at most two per spread.

### The letter-stack page

*Module* gives one whole page to its own title as a vertical stack, one letter per row, filling the page height, with a photograph sitting in the counters and overlapping two rows. Its FAQ page does the same with three letters.

```
letters      one per row, 4 to 7 rows
size         as large as the measure allows, typically 180 to 260pt
family       --display, the high contrast Didone
leading      0.78 to 0.84, rows nearly touching
image        one, overlapping 2 rows, never centred in the block
frequency    once per document, as a chapter opener
```

This owns the whole page. No body copy on it.

### Shaped crops

Arch (top-rounded) and full oval crops appear in *Module*, on portraits only. This is the one exception to the no-rounded-corners rule, and it is a crop, not a corner radius.

```
arch         radius = half the image width, top two corners only
oval         full ellipse, portrait aspect
use on       single portraits, never a group, never a landscape
per spread   one maximum
never        alongside a rectangular frame of the same subject
```

### Boxed quote lines

The *Module* black page sets a quote with each LINE in its own filled box, staggered ragged, instead of as a continuous block.

```
background   --paper box on a --paper-invert page
text         --paper-invert, italic on the emphasised words only
padding      0.24em vertical, 0.4em horizontal
stagger      each line offset 0 to 40px, never aligned
leading      1.35, boxes visibly separated
lines        3 to 5, never more
```

Emphasis inside the quote is italic. Not bold, not colour.

### Diagram panels

*Memoir* runs a 2x3 grid of bordered panels holding single-weight line drawings of a process. It carries instructional content in a way body copy cannot.

```
border       0.5pt --ink, square, no radius
fill         none, paper shows through
drawing      single stroke weight 1 to 1.5pt, no fill, no shading
panels       4 or 6, arranged 2x2 or 2x3
arrows       hand-drawn feel, same stroke weight
labels       --text at caption size, inside or directly below the panel
```

For process, sequence, do-and-don't. Never for decoration.

### The note block

*Memoir* closes a spread with a labelled note block. That is how it carries technical copy without breaking the editorial register.

```
label        NOTE, or a warning triangle glyph, 7pt, letterspaced 0.1em
rule         under the label only, 1pt --accent, label width
body         two columns, 6.5pt, --ink-soft
position     page bottom, spanning 6 to 8 columns
```

The short rust rule under the label does all the work. Do not run it across the page.

### Rotated captions

Distinct from the rotated display titles below. *Module* runs a caption 90deg up the outer edge of a photograph, at caption size.

```
rotation     90deg, reading bottom to top
size         6.5 to 7.5pt, italic
position     flush to the image edge, 3mm gap
length       under 60 characters
```

---

## What NOT to do

Drawn from what the references conspicuously avoid.

- No sans serif. Not for captions, not for page numbers, not anywhere.
- No pure white background and no pure black text.
- No drop shadows on images. Ever.
- No rounded corners on images. An arch or oval CROP is a different thing and is allowed, see Shaped crops.
- No more than one accent colour per spread.
- No centred body text.
- No full width single column of body copy.
- No gradient anywhere. Exception, Guide register only: the dark fade over a photo behind card text.
- No more than five images per spread.
- No two consecutive spreads using the same layout.

---

## The Split

Your website and your print work now disagree on purpose, and you should know where.

| | Website | Print |
|---|---|---|
| Headline face | EB Garamond, as of 12 Sep | Didone or old style serif |
| Body face | DM Sans | Old style serif |
| Background | `#F5F2EB` cream, as of 12 Sep | `#F5F2EB` cream |
| Body size | 15px | 8pt |
| Measure | 62ch | 30 to 38ch |
| Alignment | Left ragged | Justified |
| Accent use | Four film colours available | One, rust, rarely |

**Shared, and worth keeping shared:**

- `--film-red` / `--accent`, identical value in both
- Film grain overlay, both surfaces
- Desaturated warm photo grade, both surfaces
- Generous whitespace and restrained image counts

**Resolved 12 Sep 2026.** Option 2 shipped. The site now runs `#F5F2EB` cream with EB Garamond on every heading; body, nav and mono labels stay DM Sans. The two surfaces rhyme without being the same. The gap that remains is deliberate: print goes Didone and 8pt justified, screen stays 15px ragged sans.

---

## Version

**v3**, 14 September 2026. Added the Guide register after the first real build. *Model Digitals* started in the Editorial register, looked "slapped" and "broken" as a sellable guide, and was rebuilt as the Guide register, which Drew approved. Removed dashes from the example formats (house rule). Numeric annotations now go on paper only. Allowed one gradient case (dark card fade). Added the register picker at the top.

**v2**, 12 September 2026. Three references, read twice. Added the six devices section, split the script face into engraved and handwritten, corrected the rounded-corner rule, added the trigger protocol, closed the screen-print open question after the site's editorial pass shipped.

Built against it: *Model Casting Survival Kit* (Editorial), *Model Digitals* (Guide, cover Editorial).
