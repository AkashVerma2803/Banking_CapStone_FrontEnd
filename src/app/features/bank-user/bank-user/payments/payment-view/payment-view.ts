import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { Payment } from '../../../../../models/payment.model';

@Component({
  selector: 'app-payment-view',
  standalone:false,
  templateUrl: './payment-view.html',
  styleUrls: ['./payment-view.scss']
})
export class PaymentViewComponent implements OnInit {
  payment!: Payment;
  loading = true;
  paymentId!: number;

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPayment();
  }

  loadPayment(): void {
    this.loading = true;
    this.paymentService.getPaymentById(this.paymentId).subscribe({
      next: (payment) => {
        this.payment = payment;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load payment details');
        this.loading = false;
        this.router.navigate(['/bank-user/payments']);
      }
    });
  }

  approvePayment(): void {
    this.router.navigate(['/bank-user/payments/approve', this.paymentId]);
  }

  goBack(): void {
    this.router.navigate(['/bank-user/payments']);
  }

  getStatusColor(): string {
    if (!this.payment) return '';
    switch(this.payment.paymentStatusId) {
      case 1: return 'warn';
      case 2: return 'primary';
      case 3: return 'accent';
      default: return '';
    }
  }

  getStatusText(): string {
    if (!this.payment) return '';
    switch(this.payment.paymentStatusId) {
      case 1: return 'Pending';
      case 2: return 'Approved';
      case 3: return 'Rejected';
      default: return 'Unknown';
    }
  }
}