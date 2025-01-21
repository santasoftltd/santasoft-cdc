import DatePicker from "../../../../../santasoft/components/DatePicker"

import RealTimeComapaniesList from "./RealTimeComapaniesList"
import RealTimeCompaniesAccountsList from "./RealTimeCompaniesAccountsList"
import RealTimeTransactions from "./RealTimeTransactions"

import { useState, useEffect } from 'react'

import '../../Blotter.css'

function RealTimeBlotter({ user, addMessageHandler }) {

  const getDate = () => {
    var date = new Date();
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  const [date, setDate] = useState(getDate)

  return (
    <div className='fixed-income-real-time-blotter-sub-home'>

      <DatePicker date={date} setDate={setDate} />

      <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '2', gridColumnStart: '1', gridColumnEnd: '2' }}><RealTimeComapaniesList user={user} addMessageHandler={addMessageHandler} /></div>

      <div className='table-container' style={{ gridRowStart: '2', gridRowEnd: '3', gridColumnStart: '1', gridColumnEnd: '2' }}><RealTimeCompaniesAccountsList user={user} addMessageHandler={addMessageHandler} /></div>

      <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '3', gridColumnStart: '2', gridColumnEnd: '3' }}><RealTimeTransactions user={user} addMessageHandler={addMessageHandler} /></div>

    </div>
  )
}

export default RealTimeBlotter