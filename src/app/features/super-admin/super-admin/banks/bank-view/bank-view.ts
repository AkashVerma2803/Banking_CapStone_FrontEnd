import { Component, OnInit } from '@angular/core';
import { Bank } from '../../../../../models/bank.model';
import { BankService } from '../../services/bank';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../../core/services/NotificationService';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bank-view',
  standalone:false,
  //imports: [MatIconModule, MatCardModule, MatProgressSpinnerModule , DatePipe],
  templateUrl: './bank-view.html',
  styleUrl: './bank-view.scss',
})
export class BankView  implements OnInit{
  bank!: Bank;
  loading = true;
  bankId!: number;

  constructor(
    private bankService : BankService,
    private route : ActivatedRoute,
    private router : Router,
    private notificationService : NotificationService
  ){}

  ngOnInit() : void{
    this.bankId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBank();
  }

  loadBank(): void{
    this.loading = true;
    this.bankService.getBankById(this.bankId).subscribe({
      next: (bank) => {
        this.bank = bank;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to laod bank details');
        this.loading = false;
        this.router.navigate(['/super-admin/banks']);
      }
    });
  }

  editBank():void{
    this.router.navigate(['/super-admin/banks/edit', this.bankId]);
  }

  goBack():void{
    this.router.navigate(['/super-admin/banks']);
  }
}
