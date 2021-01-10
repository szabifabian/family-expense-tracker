import { FamilyMember } from "./familymember.interface";

export interface Family {
  id: number;
  family_name: string;
  familymembers: FamilyMember;
}
