import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() tableElementEdited: EventEmitter<InventoryViewModel> =
    new EventEmitter<InventoryViewModel>();
  @Output() tableElementDeleted: EventEmitter<InventoryViewModel> =
    new EventEmitter<InventoryViewModel>();

  displayedColumns: string[] = ['ID-Tag', 'Name', 'Weight', 'Edit', 'Delete'];

  onElementEdit(element: InventoryViewModel) {
    this.tableElementEdited.emit(element);
  }

  onElementRemoved(element: InventoryViewModel) {
    this.tableElementDeleted.emit(element);
  }
}
