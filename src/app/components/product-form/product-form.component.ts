import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductViewModel } from '../../viewModels/product.viewModel';
import { ProductValue } from '../../utils';
import { TitleViewModel } from '../../viewModels/title.viewModel';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  public product: ProductViewModel = {
    name: '',
    quantity: 1,
    orderId: '',
    value: ProductValue.QUARTER,
  };
  readonly productValues: number[] = [ProductValue.QUARTER, ProductValue.WHOLE];
  @Input() titles!: TitleViewModel[];
  @Output() productEmitted: EventEmitter<ProductViewModel> =
    new EventEmitter<ProductViewModel>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.productEmitted.emit(this.product);
      this.product = {
        name: '',
        quantity: 1,
        orderId: '',
        value: ProductValue.QUARTER,
      };
    }
  }
}
