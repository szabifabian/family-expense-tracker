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
    })
  };

  constructor(
    private http: HttpClient,
    private ns : NotificationService,
    private router: Router
  ) { }

  register(user: User): void {
    this.http.post<User>(`${baseUrl}/user/register`, user, this.httpOptions).subscribe(
      data => {
        console.log(data);
        this.ns.show('Sikeres regisztráció!');
        this.router.navigate(['/login']);
      },
      error => {
        this.ns.show('HIBA! Regisztráció sikertelen!');
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
        this.ns.show('Sikeres bejelentkezés!');
      },
      error => {
        this.ns.show('HIBA! Bejelentkezés sikertelen!');
        console.error(error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLogin$.next(false);
  }

  protected hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}