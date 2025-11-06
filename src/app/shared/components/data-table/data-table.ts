import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  format?: (value: any) => string;
}

export interface TableAction {
  icon: string;
  tooltip: string;
  color?: string;
  callback: (row: any) => void;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.scss']
})
export class DataTable implements AfterViewInit {
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 25, 50, 100];

  @Output() rowClick = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = [...this.columns.map(col => col.key), 'actions'];
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.data;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  getCellValue(row: any, column: TableColumn): string {
    const value = row[column.key];
    return column.format ? column.format(value) : value;
  }
}