import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { Payment } from '../../../../../models/payment.model';
import { TableAction, TableColumn } from '../../../../../shared/components/data-table/data-table';
import { MatCard, MatCardContent } from "@angular/material/card";

@Component({
  selector: 'app-payment-list',
  standalone:false,
  templateUrl: './payment-list.html',
  styleUrls: ['./payment-list.scss'],
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  loading = false;

  columns: TableColumn[] = [
    { key: 'paymentId', label: 'ID', sortable: true },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      format: (value: number) => `₹ ${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
    },
    { 
      key: 'paymentDate', 
      label: 'Payment Date', 
      sortable: true,
      format: (value: Date) => new Date(value).toLocaleDateString()
    },
    { key: 'remarks', label: 'Remarks', sortable: false },
    { 
      key: 'paymentStatusId', 
      label: 'Status', 
      sortable: true,
      format: (value: number) => {
        switch(value) {
          case 1: return 'Pending';
          case 2: return 'Approved';
          case 3: return 'Rejected';
          default: return 'Unknown';
        }
      }
    }
  ];

  actions: TableAction[] = [
    {
      icon: 'visibility',
      tooltip: 'View',
      color: 'primary',
      callback: (row: Payment) => this.viewPayment(row)
    },
    {
      icon: 'check_circle',
      tooltip: 'Approve',
      color: 'accent',
      callback: (row: Payment) => this.approvePayment(row)
    }
  ];

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    this.paymentService.getAllPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load payments');
        this.loading = false;
      }
    });
  }

  viewPayment(payment: Payment): void {
    this.router.navigate(['/bank-user/payments/view', payment.paymentId]);
  }

  approvePayment(payment: Payment): void {
    this.router.navigate(['/bank-user/payments/approve', payment.paymentId]);
  }

  onRowClick(payment: Payment): void {
    this.viewPayment(payment);
  }
}