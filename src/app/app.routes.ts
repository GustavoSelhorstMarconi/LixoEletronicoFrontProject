import { Routes } from '@angular/router';
import { PersonComponent } from './components/person/person.component';
import { CompanyComponent } from './components/company/company.component';
import { ReviewComponent } from './components/review/review.component';
import { SearchCompanyComponent } from './components/company/search-company/search-company.component';

export const routes: Routes = [
    { path: 'person/register', component: PersonComponent },
    { path: 'company/register', component: CompanyComponent },
    { path: 'company/register', component: CompanyComponent },
    { path: 'review', component: ReviewComponent },
    { path: 'main', component: SearchCompanyComponent},
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: '**', redirectTo: 'main', pathMatch: 'full' }
];
