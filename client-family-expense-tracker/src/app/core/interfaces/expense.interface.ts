export interface Expense {
    eId: number;
    uId: number;
    type: 'HW' | 'SW';
    details: string;
    timestamp: number;
    status: 'ADDED' | 'ASSIGNED' | 'DONE';
}