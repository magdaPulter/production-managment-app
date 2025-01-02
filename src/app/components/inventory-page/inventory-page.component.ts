import { Component, inject, signal, WritableSignal } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Observable } from 'rxjs';
import { InventoryModel } from '../../models/inventory.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { ModalComponent } from '../modal/modal.component';
import { InventoryFormComponent } from '../inventory-form/inventory-form.component';
import { InventoryTableComponent } from '../inventory-table/inventory-table.component';
import { DeleteContentComponent } from '../delete-content/delete-content.component';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ModalComponent,
    InventoryFormComponent,
    InventoryTableComponent,
    DeleteContentComponent,
  ],
  templateUrl: './inventory-page.component.html',
  styleUrl: './inventory-page.component.scss',
})
export class InventoryPageComponent {
  readonly inventory: WritableSignal<InventoryModel> = signal({
    name: '',
    weight: 0,
  });

  readonly selectedInventory: WritableSignal<InventoryModel> = signal(
    this.inventory()
  );

  readonly inventoryService = inject(InventoryService);

  readonly inventory$: Observable<InventoryModel[]> =
    this.inventoryService.getInventory();

  onDelete(inventory: InventoryModel) {
    if (inventory.id) {
      this.inventoryService.deleteInventory(inventory.id).subscribe();
    }
  }

  createInventory(inventory: InventoryModel) {
    this.inventoryService.createInventory(inventory);
  }

  editInventory(inventory: InventoryModel) {
    this.inventoryService.updateInventory(inventory).subscribe();
  }

  onSelected(inventory: InventoryModel) {
    this.selectedInventory.set(inventory);
  }
}
