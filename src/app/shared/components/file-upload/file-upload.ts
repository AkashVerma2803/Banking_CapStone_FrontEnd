import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule , MatIconModule , MatButtonModule ,MatProgressBarModule , NgFor],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
})
export class FileUpload {
   @Input() accept = '*';
   @Input() multiple = false; // change to true only to accept one
  @Input() maxSize = 52428800; 
  @Output() fileSelected = new EventEmitter<File | File[]>();

  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  uploading = false;
  uploadProgress = 0;
  errorMessage = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (!input.files || input.files.length === 0) {
      return;
    }

    this.errorMessage = '';

    if (this.multiple) {
      this.selectedFiles = Array.from(input.files);
      
      const oversizedFiles = this.selectedFiles.filter(file => file.size > this.maxSize);
      if (oversizedFiles.length > 0) {
        this.errorMessage = `Some files exceed the maximum size of ${this.formatFileSize(this.maxSize)}`;
        return;
      }
      
      this.fileSelected.emit(this.selectedFiles);
    } else {
      this.selectedFile = input.files[0];
      
      if (this.selectedFile.size > this.maxSize) {
        this.errorMessage = `File size exceeds maximum of ${this.formatFileSize(this.maxSize)}`;
        this.selectedFile = null;
        return;
      }
      this.fileSelected.emit(this.selectedFile);
    }
  }

  removeFile(index?: number): void {
    if (this.multiple && index !== undefined) {
      this.selectedFiles.splice(index, 1);
      this.fileSelected.emit(this.selectedFiles);
    } else {
      this.selectedFile = null;
      this.selectedFiles = [];
      this.fileSelected.emit(this.multiple ? [] : null!);
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}
