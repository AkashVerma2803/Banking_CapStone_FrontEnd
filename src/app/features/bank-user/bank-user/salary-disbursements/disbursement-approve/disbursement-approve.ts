import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryService } from '../../services/salary';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { SalaryDisbursement } from '../../../../../models/salary-disbursement.model';


@Component({
  selector: 'app-disbursement-approve',
  standalone:false,
   //imports: [MatIcon,MatButtonModule, MatChipsModule, MatTableModule, MatMenuModule, ReactiveFormsModule, MatCard, MatCardContent, MatProgressSpinner, CurrencyFormatPipe, DatePipe, MatCardHeader, MatCardModule, MatRadioButton, MatInputModule],
  templateUrl: './disbursement-approve.html',
  styleUrls: ['./disbursement-approve.scss']
})
export class DisbursementApproveComponent implements OnInit {
  disbursement!: SalaryDisbursement;
  approvalForm!: FormGroup;
  loading = false;
  disbursementId!: number;

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.disbursementId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.approvalForm = this.fb.group({
      approve: [true, Validators.required],
      remarks: ['']
    });

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

  onSubmit(): void {
    if (this.approvalForm.invalid) {
      this.approvalForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const approve = this.approvalForm.value.approve;
    const remarks = this.approvalForm.value.remarks;

    this.salaryService.approveDisbursement(this.disbursementId, approve, remarks).subscribe({
      next: () => {
        this.notificationService.success(
          approve ? 'Salary disbursement approved successfully' : 'Salary disbursement rejected successfully'
        );
        this.router.navigate(['/bank-user/salary-disbursements']);
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error('Failed to process approval');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/bank-user/salary-disbursements']);
  }
}