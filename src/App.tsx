import React from 'react';
import './App.css';
import { BudgetGraph } from './components/BudgetGraph';
import { BudgetIncomeExpenseAnalysis } from './components/BudgetIncomeExpenseAnalysis';
import addDays from 'date-fns/addDays';

export const App = () => {

  const start = new Date()
  const end = addDays(start, 360)

  return (
    <div className="App">
      <BudgetGraph start={ start } end={ end } />
      <BudgetIncomeExpenseAnalysis start={ start } />
    </div>
  );
}

