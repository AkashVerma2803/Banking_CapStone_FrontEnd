import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankService } from '../../services/bank';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-bank-create',
  standalone:false,
  templateUrl: './bank-create.html',
  styleUrls: ['./bank-create.scss'],
  //imports: [MatCardModule, MatInputModule, MatIconModule, MatProgressSpinnerModule ,ReactiveFormsModule]
})
export class BankCreate implements OnInit {
  bankForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private bankService: BankService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.bankForm = this.fb.group({
      bankName: ['', [Validators.required, Validators.minLength(3)]],
      ifscCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      supportEmail: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.bankForm.invalid) {
      this.bankForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.bankService.createBank(this.bankForm.value).subscribe({
      next: (response) => {
        this.notificationService.success('Bank created successfully');
        this.router.navigate(['/super-admin/banks']);
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error('Failed to create bank');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/super-admin/banks']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.bankForm.get(fieldName);
    
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
    
    if (field?.hasError('pattern')) {
      if (fieldName === 'ifscCode') {
        return 'IFSC Code must be in format: ABCD0123456';
      }
      if (fieldName === 'contactNumber') {
        return 'Please enter a valid 10-digit phone number';
      }
    }
    
    return '';
  }
}