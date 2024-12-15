import { Component, inject } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { Observable } from 'rxjs';
import { InventoryModel } from '../../models/inventory.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [
    TextFieldModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './inventory-page.component.html',
  styleUrl: './inventory-page.component.scss',
})
export class InventoryPageComponent {
  inventory = {
    name: '',
    weight: 0,
  };
  inventoryService = inject(InventoryService);

  inventory$: Observable<InventoryModel[]> =
    this.inventoryService.getInventory();

  onDelete(inventory: InventoryModel) {
    if (inventory.id) {
      this.inventoryService.deleteInventory(inventory.id);
    }
  }
  onSubmit() {
    this.inventoryService.createInventory(this.inventory);
  }
}
