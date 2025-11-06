import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing-module';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { AboutComponent } from './about/about';
import { ContactComponent } from './contact/contact';
import { UnauthorizedComponent } from './unauthorized/unauthorized';
import { NotFoundComponent } from './not-found/not-found';
import { SharedModule } from '../../../shared/shared-module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NotFoundComponent,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
]
})
export class PublicModule { }
