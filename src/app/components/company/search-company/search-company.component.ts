import { Component, inject, OnInit } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { Company } from '../../../models/Company';
import { CompanyService } from '../../../services/company.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { CompanyInfoComponent } from '../company-info/company-info.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-search-company',
  standalone: true,
  imports: [CardModule, ImageModule, RatingModule, CommonModule, FormsModule, ToastModule, CompanyCardComponent, CompanyInfoComponent, ProgressSpinnerModule, InputTextModule, ButtonModule, InputNumberModule, ReactiveFormsModule],
  providers: [CompanyService, MessageService],
  templateUrl: './search-company.component.html',
  styleUrl: './search-company.component.scss'
})
export class SearchCompanyComponent implements OnInit{
  companies!: Company[];
  companySelected!: Company;
  isCompanieSelected: boolean = false;
  companySelectedId!: number;
  displayLoading: string = "none";
  isDropDownOpen: boolean = false;
  formFilter!: FormGroup;

  private companyService = inject(CompanyService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.formFilter = new FormGroup({
      searchText: new FormControl(''),
      minDistance: new FormControl(''),
      maxDistance: new FormControl('')
    })

    this.companyService.getAll()
    .subscribe({
      next: (companies: Company[]) => {
        this.companies = companies;
      },
      error: () => { this.addErrorMessage('Ocorreu um erro ao buscas as empresas.'); }
    });
  }

  fetchInfoCompany(companyId: number): void
  {
    if (this.companySelectedId != companyId)
    {
      this.displayLoading = "flex";
      this.companySelectedId = companyId;
      this.companyService.get(this.companySelectedId)
      .subscribe({
        next: (company: Company) => {
          this.companySelected = company;
          this.isCompanieSelected = true;
        },
        error: () => { this.addErrorMessage('Não foi possível encontrar a empresa.'); },
        complete: () => { this.displayLoading = "none"; }
      });
    }
  }

  public deselectCompanie(): void {
    this.isCompanieSelected = false;
    this.companySelectedId = 0;
  }

  private addErrorMessage(message: string){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message});
  }

  public fetchDropDownMenu(): void {
    this.isDropDownOpen = !this.isDropDownOpen;
  }
}
