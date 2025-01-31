import { ProductModel } from './product.model';

export interface OrderModel {
  readonly id?: string;
  readonly name: string;
  readonly priority: string;
  readonly products: ProductModel[];
}
