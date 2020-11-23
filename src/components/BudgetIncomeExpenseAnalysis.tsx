import React from 'react';
import { TestData } from '../data/TestData';
import { RenderBalanceChanges } from '../helpers/RenderBudgetEvents';
import addDays from 'date-fns/addDays';

export const BudgetIncomeExpenseAnalysis = (props: { start: Date }) => {

    const data = TestData.slice(1);
    const end = addDays(props.start, 365)
    const events = RenderBalanceChanges(data, props.start, end);

    const perYear: { income: number, expenses: number } = events
        .reduce((sum, next) => {
            if (next.change <= 0) return ({ income: sum.income, expenses: sum.expenses - next.change })
            else return ({ income: sum.income + next.change, expenses: sum.expenses })
        }, { income: 0, expenses: 0 })

    const summaries = [
        { label: 'Per Year', income: perYear.income, expenses: perYear.expenses, profit: perYear.income - perYear.expenses },
        { label: 'Per Month', income: perYear.income / 12, expenses: perYear.expenses / 12, profit: (perYear.income - perYear.expenses) / 12 },
        { label: 'Per Week', income: perYear.income / 52, expenses: perYear.expenses / 52, profit: (perYear.income - perYear.expenses) / 52 }
    ]

    const formatNumberAsMoney = (n: number) => {
        return `$${n.toFixed(2)}`
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '32px 0', width: '100%' }}>
            { summaries.map(s => {
                return (
                    <div style={{ border: 'solid 1px rgba(0,0,0,0.1)', margin: '16px', padding: '16px' }}>
                        <strong>{ s.label }</strong>
                        <div style={{ color: 'green', fontSize: 24 }}>{ formatNumberAsMoney(s.income) }</div>
                        <div style={{ color: 'red', fontSize: 24 }}>{ formatNumberAsMoney(s.expenses) }</div>
                        <div style={{ color: (s.profit > 0 ? 'green' : 'red'), fontSize: 48 }}>{ formatNumberAsMoney(s.profit) }</div>
                    </div>
                )
            }) }
        </div>
    )


}