import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { Account } from '../../../../../models/account.model';
@Component({
  standalone:false,
  selector: 'app-account-view',
  templateUrl: './account-view.html',
  styleUrls: ['./account-view.scss']
})
export class AccountViewComponent implements OnInit {
  account!: Account;
  loading = true;
  accountId!: number;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAccount();
  }

  loadAccount(): void {
    this.loading = true;
    this.accountService.getAccountById(this.accountId).subscribe({
      next: (account) => {
        this.account = account;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load account details');
        this.loading = false;
        this.router.navigate(['/bank-user/accounts']);
      }
    });
  }

  approveAccount(): void {
    this.router.navigate(['/bank-user/accounts/approve', this.accountId]);
  }

  goBack(): void {
    this.router.navigate(['/bank-user/accounts']);
  }
}