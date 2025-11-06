import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../core/services/NotificationService';

@Component({
  selector: 'app-contact',
  // imports: [],
  standalone:false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  contactForm!:FormGroup;
  loading = false;

  contactInfo = [{
    icon: 'phone',
    title: 'Phone',
    value: '1800-123-4567',
    subtitle: 'Mon-Fri 9AM-6PM'
  },
  {
    icon: 'email',
    title: 'Email',
    value: 'support@bankingportal.com',
    subtitle: 'We reply within 24 hours'
  },
   {
      icon: 'location_on',
      title: 'Address',
      value: '123 Banking Street, Mumbai',
      subtitle: 'Maharashtra, India'
    },
    {
      icon: 'schedule',
      title: 'Business Hours',
      value: 'Mon - Fri: 9AM - 6PM',
      subtitle: 'Sat: 9AM - 2PM'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService
  ){}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() : void{
    if(this.contactForm.invalid){
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading = true;

     setTimeout(() => {
      this.loading = false;
      this.notificationService.success('Message sent successfully! We will get back to you soon.');
      this.contactForm.reset();
    }, 2000);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
  
     if (field?.hasError('pattern')) {
      return 'Please enter a valid 10-digit phone number';
    }
    
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }
    
    return '';
  }
}
