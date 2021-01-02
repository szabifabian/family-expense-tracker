export interface Expense {
    id: number;
    title: number;
    type: 'EXPENSE' | 'SW';
    amount: number;
    about: string;
}