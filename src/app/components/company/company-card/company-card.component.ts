import { Component, Input } from '@angular/core';
import { Company } from '../../../models/Company';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [CardModule, ImageModule, ToastModule, FormsModule, RatingModule],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.scss'
})
export class CompanyCardComponent {
  @Input({required: true}) company!: Company;
}
