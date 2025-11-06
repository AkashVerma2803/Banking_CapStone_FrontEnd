import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SuperAdminRoutingModule } from './super-admin-routing-module';

// Layout Components
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { ProfileComponent } from './profile/profile';

// Bank Components
import { BankList } from './banks/bank-list/bank-list';
import { BankCreate } from './banks/bank-create/bank-create';
import { BankEdit } from './banks/bank-edit/bank-edit';
import { BankView } from './banks/bank-view/bank-view';

// Bank User Components
import { BankUserListComponent } from './bank-users/bank-user-list/bank-user-list';
import { BankUserCreateComponent } from './bank-users/bank-user-create/bank-user-create';
import { BankUserEdit } from './bank-users/bank-user-edit/bank-user-edit';
import { BankUserView } from './bank-users/bank-user-view/bank-user-view';

// Audit Log Components
import { AuditLogListComponent } from './audit-logs/audit-log-list/audit-log-list';
import { AuditLogView } from './audit-logs/audit-log-view/audit-log-view';

// Reports
import { Reports } from './reports/reports/reports';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';

// Shared Components (Import as modules since they're standalone)
import { HeaderComponent } from '../../../shared/components/header/header';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';
import { DataTable } from '../../../shared/components/data-table/data-table';

@NgModule({
  declarations: [
    // Declare ALL components here (they should all be standalone: false)
    Layout,
    Dashboard,
    ProfileComponent,
    BankList,
    BankCreate,
    BankEdit,
    BankView,
    BankUserListComponent,
    BankUserCreateComponent,
    BankUserEdit,
    BankUserView,
    AuditLogListComponent,
    AuditLogView,
    Reports
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    ReactiveFormsModule,
    
    // Material Modules
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    
    // Import standalone shared components
    HeaderComponent,
    SidebarComponent,
    DataTable
  ]
})
export class SuperAdminModule { }