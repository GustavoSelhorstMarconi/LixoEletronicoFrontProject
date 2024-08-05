import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../../models/Company';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [CardModule, ImageModule, ToastModule, FormsModule, RatingModule, DecimalPipe],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.scss'
})
export class CompanyCardComponent implements OnInit {
  @Input({required: true}) company!: Company;

  ngOnInit(): void {
    registerLocaleData(localePt);
  }
}
