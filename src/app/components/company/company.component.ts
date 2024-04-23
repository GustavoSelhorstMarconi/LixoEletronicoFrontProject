import { Component, OnInit, inject } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Company } from '../../models/Company';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [ButtonModule, CardModule, InputTextModule, ToastModule, ReactiveFormsModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
  providers: [CompanyService, MessageService],
})
export class CompanyComponent implements OnInit {
  formCompany!: FormGroup;
  formAddress!: FormGroup;
  company!: Company;

  private companyService = inject(CompanyService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  ngOnInit() {
    this.formAddress = new FormGroup({
      number: new FormControl(''),
      street: new FormControl(''),
      district: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl('')
    });

    this.formCompany = new FormGroup(
      {
        name: new FormControl(''),
        address: this.formAddress
      }
    );
  }

  onSubmit(): void
  {
    let valores = this.formCompany.value;
    console.log(valores)

    valores.representantId = 1;

    this.companyService.post(valores)
    .subscribe({
      next: () => { this.messageService.add({ severity: 'success', summary: 'Sucesso.', detail: 'Empresa cadastrada com sucesso!' }); },
      error: () => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao cadastrar empresa!' }) }
    })
  }

  public changeToPerson(): void {
    this.router.navigate(['person/register']);
  }

  public changeToReview(): void {
    this.router.navigate(['review']);
  }
}
