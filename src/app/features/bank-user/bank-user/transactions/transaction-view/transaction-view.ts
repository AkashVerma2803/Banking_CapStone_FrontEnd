import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { Transaction } from '../../../../../models/transaction.model';

@Component({
  selector: 'app-transaction-view',
  standalone:false,
  templateUrl: './transaction-view.html',
  styleUrls: ['./transaction-view.scss']
})
export class TransactionViewComponent implements OnInit {
  transaction!: Transaction;
  loading = true;
  transactionId!: number;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.transactionId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTransaction();
  }

  loadTransaction(): void {
    this.loading = true;
    this.transactionService.getTransactionById(this.transactionId).subscribe({
      next: (transaction) => {
        this.transaction = transaction;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load transaction details');
        this.loading = false;
        this.router.navigate(['/bank-user/transactions']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/bank-user/transactions']);
  }
}