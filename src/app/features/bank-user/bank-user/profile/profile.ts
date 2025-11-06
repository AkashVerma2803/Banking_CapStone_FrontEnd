import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/AuthService';
import { NotificationService } from '../../../../core/services/NotificationService';
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-profile',
  standalone:false,
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
 // imports: [MatCardModule, MatIconModule, MatInputModule, MatProgressSpinnerModule,MatCardModule , MatCard ,FormsModule , ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  changePasswordForm!: FormGroup;
  loading = false;

  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser();

    this.changePasswordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const data = {
      currentPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.newPassword,
      confirmNewPassword: this.changePasswordForm.value.confirmPassword
    };

    this.authService.changePassword(data).subscribe({
      next: () => {
        this.notificationService.success('Password changed successfully');
        this.changePasswordForm.reset();
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to change password');
        this.loading = false;
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.changePasswordForm.get(fieldName);

    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }

    if (field?.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }

    if (fieldName === 'confirmPassword' && this.changePasswordForm.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }

    return '';
  }


  private getFieldLabel(fieldName: string): string {
    switch (fieldName) {
      case 'currentPassword':
        return 'Current Password';
      case 'newPassword':
        return 'New Password';
      case 'confirmPassword':
        return 'Confirm Password';
      default:
        return fieldName;
    }
  }
}
