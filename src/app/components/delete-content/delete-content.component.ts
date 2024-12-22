import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-delete-content',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './delete-content.component.html',
  styleUrl: './delete-content.component.scss',
})
export class DeleteContentComponent {
  @Input() label!: string;
  @Output() deleteEmitted: EventEmitter<void> = new EventEmitter<void>();

  onDelete() {
    this.deleteEmitted.emit();
  }
}
