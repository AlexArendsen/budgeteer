import React from 'react';
import { TestData } from '../data/TestData';
import { RenderBudgetEvents } from '../helpers/RenderBudgetEvents';
import { EnumerateMonths } from '../helpers/DateHelpers';
import { VictoryChart, VictoryLine } from 'victory'
import { LineChart } from 'react-chartkick';
import 'chart.js'

export const BudgetGraph = (props: { start: Date, end: Date }) => {

  const { start, end } = props
  //const data = RenderBudgetEvents(TestData, start, end).map(e => ({ date: e.date.getTime(), balance: e.balance }));
  const data = RenderBudgetEvents(TestData, start, end);
  //const months = EnumerateMonths(start, end).map(x => ({ date: x.date.getTime(), label: x.label }));
  const collatedData = data.reduce((obj, next) => ({ ...obj, [next.date.toDateString()]: next.balance }), {})

  return <LineChart data={ collatedData } height={ window.innerHeight + 'px' } />;

  // Victory Chart, which was easy but looked gross
  /*return (
    <VictoryChart>
      <VictoryLine data={ data } x="date" y="balance" />
    </VictoryChart>
  )*/

  // Recharts, which was actually just broken re: reference lines?? Also couldn't handle dates
  /*const DateTick = (msTime: any) => {
    return (
      <div>
        <strong>{ (new Date(msTime)).getFullYear() }</strong>
      </div>
    )
  }
  return (
    <LineChart
      width={ window.innerWidth }
      height={ window.innerHeight }
      data={ data.slice(1) }
    >
      <XAxis dataKey="date" label="Date" tick={<DateTick />} />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#eee" />
      <ReferenceLine x={ 161447400000 } stroke="red" label="Test" alwaysShow />
      { months.map((m, idx) => (<ReferenceLine key={ idx } x={ m.date } stroke="red" label={ m.label } />)) }
      <Line type="monotone" dataKey="balance" stroke="green" yAxisId={0} />
    </LineChart>
  )*/

}
