# Rumpus: Project Card

Everything someone needs to rebuild this exact site: the prompts, workflow, tools and history.

---

## Short description (30 max)
**Porto creative studio & print room**

## Description
Rumpus is a multi-page site for a made-up independent creative studio and riso/screen-print room in Porto. It makes campaigns, identities, film and print for festivals, labels and small brands. The hero is a white sheet where small 16:10 cards (posters, pages and photos) drift up a zigzag line with four films riding along. Scrolling grows the film nearest the middle to full screen and brings up its credits like a film caption. The rest of the site reuses that line: the loader deals the cards onto it, the home Work section turns it on its side, and the footer word has covers drifting behind it. Inside pages: Work, Archive, Case study, Studio and News. A tiny running figure, the Runner, lives in an orange tile.

## Type
Multi-page portfolio / agency site (6 pages, static HTML/CSS/JS, no build step)

## Vibe
Editorial, white-paper minimal and playful in motion. Instrument Sans only, ink plus one grey, soft grey boards, pills and tabs, riso ink dots, real candid photography, and one idea (the drifting line) carried through every section.

## Category
Agency / Creative studio portfolio

## Claude model used most
**Claude Opus 5.5** (`claude-opus-5-5`)

## How many tries
**About 18 major rounds** over several sessions (Oct 22–28, 2026), each with many smaller fix prompts:
1 Runner mascot site (LOUD IMAGES hero, sticker nav) → 2 Runner reel made from Kling clips → 3 flyingpapers-style restyle (reverted) → 4 "Juggler" WebGL printer hero → 5 Circular/Anyways captions + pill nav → 6 4K reel → 7 ribbon hero from a portfolio-stream recording → 8 rebrand to professional (Instrument Sans only, mascots removed) → 9 AI images (rejected) → real Pexels photos → 10 animated CSS ribbon cards → 11 aerial films on the ribbon → 12 gallery/colour-backdrop imagery → 13 multi-page site → 14 halftone loader + screenshot-inspired sections → 15 "junkyard" revert → 16 Telha-style final pass → 17 hero-language work line, loader and footer → 18 finalise (dead code, wait pill, README).

---

## Main prompt

> Build a multi-page site for **Rumpus**, a fictional independent creative studio and riso/screen-print room on Rua do Almada, Porto. It makes campaigns, identities, film and print for festivals, labels and small brands. Use plain HTML/CSS/JS with no build step: six pages (index, work, archive, project?p=slug, studio, news), one `style.css`, a shared `site.js`, `home.js`, `pages.js`, and a `data.js` that holds all content. Use Lenis from unpkg for smooth scroll.
>
> **Design system:** white paper, soft grey boards (#ececec), ink #111 plus one grey #9b9b9b for text, Instrument Sans ONLY (headings, body, small text), pills and tabs, small 2–6px radii. Each project has its riso inks shown as dots. Use real candid photography only (Pexels): BTS shoots, gallery candids, moodboards, editorial portraits on colour backdrops. No AI images and no mascot illustrations, except **the Runner**, a small running figure drawn live on canvas inside an orange tile at the top left.
>
> **Hero (the language for the whole site):** a white sheet where about 20 small 16:10 cards drift up a zigzag line (`x = sin(u·6π)`, the line about 2× the screen height). The cards are the studio's own posters and pages built in CSS (flip board, tile monogram, type specimen, chess-club poster with the Runner, starburst hello, label grid, 365 page) mixed with photos. Four films ride the line as slightly bigger cards. When you scroll, the film nearest the middle slides to centre and grows to full screen (keeping its aspect, cover-fit via scale + clip-path) while the others spread and fade. Then its credits rise in a Circular-style caption (client, two lines, number, note).
>
> **Chrome:** a top bar (logo · inquiries · "Sheets pulled today" counter · coordinates) in `mix-blend-mode: difference`. An Anyways-style bottom-centre pill nav whose tagline line morphs into a running-Runner logo on scroll. An ink page curtain between pages showing the destination's name and the Runner crossing. Press R to let the Runner sprint.
>
> **Loader (first visit per session):** the hero's own sheet. The cards are dealt onto the line one by one from the bottom as the page loads. A pill in the nav's spot fills to 100% and shakes if you try to scroll early (scroll is locked until it's done).
>
> **Home sections:** 01 Studio (one sentence: what we are in ink, everything we do in grey, plus four facts that count up) → 02 Work (the hero's line on its side: all 8 projects as cards on a zigzag, scroll carries the line, the middle job grows and plays its film, its credits rise bottom left, plus All work / Archive pills) → 03 How a job runs (grey board, five pills that fill like story bars, a sentence and a photo per step) → 04 News (four title cards).
>
> **Footer (every page):** contact sentence, email, four columns (studio, open hours with live Porto clock, new work, elsewhere), then a giant ink "Rumpus" with the project covers drifting sideways behind it on the same zigzag.
>
> **Inside pages:** Work = a sentence that is the filter ("Projects within Campaign, Identity, Print and Film") + an editorial sheet of covers + an Index list with the cover following the cursor. Archive = 41 numbered pictures on one sheet, sentence filter, a "Show me" word search, Sheet/List views, and a white lightbox. Case study = title, meta with inks and sheets off the press, film with crop marks, four-part story, pictures, credits, next case. Studio = Rumpus (n.) definition, belief, how we work, people, presses as staff (Big Pink's dot lit while open), clients, press, jobs, hours. News = dated feed with a tag filter.
>
> Hovering any grid or list dims the other items only while one is under the cursor (`:has`). Support reduced motion, use lazy WebP images, and play only the videos that are on screen.

## Follow-up prompts (in order, the ones that shaped the final site)
1. "Make the hero like this recording." *(portfolio card stream: cards drifting up a line, one film grows to full screen)*
2. "Rebrand it to something professional with one vibe: no mascots, Instrument Sans only, Anyways pill nav, Circular captions."
3. "Not a big fan of the images, are they AI generated?" → replace all imagery with real Pexels photos: candid gallery shots, studio BTS, moodboards, colour-backdrop portraits.
4. "The ribbon cards look like a draft, tiny unreadable text." → rebuild them as real posters/pages on one card system.
5. "Make it multi-page: work, archive, case study, studio, news." *(Kurppa Hosk, Telha Clarke, OMSE, MW.S references)*
6. "These sections feel like a junkyard copied from screenshots, not Rumpus. Revert." → rule: references are loose ideas; build everything from Rumpus's own language.
7. "Not a fan of the work section or the archive block; house rules looks stupid; change the footer wordmark animation; projects look low opacity, only dim the others on hover; make the work section and the loader match the hero."
8. "Finalise: remove junk code, optimise, update the README, and add an indicator so users know to wait while the loader runs."

---

## Workflow
1. **Brief → hero only → review.** Build the hero, stop and iterate on it with the user (it went through mascot, juggler and ribbon versions).
2. **Reference intake.** The user sends screen recordings and screenshots. Take the *idea* from each one (motion, structure), never the layout.
3. **One language.** Once the ribbon hero was approved, rebuild every other section from it: small cards, the zigzag line, a lead that grows, captions.
4. **Imagery pass.** Search Pexels (via the browser pane) for candid/BTS/gallery footage. Pull 4K stills with ffmpeg and re-encode everything to WebP q72 and 1080p MP4.
5. **Multi-page split.** Shared chrome in `site.js`, content in `data.js`, page logic in `home.js` / `pages.js`.
6. **Verify.** Headless Edge over CDP (`shoot.mjs`) at 1440×900 and 390×844: loader frames, scroll positions, hover states, console errors, horizontal overflow, and tiled screenshot sheets with ffmpeg.
7. **Finalise.** Audit for unused CSS classes, assets and dead JS; add the loader wait pill; rewrite the README.

## Tech stack
- HTML, CSS (custom properties, `:has()`, `clip-path`, `mix-blend-mode`, sticky pinned sections), vanilla JS with one shared rAF loop
- Lenis 1.1.13 (unpkg) for smooth scroll; Instrument Sans (Google Fonts, variable width/weight)
- Canvas 2D for the Runner (tile, pill logo, curtain, R sprint, chess poster)
- `.claude/serve.mjs` static server with HTTP Range support (needed for video seeking), port 5390

---

## Skills used
| Skill | Used? | Notes |
|---|---|---|
| `anthropic-skills:built-in-browser` | ✅ | Browser pane for previews and for searching Pexels |
| `ponytail` | ✅ | Active in the final sessions: small diffs, deleting over adding (house rules, strips loader, dead code) |
| `impeccable` | ❌ | Not recorded as used on Rumpus |
| `design-taste-frontend` | ❌ | Not recorded as used on Rumpus |

**Recommended if you rebuild it:** `impeccable` (polish/critique passes per section), `design-taste-frontend` (avoids a templated look), `ponytail` (keeps the files lean).

## Connectors / MCPs used
| Connector | Used? | What for |
|---|---|---|
| **Higgsfield** | ✅ | Early rounds only: Kling 3.0 clips for the Runner reel and gpt_image_2_5 editorial photos. The user rejected the AI imagery, so **none of it is in the final site** |
| **Claude Browser (in-app)** | ✅ | Dev-server preview and Pexels search (reading `__NEXT_DATA__` for video IDs) |
| **Mobbin** | ❌ | Not used on Rumpus. References came from the user's own screenshots and recordings |

## Other tools
- **Pexels** for all final photos and films (IDs listed in `README.md`)
- **ffmpeg / libwebp** for 4K stills, WebP q72 encoding, 1080p film cuts and screenshot tiling
- **Headless Edge over CDP** (scratchpad `shoot.mjs`) for loader frames, scroll and hover screenshots, and overflow checks

## References
A portfolio card-stream screen recording (hero ribbon), Circular Agency (one-sentence statements, film captions, top bar), Anyways (pill nav, filterable boards), Telha Clarke (overall finish), Kurppa Hosk (work grid + sentence filter), MW.S / Emele (archive sheet), OMSE + Locomotive (case study, news feed), Rawty / TDF (cleanliness). The rule that came out of it: references are loose ideas only, and every section is built from Rumpus's own language.
