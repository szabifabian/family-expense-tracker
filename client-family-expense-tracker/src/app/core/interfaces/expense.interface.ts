export interface Expense {
    id: number;
    title: number;
    type: 'EXPENSE' | 'INCOME';
    amount: number;
    about: string;
}