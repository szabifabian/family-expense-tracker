import { Component, OnInit } from '@angular/core';
import { FamilymemberService } from '../core/services/familymember.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
})
export class FamilyComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role', 'operations'];

  constructor(public members: FamilymemberService) {}

  ngOnInit(): void {
    this.members.getUser();
    this.members.getMembers();
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
    return this.members.familymember$.getValue().length!==0 && this.members.familymember$.getValue()[0].role === "ADMIN";
  }
}
