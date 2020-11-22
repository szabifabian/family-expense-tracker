import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./user";

@Entity()
export class Invitation{

    @PrimaryKey()
    id!: number;

    @Property()
    invited_user!: string;

    @ManyToOne(() => User)
    invitedBy!: User

    @Property()
    status!: Status;

    @Property()
    createdAt = new Date();
  
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}

export enum Status {
    Accepted = 'ACCEPTED',
    Pending = 'PENDING',
    Declined = 'DECLINED'
}