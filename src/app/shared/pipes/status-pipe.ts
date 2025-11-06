import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {
  transform(value: number | string | boolean | null | undefined, type?: string): string {
    if (value === null || value === undefined) {
      return 'Unknown';
    }

    if (typeof value === 'boolean') {
      return value ? 'Active' : 'Inactive';
    }

    if (typeof value === 'number') {
      switch (value) {
        case 1: return 'Pending';
        case 2: return 'Approved';
        case 3: return 'Rejected';
        case 4: return 'Completed';
        default: return 'Unknown';
      }
    }

    return String(value);
  }
}