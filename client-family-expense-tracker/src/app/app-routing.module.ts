import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseComponent } from './expense/expense.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [{ path: '', component: ExpenseComponent },{ path: 'settings', component: SettingsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
