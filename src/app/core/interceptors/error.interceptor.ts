import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../services/NotificationService';
import { AuthService } from '../services/AuthService';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {

          // Server-side error
          switch (error.status) {
            
            case 400:
              errorMessage = error.error?.message || 'Bad Request';
              break;

            case 401:
              errorMessage = 'Unauthorized. Please login again.';
              this.authService.logout();
              break;

            case 403:
              errorMessage = 'Access Forbidden. You do not have permission.';
              this.router.navigate(['/unauthorized']);
              break;

            case 404:
              errorMessage = 'Resource not found';
              break;

            case 500:
              errorMessage = 'Internal Server Error. Please try again later.';
              break;

            case 0:
              errorMessage = 'Cannot connect to server. Please check your connection.';
              break;

            default:
              errorMessage = error.error?.message || `Error Code: ${error.status}`;
          }
        }

        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }
}