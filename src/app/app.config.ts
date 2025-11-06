import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { superAdminGuard } from './core/guards/super-admin-guard';
import { bankUserGuard } from './core/guards/bank-user-guard';
import { clientGuard } from './core/guards/client-guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/public/public/public-module').then(m => m.PublicModule)
  },
  {
    path: 'super-admin',
    loadChildren: () => import('./features/super-admin/super-admin/super-admin-module').then(m => m.SuperAdminModule),
    canActivate: [authGuard, superAdminGuard]
  },
  {
    path: 'bank-user',
    loadChildren: () => import('./features/bank-user/bank-user/bank-user-module').then(m => m.BankUserModule),
    canActivate: [authGuard, bankUserGuard]
  },
  // {
  //   path: 'client',
  //   loadChildren: () => import('.').then(m => m.ClientModule),
  //   canActivate: [authGuard, clientGuard]
  // },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];