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
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [ButtonModule, CardModule, FileUploadModule, InputTextModule, ToastModule, ReactiveFormsModule, InputNumberModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
  providers: [CompanyService, MessageService],
})
export class CompanyComponent implements OnInit {
  formCompany!: FormGroup;
  formAddress!: FormGroup;
  company!: Company;
  imageBytes!: Blob;

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
        address: this.formAddress,
        image: new FormControl(null)
      }
    );
  }

  onSubmit(): void
  {
    let valores = this.formCompany.value;

    valores.representantId = 1;
    valores.logo = this.imageBytes;

    this.companyService.getLatitudeLongitude(valores)
    .subscribe({
      next: (addressReturn: any) => {
        if (addressReturn)
        {
          valores.address.latitude = addressReturn[0].lat;
          valores.address.longitude = addressReturn[0].lon;

          this.companyService.post(valores)
          .subscribe({
            next: () => { this.messageService.add({ severity: 'success', summary: 'Sucesso.', detail: 'Empresa cadastrada com sucesso!' }); },
            error: () => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao cadastrar empresa!' }) }
          })
        }
      },
      error: () => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao buscar endereço!' }) }
    });
  }

  public uploadImage(event: any): void {
    let file = event.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageBytes = e.target.result.split('base64,')[1];
    };
    reader.readAsDataURL(file);
  }
}
