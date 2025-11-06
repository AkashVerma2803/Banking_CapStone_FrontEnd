import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalaryService } from '../../services/salary';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { TableColumn , TableAction , DataTable } from '../../../../../shared/components/data-table/data-table';
import { SalaryDisbursement } from '../../../../../models/salary-disbursement.model';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DataRowOutlet, DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-disbursement-list',
  standalone:false,
  //imports: [ MatMenuModule, ReactiveFormsModule, MatCard, MatCardContent, DataTable],
  templateUrl: './disbursement-list.html',
  styleUrls: ['./disbursement-list.scss']
})
export class DisbursementListComponent implements OnInit {
  disbursements: SalaryDisbursement[] = [];
  loading = false;

  columns: TableColumn[] = [
    { key: 'salaryDisbursementId', label: 'ID', sortable: true },
    { 
      key: 'totalAmount', 
      label: 'Total Amount', 
      sortable: true,
      format: (value: number) => `₹ ${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
    },
    { 
      key: 'disbursementDate', 
      label: 'Disbursement Date', 
      sortable: true,
      format: (value: Date) => new Date(value).toLocaleDateString()
    },
    { key: 'status', label: 'Status', sortable: true },
    { 
      key: 'createdAt', 
      label: 'Created At', 
      sortable: true,
      format: (value: Date) => new Date(value).toLocaleDateString()
    }
  ];

  actions: TableAction[] = [
    {
      icon: 'visibility',
      tooltip: 'View',
      color: 'primary',
      callback: (row: SalaryDisbursement) => this.viewDisbursement(row)
    },
    {
      icon: 'check_circle',
      tooltip: 'Approve',
      color: 'accent',
      callback: (row: SalaryDisbursement) => this.approveDisbursement(row)
    }
  ];

  constructor(
    private salaryService: SalaryService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadDisbursements();
  }

  loadDisbursements(): void {
    this.loading = true;
    this.salaryService.getAllDisbursements().subscribe({
      next: (disbursements) => {
        this.disbursements = disbursements;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load salary disbursements');
        this.loading = false;
      }
    });
  }

  viewDisbursement(disbursement: SalaryDisbursement): void {
    this.router.navigate(['/bank-user/salary-disbursements/view', disbursement.salaryDisbursementId]);
  }

  approveDisbursement(disbursement: SalaryDisbursement): void {
    this.router.navigate(['/bank-user/salary-disbursements/approve', disbursement.salaryDisbursementId]);
  }

  onRowClick(disbursement: SalaryDisbursement): void {
    this.viewDisbursement(disbursement);
  }
}