import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class Uppercase {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    
    input.value = input.value.toUpperCase();
    
    input.setSelectionRange(start, end);
    
    input.dispatchEvent(new Event('input'));
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedInput = event.clipboardData?.getData('text/plain');
    
    if (pastedInput) {
      document.execCommand('insertText', false, pastedInput.toUpperCase());
    }
  }
}