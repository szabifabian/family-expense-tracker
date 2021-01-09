import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Invitation } from '../interfaces/invitation.interface';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  invite$ = new BehaviorSubject<Invitation[]>([]);
  pendingInvitations$ = new BehaviorSubject<Invitation[]>([]);

  constructor(private http: HttpClient, private ns: NotificationService) {}

  inviteUser(invitation: Invitation): void {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const { invited_user } = {invited_user: invitation};
    this.http
      .post<string>(`${baseUrl}/invitation/send`, invited_user, {
        headers: header,
      })
      .subscribe()
  }

  getPendingInvitations(): void {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http
      .get<Invitation[]>(`${baseUrl}/invitation/pendings`, {
        headers: header,
      })
      .subscribe((i) => {
        this.pendingInvitations$.next(i);
      })
  }

  acceptInvitation(id: number): void {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http
      .put(`${baseUrl}/invitation/accept/${id}`,[], {
        headers: header,
        responseType: 'text' as 'json'
      })
      .subscribe(
        data => {
        window.location.reload();
      });
  }

  declineInvitation(id: number): void {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    this.http
      .put(`${baseUrl}/invitation/decline/${id}`,[], {
        headers: header,
        responseType: 'text' as 'json'
      })
      .subscribe(
        data => {
          window.location.reload();
        }
      );
  }
}
