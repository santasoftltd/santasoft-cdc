import DatePicker from '../../../santasoft/components/DatePicker'

import InterbankGrid from './components/InterbankGrid'

import React from 'react'
import './Interbank.css'

function Interbank({ user, refresh, date, setDate, addMessageHandler }) {
  return (
    <div className='home'>

      <DatePicker date={date} setDate={setDate} />

      <div className='mm-interbank-sub-home'>

        <InterbankGrid user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
      
      </div>
    </div>
  )
}

export default Interbank