export interface BudgetRule {

  name: string;
  date?: number;
  recurrenceAmount?: number;
  recurrenceInterval: 'once' | 'day' | 'week' | 'month';
  amount: number;

}
