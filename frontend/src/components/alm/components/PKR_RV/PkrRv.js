import DatePicker from '../../../santasoft/components/DatePicker'

import PkrRvGrid from './components/PkrRvGrid'

import React from 'react'
import './PkrRv.css'

function PkrRv({ user, refresh, date, setDate, addMessageHandler }) {
  return (
    <div className='home'>

      <DatePicker date={date} setDate={setDate} />
      
      <div className='pkr-rv-sub-home'>

        <PkrRvGrid user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>

      </div>
    
    </div>
  )
}

export default PkrRv