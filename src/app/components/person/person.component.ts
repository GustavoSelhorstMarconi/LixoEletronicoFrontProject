import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../../services/person.service';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [ButtonModule, CardModule, CheckboxModule, InputTextModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService, PersonService],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent implements OnInit {
  formPerson!: FormGroup;

  private personService = inject(PersonService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  ngOnInit(): void
  {
      this.formPerson = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        isRepresentant: new FormControl('')
      });
  }

  onSubmit(): void
  {
    let valores = this.formPerson.value;

    if (valores.isRepresentant == "")
    {
      valores.isRepresentant = false;
    }

    this.personService.post(valores)
    .subscribe({
      next: () => { this.messageService.add({ severity: 'success', summary: 'Sucesso.', detail: 'Pessoa cadastrada com sucesso!' }) },
      error: () => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao cadastrar pessoa!' }); }
    })
  }

  public changeToCompany(): void {
    this.router.navigate(['company/register']);
  }
}
