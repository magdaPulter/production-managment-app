export interface InventoryModel {
  readonly name: string;
  readonly weight: number;
  readonly batchLost: number;
  readonly id?: string;
}
