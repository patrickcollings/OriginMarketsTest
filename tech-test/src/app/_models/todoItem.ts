export interface TodoItem {
    id: number;
    label: string;
    description: string;
    category: string;
    done: boolean | string;
}