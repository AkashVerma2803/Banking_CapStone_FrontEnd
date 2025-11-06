import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/AuthService';
import { NotificationService } from '../../../../core/services/NotificationService';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  hidePassword = true;
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.authService.redirectToDashboard();
      return;
    }


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.notificationService.success('Login successful!');
        

        if (this.returnUrl && this.returnUrl !== '/') {
          this.router.navigate([this.returnUrl]);
        } else {
          this.authService.redirectToDashboard();
        }
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error(error.error?.message || 'Login failed. Please check your credentials.');
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${minLength} characters`;
    }
    
    return '';
  }
}