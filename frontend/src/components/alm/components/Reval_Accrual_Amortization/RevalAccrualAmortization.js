import DatePicker from '../../../santasoft/components/DatePicker'

import Purchase from './components/Purchase'
import Coupon from './components/Coupon'
import Summary from './components/Summary'

import React from 'react'
import './RevalAccrualAmortization.css'

function RevalAccrualAmortization({user, refresh, date, setDate, addMessageHandler}) {
  return (
    <div className='home'>

      <DatePicker date={date} setDate={setDate} />
      
      <div className='alm-reval-accrual-amortization-sub-home'>
        <Purchase user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <Coupon user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <Summary user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
      </div>
      
    </div>
  )
}

export default RevalAccrualAmortization