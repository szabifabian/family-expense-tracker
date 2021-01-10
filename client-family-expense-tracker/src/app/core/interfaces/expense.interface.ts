export interface Expense {
    id: number;
    title: string;
    type: 'EXPENSE' | 'INCOME';
    amount: number;
    about: string;
}