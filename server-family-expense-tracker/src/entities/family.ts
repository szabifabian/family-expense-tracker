import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { FamilyMember } from "./familymember";

@Entity()
export class Family{

    @PrimaryKey()
    id!: number;

    @Property()
    family_name?: string; 

    @OneToMany(() => FamilyMember, familymember => familymember.family)
    familymembers = new Collection<FamilyMember>(this);

    @Property()
    createdAt = new Date();
  
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

}