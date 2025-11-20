"use client";

import { useState } from "react";
import MusePackageSelect from "@/components/MusePackageSelect";
import { PACKAGES } from "@/components/MusePackageSelect";

export default function ForgePayStep({ museId }: { museId: string }) {
  const [pkg, setPkg] = useState<string | null>(null);

  async function handleCheckout() {
    if (!pkg) return alert("Select a package first");

    const res = await fetch("/api/muse/checkout", {
      method: "POST",
      body: JSON.stringify({
        museId,
        packageId: pkg,
        successUrl: `${window.location.origin}/forge/success`,
        cancelUrl: `${window.location.origin}/forge/cancel`,
      }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="flex flex-col gap-6 mt-8">
      <MusePackageSelect selected={pkg} onSelect={setPkg} />

      <button
        onClick={handleCheckout}
        className="px-6 py-3 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-600 text-black font-bold"
      >
        Continue to Checkout
      </button>
    </div>
  );
}
