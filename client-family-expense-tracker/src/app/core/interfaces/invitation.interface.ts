import { User } from "./user.interface";

export interface Invitation {
    invited_user: string,
    status: 'ACCEPTED' | 'PENDING' | 'DECLINED',
    invitedBy: User
}