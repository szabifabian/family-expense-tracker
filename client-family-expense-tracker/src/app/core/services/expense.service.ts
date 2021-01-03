import { Injectable } from '@angular/core';

import { Expense } from '../interfaces/expense.interface'
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { baseUrl } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ExpenseService {
    expenses$ = new BehaviorSubject<Expense[]>([]);

    constructor(
        private http: HttpClient,
        private ns: NotificationService
    ) {}

    getExpenses(): void {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.get<Expense[]>(`${baseUrl}/balance`, {headers: header})
            .subscribe(i => {
                this.expenses$.next(i);
            });
    }
}