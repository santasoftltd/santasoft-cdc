import YearlyMonthlyIncome from './components/YearlyMonthlyIncome'
import YearlyDailyIncome from './components/YearlyDailyIncome'

import DatePicker from '../../../santasoft/components/DatePicker'

import React from 'react'
import './IncomeFormatTwo.css'

import { useState, useEffect } from 'react'

function IncomeFormatTwo({ user, refresh, date, setDate, addMessageHandler }) {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const monthNumbers = { "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12 };

  const getYear = (date) => {
    date = date.split('-')
    return date[0]
  }

  const getMonthNumber = (x) => {
    if (x == null) {
      let month = new Date()
      return month.getMonth() + 1;
    }
    else {
      return monthNumbers[x];
    }
  }

  const getMonth = () => {
    let monthNo = new Date()
    return months[monthNo.getMonth()];
  }

  const [year, setYear] = useState(getYear(date))

  const [month, setMonth] = useState(getMonth())

  const [monthNumber, setMonthNumber] = useState(getMonthNumber(null))

  useEffect(() => {
    setYear(getYear(date));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    setMonthNumber(getMonthNumber(month));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  return (
    <div className='home'>
      <DatePicker date={date} setDate={setDate} />
      <div className='income-format-two-sub-home'>
        <YearlyMonthlyIncome user={user} refresh={refresh} year={year} setMonth={setMonth} addMessageHandler={addMessageHandler}/>
        <YearlyDailyIncome user={user} refresh={refresh} year={year} month={month} monthNumber={monthNumber} addMessageHandler={addMessageHandler}/>
      </div>

    </div>
  )
}

export default IncomeFormatTwo