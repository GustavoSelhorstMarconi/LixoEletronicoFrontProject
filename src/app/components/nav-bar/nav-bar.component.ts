import { Component, OnInit, inject } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { SpeedDialModule } from 'primeng/speeddial';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ MenubarModule, CommonModule, SpeedDialModule, ToastModule ],
  providers: [MessageService, AuthService],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;
  itemLogin!: MenuItem[];
  nameLoginButton: string = 'Entrar';
  userIsLogged!: boolean;

  private readonly storageService = inject(LocalStorageService);
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.userIsLogged = localStorage && localStorage.getItem('auth') != null;

    this.storageService.storage$.subscribe(() => {
      this.checkLocalStorageChange();
    });

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/main'
      },
      {
        label: 'Empresa',
        icon: 'pi pi-building',
        routerLink: '/company/register'
      }
    ];

    this.itemLogin = [
      {
        label: 'Conta',
        icon: 'pi pi-building',
        items: [
          {
            label: 'Conta',
            icon: 'pi pi-user',
            routerLink: '/auth/register'
          },
          {
            label: 'Sair',
            icon: 'pi pi-building'
          }
        ]
      },
    ]
  }

  public checkLocalStorageChange(): void {
    this.userIsLogged = localStorage.getItem('auth') != null;
  }

  public handleUserButton(): void {
    if (localStorage.getItem('user-info') != null)
    {
      this.router.navigate(['/auth/register']);
    }
    else
    {
      this.router.navigate(['/auth/login']);
    }
  }

  public logout(): void {
    this.authService.revoke()
      .subscribe(({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso.', detail: 'Deslogado!' });

          localStorage.removeItem('auth');
          localStorage.removeItem('user-info');
          this.storageService.setStorageValue('');

          this.userIsLogged = false;
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Erro deslogar!\n ${error.error.message} `});
        }
      }))
  }

  public checkUserPermission(name: any): void {
    let userInfo = localStorage.getItem('user-info');

    if (name == 'Empresa' && (userInfo == null || JSON.parse(userInfo).isRepresentant == false)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Somente usuários logados e representantes podem cadastrar empresas. `});
    }
  }
}
