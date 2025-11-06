import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BankUserService } from '../../services/bank-user';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { TableColumn  , TableAction , DataTable } from '../../../../../shared/components/data-table/data-table';
import { BankUser } from '../../../../../models/user.model';
import { ConfirmDialog, ConfirmDialogData } from '../../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-bank-user-list',
  standalone:false,
  templateUrl: './bank-user-list.html',
  styleUrls: ['./bank-user-list.scss'],
  // imports: [MatIconModule, MatCardModule, DataTable]
})
export class BankUserListComponent implements OnInit {
  bankUsers: BankUser[] = [];
  loading = false;

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'fullName', label: 'Full Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
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
      callback: (row: BankUser) => this.viewBankUser(row)
    },
    {
      icon: 'edit',
      tooltip: 'Edit',
      color: 'accent',
      callback: (row: BankUser) => this.editBankUser(row)
    },
    {
      icon: 'delete',
      tooltip: 'Delete',
      color: 'warn',
      callback: (row: BankUser) => this.deleteBankUser(row)
    }
  ];

  constructor(
    private bankUserService: BankUserService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadBankUsers();
  }

  loadBankUsers(): void {
    this.loading = true;
    this.bankUserService.getAllBankUsers().subscribe({
      next: (users) => {
        this.bankUsers = users;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load bank users');
        this.loading = false;
      }
    });
  }

  viewBankUser(user: BankUser): void {
    this.router.navigate(['/super-admin/bank-users/view', user.id]);
  }

  editBankUser(user: BankUser): void {
    this.router.navigate(['/super-admin/bank-users/edit', user.id]);
  }

  deleteBankUser(user: BankUser): void {
    const dialogData: ConfirmDialogData = {
      title: 'Delete Bank User',
      message: `Are you sure you want to delete ${user.username}?`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    };

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bankUserService.deleteBankUser(user.id).subscribe({
          next: () => {
            this.notificationService.success('Bank user deleted successfully');
            this.loadBankUsers();
          },
          error: (error) => {
            this.notificationService.error('Failed to delete bank user');
          }
        });
      }
    });
  }

  createBankUser(): void {
    this.router.navigate(['/super-admin/bank-users/create']);
  }

  onRowClick(user: BankUser): void {
    this.viewBankUser(user);
  }
}