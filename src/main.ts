import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { App } from './app/app';
import { HttpClient } from '@angular/common/http';
import { routes } from './app/app.config';

bootstrapApplication(App , {
  providers:[
    provideRouter(routes),
    importProvidersFrom(HttpClient)
  ]
}).catch(err => console.error(err));
