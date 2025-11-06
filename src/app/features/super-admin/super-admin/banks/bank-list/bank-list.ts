import { Component } from '@angular/core';
import { TableAction , TableColumn , DataTable } from '../../../../../shared/components/data-table/data-table';
import { BankService } from '../../services/bank';
import { Bank } from '../../../../../models/user.model';
import { ConfirmDialog , ConfirmDialogData } from '../../../../../shared/components/confirm-dialog/confirm-dialog';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-bank-list',
  standalone:false,
  // imports: [MatIconModule, MatCardModule, DataTable],
  templateUrl: './bank-list.html',
  styleUrl: './bank-list.scss',
})
export class BankList {
  banks: Bank[] = [];
  laoding = false;

 columns: TableColumn[] = [
    { key: 'bankId', label: 'ID', sortable: true },
    { key: 'bankName', label: 'Bank Name', sortable: true },
    { key: 'ifscCode', label: 'IFSC Code', sortable: true },
    { key: 'address', label: 'Address', sortable: true },
    { key: 'contactNumber', label: 'Contact', sortable: false },
    { key: 'supportEmail', label: 'Email', sortable: false }
  ];
actions: TableAction[] = [
    {
      icon: 'visibility',
      tooltip: 'View',
      color: 'primary',
      callback: (row: Bank) => this.viewBank(row)
    },
    {
      icon: 'edit',
      tooltip: 'Edit',
      color: 'accent',
      callback: (row: Bank) => this.editBank(row)
    },
    {
      icon: 'delete',
      tooltip: 'Delete',
      color: 'warn',
      callback: (row: Bank) => this.deleteBank(row)
    }
  ];

  constructor(
    private bankService: BankService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadBanks();
  }

  loadBanks(): void {
    this.laoding = true;
    this.bankService.getAllBanks().subscribe({
      next: (banks) => {
        this.banks = banks;
        this.laoding = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load banks');
        this.laoding = false;
      }
    });
  }

  viewBank(bank: Bank): void {
    this.router.navigate(['/super-admin/banks/view', bank.bankId]);
  }

  editBank(bank: Bank): void {
    this.router.navigate(['/super-admin/banks/edit', bank.bankId]);
  }

  deleteBank(bank: Bank): void {
    const dialogData: ConfirmDialogData = {
      title: 'Delete Bank',
      message: `Are you sure you want to delete ${bank.bankName}? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    };

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.bankService.deleteBank(bank.bankId).subscribe({
          next: () => {
            this.notificationService.success('Bank deleted successfully');
            this.loadBanks();
          },
          error: (error) => {
            this.notificationService.error('Failed to delete bank');
          }
        });
      }
    });
  }

  createBank(): void {
    this.router.navigate(['/super-admin/banks/create']);
  }

  onRowClick(bank: Bank): void {
    this.viewBank(bank);
  }
}