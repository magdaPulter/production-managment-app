import { Component, Input, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ProductionsItemCounted } from '../../models/productionsItem.model';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [MatCardModule, FormsModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent {
  @Input() item!: ProductionsItemCounted;
  roasted: number = 0;
  editMode: WritableSignal<boolean> = signal(false);

  onEditMode() {
    this.editMode.update((isEdited) => !isEdited);
    this.item = {
      ...this.item,
      roasted: this.roasted,
      left: this.item.planned - this.roasted,
    };
  }
}
