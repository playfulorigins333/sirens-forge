"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DevLogin() {
  const router = useRouter();

  useEffect(() => {
    // Only allow this in Vercel Preview builds
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview") {
      router.push("/");
      return;
    }

    // Create a fake preview-only session
    localStorage.setItem("dev-auth", "true");

    // Redirect straight to the generator
    router.push("/generate");
  }, [router]);

  return (
    <div style={{ padding: 40, fontSize: 24, color: "white" }}>
      Logging in as DEV tester...
    </div>
  );
}
