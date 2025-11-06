// super-admin/layout/layout.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../../../core/services/AuthService';
import { HeaderComponent } from '../../../../shared/components/header/header';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout implements OnInit {
  sidenavOpened = true;
  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    document.addEventListener('toggle-sidebar', () => {
      this.sidenavOpened = !this.sidenavOpened;
    });
  }
}
