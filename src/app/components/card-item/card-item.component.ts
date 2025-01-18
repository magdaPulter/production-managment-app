import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent {}
