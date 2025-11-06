import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../../services/query';
import { TableColumn , TableAction , DataTable } from '../../../../../shared/components/data-table/data-table';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.html',
  styleUrls: ['./query-list.scss'],
  standalone:false
})
export class QueryListComponent implements OnInit {
  queries: any[] = [];
  loading = false;

  columns: TableColumn[] = [
    { key: 'queryId', label: 'ID', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    { 
      key: 'createdAt', 
      label: 'Created', 
      sortable: true,
      format: (value: Date) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'isResolved', 
      label: 'Status', 
      sortable: true,
      format: (value: boolean) => value ? 'Resolved' : 'Pending'
    }
  ];

  actions: TableAction[] = [
    {
      icon: 'visibility',
      tooltip: 'View',
      color: 'primary',
      callback: (row: any) => this.viewQuery(row)
    }
  ];

  constructor(
    private queryService: QueryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQueries();
  }

  loadQueries(): void {
    this.loading = true;
    this.queryService.getAllQueries().subscribe({
      next: (queries) => {
        this.queries = queries;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  viewQuery(query: any): void {
    this.router.navigate(['/bank-user/queries/view', query.queryId]);
  }
}