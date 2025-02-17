export interface ProductionsItem {
  readonly name: string;
  readonly orderedWeight: number;
  readonly inStockWeight: number;
  readonly batchLost: number;
}

export interface ProductionsItemSummary extends ProductionsItem {
  readonly planned: number;
  readonly roasted: number;
  readonly left: number;
}
