import DatePicker from '../../../santasoft/components/DatePicker'

import BranchPositionGrid from './components/BranchPositionGrid'

import React from 'react'

import './BranchPosition.css'

function BranchPosition({ user, refresh, date, setDate, addMessageHandler, infoBarOnedata, infoBarFourdata, inflowOutflowDataSummary }) {
  return (
    <div className='home' >

      <DatePicker date={date} setDate={setDate} />

      <div className='branch-position-sub-home'>

        <BranchPositionGrid user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} infoBarOnedata={infoBarOnedata} infoBarFourdata={infoBarFourdata} inflowOutflowDataSummary={inflowOutflowDataSummary}/>

      </div>

    </div>
  )
}

export default BranchPosition