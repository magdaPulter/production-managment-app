import { Component, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent {
  readonly panelOpenState = signal(false);
  @Input() listItems!: OrderModel[];
}
