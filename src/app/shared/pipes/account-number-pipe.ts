import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountNumber',
  standalone: true
})
export class AccountNumberPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    
    return match ? match.join(' ') : value;
  }
}