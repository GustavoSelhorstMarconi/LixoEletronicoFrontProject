import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { CompanyComponent } from './components/company/company.component';
import { ReviewComponent } from './components/review/review.component';
import { SearchCompanyComponent } from './components/company/search-company/search-company.component';
import { authGuard } from './auth-guard.guard';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
    { path: 'auth/register', component: RegisterComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'company/register', component: CompanyComponent, canActivate: [authGuard] },
    { path: 'review', component: ReviewComponent },
    { path: 'main', component: SearchCompanyComponent },
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: '**', redirectTo: 'main', pathMatch: 'full' }
];
