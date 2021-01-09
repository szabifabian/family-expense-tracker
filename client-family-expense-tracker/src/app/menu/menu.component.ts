import { Component } from '@angular/core';

import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';
import { FamilymemberService } from '../core/services/familymember.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
	isLoggedIn$: Observable<boolean>;

	constructor(protected as: AuthService, public members: FamilymemberService) {
		this.isLoggedIn$ = as.isLoggedIn();
		this.members.getMembers();
		this.members.getUser();
	}

	logout(): void {
		this.as.logout();
	}

	checkMembers(): boolean {
		return this.members.familymember$.getValue().length !== 0;
	}

	isAdmin(): boolean {

		if(this.members.familymember$.getValue().length !== 0 && this.members.user$.getValue().length !== 0) {
		  let findMyId = 0;
	
	
		  while(this.members.familymember$.getValue()[findMyId].id !== this.members.user$.getValue()[0].id) {
			findMyId++;
		  }
	
		  return this.members.familymember$.getValue()[findMyId].role === "ADMIN";
		} else {
		  return false;
		}
	  }
}
