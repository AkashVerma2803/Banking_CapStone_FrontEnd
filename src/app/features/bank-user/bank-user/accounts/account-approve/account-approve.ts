import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { AccountService } from '../../services/account';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { Account } from '../../../../../models/account.model';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-account-approve',
  standalone: false,
  templateUrl: './account-approve.html',
  styleUrls: ['./account-approve.scss'],
})
export class AccountApproveComponent implements OnInit {
  account!: Account;
  approvalForm!: FormGroup;
  loading = false;
  accountId!: number;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.approvalForm = this.fb.group({
      approve: [true, Validators.required]
    });

    this.loadAccount();
  }

  loadAccount(): void {
    this.loading = true;
    this.accountService.getAccountById(this.accountId).subscribe({
      next: (account) => {
        this.account = account;
        this.loading = false;
      },
      error: () => {
        this.notificationService.error('Failed to load account details');
        this.loading = false;
        this.router.navigate(['/bank-user/accounts']);
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

    this.accountService.approveAccount(this.accountId, approve).subscribe({
      next: () => {
        this.notificationService.success(
          approve ? 'Account approved successfully' : 'Account rejected successfully'
        );
        this.router.navigate(['/bank-user/accounts']);
      },
      error: () => {
        this.loading = false;
        this.notificationService.error('Failed to process approval');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/bank-user/accounts']);
  }
}
