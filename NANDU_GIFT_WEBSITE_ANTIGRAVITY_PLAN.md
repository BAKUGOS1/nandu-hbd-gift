# Nandani “Nandu” Gift Website — Antigravity Implementation Plan

## How to use this document

Paste the **Master Prompt** at the end of this document into Google Antigravity with the target project workspace open.

Reference experience:
- https://aya-sigma-six.vercel.app/

Flipbook source:
- https://github.com/sujal661/page-flip

Known personalization:
- Full name: **Nandani**
- Nickname: **Nandu**
- Photos: will be supplied later to the coding agent
- Book requirement: replace the reference website’s existing book with the scrapbook/page-flip experience from `sujal661/page-flip`

> Permission checkpoint: the supplied GitHub repository does not visibly include a root LICENSE file. Reuse its code and decorative assets only if the user owns it or has explicit permission. Otherwise, use it only as a visual/technical reference and recreate original equivalents.

---

# 1. Locked product brief

Build a polished, mobile-first, romantic gift microsite for **Nandani**, called **Nandu**.

The website should take inspiration from the pacing and emotional flow of the reference website, but it must be an original implementation. Do not copy its creator branding, authentication, payments, order history, settings UI, language switcher, or commercial behavior.

The final experience must be a single, cinematic flow:

1. A quiet full-screen landing gate: “A little surprise for Nandu”
2. User taps **Begin**
3. Background music starts only after that user gesture
4. A short `3 → 2 → 1` countdown
5. A sequence of warm introductory messages
6. A falling-text/name-rain scene using **NANDU**
7. A central reveal: **NANDANI / My Nandu**
8. A button: **Open your little book**
9. The scrapbook flipbook from the supplied repository appears
10. User turns pages by swipe, click, keyboard, or explicit Previous/Next controls
11. The back cover triggers a soft heart finale and final message
12. User can replay the experience

This is a personal gift site, not a template marketplace. Personalization must be controlled through a typed configuration file rather than a public settings panel.

---

# 2. Scope decisions

## Include

- Next.js App Router, TypeScript, Tailwind CSS
- Full-screen animated scenes
- User-gesture audio start, mute/unmute, graceful missing-audio fallback
- Countdown
- Main text reveal
- Canvas-based “NANDU” rain
- Floating hearts
- Responsive scrapbook flipbook
- Photos supplied later through a predictable asset manifest
- Reduced-motion mode
- Mobile and desktop controls
- Keyboard navigation
- Error/fallback UI
- Browser verification
- Vercel-ready production build

## Do not include in MVP

- Authentication
- Google login
- Payments
- Order history
- Public runtime settings panel
- Database
- Analytics or trackers
- File upload UI
- Admin panel
- Exact replication of the reference website
- Three.js/WebGL unless browser testing proves it is genuinely necessary
- Remote image hotlinking
- Copyrighted audio downloaded without permission

---

# 3. Visual direction

Use a warm, cinematic, scrapbook-romance style:

- Background: near-black, deep wine, and soft rose gradients
- Accent: blush pink, warm ivory, muted gold
- Book pages: cream paper, subtle grain, tape, stamps, frames, flowers, stars, and handwritten notes
- Main heading font: elegant serif such as Cormorant Garamond or Playfair Display
- UI font: clean sans such as Inter or DM Sans
- Handwritten book accents: Caveat
- Typography must remain readable; decoration cannot cover text or faces
- Motion should feel soft and intentional, not like a party template
- No heavy neon, no excessive glow, no cluttered UI

Recommended copy tone: affectionate, sincere, simple, and not overly dramatic.

---

# 4. Editable default copy

Store all copy in `data/gift-config.ts`. Do not scatter strings across components.

Suggested initial copy:

```ts
recipient: {
  fullName: "Nandani",
  nickname: "Nandu",
},

entry: {
  eyebrow: "Made with a little extra care",
  title: "A little surprise for Nandu",
  button: "Tap to begin",
},

introMessages: [
  "Hey Nandu...",
  "I made a little corner of the internet just for you.",
  "For the smiles, the memories, and all the little moments.",
],

hero: {
  title: "NANDANI",
  subtitle: "My Nandu",
  cta: "Open your little book",
},

book: {
  coverTitle: "For Nandani",
  coverSubtitle: "My Nandu",
  coverNote: "A little book made with love",
  pageMessages: [
    "Some people make ordinary moments feel beautiful. You are one of them.",
    "Every smile, every small memory, and every silly moment deserves a place to stay.",
    "So I made this little book for you, Nandu.",
    "I hope you always remember how special you are.",
    "Keep smiling, keep shining, and keep being wonderfully you.",
    "This little corner of the internet will always be yours.",
  ],
  backCover: "Always keep smiling, Nandu ♥",
},

finale: {
  title: "For you, Nandu",
  message: "You make the world feel a little softer and a lot more beautiful.",
  replayLabel: "Replay our little story",
},
```

These are placeholders. Do not invent relationship history, dates, private events, or claims not provided by the user.

---

# 5. Proposed code architecture

```text
app/
  layout.tsx
  page.tsx
  globals.css

components/
  gift/
    GiftExperience.tsx
    IntroGate.tsx
    CountdownScene.tsx
    MessageRevealScene.tsx
    NameRainCanvas.tsx
    HeroRevealScene.tsx
    BookScene.tsx
    FinaleScene.tsx
    AudioController.tsx
    FloatingHearts.tsx
    SkipIntroButton.tsx
    SceneErrorBoundary.tsx

  book/
    ScrapbookBook.tsx
    ScrapbookPage.tsx
    BookControls.tsx
    PhotoFrame.tsx
    BookFallback.tsx

data/
  gift-config.ts
  book-pages.ts
  photo-manifest.ts

types/
  gift.ts
  page-flip.d.ts                 # only if package types are insufficient

hooks/
  usePrefersReducedMotion.ts
  useVisibilityPause.ts
  useGiftAudio.ts

lib/
  asset-utils.ts
  timing.ts

public/
  book/
    pages/
    elements/
    frames/
  photos/
    nandu/
      README.md
      placeholders/
  audio/
    README.md

scripts/
  validate-gift-assets.mjs

tests/
  gift-flow.spec.ts

docs/
  implementation-plan.md
  photo-handoff.md
  verification-report.md
```

Use the correctly spelled folder `components`, not the supplied repository’s `componets` spelling.

---

# 6. Experience state model

Use one explicit state machine or reducer in `GiftExperience.tsx`.

```ts
type GiftPhase =
  | "gate"
  | "countdown"
  | "messages"
  | "rain"
  | "hero"
  | "book"
  | "finale";
```

Rules:

- Do not coordinate the full experience with unrelated timers in many components.
- Keep one abortable timeline/controller at the experience level.
- Cancel all timers and animation frames on phase change and unmount.
- `Skip intro` jumps safely from countdown/messages/rain to `hero`.
- Audio continues across phases without remounting.
- Replay resets the book to page 0, restarts the intro, and preserves the current mute setting.
- The URL does not need to change between scenes.

---

# 7. Phase-by-phase execution plan

## Phase 0 — Workspace safety, source inspection, and baseline

### Tasks

1. Create a new branch:
   - `feat/nandu-gift-experience`
2. Record the initial working tree state.
3. Do not delete or overwrite unrelated files.
4. Inspect the current target workspace.
5. Inspect both supplied references in the browser:
   - the live gift website
   - the `sujal661/page-flip` repository
6. Run the page-flip repository separately if possible and capture:
   - desktop screenshot
   - mobile screenshot
   - console errors
   - actual image/page dimensions
7. Confirm whether permission to reuse repository code/assets is available.
8. Write `docs/implementation-plan.md` before implementation.

### Important source audit

The book source should not be copied wholesale. Inspect and reuse only the required pieces:

- the active `Book/Bokk` component logic
- `public/pages`
- required `public/elements`
- required `public/frames`
- required type/package dependency: `page-flip`

Do not bring unrelated Three.js, React Three Fiber, draggable, model, scene, hover-image, or experimental components into the gift site unless they are actually required by the final interface.

### Exit criteria

- Source behavior documented
- Permission status documented
- Branch created
- Baseline build status recorded
- No implementation started before the plan artifact exists

---

## Phase 1 — Project foundation and content configuration

### Tasks

1. Use the package manager already selected by the target workspace lockfile.
2. Use Next.js App Router, TypeScript, and Tailwind.
3. Install only the missing dependencies needed for the final solution.
4. Add a typed `giftConfig` containing:
   - recipient identity
   - text
   - theme tokens
   - durations
   - audio path
   - photo manifest
   - book page content
5. Add global metadata:
   - title: `For Nandani — My Nandu`
   - description: `A little digital gift made for Nandu.`
6. Build a static placeholder homepage that renders without photos or audio.
7. Add a global error boundary/fallback message.

### Technical constraints

- No runtime secrets in client code
- No remote assets
- No public settings modal
- No duplicated config values
- No `any` unless a third-party type makes it unavoidable and it is locally documented
- Avoid unnecessary client components; only interactive scenes need `"use client"`

### Exit criteria

- `npm run lint` passes
- `npm run build` passes
- Placeholder page works at 320 px and 1440 px
- Config is the single source of truth

---

## Phase 2 — Full-screen shell, entry gate, and audio lifecycle

### Tasks

1. Build the stable viewport shell using modern viewport units:
   - `min-height: 100svh`
   - fallback to `100vh`
2. Add `IntroGate`:
   - title
   - tap/click CTA
   - subtle ambient motion
3. Audio must start only after the user taps Begin.
4. Add a persistent audio controller:
   - mute/unmute
   - visible focus state
   - accessible label
   - no autoplay before user interaction
   - graceful behavior when `/public/audio/nandu-theme.mp3` does not exist
5. Fade audio in rather than starting at full volume.
6. Pause expensive visual animation when the document is hidden.
7. Add a Skip intro button after the experience begins.

### Exit criteria

- No autoplay warning or unhandled audio promise rejection
- Site still works perfectly with no audio file
- Audio controller is reachable by keyboard
- Scene does not jump when mobile browser chrome expands/collapses

---

## Phase 3 — Countdown, message reveal, and name-rain scene

### Tasks

1. Countdown:
   - 3, 2, 1
   - approximately one second each
   - reduced-motion mode uses simple fades
2. Intro messages:
   - reveal one line at a time
   - avoid letter-by-letter animation on long text
3. Build `NameRainCanvas`:
   - draw `NANDU` or short variants on Canvas
   - use `requestAnimationFrame`
   - cap device pixel ratio at 2
   - recompute on resize
   - pause on hidden tab
   - clean up RAF and listeners
   - no hundreds of animated DOM nodes
4. Place the main message as semantic HTML above the canvas, never drawn only on canvas.
5. Show hero:
   - `NANDANI`
   - `My Nandu`
   - CTA: `Open your little book`
6. Add a low-motion fallback with a static patterned background.

### Suggested timing

- Countdown: 3 seconds
- Messages: 5–7 seconds total
- Name rain: 5–7 seconds
- Hero remains until user opens the book

### Exit criteria

- Smooth on a mid-range mobile viewport
- No runaway RAF after leaving the scene
- Text remains legible over effects
- Skip intro works from every timed scene

---

## Phase 4 — Extract and refactor the supplied scrapbook book

### Goal

Use the supplied page-flip scrapbook as the replacement for the reference website’s book, but integrate it as a clean, responsive, reusable component.

### Required refactor

1. Copy only the required book assets/code after permission is confirmed.
2. Rename/refactor:
   - `Bokk.tsx` → `ScrapbookBook.tsx`
   - `.book-page` → a scoped class such as `.nandu-book-page`
3. Remove:
   - unused imports
   - dead commented implementations
   - `react-draggable` dependencies if not used
   - unrelated 3D/model/hover components
4. Inspect the source images’ actual dimensions.
5. Establish one canonical page aspect ratio from the source assets.
6. Remove every conflicting inline width/height from individual pages.
7. Initialize `PageFlip` only in the browser:
   - client component
   - dynamic import inside an effect if needed
   - keep instance in a ref
   - destroy instance on cleanup
   - protect against React Strict Mode double initialization
8. Use responsive settings derived from the canonical ratio:
   - `size: "stretch"`
   - meaningful `minWidth`, `maxWidth`, `minHeight`, `maxHeight`
   - `showCover: true`
   - `usePortrait: true`
   - `drawShadow: true`
   - moderate `maxShadowOpacity`
   - swipe enabled
   - approximately 750–950 ms flipping time
9. Preserve hard front/back covers using `data-density="hard"`.
10. Listen to:
    - `flip`
    - `changeOrientation`
    - initialization/update events when useful
11. Expose controlled actions:
    - previous page
    - next page
    - go to first page on replay
12. Add outside controls:
    - Previous
    - `Page X of Y`
    - Next
13. Add keyboard support:
    - ArrowLeft
    - ArrowRight
    - Home
    - End
14. Add a visible swipe hint only on first entry, then dismiss it.
15. Add `BookFallback`:
    - if PageFlip fails, show pages as a horizontally scrollable or stacked gallery
    - never leave a blank screen

### Critical mobile requirement

The supplied source currently disables portrait mode and mixes multiple page sizes. Do not preserve those values. On a phone, the final book must show a single readable page; on larger screens it may show a two-page spread.

### Exit criteria

- Closed front cover appears correctly
- Desktop has a balanced two-page spread
- Mobile uses a single-page portrait mode
- Swipe works
- Explicit controls work
- Keyboard works
- Flip state/page count is accurate
- No duplicate book initialization
- No console errors after repeated scene entry/replay
- Fallback is verified by deliberately forcing initialization failure once

---

## Phase 5 — Convert the book into a content-driven Nandu scrapbook

Create 8 book elements total:

1. Front hard cover
2. Inner page 1
3. Inner page 2
4. Inner page 3
5. Inner page 4
6. Inner page 5
7. Inner page 6
8. Back hard cover

This creates three inner spreads on desktop and six single pages on mobile.

### Page plan

#### Front cover

- `For Nandani`
- `My Nandu`
- `A little book made with love`
- Optional small cover photo
- Existing decorative cover texture may be reused with permission

#### Inner page 1 — Opening letter

- One hero photo
- Short opening note
- Tape/frame decorations

#### Inner page 2 — Little memories

- Three-photo collage
- A short caption
- Keep faces unobstructed

#### Inner page 3 — Favourite smile

- One large portrait
- Handwritten quote

#### Inner page 4 — Moments collage

- Two or three photos
- Stars/flowers/stamps
- One short message

#### Inner page 5 — A note for Nandu

- Two photos
- A slightly longer message, max 55–70 words
- Ensure readable line length

#### Inner page 6 — Closing page

- One final photo
- Closing message
- Small prompt to turn to the back cover

#### Back cover

- `Always keep smiling, Nandu ♥`
- Closing decoration
- Trigger finale once it becomes the active page

### Implementation rules

- Replace hardcoded `/ref/girl*.jpg` paths with the photo manifest.
- Replace source-specific baked text images with real HTML text.
- Keep decorative layers data-driven where practical.
- Put all decorative images in `public/book/...`.
- Use `next/image` correctly with `sizes`.
- Only the first visible book/cover image should be `priority`.
- Use generic alt text until the user provides context:
  - `A memory for Nandani, photo 1`
- Do not infer location, relationship, age, ethnicity, or other sensitive facts from a photo.

### Exit criteria

- All pages are generated from data/config
- Changing a message requires no component edit
- Changing photo order requires only manifest changes
- No source-specific names or text remain

---

## Phase 6 — Finale and replay behavior

### Tasks

1. Detect arrival at the back cover through the flip event.
2. Trigger a restrained heart/confetti effect once per run.
3. Reveal:
   - `For you, Nandu`
   - final message
   - replay button
4. Do not cover the book immediately; let the user see the back cover first.
5. Keep mute state through replay.
6. Reset the book and visual state without a full page reload.
7. Respect reduced motion.

### Exit criteria

- Finale fires once, not on every small orientation/update event
- Replay works at least three consecutive times
- No timer, event-listener, canvas, or PageFlip leaks

---

## Phase 7 — Photo handoff workflow

The first implementation must finish with placeholders. It must not block waiting for photos.

Create `public/photos/nandu/README.md` with this contract:

```text
Preferred: 10 photos
Minimum: 6 photos
Maximum used in the core book: 10 photos

01-cover.jpg
02-opening.jpg
03-memory-a.jpg
04-memory-b.jpg
05-memory-c.jpg
06-portrait.jpg
07-moment-a.jpg
08-moment-b.jpg
09-note-a.jpg
10-closing.jpg
```

### When the user supplies photos

1. Copy originals to a temporary non-public working folder.
2. Do not modify originals.
3. Create optimized derivatives:
   - correct EXIF orientation
   - remove metadata
   - convert to WebP or high-quality JPEG
   - max long edge around 1600 px
   - retain enough quality for the book
4. Map photos in filename order unless the user specifies an order.
5. Select the cover image only from a user-marked favourite; if none is marked, use the first supplied image and report that assumption.
6. Store crop focal points in the manifest:
   - `objectPosition: "50% 35%"`
7. Never crop faces or heads without visual review.
8. If fewer than 10 images are supplied:
   - use fewer slots
   - enlarge selected photos
   - never duplicate a photo unless the user explicitly approves
9. If more than 10 are supplied:
   - use the first 10 by user order
   - list unused files in the handoff report
10. Capture every page in desktop and mobile after replacement.
11. Ask only for crop/order corrections, not for information already inferable from filenames or the plan.

### Privacy checkpoint before deployment

Explicitly tell the user that files placed in a normal public Vercel deployment can be accessible through their asset URLs. Offer either:

- public/unlisted deployment, or
- a proper server-side access gate using an environment variable and secure cookie

Do not claim that a client-side password is secure.

### Exit criteria

- No placeholders remain after final photo pass
- No broken images
- Faces are visible
- Image metadata is removed
- User approves page order/crops

---

## Phase 8 — Accessibility, responsiveness, and performance

### Required viewport tests

- 320 × 568
- 360 × 800
- 390 × 844
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1440 × 900

### Required interaction tests

- Mouse
- Touch/swipe
- Keyboard only
- Reduced motion
- Muted audio
- Missing audio
- Slow image load
- PageFlip initialization failure
- Orientation change
- Replay three times

### Accessibility requirements

- Semantic buttons
- Visible focus states
- No keyboard trap
- `aria-live` only where useful; do not announce every animation frame
- Decorative images use empty alt text
- Meaningful photos use concise alt text
- Sufficient contrast
- Controls at least touch-friendly
- Main content still understandable with Canvas disabled
- Avoid flashing or rapid scale pulses

### Performance requirements

- Lazy load non-visible book photos
- No remote fonts or media that block the experience unexpectedly
- Pause RAF when hidden
- Avoid mounting the book before the book phase
- Avoid importing Three.js
- No uncontrolled particle count
- No console errors
- No hydration warnings
- Production build succeeds
- Aim for strong mobile Lighthouse results, but report actual measurements rather than inventing a score

---

## Phase 9 — Testing, documentation, and deployment

### Automated checks

Add scripts appropriate to the workspace:

```bash
npm run lint
npm run build
npm run test:e2e
```

Recommended smoke test assertions:

1. Gate renders
2. Begin advances to countdown
3. Skip intro reaches hero
4. Open book mounts book
5. Next/Previous update indicator
6. Back cover reaches finale
7. Replay returns to gate
8. Mute control remains operable

### Browser verification artifact

For each major phase, Antigravity must provide:

- objective
- files changed
- commands run and results
- desktop screenshot
- mobile screenshot
- console status
- known risks
- next phase
- commit hash

### Commit checkpoints

Suggested commits:

1. `chore: document nandu gift experience plan`
2. `feat: add gift experience shell and configuration`
3. `feat: add intro countdown and name rain`
4. `feat: integrate responsive scrapbook page flip`
5. `feat: add nandu scrapbook content and finale`
6. `test: verify responsive gift flow`
7. `chore: prepare vercel deployment`

### Deployment

1. Deploy only after local production build passes.
2. Verify the deployed URL on mobile and desktop.
3. Check audio file path and case-sensitive asset names.
4. Check every book page.
5. Check privacy mode selection.
6. Produce `docs/verification-report.md`.
7. Do not consider the task complete until the deployed build matches the local verified build.

---

# 8. Definition of done

The project is done only when all statements below are true:

- The page is clearly personalized for Nandani/Nandu
- The intro can be entered by tap/click
- Audio never autoplays before permission
- Countdown and intro can be skipped
- “NANDU” rain runs smoothly and cleans up
- The hero reveal is legible on all target screens
- The supplied scrapbook concept is integrated
- The book is single-page on mobile and spread-based on larger screens
- Front/back covers behave as hard covers
- Swipe, controls, and keyboard navigation work
- Book pages are driven by configuration
- Real photos can be replaced without component rewrites
- The site works with photos/audio temporarily missing
- Reduced motion works
- PageFlip has a verified fallback
- Replay does not leak or duplicate listeners
- Lint, build, and smoke tests pass
- No console errors or hydration warnings
- The final deployment has been browser-verified
- The user has been warned about public photo URLs before deployment

---

# 9. Ready-to-paste Antigravity Master Prompt

```text
You are the lead frontend engineer and browser-verification agent for a personal gift microsite.

TARGET
Build an original, polished, responsive romantic gift website for:
- Full name: Nandani
- Nickname: Nandu
- Photos: I will provide them later
- Preferred tone: warm, sincere, romantic, simple, not overly dramatic

REFERENCE EXPERIENCE
https://aya-sigma-six.vercel.app/

BOOK SOURCE
https://github.com/sujal661/page-flip

IMPORTANT SOURCE RULE
The live reference is inspiration for pacing and feature categories only. Do not copy its creator branding, authentication, payments, order history, settings modal, language switcher, or commercial code.

Before reusing code or decorative assets from the GitHub book source, document whether I own it or have permission. If permission is not confirmed, treat it only as a visual/technical reference and recreate original equivalents. Do not assume a public repository is automatically reusable.

MISSION
Create a single-page cinematic gift flow:

1. Full-screen gate: “A little surprise for Nandu”
2. Tap Begin
3. Start optional background audio only after this gesture
4. Countdown 3, 2, 1
5. Reveal three short intro messages
6. Show a Canvas-based falling “NANDU” text-rain scene
7. Reveal “NANDANI” and “My Nandu”
8. CTA: “Open your little book”
9. Open a scrapbook flipbook based on the supplied page-flip repository
10. Allow swipe, click, Previous/Next buttons, and keyboard navigation
11. Reach a back-cover heart finale
12. Offer Replay without reloading the page

NON-GOALS
Do not build auth, payments, settings UI, admin, database, analytics, upload UI, or a marketplace. Do not add Three.js/WebGL unless browser evidence proves it is necessary. Do not download copyrighted music or remote images.

WORKFLOW AND SAFETY
- Start by inspecting the workspace, both URLs, package manager, and current build.
- Create branch: feat/nandu-gift-experience
- Do not delete or overwrite unrelated files.
- Do not run destructive commands.
- Create docs/implementation-plan.md before coding.
- Work phase by phase.
- At the end of every phase:
  1. run lint/build relevant to that phase,
  2. launch the app,
  3. verify it in the browser on desktop and mobile,
  4. inspect console errors,
  5. create an artifact/report with files changed, commands/results, screenshots, risks, next phase, and commit hash.
- Do not proceed to the next phase while the production build is broken.
- Use placeholders and continue even though photos/audio are not supplied yet.
- Stop only at the final photo-personalization checkpoint if actual media is required.

STACK
Use the target workspace’s existing package manager and framework where possible. Preferred architecture:
- Next.js App Router
- TypeScript
- Tailwind CSS
- page-flip for the book
- existing Motion dependency or lightweight CSS animation
- Canvas for text rain
- lucide-react for controls if already available

PROJECT STRUCTURE
Create/refactor toward:

app/
  layout.tsx
  page.tsx
  globals.css
components/gift/
  GiftExperience.tsx
  IntroGate.tsx
  CountdownScene.tsx
  MessageRevealScene.tsx
  NameRainCanvas.tsx
  HeroRevealScene.tsx
  BookScene.tsx
  FinaleScene.tsx
  AudioController.tsx
  FloatingHearts.tsx
  SkipIntroButton.tsx
  SceneErrorBoundary.tsx
components/book/
  ScrapbookBook.tsx
  ScrapbookPage.tsx
  BookControls.tsx
  PhotoFrame.tsx
  BookFallback.tsx
data/
  gift-config.ts
  book-pages.ts
  photo-manifest.ts
types/
  gift.ts
hooks/
  usePrefersReducedMotion.ts
  useVisibilityPause.ts
  useGiftAudio.ts
public/book/
public/photos/nandu/
public/audio/
scripts/validate-gift-assets.mjs
tests/gift-flow.spec.ts
docs/

CONFIGURATION
All recipient names, copy, timings, theme values, audio path, photo paths, object positions, and book-page content must live in typed config/data files. Do not scatter personalized strings through components.

Use these initial values:

recipient:
  fullName: Nandani
  nickname: Nandu

entry:
  title: A little surprise for Nandu
  button: Tap to begin

introMessages:
  - Hey Nandu...
  - I made a little corner of the internet just for you.
  - For the smiles, the memories, and all the little moments.

hero:
  title: NANDANI
  subtitle: My Nandu
  cta: Open your little book

finale:
  title: For you, Nandu
  message: You make the world feel a little softer and a lot more beautiful.
  replayLabel: Replay our little story

Do not invent dates, shared experiences, relationship history, or private facts.

STATE MODEL
Use one explicit state machine/reducer:
gate → countdown → messages → rain → hero → book → finale

Keep the audio controller mounted across phases. Centralize timers and make them abortable. Skip Intro must safely jump to hero. Replay must reset book/page/effects while preserving mute state.

PHASE 0 — AUDIT
- Inspect the live reference and record the actual user flow.
- Inspect the page-flip repository, run it separately when possible, and record desktop/mobile behavior.
- Identify only the code/assets needed for the scrapbook.
- Inspect actual dimensions of pages/front.png, back.png, left.jpg, right.jpg, and used frame/element assets.
- Document licensing/permission status.
- Record baseline build and screenshots.

PHASE 1 — FOUNDATION
- Add typed config and clean component structure.
- Add metadata: “For Nandani — My Nandu”.
- Render a stable responsive placeholder shell.
- Use 100svh with fallback.
- Add error/fallback UI.
- Make lint and production build pass.

PHASE 2 — ENTRY AND AUDIO
- Build full-screen IntroGate.
- Audio starts only after Begin.
- Add mute/unmute, fade-in, missing-file fallback, accessible labels, and visible focus.
- Add Skip Intro.
- Pause expensive visual work when document is hidden.

PHASE 3 — COUNTDOWN, MESSAGES, RAIN, HERO
- Countdown 3/2/1.
- Reveal intro lines.
- Implement NameRainCanvas with requestAnimationFrame, DPR capped at 2, resize support, visibility pause, and cleanup.
- Draw NANDU rain, but keep meaningful text in semantic DOM.
- Add reduced-motion/static fallback.
- Reveal NANDANI / My Nandu and Open your little book CTA.

PHASE 4 — BOOK TRANSPLANT/REFACTOR
Do not copy the repository wholesale.

Required:
- Copy only the active book logic and the assets actually used.
- Rename Bokk.tsx to ScrapbookBook.tsx.
- Use correctly spelled components directory.
- Remove unused imports, commented prototypes, draggable code, 3D code, and experimental components.
- Replace conflicting inline page sizes with one canonical aspect ratio based on inspected source assets.
- Initialize PageFlip in a client-only safe way.
- Protect against Strict Mode double initialization.
- Keep PageFlip instance in a ref and destroy it on cleanup.
- Use responsive stretch settings with derived min/max dimensions.
- Set showCover: true.
- Set usePortrait: true.
- Keep hard covers with data-density="hard".
- Enable touch/swipe and moderate shadows.
- Listen to flip/orientation events.
- Expose Previous, Next, page indicator, ArrowLeft, ArrowRight, Home, and End.
- Show a dismissible swipe hint on first mobile use.
- Add BookFallback as scrollable/stacked pages if PageFlip fails.
- Verify failure fallback deliberately.

Do not preserve the source’s mismatched page dimensions or disabled portrait behavior.

PHASE 5 — NANDU SCRAPBOOK CONTENT
Build exactly 8 book elements:
1. Front cover
2–7. Six inner pages
8. Back cover

Page content:
- Cover: For Nandani / My Nandu / A little book made with love
- Page 1: opening letter + one photo
- Page 2: three-photo memory collage
- Page 3: large portrait + quote
- Page 4: two/three-photo moments collage
- Page 5: two photos + note
- Page 6: final photo + closing message
- Back: Always keep smiling, Nandu ♥

Replace /ref/girl*.jpg with the typed photo manifest. Replace source-specific text PNGs with real HTML text. Keep decorations from config/data where practical. Never let decoration cover a face or important copy.

PHASE 6 — FINALE
- Detect active back cover from PageFlip flip state.
- Wait briefly so the back cover remains visible.
- Run restrained floating hearts once per experience.
- Reveal final message and replay.
- Replay must work three times without duplicate listeners, PageFlip instances, or RAF loops.

PHASE 7 — PHOTO-READY HANDOFF
Finish the complete site with labelled placeholders first.

Create public/photos/nandu/README.md using:
01-cover.jpg
02-opening.jpg
03-memory-a.jpg
04-memory-b.jpg
05-memory-c.jpg
06-portrait.jpg
07-moment-a.jpg
08-moment-b.jpg
09-note-a.jpg
10-closing.jpg

Preferred 10 photos, minimum 6. Never duplicate a photo without approval.

When I later attach photos:
- preserve originals,
- correct orientation,
- remove metadata,
- create optimized derivatives,
- use user order,
- store object-position focal points in the manifest,
- do not crop faces without browser review,
- list unused files,
- capture every page at desktop and mobile,
- ask only for crop/order corrections.

Before deployment, clearly warn me that normal public Vercel asset URLs can expose photos. Offer a real server-side access gate using an environment variable and secure cookie if I request privacy. Do not present a client-side password as secure.

PHASE 8 — QUALITY
Test:
- 320×568
- 360×800
- 390×844
- 430×932
- 768×1024
- 1024×768
- 1440×900

Test mouse, touch, keyboard, reduced motion, mute, missing audio, slow images, forced book failure, orientation change, and replay three times.

Requirements:
- no keyboard trap
- visible focus
- semantic buttons
- useful alt text
- decorative alt=""
- good contrast
- Canvas-disabled fallback
- no flashing
- lazy-load non-visible photos
- no Three.js
- no console errors
- no hydration warnings
- report actual performance measurements

PHASE 9 — TEST AND DEPLOY
Add a small Playwright or equivalent smoke test for:
- gate
- begin
- skip
- hero
- open book
- next/previous
- finale
- replay
- mute

Run lint, production build, and tests. Deploy only after they pass. Verify deployed desktop/mobile behavior and all asset paths. Create docs/verification-report.md.

DEFINITION OF DONE
Do not mark complete until:
- Nandani/Nandu personalization is visible
- audio permission behavior is correct
- intro is skippable
- name rain cleans up
- book works on mobile and desktop
- portrait mode is active on phones
- hard covers work
- swipe/buttons/keyboard work
- fallback works
- config controls content
- placeholders can be replaced without component edits
- reduced motion works
- replay has no leaks
- lint/build/tests pass
- browser screenshots and console checks exist
- deployment is verified
- privacy choice is documented

Begin with Phase 0 only. Produce the audit and implementation-plan artifact before writing feature code.
```
