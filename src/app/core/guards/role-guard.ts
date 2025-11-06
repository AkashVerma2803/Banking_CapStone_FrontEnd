import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => { 
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as number[];
  const userRole = authService.getUserRole();

  if(!authService.isLoggedIn()) {
    router.navigate(['/login']);
      return false;
    }

    if(userRole && expectedRoles.includes(userRole)) {
      return true;
    }

    router.navigate(['/unauthorized']);
  return false;
};
