import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../../../core/services/AuthService';
import { Role } from '../../../models/common.model';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles: number[];
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent implements OnInit {
  userRole: number | null = null;
  filteredMenuItems: MenuItem[] = [];
  
  private allMenuItems: MenuItem[] = [
    // Super Admin Menu
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/super-admin/dashboard',
      roles: [Role.SUPER_ADMIN]
    },
    {
      label: 'Banks',
      icon: 'account_balance',
      route: '/super-admin/banks',
      roles: [Role.SUPER_ADMIN]
    },
    {
      label: 'Bank Users',
      icon: 'people',
      route: '/super-admin/bank-users',
      roles: [Role.SUPER_ADMIN]
    },
    {
      label: 'Audit Logs',
      icon: 'history',
      route: '/super-admin/audit-logs',
      roles: [Role.SUPER_ADMIN]
    },
    {
      label: 'Reports',
      icon: 'assessment',
      route: '/super-admin/reports',
      roles: [Role.SUPER_ADMIN]
    },
    
    // Bank User Menu
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/bank-user/dashboard',
      roles: [Role.BANK_USER]
    },
    {
      label: 'Clients',
      icon: 'business',
      route: '/bank-user/clients',
      roles: [Role.BANK_USER]
    },
    {
      label: 'Accounts',
      icon: 'account_balance_wallet',
      route: '/bank-user/accounts',
      roles: [Role.BANK_USER]
    },
    {
      label: 'Payments',
      icon: 'payment',
      route: '/bank-user/payments',
      roles: [Role.BANK_USER]
    },
    {
      label: 'Salary Disbursements',
      icon: 'money',
      route: '/bank-user/salary-disbursements',
      roles: [Role.BANK_USER]
    },
    {
      label: 'Documents',
      icon: 'description',
      route: '/bank-user/documents',
      roles: [Role.BANK_USER]
    },
    {
      label: 'Transactions',
      icon: 'receipt',
      route: '/bank-user/transactions',
      roles: [Role.BANK_USER]
    },
    {
      label: 'Queries',
      icon: 'help',
      route: '/bank-user/queries',
      roles: [Role.BANK_USER]
    },
    {
      label: 'Reports',
      icon: 'assessment',
      route: '/bank-user/reports',
      roles: [Role.BANK_USER]
    },

    // Client Menu
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/client/dashboard',
      roles: [Role.CLIENT_USER]
    },
    {
      label: 'Accounts',
      icon: 'account_balance',
      route: '/client/accounts',
      roles: [Role.CLIENT_USER]
    },
    {
      label: 'Employees',
      icon: 'group',
      route: '/client/employees',
      roles: [Role.CLIENT_USER]
    },
    {
      label: 'Beneficiaries',
      icon: 'person_add',
      route: '/client/beneficiaries',
      roles: [Role.CLIENT_USER]
    },
    {
      label: 'Payments',
      icon: 'payment',
      route: '/client/payments',
      roles: [Role.CLIENT_USER]
    },
    {
      label: 'Salary Disbursement',
      icon: 'money',
      route: '/client/salary-disbursement',
      roles: [Role.CLIENT_USER]
    },
    {
      label: 'Transactions',
      icon: 'receipt',
      route: '/client/transactions',
      roles: [Role.CLIENT_USER]
    },
    {
      label: 'Documents',
      icon: 'folder',
      route: '/client/documents',
      roles: [Role.CLIENT_USER]
    },
    {
      label: 'Queries',
      icon: 'contact_support',
      route: '/client/queries',
      roles: [Role.CLIENT_USER]
    },
    {
      label: 'Reports',
      icon: 'assessment',
      route: '/client/reports',
      roles: [Role.CLIENT_USER]
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.filterMenuByRole();
  }

  private filterMenuByRole(): void {
    if (this.userRole === null) return;
    
    this.filteredMenuItems = this.allMenuItems.filter(item => 
      item.roles.includes(this.userRole!)
    );
  }
}