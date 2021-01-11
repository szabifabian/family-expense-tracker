import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { FamilyComponent} from './family/family.component';
import { InviteComponent} from './invite/invite.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AnonymGuard } from './core/guards/anonym.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', component: LoginComponent,  pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AnonymGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AnonymGuard] },
  { path: 'expenses',  component: ExpensesComponent, canActivate: [AuthGuard] },
  { path: 'family', component: FamilyComponent, canActivate: [AuthGuard]},
  { path: 'invite', component: InviteComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '404', component: PagenotfoundComponent },
	{ path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
