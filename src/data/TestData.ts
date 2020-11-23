import { BudgetRule } from '../models/BudgetRule';

const start = new Date()

const Once = (name: string, amount: number, date: Date = new Date()): BudgetRule => ({ name, amount, recurrenceInterval: 'once', date: date.getTime() })
const Daily = (name: string, amount: number): BudgetRule => ({ name, amount, recurrenceInterval: 'day', date: start.getTime() })
const Biweekly = (name: string, amount: number): BudgetRule => ({ name, amount, recurrenceInterval: 'week', recurrenceAmount: 2, date: start.getTime() })
const Weekly = (name: string, amount: number): BudgetRule => ({ name, amount, recurrenceInterval: 'week', date: start.getTime() })
const Monthly = (name: string, amount: number): BudgetRule => ({ name, amount, recurrenceInterval: 'month', date: start.getTime() })

export const TestData: BudgetRule[] = [
  Once('Initial Balance', 500),

  // Income
  Biweekly('Allowance', 200),

  // Expenses
  Weekly('Food', -60),
  Monthly('Mortgage', -2000),
  Monthly('Patreon', -10),
  Once('Vacation', -1000, new Date('2021-03-15'))

]
