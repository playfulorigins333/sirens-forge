"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabaseAuth";

interface UseProtectedUserOptions {
  allowReset?: boolean;
}

export function useProtectedUser(options: UseProtectedUserOptions = {}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  useEffect(() => {
    let isMounted = true;

    const syncUser = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      let currentUser = data.user ?? null;

      if (!currentUser) {
        if (pathname !== "/login") {
          router.replace("/login");
        }
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      if (!currentUser.user_metadata?.first_login) {
        await supabase.auth.updateUser({
          data: {
            ...currentUser.user_metadata,
            first_login: new Date().toISOString(),
          },
        });
        const refreshed = await supabase.auth.getUser();
        currentUser = refreshed.data.user ?? currentUser;
      }

      const requiresReset = currentUser.user_metadata?.password_reset_required;
      if (requiresReset && !options.allowReset) {
        if (pathname !== "/auth/reset") {
          router.replace("/auth/reset");
        }
        if (isMounted) {
          setUser(currentUser);
          setLoading(false);
        }
        return;
      }

      if (isMounted) {
        setUser(currentUser);
        setLoading(false);
      }
    };

    syncUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      syncUser();
    });

    return () => {
      isMounted = false;
      subscription?.subscription.unsubscribe();
    };
  }, [options.allowReset, pathname, router, supabase]);

  return { user, loading };
}
