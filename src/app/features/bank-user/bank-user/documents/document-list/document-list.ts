import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document';
import { TableColumn , DataTable } from '../../../../../shared/components/data-table/data-table';
import { MatCard, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-document-list',
  standalone:false,
  templateUrl: './document-list.html',
  styleUrls: ['./document-list.scss'],
  // imports: [MatCard, MatCardModule, DataTable]
})
export class DocumentListComponent implements OnInit {
  documents: any[] = [];
  loading = false;

  columns: TableColumn[] = [
    { key: 'documentId', label: 'ID', sortable: true },
    { key: 'documentPath', label: 'Document', sortable: false },
    { 
      key: 'uploadedDate', 
      label: 'Uploaded', 
      sortable: true,
      format: (value: Date) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'isVerified', 
      label: 'Status', 
      sortable: true,
      format: (value: boolean) => value ? 'Verified' : 'Pending'
    }
  ];

  actions = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.loading = true;
    this.documentService.getAllDocuments().subscribe({
      next: (documents) => {
        this.documents = documents;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}