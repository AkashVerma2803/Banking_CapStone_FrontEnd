import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, ChangePasswordRequest } from '../../models/auth.model';
import { TokenService } from './TokenService';
import { Role } from '../../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

  private hasToken(): boolean {
    return !!this.tokenService.getToken() && !this.tokenService.isTokenExpired();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        this.tokenService.setUser(response.user);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    this.tokenService.clear();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  changePassword(data: ChangePasswordRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, data);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  getCurrentUser(): any {
    return this.tokenService.getUser();
  }

  getUserRole(): number | null {
    return this.tokenService.getUserRole();
  }

  getUserType(): string | null {
    return this.tokenService.getUserType();
  }

  getUserId(): number | null {
    return this.tokenService.getUserId();
  }

  getBankId(): number | null {
    return this.tokenService.getBankId();
  }

  isSuperAdmin(): boolean {
    return this.getUserRole() === Role.SUPER_ADMIN;
  }

  isBankUser(): boolean {
    return this.getUserRole() === Role.BANK_USER;
  }

  isClient(): boolean {
    return this.getUserRole() === Role.CLIENT_USER;
  }

  getRedirectUrl(): string {
    const role = this.getUserRole();
    switch (role) {
      case Role.SUPER_ADMIN:
        return '/super-admin/dashboard';
      case Role.BANK_USER:
        return '/bank-user/dashboard';
      case Role.CLIENT_USER:
        return '/client/dashboard';
      default:
        return '/login';
    }
  }

  redirectToDashboard(): void {
    const url = this.getRedirectUrl();
    this.router.navigate([url]);
  }
}