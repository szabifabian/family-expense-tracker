import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../core/services/expense.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditExpenseComponent } from './add-edit-expense/add-edit-expense.component';

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

  openAddIssueDialog(): void {
		const dialogRef = this.dialog.open(AddEditExpenseComponent, {
			width: '1000px'
		})
  }
  
  deleteExpense(id: Number): void {
    this.is.deleteExpense(id);
  }
}
