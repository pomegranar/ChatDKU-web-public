# TODO — NetID (Shibboleth SSO) auth implementation

Tracks gaps in the uncommitted NetID/guest dual-auth work.
Files involved: `app/login/page.tsx`, `app/auth/callback/page.tsx`,
`app/api/chat/route.ts`, `.env.local.example`.

## Done
- [x] **Suspense boundary on `/auth/callback`** — `useSearchParams()` was used
  without a `<Suspense>` wrapper, which broke `next build`
  (verified: `next build` exited 1, "useSearchParams() should be wrapped in a
  suspense boundary at page /auth/callback"). Fixed by extracting the logic into
  an inner component wrapped in `<Suspense>`. Build now passes (21/21 pages).

## Open

### 1. `chatdku_display_name` is written but never read
- Set in `app/auth/callback/page.tsx` (NetID only; guest login never sets it).
- No component reads it (grep for `chatdku_display_name` / `display_name`
  finds zero consumers).
- Decide: either surface the signed-in user's name in the UI (e.g. header/menu)
  or remove the cookie write as dead data.

### 2. No mid-session 401 / token-expiry handling on the NetID chat path
- Guest path (`app/api/chat/route.ts`) clears its cached service JWT and
  **retries once** on 401/403/400.
- NetID path just streams the backend's error status back into the chat bubble
  as raw text (e.g. "NetID backend error: Unauthorized").
- The user-specific JWT can't be refreshed server-side, so the right behavior is
  probably: detect 401 → clear cookies → redirect to `/login` (re-SSO).
- Note: cookie expiry is derived from the JWT `exp`, so an expired token usually
  disappears and the `/app` guard catches it on next load — the unhandled case
  is expiry *during* an active session.

### 3. No logout path
- There is no logout anywhere in the app (pre-existing, but more relevant now).
- A NetID user can't clear `chatdku_token` / `chatdku_auth_type` /
  `chatdku_display_name` to sign out or switch back to guest (matters on shared
  machines).

### 4. JWT delivered via URL query string (backend-side design)
- Django redirects to `/auth/callback?token=<JWT>&display_name=<name>`.
- Tokens in URLs leak into browser history, server access logs, and `Referer`
  headers. The token is then stored in a JS-readable cookie (XSS-exposed), same
  as the guest token.
- Consider POST body or a backend-set `HttpOnly` cookie instead. Constrained by
  the Shibboleth flow, so this is a backend coordination item.

## Minor / optional
- `messages`/`history` normalization is duplicated between the NetID and guest
  paths in `app/api/chat/route.ts` — could be factored into a helper.
