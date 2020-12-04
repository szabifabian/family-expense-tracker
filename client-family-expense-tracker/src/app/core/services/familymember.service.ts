import { Injectable } from '@angular/core';
import { FamilyMember } from '../interfaces/familymember.interface';

@Injectable({
  providedIn: 'root'
})
export class FamilymemberService {
  members: FamilyMember[] = [
    {name: "User1", role: "ADMIN", amount:10500},
    {name: "User2", role: "USER", amount:12845},
    {name: "User3", role: "USER", amount:99845},
  ]

  constructor() { }

  public getMembers(): FamilyMember[]{
    return this.members
  }
}
