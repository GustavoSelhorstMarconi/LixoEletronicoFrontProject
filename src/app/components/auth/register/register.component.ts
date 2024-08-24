import { Component, InjectionToken, OnInit, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonService } from '../../../services/person.service';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../services/auth.service';
import { ValidatorHelper } from '../../../helpers/validator-helper';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Person } from '../../../models/Person';
import { LoginReturn } from '../../../models/LoginReturn';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonModule, CardModule, CheckboxModule, InputTextModule, PasswordModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService, PersonService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  iconShowPassword: boolean = true;
  iconShowConfirmPassword: boolean = true;
  textSaveButton: string = 'Cadastrar';

  formOptions: AbstractControlOptions = {
    validators: ValidatorHelper.mustMatchField('password', 'confirmPassword')
  };
  formPerson: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    isRepresentant: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  },
  this.formOptions);
  formLogin: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  
  private personService = inject(PersonService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private storageService = inject(LocalStorageService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  ngOnInit(): void
  {
    let userInfo = localStorage.getItem('user-info');

    if (userInfo != null)
    {
      let userInfoValues = JSON.parse(userInfo);

      this.formPerson.patchValue({
        name: userInfoValues.name,
        email: userInfoValues.email,
        isRepresentant: userInfoValues.isRepresentant,
      });

      this.textSaveButton = 'Salvar';
    }

    this.localStorageService.storage$.subscribe(() => {
      this.checkChangeUserInfo();
    })
  }

  onSubmit(): void
  {
    let valores = this.formPerson.value;

    if (valores.isRepresentant == "")
    {
      valores.isRepresentant = false;
    }

    if (localStorage.getItem('user-info') == null)
    {
      this.register(valores);
    }
    else
    {
      this.updatePerson(valores);
    }
  }

  public changeToLogin(): void {
    this.router.navigate(['/auth/login'])
  }

  private checkChangeUserInfo(): void {
    if (localStorage.getItem('user-info') == null)
    {
      this.formPerson.reset();
      this.textSaveButton = 'Cadastrar';
    }
    else
    {
      this.textSaveButton = 'Salvar';
    }
  }

  private register(person: Person): void {
    this.authService.register(person)
    .subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso.', detail: 'Pessoa cadastrada com sucesso!' });

        this.loginAfterCreateAccount();
      },
      error: (error) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: `Erro ao cadastrar pessoa!\n ${error.error.message} `}); }
    })
  }

  private updatePerson(person: Person): void {
    this.authService.put(person)
    .subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso.', detail: 'Usuário atualizado com sucesso!' });
        
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 500);
      },
      error: (error) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: `Erro ao atualizar usuário!\n ${error.error.message} `}); }
    })
  }

  public setAuthLocalStorage(authInfo: LoginReturn): void {
    let authInfoString = JSON.stringify(authInfo);

    localStorage.setItem('auth', authInfoString);
    this.storageService.setStorageValue(authInfoString);
  }

  private loginAfterCreateAccount(): void {
    this.formLogin.setValue({
      username: this.formPerson.get('name')?.value,
      password: this.formPerson.get('password')?.value
    })

    this.authService.login(this.formLogin.value)
    .subscribe({
      next: (loginReturn: LoginReturn) => {;
        this.setAuthLocalStorage(loginReturn);
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
}
