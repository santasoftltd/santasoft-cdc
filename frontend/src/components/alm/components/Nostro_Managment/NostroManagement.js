import DatePicker from '../../../santasoft/components/DatePicker'

import NostroTransfer from './components/NostroTransfer'
import NostroPosition from './components/NostroPosition'
import NostroForm from './components/NostroForm'

import React from 'react'
import './NostroManagement.css'

function NostroManagement({user, refresh, date, setDate, addMessageHandler}) {
  return (
    <div className='home'>

      <DatePicker date={date} setDate={setDate} />

      <div className='nostro-management-sub-home'>
        
        <NostroForm user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <NostroPosition user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <NostroTransfer user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
      
      </div>
    
    </div>
  )
}

export default NostroManagement