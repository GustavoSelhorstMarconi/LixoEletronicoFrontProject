import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { RatingModule } from 'primeng/rating';
import { ReviewService } from '../../services/review.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ButtonModule, CardModule, InputTextareaModule, RatingModule, ReactiveFormsModule, ToastModule],
  providers: [ReviewService, MessageService],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {
  formReview!: FormGroup;

  private reviewService = inject(ReviewService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.formReview = new FormGroup({
      rating: new FormControl(''),
      comment: new FormControl('')
    });  
  }

  onSubmit(): void {
    let valores = this.formReview.value;

    if (valores.rating == null || valores.rating == "")
    {
      valores.rating = 0;
    }

    valores.companyId = 1;
    valores.personId = 1;

    this.reviewService.post(valores)
      .subscribe({
        next: () => { this.messageService.add({ severity: 'success', summary: 'Sucesso.', detail: 'Review criada com sucesso!' }); },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: 'Error.', detail: 'Erro ao cadastrar review!' });
          console.log(error);
        },
      });
  }
}
