import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankUserService } from '../../services/bank-user';
import { BankService } from '../../services/bank';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { Bank } from '../../../../../models/bank.model';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-bank-user-create',
  standalone:false,
  templateUrl: './bank-user-create.html',
  styleUrls: ['./bank-user-create.scss'],
  //imports: [MatCardModule, MatInputModule, MatIconModule, MatProgressSpinnerModule,ReactiveFormsModule , CommonModule , MatCardModule , MatSelectModule ]
})
export class BankUserCreateComponent implements OnInit {
  bankUserForm!: FormGroup;
  loading = false;
  banks: Bank[] = [];
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private bankUserService: BankUserService,
    private bankService: BankService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadBanks();
    
    this.bankUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      bankId: ['', [Validators.required]]
    });
  }

  loadBanks(): void {
    this.bankService.getAllBanks().subscribe({
      next: (banks) => {
        this.banks = banks;
      },
      error: (error) => {
        this.notificationService.error('Failed to load banks');
      }
    });
  }

  onSubmit(): void {
    if (this.bankUserForm.invalid) {
      this.bankUserForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.bankUserService.createBankUser(this.bankUserForm.value).subscribe({
      next: (response) => {
        this.notificationService.success('Bank user created successfully');
        this.router.navigate(['/super-admin/bank-users']);
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error('Failed to create bank user');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/super-admin/bank-users']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.bankUserForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }
    
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    return '';
  }
}