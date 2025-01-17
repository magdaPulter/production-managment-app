import { Component } from '@angular/core';
import { ProductionComponent } from '../production/production.component';

@Component({
  selector: 'app-production-page',
  standalone: true,
  imports: [ProductionComponent],
  templateUrl: './production-page.component.html',
  styleUrl: './production-page.component.scss',
})
export class ProductionPageComponent {}
