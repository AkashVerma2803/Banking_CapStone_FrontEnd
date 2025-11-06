import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { Payment } from '../../../../../models/payment.model';

@Component({
  selector: 'app-payment-approve',
  standalone:false,
  templateUrl: './payment-approve.html',
  styleUrls: ['./payment-approve.scss']
})
export class PaymentApproveComponent implements OnInit {
  payment!: Payment;
  approvalForm!: FormGroup;
  loading = false;
  paymentId!: number;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.approvalForm = this.fb.group({
      approve: [true, Validators.required],
      remarks: ['']
    });

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

  onSubmit(): void {
    if (this.approvalForm.invalid) {
      this.approvalForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const approve = this.approvalForm.value.approve;
    const remarks = this.approvalForm.value.remarks;

    this.paymentService.approvePayment(this.paymentId, approve, remarks).subscribe({
      next: () => {
        this.notificationService.success(
          approve ? 'Payment approved successfully' : 'Payment rejected successfully'
        );
        this.router.navigate(['/bank-user/payments']);
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error('Failed to process approval');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/bank-user/payments']);
  }
}