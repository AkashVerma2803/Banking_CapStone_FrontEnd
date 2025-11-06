import { Injectable } from '@angular/core';
import { UserInfo } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'banking_auth_token';
  private readonly USER_KEY = 'banking_user_info';

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  setUser(user: UserInfo): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): UserInfo | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  clear(): void {
    this.removeToken();
    this.removeUser();
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(payload.exp * 1000);
      return expirationDate < new Date();
    } catch (error) {
      return true;
    }
  }

  getUserRole(): number | null {
    const user = this.getUser();
    return user ? user.roleId : null;
  }

  getUserType(): string | null {
    const user = this.getUser();
    return user ? user.userType : null;
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  getBankId(): number | null {
    const user = this.getUser();
    return user ? (user.bankId || null) : null;
  }

  getUsername(): string | null {
    const user = this.getUser();
    return user ? user.username : null;
  }

  getEmail(): string | null {
    const user = this.getUser();
    return user ? user.email : null;
  }

  getFullName(): string | null {
    const user = this.getUser();
    return user ? (user.username) : null;
  }
}