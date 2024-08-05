import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { PersonService } from '../../../services/person.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginReturn } from '../../../models/LoginReturn';
import { LocalStorageService } from '../../../services/local-storage.service';
import { nextTick } from 'process';
import { Person } from '../../../models/Person';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CardModule, CheckboxModule, InputTextModule, PasswordModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService, PersonService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  formLogin: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  loginReturn!: LoginReturn;
  iconShowPassword: boolean = true;

  private authService = inject(AuthService);
  private personService = inject(PersonService);
  private messageService = inject(MessageService);
  private storageService = inject(LocalStorageService);
  private router = inject(Router);

  ngOnInit(): void
  {
      // this.formLogin = new FormGroup({
      //   username: new FormControl(''),
      //   password: new FormControl('')
      // });
  }

  public onSubmit(): void {
    let values = this.formLogin.value;

    this.authService.login(values)
      .subscribe({
        next: (loginReturn: LoginReturn) => {
          this.loginReturn = loginReturn;
          this.setAuthLocalStorage(this.loginReturn);
          this.messageService.add({ severity: 'success', summary: 'Sucesso.', detail: 'Login realizado com sucesso!' });

          this.personService.get()
            .subscribe({
              next: (person: Person) => {
                localStorage.setItem('user-info', JSON.stringify(person));
              },
              error: (error) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message }); }
            });
          
          setTimeout(() => {
            this.router.navigate(['/main']);
          }, 500);
          
        },
        error: () => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Não foi possível logar!' }); }
      });
  }

  public changeToRegister(): void {
    this.router.navigate(['/auth/register'])
  }

  public setAuthLocalStorage(authInfo: LoginReturn): void {
    let authInfoString = JSON.stringify(authInfo);

    localStorage.setItem('auth', authInfoString);
    this.storageService.setStorageValue(authInfoString);
  }
}
