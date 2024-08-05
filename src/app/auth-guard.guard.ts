import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('user-info') != null)
  {
    return JSON.parse(localStorage.getItem('user-info') ?? '').isRepresentant;
  }

  return false;
};