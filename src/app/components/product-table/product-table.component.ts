import { CdkTableModule } from '@angular/cdk/table';
import { Component, Input } from '@angular/core';
import { ProductSumQueryModel } from '../../query-models/product-sum.queryModel';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CdkTableModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {
  @Input() tableData!: ProductSumQueryModel[];

  displayedColumns: string[] = ['No.', 'Name', 'Quantity', 'Orders'];
}
