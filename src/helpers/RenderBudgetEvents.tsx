import { BudgetRule } from '../models/BudgetRule';
import addDays from 'date-fns/addDays';
import { BalanceChange } from '../models/BalanceChange';

const getDayIncrement = (rule: BudgetRule): number => {
  const amt = rule.recurrenceAmount || 1;
  switch (rule.recurrenceInterval) {
    case 'day': return 1 * amt;
    case 'week': return 7 * amt;
    case 'month': return 30 * amt; // TODO -- Should be more accurate per month, provide current date input
    case 'once':
    default: return 99999999;
  }
}

const generateEvents = (rule: BudgetRule, start: Date, end: Date): BalanceChange[] => {
  let d = new Date(rule.date || start)
  let loops = 0;
  let events: BalanceChange[] = []
  while (d <= end && ++loops < 100) {
    events = [ ...events, { date: new Date(d), change: rule.amount } ]
    d = addDays(d, getDayIncrement(rule))
  }
  return events;
}

export const RenderBalanceChanges = (rules: BudgetRule[], start: Date, end: Date): BalanceChange[] => {
  return rules.reduce((list: BalanceChange[], rule: BudgetRule) => {
    return [ ...list, ...generateEvents(rule, start, end) ]
  }, []).sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const RenderBudgetEvents = (rules: BudgetRule[], start: Date, end: Date) => {

  const changes = RenderBalanceChanges(rules, start, end);

  const events = changes.reduce((events, change) => {
    const last = events[events.length - 1]
    const next = { date: change.date, balance: last.balance + change.change }
    return [ ...events, next ]
  }, [{ date: start, balance: 0 }])

  console.log('Done! Rendered these events', events)
  
  return events;

}
