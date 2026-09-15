export type SimplePrice = Record<string, Price>;

export interface Price {
  eur: number;
  usd: number;
}
