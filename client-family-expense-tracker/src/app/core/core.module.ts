
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ExpenseService } from './services/expense.service';
import { AuthService } from './services/auth.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatSnackBarModule
	],
	providers: [
		ExpenseService,
		AuthService,
	]
})
export class CoreModule { }