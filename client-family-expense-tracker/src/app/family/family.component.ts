import { Component, OnInit } from '@angular/core';
import { FamilyMember } from '../core/interfaces/familymember.interface';
import { FamilymemberService } from '../core/services/familymember.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
})
export class FamilyComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role', 'amount'];

  constructor(public members: FamilymemberService) {}

  ngOnInit(): void {
    if (this.members.familymember$.getValue.length !== 0) {
      this.members.getMembers();
    }
  }

  createFamily(): void {
    this.members.addFamily().subscribe();
  }
}
