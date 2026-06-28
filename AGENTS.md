<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Vibe Math — Project Overview

## Stack
- **Framework:** Next.js 16.2.9, React 19.2.4
- **Auth/DB:** Supabase (magic link, RLS, server + browser clients)
- **Styling:** Tailwind CSS v4 (PostCSS), dark-only theme, CSS variables in `globals.css`
- **Math:** KaTeX 0.17 (`renderToString` with `dangerouslySetInnerHTML` over `<InlineMath>` to avoid hydration issues)
- **Animations:** Framer Motion 12.42 (spring springs preferred), CSS keyframes
- **3D:** Three.js 0.185 (`THREE.Timer` replaces deprecated `THREE.Clock`)
- **Charts:** Recharts 3.9
- **Icons:** lucide-react + custom SVG icons in `components/ui/icons.tsx`

## Architecture
- **App Router** with layout groups; all pages default server components
- **Auth flow:** Supabase magic link → `/auth/callback` code exchange → session cookie
- **Sidebar context:** `AppShell` provides `AppContext` for sidebar collapse/mode, glossary terms, review state
- **Lesson content:** Static in `lessons-data/lessons.ts` (10 lessons), metadata in Supabase `lessons` table
- **API routes:** `/api/glossary/saved` — CRUD for user-saved glossary terms

## Key Patterns & Gotchas

### KaTeX
- Every `\frac{}{}` must be a single valid block
- `renderMath` in `lib/katex-utils.ts`: `katex.renderToString(tex, { throwOnError: false })`
- Display math wrapper: `whitespace-nowrap overflow-x-auto` for horizontal scroll
- KaTeX CSS imported globally in root `layout.tsx`

### Canvas / CSS 3D
- CSS `perspective` on a parent with `transform` flattens child `preserve-3d` → keep 3D transforms on same element
- `<p>` cannot contain `<div>` — use `<div>` wrappers around `RichText` when display math (`$$…$$`) is possible
- `position: fixed` inside `position: sticky` is scoped to that stacking context → use `createPortal`

### Components
- **Interactive:** 6 tools (LimitExplorer, DerivativeStepSolver, IntegralVisualizer, ChainExplorer, ProductRuleSolver, USubSolver) — all "use client"
- **ProductRuleSolver / USubSolver** reduced to thin wrappers over `StepSolverBase`
- **GlossaryPopup** uses `Modal` component with Framer Motion spring animation
- **Flip cards** in `FormulaGrid` use CSS 3D `rotateY(180deg)` with `backface-visibility: hidden`
- **RichText** handles `**bold**`, `*aside*`, `$math$`, `$$display math$$`, glossary term detection
- **Sidebar** supports 3 modes: course, glossary, review — collapsed by hamburger button at `left-[296px]` when expanded

### Mobile
- `max-md:bg-[#050508]` for solid mobile navbar; `md:bg-background/80 md:backdrop-blur-xl` for transparent desktop
- Slider inputs: 48px touch targets via CSS global styles
- Cards stack `flex-col md:flex-row`
- `py-10 md:py-16` for responsive vertical padding

### Three.js (HeroBackground)
- `GRID_SIZE=14`, `SPREAD=800`, step ≈57 units — `THREE.Points` at grid intersections
- Per-point float: `sin(t * speed + phase) * amplitude` (8–33), per-frame size pulse
- `THREE.Fog(0x050508, 500, 1400)` for edge fade + CSS `linear-gradient(to top, var(--background), transparent)` on bottom half

## Supabase Tables
- `profiles` — auto-created on signup via trigger
- `lessons` — 10 seeded calculus lessons (slug, title, description, topic, order, published)
- `user_progress` — per-user lesson completion (user_id, lesson_id, completed, score)
- `saved_glossary_terms` — user-saved terms (user_id, term, saved_at)

## File Map

```
app/
├── layout.tsx              # Root layout (KaTeX CSS, AppShell wrapper, footer)
├── page.tsx                # Landing page (hero, stats, features)
├── globals.css             # Tailwind v4, CSS vars, custom classes, KaTeX overrides
├── lessons/
│   ├── page.tsx            # Roadmap/catalog (3 modules, 10 lessons, milestone UI)
│   └── [slug]/page.tsx     # Individual lesson with LessonSplitView
├── glossary/page.tsx       # Saved terms (auth-gated)
├── dashboard/page.tsx      # Progress dashboard (auth-gated)
├── pricing/page.tsx        # Free/Pro/Premium tiers
├── auth/login/page.tsx     # Magic link sign-in
├── auth/callback/route.ts  # OAuth code exchange
└── api/glossary/saved/route.ts  # CRUD saved terms

components/
├── ui/                     # Primitives: GlassCard, Logo, BadgePill, Modal, StepNav, StepSolverBase, etc.
├── layout/                 # AppShell, Navbar, Sidebar (course/glossary/review modes)
├── glossary/               # glossaryData.ts (27 entries), GlossaryPopup
├── lessons/                # LessonRenderer, RichText, MathBlock, FormulaGrid, QuizCard, etc.
├── interactive/            # 6 "use client" math tools
├── auth/                   # AuthForm, UserButton
├── gamification/           # StickyProgress, StreakCounter
└── review/                 # reviewQuestions.ts (30+ quiz questions)

lib/
├── katex-utils.ts          # renderMath(tex)
├── math-utils.ts           # parseInlineMath(content) → text/math parts
├── constants.ts            # Spring animation presets
├── utils.ts                # cn() — clsx + tailwind-merge
└── supabase/               # admin.ts, client.ts, server.ts

lessons-data/lessons.ts     # 10 lesson definitions with sections (text, math, interactive, quiz)
supabase/migrations/        # Schema + seed data
proxy.ts                    # Auth middleware (not auto-wired as middleware.ts)
