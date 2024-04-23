import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { DividerModule } from 'primeng/divider';
import { Review } from '../../../models/Review';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { Company } from '../../../models/Company';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [ButtonModule, DividerModule, FormsModule, ImageModule, InputTextareaModule, RatingModule],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss'
})
export class CompanyInfoComponent implements OnInit{
  @Input({required: true}) company!: Company;
  @Output() companieSelectedEvent = new EventEmitter<boolean>();
  Reviews!: Review[];
  companieDeselected = false;

  ngOnInit(): void {
      this.Reviews = [{id: 0, rating: 5, personName: 'Testando', comment: 'Empresa legal', personId: 0, companyId: 0},
      {id: 0, rating: 3, personName: 'Nome teste', comment: 'Empresa boa', personId: 0, companyId: 0}];
  }

  public setCompanieDeselected(): void {
    this.companieSelectedEvent.emit(this.companieDeselected);
  }
}
