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
import { DomSanitizer } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-search-company',
  standalone: true,
  imports: [CardModule, DialogModule, ImageModule, RatingModule, CommonModule, FormsModule, ToastModule, CompanyCardComponent, CompanyInfoComponent, ProgressSpinnerModule, InputTextModule, ButtonModule, InputNumberModule, ReactiveFormsModule],
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
  formStreetSearch!: FormGroup;
  handleBaseAddressModal: boolean = false;

  private companyService = inject(CompanyService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.formFilter = new FormGroup({
      Name: new FormControl(''),
      MinDistance: new FormControl(null),
      MaxDistance: new FormControl(null),
      LatitudeBase: new FormControl(0),
      LongitudeBase: new FormControl(0)
    });

    this.formStreetSearch = new FormGroup({
      state: new FormControl(''),
      city: new FormControl(''),
      district: new FormControl(''),
      street: new FormControl(''),
      number: new FormControl(null)
    });

    this.getAllCompanies();
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
          if (company.logoRetorno)
          {
            company.logoLoaded = 'data:image/jpg;base64,' + company.logoRetorno;
            // x.logoLoaded = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + x.logoRetorno);
          }

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

  public showBaseAddressModal(): void
  {
    this.handleBaseAddressModal = true;
  }

  public getAllCompanies(): void {
    this.deselectCompanie();
    let filter = this.formFilter.value;
    
    this.companyService.getAll(filter)
    .subscribe({
      next: (companies: Company[]) => {
        companies.forEach(x => {
          if (x.logoRetorno)
          {
            x.logoLoaded = 'data:image/jpg;base64,' + x.logoRetorno;
            // x.logoLoaded = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + x.logoRetorno);
          }
        });
        this.companies = companies;
      },
      error: () => { this.addErrorMessage('Ocorreu um erro ao buscas as empresas.'); }
    });
  }

  public getCoordinatesBaseAddress(): void {
    let baseStreet = this.formStreetSearch.value;

    this.companyService.getCoordinatesBaseAddress(baseStreet)
    .subscribe({
      next: (addressReturn: any) => {
        if (addressReturn)
        {
          this.formFilter.patchValue({ 
            LatitudeBase: addressReturn[0].lat,
            LongitudeBase: addressReturn[0].lon
          });

          this.getAllCompanies();
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Endereço não encontrado!' })
        }
      },
      error: () => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao buscar endereço!' }) },
      complete: () => { this.handleBaseAddressModal = false; }
    });
  }

  public changeReviewAverage(average: number): void {
    this.companies.filter(x => x.id == this.companySelectedId)[0].reviewAverage = average;
  }
}
