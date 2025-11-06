import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../../services/bank';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { Bank } from '../../../../../models/bank.model';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-bank-edit',
  standalone:false,
  templateUrl: './bank-edit.html',
  styleUrls: ['./bank-edit.scss'],
  //imports: [MatCardModule, MatInputModule, MatProgressSpinnerModule, MatIconModule  , ReactiveFormsModule]
})
export class BankEdit implements OnInit {
  bankForm!: FormGroup;
  loading = false;
  bankId!: number;
  bank!: Bank;

  constructor(
    private fb: FormBuilder,
    private bankService: BankService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.bankId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.bankForm = this.fb.group({
      bankName: ['', [Validators.required, Validators.minLength(3)]],
      ifscCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      supportEmail: ['', [Validators.required, Validators.email]]
    });

    this.loadBank();
  }

  loadBank(): void {
    this.loading = true;
    this.bankService.getBankById(this.bankId).subscribe({
      next: (bank) => {
        this.bank = bank;
        this.bankForm.patchValue({
          bankName: bank.bankName,
          ifscCode: bank.ifscCode,
          address: bank.address,
          contactNumber: bank.contactNumber,
          supportEmail: bank.supportEmail
        });
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load bank details');
        this.loading = false;
        this.router.navigate(['/super-admin/banks']);
      }
    });
  }

  onSubmit(): void {
    if (this.bankForm.invalid) {
      this.bankForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const updateData = {
      bankId: this.bankId,
      ...this.bankForm.value
    };

    this.bankService.updateBank(this.bankId, updateData).subscribe({
      next: (response) => {
        this.notificationService.success('Bank updated successfully');
        this.router.navigate(['/super-admin/banks']);
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error('Failed to update bank');
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