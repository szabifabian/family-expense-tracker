import { Injectable } from '@angular/core';
import { FamilyMember } from '../interfaces/familymember.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { baseUrl } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invitation } from '../interfaces/invitation.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class FamilymemberService {
  familymember$ = new BehaviorSubject<FamilyMember[]>([]);
  invitations$ = new BehaviorSubject<Invitation[]>([]);
  user$ = new BehaviorSubject<FamilyMember[]>([]);


  constructor(private http: HttpClient, private ns: NotificationService) {}

  getMembers(): void {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    ).set('Content-Type', 'application/json');
    this.http
      .get<FamilyMember[]>(`${baseUrl}/familymember/members`, {
        headers: header,
      })
      .subscribe((i) => {
        this.familymember$.next(i);
        console.log(i);
      });
  }

  addFamily(): void {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    ).set('Content-Type', 'text');
    this.http
    .post<FamilyMember>(`${baseUrl}/familymember/create`,[], {
      headers: header
    })
    .subscribe((i) => {
      this.familymember$.next(this.familymember$.getValue().concat([i]));
    },
    error => {
      console.log(error);
    });
  }

  getUser() {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    )
    this.http
    .get<FamilyMember>(`${baseUrl}/familymember/member`, {
      headers: header
    })
    .subscribe((i) => {
      this.user$.next(this.user$.getValue().concat([i]))
    },
    error => {
      console.log(error);
    });
  }

  deleteFamilyMember(id: Number) {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    )
    this.http
    .delete<FamilyMember[]>(`${baseUrl}/familymember/delete/${id}`, {
      headers: header
    })
    .subscribe((i) => {
      this.familymember$.next(i)
    },
    error => {
      console.log(error);
    });
  }

  deleteFamily() {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    )
    this.http
    .delete(`${baseUrl}/familymember/delete`, {
      headers: header,
      responseType: 'text' as 'json'
    })
    .subscribe(
    data => {
      window.location.reload();
    },
    error => {
      console.log(error);
    });
  }
}
