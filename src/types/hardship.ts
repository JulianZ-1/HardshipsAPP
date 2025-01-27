export interface Hardship {
    hardshipTypeName: string;
    debtID: number;
    name: string;
    dob: Date;
    income: number;
    expenses: number;
    comments?: string;
}