import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { RatingModule } from 'primeng/rating';
import { ReviewService } from '../../services/review.service';
import { ToastModule } from 'primeng/toast';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ButtonModule, CardModule, InputTextareaModule, RatingModule, ReactiveFormsModule, ToastModule],
  providers: [ReviewService, MessageService],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {
  @Input({required: true}) companyId!: Number;
  @Output() reviewAdded = new EventEmitter<boolean>();
  userIsLogged!: boolean;
  
  formReview!: FormGroup;

  private reviewService = inject(ReviewService);
  private messageService = inject(MessageService);
  private localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.userIsLogged = localStorage.getItem('auth') != null;

    this.localStorageService.storage$
      .subscribe(() => {
        this.userIsLogged = localStorage.getItem('auth') != null;
      })

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

    valores.companyId = this.companyId;
    valores.personId = 1;

    this.reviewService.post(valores)
      .subscribe({
        next: () => {
          this.reviewAddedEmissor();
          this.formReview.reset();
          this.messageService.add({ severity: 'success', summary: 'Sucesso.', detail: 'Review criada com sucesso!' });
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: 'Error.', detail: 'Erro ao cadastrar review!' });
        },
      });
  }

  private reviewAddedEmissor(): void {
    this.reviewAdded.emit(true);
  }
}
