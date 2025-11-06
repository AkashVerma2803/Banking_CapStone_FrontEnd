import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryService } from '../../services/salary';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { SalaryDisbursement } from '../../../../../models/salary-disbursement.model';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DataRowOutlet } from '@angular/cdk/table';
import { DataTable } from '../../../../../shared/components/data-table/data-table';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { CurrencyFormatPipe } from '../../../../../shared/pipes/currency-format-pipe';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-disbursement-view',
  standalone:false,
 // imports: [MatIcon,MatChipsModule, MatTableModule,MatMenuModule, ReactiveFormsModule, MatCard, MatCardContent,  MatProgressSpinner, CurrencyFormatPipe, DatePipe],
  templateUrl: './disbursement-view.html',
  styleUrls: ['./disbursement-view.scss']
})
export class DisbursementViewComponent implements OnInit {
  disbursement!: SalaryDisbursement;
  loading = true;
  disbursementId!: number;

  constructor(
    private salaryService: SalaryService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.disbursementId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDisbursement();
  }

  loadDisbursement(): void {
    this.loading = true;
    this.salaryService.getDisbursementById(this.disbursementId).subscribe({
      next: (disbursement) => {
        this.disbursement = disbursement;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load disbursement details');
        this.loading = false;
        this.router.navigate(['/bank-user/salary-disbursements']);
      }
    });
  }

  approveDisbursement(): void {
    this.router.navigate(['/bank-user/salary-disbursements/approve', this.disbursementId]);
  }

  goBack(): void {
    this.router.navigate(['/bank-user/salary-disbursements']);
  }
}