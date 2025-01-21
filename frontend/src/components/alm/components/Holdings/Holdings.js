import DatePicker from '../../../santasoft/components/DatePicker'

import LessThanWeek from './components/LessThanWeek'
import UpcomingCoupon from './components/UpcomingCoupon'

import React from 'react'
import './Holdings.css'

function Holdings({user, refresh, date, setDate, addMessageHandler}) {
  return (
    <div className='home'>

      <DatePicker date={date} setDate={setDate} />
      
      <div className='alm-holdings-sub-home'>

        <LessThanWeek user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <UpcomingCoupon user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>

      </div>

    </div>
  )
}

export default Holdings