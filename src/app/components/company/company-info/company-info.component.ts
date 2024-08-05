import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { DividerModule } from 'primeng/divider';
import { Review } from '../../../models/Review';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { Company } from '../../../models/Company';
import { ReviewService } from '../../../services/review.service';
import { MessageService } from 'primeng/api';
import { ReviewComponent } from '../../review/review.component';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [ButtonModule, DividerModule, FormsModule, ImageModule, InputTextareaModule, RatingModule, ReviewComponent],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss'
})
export class CompanyInfoComponent implements OnInit{
  @Input({required: true}) company!: Company;
  @Output() companieSelectedEvent = new EventEmitter<boolean>();
  @Output() calculateReviewAverageEvent = new EventEmitter<number>();

  companieDeselected = false;
  private reviewService = inject(ReviewService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
      // this.getReviewByCompany();
  }

  public setCompanieDeselected(): void {
    this.companieSelectedEvent.emit(this.companieDeselected);
  }

  public reloadReviews(): void {
    this.reviewService.getReviewsByCompany(this.company.id)
      .subscribe({
        next: (reviews: Review[]) => {
          this.company.reviews = reviews;
          this.calculateReviewAverage();
        }
      })
  }

  private addErrorMessage(message: string){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message});
  }

  private calculateReviewAverage(): void {
    let reviews = this.company.reviews;
    let reviewAverage = reviews.length > 0 ? reviews.map(x => x.rating).reduce((a, b) => a + b, 0) / reviews.length : 0;

    this.company.reviewAverage = Math.round(reviewAverage);

    this.calculateReviewAverageEvent.emit(Math.round(reviewAverage));
  }
}
