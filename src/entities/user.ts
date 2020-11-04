import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { FamilyMember } from "./familymember";
import { Invitation } from "./invitation";
import { uuid } from 'uuidv4';

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
  unique_code = uuid();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => FamilyMember, familymember => familymember.user)
  familymembers = new Collection<FamilyMember>(this);

  @OneToMany(() => Invitation, invitation => invitation.invitedBy)
  invitations = new Collection<Invitation>(this);

}