import { Injectable } from '@angular/core';
import { FamilyMember } from '../interfaces/familymember.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { baseUrl } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilymemberService {

  familymember$ = new BehaviorSubject<FamilyMember[]>([]);

  constructor(
    private http: HttpClient,
    private ns: NotificationService
) {}

getMembers(): void {


  const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
  );
  this.http.get<FamilyMember[]>(`${baseUrl}/familymember/members`, {headers: header})
      .subscribe(i => {
          this.familymember$.next(i);
      });
}
}
