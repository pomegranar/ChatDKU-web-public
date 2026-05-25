"use client";

/**
 * /auth/callback
 *
 * Landing page after a successful Shibboleth SSO login on the on-prem server.
 * The on-prem Django view redirects here with ?token=<JWT>&display_name=<name>.
 *
 * This page stores the token in a cookie and forwards the user to /app.
 */

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Loader2 className="animate-spin w-8 h-8" />
        <p className="text-sm">Signing you in…</p>
      </div>
    </div>
  );
}

function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    const displayName = params.get("display_name") ?? "";

    if (token) {
      // Work out cookie expiry from the JWT payload (no signature check needed
      // here — the Django backend will reject invalid tokens when they're used).
      let expires: number | Date = 1; // default: 1 day
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp) {
          expires = new Date(payload.exp * 1000);
        }
      } catch {
        // malformed token — still store it and let the backend reject it
      }

      Cookies.set("chatdku_token", token, { expires });
      Cookies.set("chatdku_auth_type", "netid", { expires });
      Cookies.set("terms_accepted", "true", { expires: 60 });
      if (displayName) {
        Cookies.set("chatdku_display_name", displayName, { expires });
      }
    }

    router.replace("/app");
  }, [params, router]);

  return <Spinner />;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <AuthCallback />
    </Suspense>
  );
}
