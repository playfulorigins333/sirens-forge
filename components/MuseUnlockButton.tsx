"use client";

type Props = {
  museId: string;
  unlocked: boolean;
};

export default function MuseUnlockButton({ museId, unlocked }: Props) {
  return (
    <button
      onClick={() => {
        if (!unlocked) {
          console.log("Unlock flow for:", museId);
          window.location.href = `/unlock/${museId}`;
        }
      }}
      className={[
        "mt-4 w-full text-center py-2 rounded-lg text-sm font-semibold transition-all",
        unlocked
          ? "bg-green-700/40 border border-green-500 text-green-300 cursor-default"
          : "bg-fuchsia-700/30 border border-fuchsia-400 hover:bg-fuchsia-700/40 text-fuchsia-200"
      ].join(" ")}
    >
      {unlocked ? "Unlocked ✓" : "Unlock Muse"}
    </button>
  );
}
