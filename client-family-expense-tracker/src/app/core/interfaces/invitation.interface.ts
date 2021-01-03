export interface Invitation {
    invited_user: string,
    status: 'ACCEPTED' | 'PENDING' | 'DECLINED'
}