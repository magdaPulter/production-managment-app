import { Component, Input } from '@angular/core';
import { InventoryViewModel } from '../../viewModels/inventory.viewModel';
import { CdkTableModule } from '@angular/cdk/table';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [CdkTableModule],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.scss',
})
export class InventoryTableComponent {
  @Input() tableData!: InventoryViewModel[];
  displayedColumns: string[] = ['ID-Tag', 'Name', 'Weight', 'Edit', 'Delete'];
}
