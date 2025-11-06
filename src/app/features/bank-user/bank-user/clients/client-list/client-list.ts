import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { Client } from '../../../../../models/user.model';
import { TableColumn ,TableAction } from '../../../../../shared/components/data-table/data-table';

@Component({
  selector: 'app-client-list',
  standalone:false,
  templateUrl: './client-list.html',
  styleUrls: ['./client-list.scss']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  loading = false;

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'clientName', label: 'Client Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'accountNumber', label: 'Account Number', sortable: false },
    { 
      key: 'accountBalance', 
      label: 'Balance', 
      sortable: true,
      format: (value: number) => `₹ ${value.toLocaleString('en-IN')}`
    },
    { 
      key: 'isActive', 
      label: 'Status', 
      sortable: true,
      format: (value: boolean) => value ? 'Active' : 'Inactive'
    }
  ];

  actions: TableAction[] = [
    {
      icon: 'visibility',
      tooltip: 'View',
      color: 'primary',
      callback: (row: Client) => this.viewClient(row)
    },
    {
      icon: 'check_circle',
      tooltip: 'Approve',
      color: 'accent',
      callback: (row: Client) => this.approveClient(row)
    }
  ];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading = true;
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load clients');
        this.loading = false;
      }
    });
  }

  viewClient(client: Client): void {
    this.router.navigate(['/bank-user/clients/view', client.id]);
  }

  approveClient(client: Client): void {
    this.router.navigate(['/bank-user/clients/approve', client.id]);
  }

  onRowClick(client: Client): void {
    this.viewClient(client);
  }
}