import { Component, OnInit } from '@angular/core';
import { FamilymemberService } from '../core/services/familymember.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role', 'amount'];

  constructor(public members: FamilymemberService) { }

  ngOnInit(): void {
  }

}
