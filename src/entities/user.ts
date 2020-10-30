import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { FamilyMember } from "./familymember";

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  unique_code!: string; //could be 3letters-3numbers (ex:ABC123)

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => FamilyMember, familymember => familymember.user)
  familymambers = new Collection<FamilyMember>(this);

}