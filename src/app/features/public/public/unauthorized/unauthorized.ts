import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/AuthService';
import { MatIcon } from "@angular/material/icon";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-unauthorized',
  standalone:false,
  // imports: [MatIcon, MatAnchor],
  templateUrl: './unauthorized.html',
  styleUrl: './unauthorized.scss',
})
export class UnauthorizedComponent {
  constructor(
    private router: Router,
    private authService : AuthService
  ){}

  goBack(): void{
    if(this.authService.isLoggedIn()){
      this.authService.redirectToDashboard();
    }else{
      this.router.navigate(['/login']);
    }
  }

  goHome(): void{
    this.router.navigate(['/']);
  }
}
