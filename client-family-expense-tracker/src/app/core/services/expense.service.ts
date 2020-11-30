import { Injectable } from '@angular/core';

import { Expense } from '../interfaces/expense.interface'

@Injectable({
	providedIn: 'root'
})
export class ExpenseService {
    expenses: Expense[] = [
        { eId: 1, uId: -1, type: 'SW', details: 'Első expense', timestamp: 1601024188, status: 'ADDED' },
        { eId: 2, uId: -1, type: 'HW', details: 'Második expense', timestamp: 1601024188, status: 'ADDED' }
    ];

    constructor() {}

    public getExpenses(): Expense [] {
        return this.expenses;
    }

}