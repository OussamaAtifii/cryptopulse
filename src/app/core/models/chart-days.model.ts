export enum ChartDays {
  OneDay = '1',
  SevenDays = '7',
  ThirtyDays = '30',
  OneYear = '365',
}

export const ChartDaysLabel: Record<ChartDays, string> = {
  [ChartDays.OneDay]: '24h',
  [ChartDays.SevenDays]: '7d',
  [ChartDays.ThirtyDays]: '30d',
  [ChartDays.OneYear]: '1y',
};
