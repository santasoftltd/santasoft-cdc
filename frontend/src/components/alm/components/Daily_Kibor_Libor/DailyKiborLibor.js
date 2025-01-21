import DatePicker from '../../../santasoft/components/DatePicker'

import KiborGrid from './components/KiborGrid'
import LiborGrid from './components/LiborGrid'

import React from 'react'

import './DailyKiborLibor.css'

function DailyKiborLibor({ user, refresh, date, setDate, addMessageHandler }) {
  return (
    <div className='home'>

        <DatePicker date={date} setDate={setDate} />

        <div className='branch-position-sub-home'>

            <KiborGrid user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
            <LiborGrid user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>

        </div>
    </div>
  )
}

export default DailyKiborLibor