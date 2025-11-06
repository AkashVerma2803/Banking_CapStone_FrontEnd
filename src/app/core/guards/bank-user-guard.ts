import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { inject } from '@angular/core';

export const bankUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn() && authService.isBankUser()) {
    return true;
  }

  if(!authService.isLoggedIn()) {
    router.navigate(['/login']);
  }else{
    router.navigate(['/unauthorized']);
  }
  return false;
};
