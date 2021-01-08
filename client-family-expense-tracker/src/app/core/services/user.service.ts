import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile(): void {
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');

    this.http
      .get<User>(`${baseUrl}/user`, {
        headers: header,
      })
      .subscribe();
  }
}
