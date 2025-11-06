import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatAnchor , MatIconAnchor  } from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-not-found',
  imports: [MatAnchor, MatIconModule],
  // standalone:false,
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome(): void{
    this.router.navigate(['/']);
  }

  goBack(): void{
    window.history.back();
  }
}
