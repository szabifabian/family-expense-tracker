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
}

export enum Status {
    Accepted = 'ACCEPTED',
    Pending = 'PENDING',
    Declined = 'DECLINED'
}