import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
  @Input() status: string ='';
  @Input() type: 'account' | 'payment' | 'document' | 'query' | 'general' = 'general';

  getStatusClass(): string{
    const statusLower = this.status.toLowerCase();

     if (this.type === 'account') {
      if (statusLower === 'active') return 'status-active';
      if (statusLower === 'inactive') return 'status-inactive';
      if (statusLower === 'suspended') return 'status-suspended';
      if (statusLower === 'closed') return 'status-closed';
    }

    if (this.type === 'payment') {
      if (statusLower === 'pending') return 'status-pending';
      if (statusLower === 'approved') return 'status-approved';
      if (statusLower === 'rejected') return 'status-rejected';
      if (statusLower === 'completed') return 'status-completed';
      if (statusLower === 'failed') return 'status-failed';
    }

    if (this.type === 'document') {
      if (statusLower === 'pending') return 'status-pending';
      if (statusLower === 'verified') return 'status-verified';
      if (statusLower === 'rejected') return 'status-rejected';
    }

    if (this.type === 'query') {
      if (statusLower === 'open') return 'status-open';
      if (statusLower === 'in progress') return 'status-in-progress';
      if (statusLower === 'resolved') return 'status-resolved';
      if (statusLower === 'closed') return 'status-closed';
    }

     if (statusLower === 'success') return 'status-success';
    if (statusLower === 'warning') return 'status-warning';
    if (statusLower === 'error') return 'status-error';
    if (statusLower === 'info') return 'status-info';
    
    return 'status-default';
  }

  getDisplayText(): string{
    return this.status.toUpperCase();
  }
}
