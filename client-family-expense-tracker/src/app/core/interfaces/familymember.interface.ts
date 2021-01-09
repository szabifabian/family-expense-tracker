import { User } from '../interfaces/user.interface'

export interface FamilyMember{
    name: string,
    role: 'ADMIN' | 'USER',
    amount: number,
    user: User,
    id: number
}