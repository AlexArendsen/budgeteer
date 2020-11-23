import addDays from 'date-fns/addDays';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';

const monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

export interface MonthPoint {
  date: Date;
  label: string;
}

export const EnumerateMonths = (start: Date, end: Date) => {
  let points: MonthPoint[]  = []
  let wrk = start;
  while (wrk <= end) {
    points = [ ...points, { date: wrk, label: `${ monthNames[getMonth(wrk)] } ${ getYear(wrk) }` } ]
    wrk = addDays(wrk, 30)
  }
  console.log('Enumerating months', points)

  return points;
}
