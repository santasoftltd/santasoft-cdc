import SwapPointsComponent from './components/SwapPointsComponent'
import SwapPointsDaysUpdate from './components/SwapPointsDaysUpdate'
import DatePicker from '../../../santasoft/components/DatePicker'

import React from 'react'
import './SwapPoints.css'

function SwapPoints({ user, refresh, date, setDate, addMessageHandler }) {
  return (
    <div className='home'>
      <DatePicker date={date} setDate={setDate} />
      <div className='swap-points-sub-home'>
        <SwapPointsComponent user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <SwapPointsDaysUpdate user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
      </div>

    </div>
  )
}

export default SwapPoints