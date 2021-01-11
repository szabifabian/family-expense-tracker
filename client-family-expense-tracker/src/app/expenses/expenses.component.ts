import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../core/services/expense.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditExpenseComponent } from './add-edit-expense/add-edit-expense.component';
import { Expense } from '../core/interfaces/expense.interface';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  constructor(public is: ExpenseService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.is.getExpenses();
  }

  openAddExpenseDialog(): void {
		const dialogRef = this.dialog.open(AddEditExpenseComponent, {
			width: '1000px'
		})
  }

  openEditExpenseDialog(expense: Expense): void {
		const dialogRef = this.dialog.open(AddEditExpenseComponent, {
      width: '1000px',
      data: expense
    })
  }
  
  deleteExpense(id: Number): void {
    this.is.deleteExpense(id);
  }
}
