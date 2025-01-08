import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryViewModel } from '../../viewModels/inventory.viewModel';
import { CdkTableModule } from '@angular/cdk/table';
import { IdTagPipe } from '../../pipes/id-tag.pipe';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [CdkTableModule, IdTagPipe],
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
