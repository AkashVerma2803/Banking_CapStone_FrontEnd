import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnly {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;
    const cleaned = value.replace(/[^0-9]/g, '');
    
    if (value !== cleaned) {
      input.value = cleaned;
      input.dispatchEvent(new Event('input'));
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {

    if ([8, 9, 27, 13, 46].indexOf(event.keyCode) !== -1 ||
      (event.keyCode === 65 && event.ctrlKey === true) ||
      (event.keyCode === 67 && event.ctrlKey === true) ||
      (event.keyCode === 86 && event.ctrlKey === true) ||
      (event.keyCode === 88 && event.ctrlKey === true) ||
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      return;
    }
    
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
      (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedInput = event.clipboardData?.getData('text/plain');
    
    if (pastedInput) {
      const cleaned = pastedInput.replace(/[^0-9]/g, '');
      document.execCommand('insertText', false, cleaned);
    }
  }
}