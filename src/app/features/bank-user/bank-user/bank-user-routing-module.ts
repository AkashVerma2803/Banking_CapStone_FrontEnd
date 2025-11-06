import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { ProfileComponent } from './profile/profile';

import { ClientListComponent } from './clients/client-list/client-list';
import { ClientView } from './clients/client-view/client-view';
import { ClientApproveComponent } from './clients/client-approve/client-approve';

import { AccountListComponent } from './accounts/account-list/account-list';
import { AccountViewComponent } from './accounts/account-view/account-view';
import { AccountApproveComponent } from './accounts/account-approve/account-approve';

import { PaymentListComponent } from './payments/payment-list/payment-list';
import { PaymentViewComponent } from './payments/payment-view/payment-view';
import { PaymentApproveComponent } from './payments/payment-approve/payment-approve';

import { TransactionListComponent } from './transactions/transaction-list/transaction-list';
import { TransactionViewComponent } from './transactions/transaction-view/transaction-view';

import { DisbursementListComponent } from './salary-disbursements/disbursement-list/disbursement-list';
import { DisbursementViewComponent } from './salary-disbursements/disbursement-view/disbursement-view';
import { DisbursementApproveComponent } from './salary-disbursements/disbursement-approve/disbursement-approve';

import { DocumentListComponent } from './documents/document-list/document-list';
import { DocumentVerify } from './documents/document-verify/document-verify';

import { QueryListComponent } from './queries/query-list/query-list';
import { QueryView } from './queries/query-view/query-view';
import { QueryResolve } from './queries/query-resolve/query-resolve';

import { Reports } from './reports/reports/reports';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'profile', component: ProfileComponent },
      
      // Clients routes
      { path: 'clients', component: ClientListComponent },
      { path: 'clients/view/:id', component: ClientView },
      { path: 'clients/approve/:id', component: ClientApproveComponent },
      
      // Accounts routes
      { path: 'accounts', component: AccountListComponent },
      { path: 'accounts/view/:id', component: AccountViewComponent },
      { path: 'accounts/approve/:id', component: AccountApproveComponent },
      
      // Payments routes
      { path: 'payments', component: PaymentListComponent },
      { path: 'payments/view/:id', component: PaymentViewComponent },
      { path: 'payments/approve/:id', component: PaymentApproveComponent },
      
      // Transactions routes
      { path: 'transactions', component: TransactionListComponent },
      { path: 'transactions/view/:id', component: TransactionViewComponent },
      
      // Salary Disbursements routes
      { path: 'salary-disbursements', component: DisbursementListComponent },
      { path: 'salary-disbursements/view/:id', component: DisbursementViewComponent },
      { path: 'salary-disbursements/approve/:id', component: DisbursementApproveComponent },
      
      // Documents routes
      { path: 'documents', component: DocumentListComponent },
      { path: 'documents/verify/:id', component: DocumentVerify },
      
      // Queries routes
      { path: 'queries', component: QueryListComponent },
      { path: 'queries/view/:id', component: QueryView },
      { path: 'queries/resolve/:id', component: QueryResolve },
      
      // Reports route
      { path: 'reports', component: Reports}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankUserRoutingModule { }