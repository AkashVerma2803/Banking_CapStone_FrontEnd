import { NgModule, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BankUserRoutingModule } from './bank-user-routing-module';
import { SharedModule } from '../../../shared/shared-module';

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

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from "@angular/material/card";
import { MatRadioButton } from "@angular/material/radio";
import { DataTable } from '../../../shared/components/data-table/data-table';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format-pipe';
import { MatChipsModule } from "@angular/material/chips";
import { MatInputModule } from "@angular/material/input";
import { HeaderComponent } from '../../../shared/components/header/header';
import { MatSidenavModule } from "@angular/material/sidenav";
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';


@NgModule({
  declarations: [
    Layout,
    ClientListComponent,
    ClientView,
    ClientApproveComponent,
    AccountListComponent,
    AccountViewComponent,
    AccountApproveComponent,
    PaymentListComponent,
    PaymentViewComponent,
    PaymentApproveComponent,
    TransactionListComponent,
    TransactionViewComponent,
    DisbursementListComponent,
    DisbursementViewComponent,
    DisbursementApproveComponent,
    DocumentListComponent,
    DocumentVerify,
    QueryListComponent,
    QueryView,
    QueryResolve,
    Reports,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    BankUserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    Dashboard,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    MatRadioButton,
    DataTable,
    CurrencyFormatPipe,
    MatChipsModule,
    MatInputModule,
    HeaderComponent,
    MatSidenavModule,
    SidebarComponent,
    MatIconModule
]
})
export class BankUserModule { }