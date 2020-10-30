import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Family } from "./family";
import { User } from "./user";

@Entity()
export class FamilyMember{
    
    @PrimaryKey()
    id!: number;

    @Property()
    role!: FamilyRole

    @ManyToOne(() => User)
    user!: User

    @ManyToOne(() => Family)
    family!: Family
}

export enum FamilyRole {
    User = 'USER',
    Admin = 'ADMIN',
  }
  