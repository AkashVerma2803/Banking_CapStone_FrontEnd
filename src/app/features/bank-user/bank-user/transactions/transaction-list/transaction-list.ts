import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { TableAction , TableColumn ,DataTable } from '../../../../../shared/components/data-table/data-table';
import { Transaction } from '../../../../../models/transaction.model';
import { MatCardContent } from "@angular/material/card";

@Component({
  selector: 'app-transaction-list',
  standalone:false,
  templateUrl: './transaction-list.html',
  styleUrls: ['./transaction-list.scss'],
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  loading = false;

  columns: TableColumn[] = [
    { key: 'transactionId', label: 'ID', sortable: true },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      format: (value: number) => `₹ ${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
    },
    { 
      key: 'balanceAfter', 
      label: 'Balance After', 
      sortable: true,
      format: (value: number) => `₹ ${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
    },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'referenceNumber', label: 'Reference', sortable: false },
    { 
      key: 'createdAt', 
      label: 'Date', 
      sortable: true,
      format: (value: Date) => new Date(value).toLocaleString()
    }
  ];

  actions: TableAction[] = [
    {
      icon: 'visibility',
      tooltip: 'View',
      color: 'primary',
      callback: (row: Transaction) => this.viewTransaction(row)
    }
  ];

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading = true;
    this.transactionService.getAllTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load transactions');
        this.loading = false;
      }
    });
  }

  viewTransaction(transaction: Transaction): void {
    this.router.navigate(['/bank-user/transactions/view', transaction.transactionId]);
  }

  onRowClick(transaction: Transaction): void {
    this.viewTransaction(transaction);
  }
}