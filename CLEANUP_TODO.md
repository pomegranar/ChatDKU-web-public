# Codebase Cleanup TODO

Goal: make the frontend more human-readable — smaller source files, shallower JSX
nesting, less dead code, consistent style. Each item below includes the context
needed to act on it. Ordered roughly by impact.

Audit date: 2026-05-27. Line numbers reflect the tree at that time and may drift.

---

## 1. Split the landing page — `app/page.tsx` (710 lines)

**Context:** The home/landing page is a single 710-line client component. It mixes
a complex `useEffect` block of YouTube IFrame API player logic (lines ~69–155) with
~7 large marketing sections (Hero, Partner Logos, Solution, Architecture, Agent Flow,
SeekBench, Roadmap, CTA, Footer), each holding inline data arrays mapped into JSX.

**Why it hurts readability:** You cannot scan the page structure; every section is
fully inlined. The YouTube player logic is dead weight (see item #2).

**Suggested change:**
- Extract each `<section>` into its own component under `app/_components/landing/`
  or `components/landing/` (e.g. `HeroSection`, `ArchitectureSection`, `AgentFlowSection`,
  `SeekBenchSection`, `RoadmapSection`, `CtaSection`, `LandingFooter`, `LandingNav`).
- Move the inline section data arrays (arch layers, agent steps, roadmap items,
  seekbench metrics, solution bullets) into a `landing-content.ts` data module, keyed
  by i18n keys.
- `NavLinks` (lines 32–63) can move to its own file too.
- Target: `page.tsx` becomes a thin composition (~40 lines).

## 2. Remove dead YouTube IFrame player code — `app/page.tsx` lines 69–155, 232–241

**Context:** A large `useEffect` builds a YouTube IFrame API player (`iframeRef`,
`YTPlayer`/`YTApi` interfaces, looping/seek logic, `END_SECONDS = 112`). But the actual
`<iframe>` is fully commented out (lines 232–241) and replaced by a plain `<video>`
element. So `iframeRef` is never attached to a live element and the entire effect is dead.

**Suggested change:** Delete the `useEffect` (69–155), the `iframeRef` ref, the commented
`<iframe>` block (232–241), and the now-unused `useEffect`/`useRef` imports. Keep the
`<video>` element.

## 3. Remove large commented-out JSX blocks — `app/page.tsx`

**Context:** `app/page.tsx` has 68 `{/* ... */}` occurrences. Besides the iframe, there's
a fully commented-out "The Problem" section (lines ~278–320) and a commented roadmap
subtitle (623–625). These bloat the file and confuse readers about what renders.

**Suggested change:** Delete commented-out sections. If "The Problem" section is wanted
later, recover from git history rather than keeping it commented in source.

---

## 4. Decompose the campus map — `components/campus-map.tsx` (551 lines)

**Context:** Single client component rendering three things at once: a desktop map view
with absolutely-positioned markers + an info popover (lines ~270–395), a list view with
per-item cards (397–527), and a mobile modal (`MapModal`). The list-rendering JSX nests
~10 indentation levels deep (building vs office/printer branches each duplicate
name/description/hours/location markup). Lots of repeated
`selectedMarker.items[currentIndex].X` access.

**Why it hurts readability:** The deepest nesting in the codebase. The building and
office/printer card branches are near-duplicates of each other.

**Suggested change:**
- Extract `MapView` (marker layer + selected-marker popover), `ListView`, and a single
  `ResourceCard` component that handles building/office/printer variants via props.
- Pull the `selectedMarker.items[currentIndex]` into a local `const activeItem`.
- Extract the `finalListItems` derivation (lines 186–221) into a helper function
  `buildListItems(selectedType, markers, extraOfficeItems)`.

## 5. De-duplicate the mobile-detection hook — `components/campus-map.tsx` lines 25–34

**Context:** `campus-map.tsx` defines its own `useIsMobile` (resize listener on
`window.innerWidth <= 768`). The repo already has `hooks/use-media-query.ts`
(`useMediaQuery`, SSR-safe via `useSyncExternalStore`), used by `components/ui/combobox.tsx`.

**Suggested change:** Delete the local `useIsMobile` and use
`useMediaQuery("(max-width: 768px)")` from `@/hooks/use-media-query`. SSR-safe and avoids
duplicate logic.

---

## 6. Disabled chat-history feature carries dead machinery — `components/side.tsx` (342 lines)

**Context:** The sidebar's chat-history section is intentionally disabled in the UI
(`opacity-50 cursor-not-allowed`, `pointer-events-none`, wrapped in a "history disabled"
tooltip — lines ~230–305). Yet the component still runs a full debounced search effect
that lazily fetches + indexes message contents (`messagesIndex`, `searchResults`,
`getSessionMessages`, 250ms debounce — lines 87–138). None of it is reachable by users.

**Why it hurts readability:** ~70 lines of non-trivial state + effects sit inline in the
sidebar for a feature that is currently disabled but intended to return.

**Do NOT remove this — it is a disabled feature being preserved.** The goal here is purely
readability, not deletion.

**Suggested change (extraction only):** Move the whole history block — the debounced search
effect, `messagesIndex`/`searchResults`/`searchQuery` state, and the disabled history JSX —
into a dedicated `ChatHistoryPanel` component (kept disabled exactly as-is). `side.tsx` then
just renders `<ChatHistoryPanel />` and stays readable. Leave a clear comment/issue link
noting the feature is intentionally disabled pending re-enablement. Keep all behavior intact.

## 7. Sidebar conditionals & nesting — `components/side.tsx`

**Context:** Several rough edges in `side.tsx`. Note that the delete-related ones below are
part of the **disabled chat-history delete affordance**, so they must be preserved, not
removed (they move with the history block in item #6):
- Line 151: `if (false) { onNewChat(); }` — placeholder branch inside
  `handleDeleteConversation` (chat-history delete; **preserve**).
- Line 259: `false && "bg-sidebar-accent"` passed to `cn()` — active-conversation highlight
  placeholder in the history list (chat-history; **preserve**).
- Lines 140–144: `openDeleteDialog` is currently unused (suppressed with an eslint-disable
  comment: "wired for a delete affordance not yet exposed") — part of chat-history delete;
  **preserve**.
- Line 155: `alert("Delete failed")` — part of chat-history delete; **preserve** the
  behavior. (If touched during the item #6 extraction, it could later use the app's `sonner`
  toast for consistency — but that's optional polish, not removal.)
- Nested `TooltipProvider` (line 160 wraps everything, line 230 wraps again) — this is the
  one safe structural cleanup here.

**Suggested change:** Leave the chat-history delete code intact (carry it into the
`ChatHistoryPanel` extraction from item #6). The only removal that's in scope is the
redundant inner `TooltipProvider` at line 230, since the outer one at line 160 already
provides context.

---

## 8. `lib/convos.ts` currently-unused exports are disabled-feature APIs — preserve

**Context:** A usage scan shows several exports are not imported anywhere right now:
- `getNewSession`, `getCurrentSessionId`, `setCurrentSessionId`, `clearSessionId`,
  `getConversations` — these are the session / **chat-history** API surface.
- `clearStoredEndpoint` — part of the **model-selection** (API endpoint) surface.

Still in use: `getSessionMessages` (2), `getStoredEndpoint` (4), `setStoredEndpoint` (2),
`deleteConversation` (2).

**Do NOT remove these.** They are the backing API for the disabled chat-history and
model-selection features and must be preserved for when those features are re-enabled.

**Suggested change:** No deletion. Optional readability-only improvement: group these
exports under a clearly labeled `// Chat history (currently disabled)` / `// Model
selection endpoint` section header within the file, and/or keep them co-located with the
`ChatHistoryPanel` extraction (item #6) so their purpose is obvious. Behavior unchanged.

## 9. Fix misleading comments in `lib/convos.ts`

**Context:** Functions store/read **cookies** (`setCookie`/`getCookie`/`deleteCookie`,
lines 32–50) but the doc comments say "Store session_id in localStorage" (line 75) and
"Get the current session ID from storage". Also `console.log("New session created and
stored:", sessionId)` (line 77) — a debug log left in.

**Suggested change:** Correct the comments to say "cookie", and remove the `console.log`.

---

## 10. Move long mock response strings out of the chat API route — `app/api/chat/route.ts` (233 lines)

**Context:** The route embeds a `MOCK_RESPONSES` array of multi-paragraph markdown strings
(dev-mode mock answers about course registration, CR/NC grading, etc.) starting ~line 60.
These dominate the file and bury the actual auth/proxy logic (`getJwt`, token caching).

**Suggested change:** Move `MOCK_RESPONSES` into `lib/mock-responses.ts` (or a `.md`-backed
data module) and import it. Keeps the route focused on request handling.

---

## 11. Normalize indentation — tabs vs spaces (repo-wide)

**Context:** Indentation is mixed. 33 files use tab indentation while ~31 files use spaces
(notably most of `components/ui/*`, several `app/api/*` routes, `app/team-credits/page.tsx`,
`lib/i18n/index.ts`, `app/chat/page.tsx`, `app/landing/page.tsx`). This is inconsistent even
within sibling files.

**Suggested change:** Pick one (the majority of hand-written app code uses tabs) and add a
Prettier config + `.editorconfig` to enforce it, then run a one-time format pass. Do this as
its own commit so it doesn't pollute logical diffs.

---

## 12. Clean up redirect-only and tiny route files (low priority)

**Context:** `app/chat/page.tsx` → redirects to `/app`; `app/landing/page.tsx` → redirects
to `/login`. These are fine as redirects but use space indentation inconsistent with the
rest. `app/app/page.tsx` (the real chat app) lives at `/app` while the redirect stubs point
around it — the routing map is slightly confusing (`/`, `/app`, `/chat`, `/landing`, `/dev`).

**Suggested change:** Low priority. Confirm the redirects are still needed (old bookmarks?).
Document the route map in the README so the `/`, `/app`, `/chat`, `/landing`, `/dev` split is
clear to newcomers.

---

## 13. Consistent component export style (low priority)

**Context:** Some components export both a named and a default export of the same thing
(e.g. `components/chat-page.tsx` ends with `export default ChatPage` plus the named
`export function ChatPage`; `components/about.tsx` similar). Others are default-only
(`Side`, `CampusMap`) or named-only. Imports across the app are inconsistent as a result.

**Suggested change:** Standardize on named exports for components (easier to grep/refactor),
or document the convention. Low priority — mechanical but touches many import sites.

---

## Notes / coordination

- **Disabled features are off-limits for deletion.** Chat history (items #6, #7, #8), file
  uploads, and model selection are intentionally disabled but being kept for re-enablement.
  Any work on them is readability-only (extraction, section labels, comments) — never
  removal of state, effects, handlers, exports, or JSX.
- Items #6, #7, and #8 overlap (the disabled chat-history feature). Do #6 (extract into
  `ChatHistoryPanel`) first; the relevant parts of #7 and #8 travel with it.
- Items #1, #2, #3 are all in `app/page.tsx`; do #2 and #3 (deletions of the dead YouTube
  player and commented-out landing JSX — unrelated to any disabled feature) before #1 (the
  split) so you split less code.
- Do the indentation pass (#11) as an isolated commit to keep review diffs clean.
