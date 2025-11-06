import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../../models/user.model';
import { ClientService } from '../../services/client';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../../core/services/NotificationService';

@Component({
  selector: 'app-client-view',
  // imports: [],
  standalone:false,
  templateUrl: './client-view.html',
  styleUrl: './client-view.scss',
})
export class ClientView implements OnInit{
  client!: Client;
  loading = true;
  clientId! : number;

  constructor(
    private clientService : ClientService,
    private route : ActivatedRoute,
    private router : Router,
    private notificationService : NotificationService
  ) {}

  ngOnInit(): void {
      this.clientId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadClient();
  }

  loadClient(): void{
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

  approveClient(): void{
    this.router.navigate(['/bank-user/clients/approve', this.clientId]);
  }

  goBack(): void{
    this.router.navigate(['/bank-user/clients']);
  }
}
