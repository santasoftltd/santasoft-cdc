import YearlyDailyIncome from './components/YearlyDailyIncome'
import MonthlyDailyIncome from './components/MonthlyDailyIncome'
import DaysDailyIncome from './components/DaysDailyIncome'

import DatePicker from '../../../santasoft/components/DatePicker'

import React from 'react'
import './DailyIncome.css'

import { useState, useEffect } from 'react'

function DailyIncome({ user, refresh, date, setDate, addMessageHandler }) {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const monthNumbers = { "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12 };

  const getYear = () => {
    let year = new Date()
    return year.getFullYear();
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

  const [year, setYear] = useState(getYear())

  const [month, setMonth] = useState(getMonth())

  const [monthNumber, setMonthNumber] = useState(getMonthNumber(null))

  useEffect(() => {
    setMonthNumber(getMonthNumber(month));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  return (
    <div className='home'>
      <DatePicker date={date} setDate={setDate} />
      <div className='daily-income-sub-home'>
        <YearlyDailyIncome user={user} refresh={refresh} setYear={setYear} addMessageHandler={addMessageHandler} />
        <MonthlyDailyIncome user={user} refresh={refresh} year={year} setMonth={setMonth} addMessageHandler={addMessageHandler} />
        <DaysDailyIncome user={user} refresh={refresh} year={year} monthNumber={monthNumber} month={month} addMessageHandler={addMessageHandler} />
      </div>
    </div>
  )
}

export default DailyIncome