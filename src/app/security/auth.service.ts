import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegisterInfo} from './register-info';
import {Router} from '@angular/router';

// глобальная переменная для хранения URL
export const LOGIN_URL_TOKEN = new InjectionToken<string>('url');
export const REGISTER_URL_TOKEN = new InjectionToken<string>('url');

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(LOGIN_URL_TOKEN) private loginUrl, @Inject(REGISTER_URL_TOKEN) private registerUrl,
              private http: HttpClient, private router: Router) {
  }

  loginUser(info): Observable<any> {
    return this.http.post<any>(this.loginUrl, info, httpOptions);
  }

  registerUser(info: RegisterInfo): Observable<any> {
    return this.http.post<any>(this.registerUrl, info, httpOptions);
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return 'Bearer ' + localStorage.getItem('token');
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserAuthorities(): string[] {
    return localStorage.getItem('authorities').split(',');
  }

  getUserName(): string {
    return localStorage.getItem('username');
  }

  checkUserRoles(allowedRoles: string[]): boolean {
    for (const allowedRole of allowedRoles) {
      for (const userRole of this.getUserAuthorities()) {
        if (userRole === allowedRole) { return true; }
      }
    }
    return false;
  }

  isRouteEnabled(link: string): boolean {
    const ar: string[] = [];
    const linkRoles = this.router.config.filter(value => {
      if (value.path === link) {
        return value;
      }
    });
    linkRoles[0].data.roles.forEach(v => ar.push(v));
    return this.checkUserRoles(ar);
   }

}
