"use client";

export const PACKAGES = [
  {
    id: "price_1SSHrTFjcWRhhOnzO4GoeACt",
    label: "Vault Starter",
    desc: "Basic personalized muse drop",
  },
  {
    id: "price_1SSHrwFjcWRhhOnzJWKmeLpz",
    label: "Vault Pro",
    desc: "Bigger custom set + faster delivery",
  },
  {
    id: "price_1SSHtNFjcWRhhOnzoGLxbUDv",
    label: "Vault Elite",
    desc: "Maximum personalization + Ultra mode",
  },
];

type Props = {
  selected: string | null;
  onSelect: (id: string) => void;
};

export default function MusePackageSelect({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {PACKAGES.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={[
            "p-4 rounded-xl border text-left",
            selected === p.id
              ? "border-fuchsia-400 bg-fuchsia-400/20"
              : "border-zinc-700 hover:border-fuchsia-300"
          ].join(" ")}
        >
          <div className="text-lg font-bold">{p.label}</div>
          <div className="text-sm text-zinc-300">{p.desc}</div>
        </button>
      ))}
    </div>
  );
}
