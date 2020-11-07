import { Cascade, Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Family } from "./family";
import { FamilyMember } from "./familymember";

@Entity()
export class Balance{

    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property()
    type!: BalanceType;

    @Property()
    amount!: number;

    @Property()
    about?: string;

    @ManyToMany(() => FamilyMember, 'balances', { owner: true, cascade: [Cascade.ALL] })
    familymembers = new Collection<FamilyMember>(this);

    @Property()
    createdAt = new Date();
  
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

}

export enum BalanceType {
    Income = 'INCOME',
    Expense = 'EXPENSE',
}