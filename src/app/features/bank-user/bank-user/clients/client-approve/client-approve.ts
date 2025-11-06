import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { Client } from '../../../../../models/user.model';

@Component({
  selector: 'app-client-approve',
  standalone:false,
  templateUrl: './client-approve.html',
  styleUrls: ['./client-approve.scss']
})
export class ClientApproveComponent implements OnInit {
  client!: Client;
  approvalForm!: FormGroup;
  loading = false;
  clientId!: number;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.approvalForm = this.fb.group({
      approve: [true, Validators.required],
      remarks: ['']
    });

    this.loadClient();
  }

  loadClient(): void {
    this.loading = true;
    this.clientService.getClientById(this.clientId).subscribe({
      next: (client) => {
        this.client = client;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load client details');
        this.loading = false;
        this.router.navigate(['/bank-user/clients']);
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

    this.clientService.approveClient(this.clientId, approve).subscribe({
      next: () => {
        this.notificationService.success(
          approve ? 'Client approved successfully' : 'Client rejected successfully'
        );
        this.router.navigate(['/bank-user/clients']);
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error('Failed to process approval');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/bank-user/clients']);
  }
}