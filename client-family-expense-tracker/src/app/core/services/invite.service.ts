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
  familymember$ = new BehaviorSubject<Invitation[]>([]);

  constructor(private http: HttpClient, private ns: NotificationService) {}

  inviteUser(invitation: Invitation): Observable<Invitation> {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const { invited_user } = invitation;
    return this.http.post<Invitation>(
      `${baseUrl}/invitation/send`,
      invited_user,
      {
        headers: header,
      }
    );
  }
}
