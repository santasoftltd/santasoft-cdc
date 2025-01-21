import DatePicker from '../../../santasoft/components/DatePicker'

import BookSummary from './components/BookSummary'

import React from 'react'

import './Dashboard.css'

function Dashboard({ user, refresh, date, setDate, addMessageHandler }) {
  return (
    <div className='home'>

      <DatePicker date={date} setDate={setDate} />

      <div className='alm-dashboard-sub-home'>

        <BookSummary user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
      
      </div>
    
    </div>
  )
}

export default Dashboard