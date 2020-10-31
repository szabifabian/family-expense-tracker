import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Balance } from "./balance";
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

    @ManyToMany(() => Balance, balance => balance.familymembers)
    balances = new Collection<Balance>(this);
}

export enum FamilyRole {
    User = 'USER',
    Admin = 'ADMIN',
  }
  