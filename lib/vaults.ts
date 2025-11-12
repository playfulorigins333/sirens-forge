// lib/vaults.ts
import bundle from '@/public/data/prompt_erotique_dev_bundle.json';

export type VaultID = `vault_${string}`;
export type VaultMode = 'sfw' | 'nsfw' | 'ultra';

export interface Vault {
  id: number;
  key: VaultID;
  name: string;
  tags: {
    sfw: string[];
    nsfw: string[];
    ultra: string[];
  };
}

const VAULT_INDEX = bundle.vault_index as Record<VaultID, string>;

export const VAULTS: Vault[] = Object.entries(VAULT_INDEX).map(([key, name]) => {
  const id = parseInt(key.replace('vault_', '').padStart(2, '0'));
  return {
    id,
    key: key as VaultID,
    name,
    tags: {
      sfw: [], // fill from MD later
      nsfw: [],
      ultra: []
    }
  };
});

export const getVault = (id: number): Vault | undefined =>
  VAULTS.find(v => v.id === id);

export const searchVaults = (query: string): Vault[] =>
  VAULTS.filter(v =>
    v.name.toLowerCase().includes(query.toLowerCase()) ||
    v.id.toString().includes(query)
  );

export const getVaultName = (id: number): string =>
  getVault(id)?.name || `Vault ${id}`;