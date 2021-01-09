import { Component, OnInit } from '@angular/core';
import { FamilymemberService } from '../core/services/familymember.service';
import { InviteService } from '../core/services/invite.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
})
export class FamilyComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role', 'operations'];
  displayedColumns2: string[] = ['name', 'accept', 'decline'];

  constructor(public members: FamilymemberService, public invitations: InviteService) {}

  ngOnInit(): void {
    this.members.getUser();
    this.members.getMembers();
    this.invitations.getPendingInvitations();
  }

  createFamily(): void {
    this.members.addFamily();
  }

  deleteFamilyMember(id: Number): void {
    this.members.deleteFamilyMember(id);
  }

  deleteFamily(): void {
    this.members.deleteFamily();
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

  acceptInvitation(id: number):void {
    this.invitations.acceptInvitation(id);
  }

  declineInvitation(id: number):void {
    this.invitations.declineInvitation(id);
  }
}
