import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';
import { ExpenseService } from  '../../core/services/expense.service';
import { Expense } from '../../core/interfaces/expense.interface';

@Component({
  selector: 'app-add-edit-expense',
  templateUrl: './add-edit-expense.component.html',
  styleUrls: ['./add-edit-expense.component.scss']
})
export class AddEditExpenseComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private ns: NotificationService, public is: ExpenseService) {
    this.expenseForm = this.formBuilder.group({
      title: [null, Validators.required],
      about: [null, Validators.required],
      type: null,
      amount: null,
    });
   }

  ngOnInit(): void {
  }

  expenseForm: FormGroup;

  addExpense(form: FormGroup) {
    if (form.valid) {
      this.is.addExpense(<Expense>form.value);
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
  }


}
