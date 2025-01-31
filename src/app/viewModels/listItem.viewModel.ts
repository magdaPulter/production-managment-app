import { ProductViewModel } from './product.viewModel';

export interface ListItemViewModel {
  readonly id?: string;
  readonly name: string;
  readonly priority: string;
  readonly products: ProductViewModel[];
}
