import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank';
import { BankUserService } from '../services/bank-user';
import { AuditService } from '../services/audit';
import { FocusNext } from '@angular/cdk/menu';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatListModule } from "@angular/material/list";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  //imports: [MatCardModule, MatIconModule, MatProgressSpinnerModule, MatListModule ,DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{
  stats ={
    totalBanks: 0,
    totalBankUsers: 0,
    activeUsers: 0,
    recentActivities: 0
  };

  recentBanks: any[] =[];
  recentAuditLogs: any[] = [];
  loading = true;

  constructor(
    private bankService: BankService,
    private bankUserService: BankUserService,
    private auditService : AuditService
  ){}

  ngOnInit(): void {
      this.loadDashboardData();
  }

  loadDashboardData():void{
    this.loading = true;

    this.bankService.getAllBanks().subscribe({
      next: (banks) =>{
        this.stats.totalBanks  = banks.length;
        this.recentBanks = banks.slice(0,5);
      },

      error: (error) => console.error('Error loading banks:' , error)
    });

    this.bankUserService.getAllBankUsers().subscribe({
      next: (users) => {
        this.stats.totalBankUsers = users.length;
        this.stats.activeUsers = users.filter(u => u.isActive).length;
      },
      error: (error) => console.error('Error loading bank users:', error)
    });

    this.auditService.getAllAuditLogs().subscribe({
      next: (logs) => {
        this.stats.recentActivities = logs.length;
        this.recentAuditLogs = logs.slice(0,5);
this.recentAuditLogs = logs.slice(0, 10);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading audit logs:', error);
        this.loading = false;
      }
    });
  }
}