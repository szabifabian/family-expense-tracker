import { Injectable } from '@angular/core';
import { FamilyMember } from '../interfaces/familymember.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { baseUrl } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invitation } from '../interfaces/invitation.interface';
import { User } from '../interfaces/user.interface';
import { Family } from '../interfaces/family.interface';

@Injectable({
  providedIn: 'root',
})
export class FamilymemberService {
  familymember$ = new BehaviorSubject<FamilyMember[]>([]);
  family$ = new BehaviorSubject<Family[]>([]);
  invitations$ = new BehaviorSubject<Invitation[]>([]);
  user$ = new BehaviorSubject<FamilyMember[]>([]);

  constructor(private http: HttpClient, private ns: NotificationService) {}

  getFamilyName(): void {
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');
    this.http
      .get<Family[]>(`${baseUrl}/family/name`, { headers: header})
      .subscribe((i) => {
        this.family$.next([]);
        this.family$.next(this.family$.getValue().concat(i));
      });
  }

  getMembers(): void {
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');
    this.http
      .get<FamilyMember[]>(`${baseUrl}/familymember/members`, {
        headers: header,
      })
      .subscribe(
        (i) => {
          this.familymember$.next(i);
        },
        (error) => {}
      );
  }

  addFamily(name: Family): void {
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');
    const { family_name } = { family_name: name };
    this.http
      .post<FamilyMember>(`${baseUrl}/familymember/create`, family_name, {
        headers: header,
      })
      .subscribe(
        (i) => {
          this.familymember$.next(this.familymember$.getValue().concat([i]));
        },
        (error) => {}
      );
  }

  getUser() {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http
      .get<FamilyMember>(`${baseUrl}/familymember/member`, {
        headers: header,
      })
      .subscribe(
        (i) => {
          this.user$.next([]);
          this.user$.next(this.user$.getValue().concat([i]));
        },
        (error) => {}
      );
  }

  deleteFamilyMember(id: Number) {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http
      .delete<FamilyMember[]>(`${baseUrl}/familymember/delete/${id}`, {
        headers: header,
      })
      .subscribe(
        (i) => {
          this.familymember$.next(i);
        },
        (error) => {}
      );
  }

  deleteFamily() {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http
      .delete(`${baseUrl}/familymember/delete`, {
        headers: header,
        responseType: 'text' as 'json',
      })
      .subscribe(
        (data) => {
          window.location.reload();
        },
        (error) => {}
      );
  }
}
