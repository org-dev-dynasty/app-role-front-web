export const REGIONS = {
  ZONA_SUL: 'ZONA_SUL',
  ZONA_NORTE: 'ZONA_NORTE',
  ZONA_LESTE: 'ZONA_LESTE',
  ZONA_OESTE: 'ZONA_OESTE',
  ABC_PAULISTA: 'ABC_PAULISTA',
  OUTROS: 'OUTROS',
} as const;

export const regionKeys = Object.values(REGIONS);

export type Region = (typeof regionKeys)[number];

export const regionMap = {
  [REGIONS.ZONA_SUL]: 'Zona Sul',
  [REGIONS.ZONA_NORTE]: 'Zona Norte',
  [REGIONS.ZONA_LESTE]: 'Zona Leste',
  [REGIONS.ZONA_OESTE]: 'Zona Oeste',
  [REGIONS.ABC_PAULISTA]: 'ABC Paulista',
  [REGIONS.OUTROS]: 'Outros',
} as const;

export const regionFields = regionKeys.map((regionKey) => {
  const label = regionMap[regionKey];
  return {
    value: regionKey,
    label,
  };
});
