import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  private datePipe: DatePipe = new DatePipe('en-US');

  transform(value: Date | string | number | null | undefined, format: string = 'medium'): string {
    if (!value) {
      return '-';
    }

    return this.datePipe.transform(value, format) || '-';
  }
}