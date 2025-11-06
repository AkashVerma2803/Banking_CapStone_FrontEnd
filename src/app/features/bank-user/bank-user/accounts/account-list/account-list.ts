import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { TableColumn , TableAction , DataTable } from '../../../../../shared/components/data-table/data-table';
import { Account } from '../../../../../models/account.model';
import { MatCardContent } from "@angular/material/card";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: false,
  selector: 'app-account-list',
  templateUrl: './account-list.html',
  styleUrls: ['./account-list.scss'],
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  loading = false;

  columns: TableColumn[] = [
    { key: 'accountId', label: 'ID', sortable: true },
    { key: 'accountNumber', label: 'Account Number', sortable: true },
    { 
      key: 'balance', 
      label: 'Balance', 
      sortable: true,
      format: (value: number) => `₹ ${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
    },
    { 
      key: 'openedDate', 
      label: 'Opened Date', 
      sortable: true,
      format: (value: Date) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'isActive', 
      label: 'Status', 
      sortable: true,
      format: (value: boolean) => value ? 'Active' : 'Inactive'
    }
  ];

  actions: TableAction[] = [
    {
      icon: 'visibility',
      tooltip: 'View',
      color: 'primary',
      callback: (row: Account) => this.viewAccount(row)
    },
    {
      icon: 'check_circle',
      tooltip: 'Approve',
      color: 'accent',
      callback: (row: Account) => this.approveAccount(row)
    }
  ];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load accounts');
        this.loading = false;
      }
    });
  }

  viewAccount(account: Account): void {
    this.router.navigate(['/bank-user/accounts/view', account.accountId]);
  }

  approveAccount(account: Account): void {
    this.router.navigate(['/bank-user/accounts/approve', account.accountId]);
  }

  onRowClick(account: Account): void {
    this.viewAccount(account);
  }
}