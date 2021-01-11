import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';
import { ExpenseService } from  '../../core/services/expense.service';
import { Expense } from '../../core/interfaces/expense.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-expense',
  templateUrl: './add-edit-expense.component.html',
  styleUrls: ['./add-edit-expense.component.scss']
})
export class AddEditExpenseComponent implements OnInit {

  expenseForm: FormGroup;

  isEditing = false;
  expenseId = -1;

  constructor(private formBuilder: FormBuilder, private ns: NotificationService, public is: ExpenseService, @Inject(MAT_DIALOG_DATA) public data: Expense) {
    this.expenseForm = this.formBuilder.group({
      title: [null, Validators.required],
      about: [null, Validators.required],
      type: [null, Validators.required],
      amount: [null, Validators.required],
    });
    this.expenseId = data !== null ? data.id : -1;

   }

  ngOnInit(): void {
    if (this.data) {
        this.expenseForm.patchValue(this.data);
        this.isEditing = true;
    }
}

  addExpense(form: FormGroup) {
    if (form.valid && !this.isEditing) {
      this.is.addExpense(<Expense>form.value);
    }
    else if (form.valid && this.isEditing) {
      this.is.editExpense(<Expense>form.value, this.expenseId);
    } else {
      this.ns.show('Error! Invalid data!');
    }
  }


}
