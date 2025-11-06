import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client';
import { PaymentService } from '../services/payment';
import { QueryService } from '../services/query';
import { TransactionService } from '../services/transaction';
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CurrencyFormatPipe } from "../../../../shared/pipes/currency-format-pipe";
import { DatePipe, NgIf } from '@angular/common';
import { CommonModule , NgFor , NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [MatListModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, CurrencyFormatPipe , DatePipe , NgFor , NgIf],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{
  stats = {
    totalClients : 0,
    pendingPayments : 0,
    pendingQueries : 0,
    todayTransactions : 0
  };

  recentClients:any[] =[];
  recentPayments: any[] = [];
  loading = true;

  constructor(
    private clientService: ClientService,
    private paymentService : PaymentService,
    private queryService : QueryService,
    private transactionService : TransactionService
  ) {}

  ngOnInit(): void {
      this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.stats.totalClients = clients.length;
        this.recentClients = clients.slice(0, 5);
      },
      error: (error) => console.error('Error loading clients:', error)
    });

    this.paymentService.getAllPayments().subscribe({
      next: (payments) => {
        this.stats.pendingPayments = payments.filter(p => p.paymentStatusId === 1).length;
        this.recentPayments = payments.slice(0, 5);
      },
      error: (error) => console.error('Error loading payments:', error)
    });
this.transactionService.getAllTransactions().subscribe({
      next: (transactions) => {
        const today = new Date().toDateString();
        this.stats.todayTransactions = transactions.filter(
          t => new Date(t.createdAt).toDateString() === today
        ).length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.loading = false;
      }
    });
  }
}
