import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NotificationService } from './notification.service';

import { User } from '../interfaces/user.interface';

import { baseUrl } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin$ = new BehaviorSubject<boolean>(this.hasToken());
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    }),
  };

  httpOptionsRegister = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '',
    }),
    responseType: 'text' as 'json',
  };

  constructor(
    private http: HttpClient,
    private ns : NotificationService,
    private router: Router
  ) { }

  register(user: User): void {
    this.http.post<User>(`${baseUrl}/user/register`, user, this.httpOptionsRegister).subscribe(
      data => {
        this.ns.show('You have registered successfully!');
        this.router.navigate(['/login']);
      },
      error => {
        this.ns.show('Error! Registration failed!');
        console.error(error);
      }
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin$.asObservable();
  }

  login(user: User): void {
    this.http.post<any>(`${baseUrl}/user/login`, user, this.httpOptions).subscribe(
      data => {
        localStorage.setItem('token', data['token']);
        
        this.isLogin$.next(true);
        this.ns.show('You are logged in!');
        this.router.navigate(['/profile']).then(() => {
          window.location.reload();
        });
      },
      error => {
        this.ns.show('Error! Invalid credentials!');
        console.error(error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLogin$.next(false);
    this.ns.show('You have logged out successfully!');
    this.router.navigate(['/login']);
  }

  protected hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}