import { Component, OnInit } from '@angular/core';
import { AuditService } from '../../services/audit';
import { TableColumn , TableAction ,DataTable } from '../../../../../shared/components/data-table/data-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-audit-log-list',
  standalone:false,
  templateUrl: './audit-log-list.html',
  styleUrls: ['./audit-log-list.scss'],
  // imports: [MatCardModule, DataTable]
})
export class AuditLogListComponent implements OnInit {
  auditLogs: any[] = [];
  loading = false;

  columns: TableColumn[] = [
    { key: 'logId', label: 'ID', sortable: true },
    { key: 'action', label: 'Action', sortable: true },
    { key: 'tableName', label: 'Table', sortable: true },
    { 
      key: 'timestamp', 
      label: 'Timestamp', 
      sortable: true,
      format: (value: Date) => new Date(value).toLocaleString()
    }
  ];

  actions = [];

  constructor(private auditService: AuditService) {}

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  loadAuditLogs(): void {
    this.loading = true;
    this.auditService.getAllAuditLogs().subscribe({
      next: (logs) => {
        this.auditLogs = logs;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}