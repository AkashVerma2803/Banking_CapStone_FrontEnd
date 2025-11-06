import { Component } from '@angular/core';
import { MatCard, MatCardContent } from "@angular/material/card";

@Component({
  selector: 'app-about',
  standalone:false,
  // imports: [MatCard, MatCardContent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  stats =[
    {value: '1000+' , label: 'Corporate Clients'},
    {value: '50+' , label: 'Swarajay Bank'} ,
    {value: '$500Cr+' ,label: 'Transactions Processed'},
    {value: '99.9%' , label: 'UpTime'}
  ];

  team =[
    {name : 'Banking Operations' , icon: 'account_balance' , description: 'Comprehensive Banking Solutions'},
    {name: 'Payment Processing' , icon: 'payment' ,description: 'Fast and Secure Payments'},
    {name: 'Client Management' , icon: 'business' , description: 'Efficient client handling'},
    {name: 'Support Team' , icon: 'support_agent' , description: '24/7 customer support'}
  ];
}
