import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { ProfileComponent } from './profile/profile';

import { BankList } from './banks/bank-list/bank-list';
import { BankCreate } from './banks/bank-create/bank-create';
import { BankEdit } from './banks/bank-edit/bank-edit';
import { BankView } from './banks/bank-view/bank-view';


import { BankUserListComponent } from './bank-users/bank-user-list/bank-user-list';
import { BankUserCreateComponent } from './bank-users/bank-user-create/bank-user-create';
import { BankUserEdit } from './bank-users/bank-user-edit/bank-user-edit';
import { BankUserView } from './bank-users/bank-user-view/bank-user-view';

import { AuditLog } from '../../../models/audit-log.model';
import { AuditLogView } from './audit-logs/audit-log-view/audit-log-view';

// Reports
import { Reports } from './reports/reports/reports';
import { AuditLogListComponent } from './audit-logs/audit-log-list/audit-log-list';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'profile', component:  ProfileComponent },
      
      // Banks routes
      { path: 'banks', component: BankList },
      { path: 'banks/create', component: BankCreate },
      { path: 'banks/edit/:id', component: BankEdit },
      { path: 'banks/view/:id', component: BankView },
      
      // Bank Users routes
      { path: 'bank-users', component: BankUserListComponent },
      { path: 'bank-users/create', component: BankUserCreateComponent },
      { path: 'bank-users/edit/:id', component: BankUserEdit },
      { path: 'bank-users/view/:id', component: BankUserView },
      
      // Audit Logs routes
      { path: 'audit-logs', component: AuditLogListComponent },
      { path: 'audit-logs/view/:id', component: AuditLogView },
      
      // Reports route
      { path: 'reports', component: Reports }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }