import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  // imports:[ MatIconModule , MatCardModule , MatButtonModule ],
  standalone:false,
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  features = [
    {
      icon: 'account_balance',
      title: 'Bank Management',
      description: 'Comprehensive banking operations and management system'
    },
    {
      icon: 'people',
      title: 'Client Management',
      description: 'Manage corporate clients and their accounts efficiently'
    },
    {
      icon: 'payment',
      title: 'Payment Processing',
      description: 'Secure and fast payment processing with approvals'
    },
    {
      icon: 'assessment',
      title: 'Reports & Analytics',
      description: 'Detailed reports and analytics for better insights'
    },
    {
      icon: 'security',
      title: 'Secure & Reliable',
      description: 'Bank-grade security with role-based access control'
    },
    {
      icon: 'support',
      title: '24/7 Support',
      description: 'Round-the-clock support for all your banking needs'
    }
  ];

  constructor(private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}