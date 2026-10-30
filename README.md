# Rumpus

A demo site for **Rumpus**, a fictional independent creative studio and print room in Porto: campaigns, identity, film, riso and screen print. Plain HTML, CSS and JS. No build step and no dependencies apart from Lenis (smooth scroll, from unpkg).

## Run it

Serve the folder with any static server that supports byte ranges (video seeking needs them), for example from the parent folder:

```
node .claude/serve.mjs rumpus 5390
```

Then open `http://localhost:5390/`. The loader plays once per browser session; open a new tab or clear session storage to see it again.

## The look

One sheet, one voice: white paper, soft grey boards, Instrument Sans for everything, ink plus one grey for text, pills and tabs, the riso inks of each job, and the Runner (the studio's little running figure) in his orange tile.

The hero sets the language for the rest of the site: small 16:10 cards drifting along a zigzag line, one of them growing into the lead, with credits set like film captions. The loader, the home Work section and the footer word are all built from that same line.

## Pages

| Page | What's on it |
|---|---|
| `index.html` | **Loader** (first visit per session): the hero's cards are dealt onto the line from the floor up while a pill where the nav will sit fills to 100%. Scrolling is held until then; trying to scroll makes the pill shake. **Hero:** poster cards and four films drift up a zigzag line, and scrolling grows the film nearest the middle to full screen with its credits. **01 Studio:** one sentence plus four facts that count up. **02 Work:** the hero's line turned on its side. All eight jobs ride it, scrolling carries it along, and the job in the middle grows (playing its film if it has one) while its client and line rise bottom left. All work and Archive pills sit top right. **03 How a job runs:** grey board with five pills that fill like story bars. **04 News:** the latest four. |
| `work.html` | The sentence is the filter: Projects within Campaign, Identity, Print and Film (also `work.html?tag=Print`). Sheet view is an editorial grid of covers, some twice the size. Index view is a numbered list with the cover following the cursor. |
| `archive.html` | Every picture from every job plus studio days (41), numbered on one sheet. Sentence filter, a "Show me" box that filters by any word, Sheet/List views, and a white viewer (arrows, Esc, films play, Open the case). |
| `project.html?p=slug` | Case study: name, meta with inks and sheets off the press, film or cover with crop marks, four-part story, pictures, credits, next case. |
| `studio.html` | Rumpus (n.), belief, how we work, what we do, People and Presses (Big Pink's dot is lit while the studio is open), clients, collaborators, press, jobs, hours. |
| `news.html` | Dated feed with a tag filter. |

Every page shares the top bar, the Runner tile, the pill nav (its line turns into the running logo once you scroll), the ink page curtain between pages, and the footer: contact details plus the big Rumpus word in ink, with the project covers drifting sideways behind it on the same zigzag.

## Files

```
*.html     six pages (a tiny head script paints the curtain before anything renders, so there is no flash)
style.css  one stylesheet
data.js    all content: FILMS, PROJECTS (8), NEWS, TEAM, PRESSES, PROCESS; ARCHIVE is built from the rest
site.js    shared chrome: top bar, Runner tile, pill nav, curtain, loader, footer, Lenis, reveals, one rAF loop (RUMPUS.frame)
home.js    hero ribbon and films (including the loader's dealing), facts, work line, process, news
pages.js   work, archive, case study, studio, news
runner.js  the Runner, drawn live on a canvas
img/       WebP at quality 72, about 2.3 MB
video/     four 1080p films, about 12 MB
```

## Editing content

Everything lives in `data.js`. Add a project to `PROJECTS` (slug, client, tagline, tags, inks, cover, images, optional film) and it appears on the home work line, the work page, the archive, its own case study and the footer. Films in `FILMS` ride the hero ribbon. Archive studio pictures are listed at the bottom of `data.js` by file name (`img/news/<name>.webp`), so check there before deleting anything in `img/news/`.

## Small details

- Lists and grids dim the other items only while one is under the cursor.
- A "Sheets pulled today" counter runs on Porto opening hours.
- Press R to let the Runner sprint across the screen.
- The Runner in the tile runs harder the faster you scroll.
- Reduced motion is respected: no curtain, no drifting footer cards, no card animations.

## Media

All Pexels, no AI. Films: shoot 33191956, gallery 7986431, moodboard 9862354, orange 8328496. Case stills are frames from 4K Pexels behind-the-scenes and gallery films. Ribbon portraits: 14105912, 18506138, 30902411, 34472753, 40354307, 7859041, 7859047, 32435962. Press: 6620972, 40241484.
