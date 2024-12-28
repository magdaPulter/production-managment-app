export interface ProductModel {
  readonly id: string;
  readonly name: string;
  readonly quantity: number;
  readonly weight: number;
  readonly orderId?: string;
}
