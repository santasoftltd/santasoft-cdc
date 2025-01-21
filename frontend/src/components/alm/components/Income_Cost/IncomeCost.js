import DatePicker from '../../../santasoft/components/DatePicker'

import Panel from './components/Panel'
import Cost from './components/Cost'
import ManualAdjustment from './components/ManualAdjustment'
import Income from './components/Income'

import React from 'react'
import './IncomeCost.css'

function IncomeCost({user, refresh, date, setDate, addMessageHandler}) {
  return (
    <div className='home'>

      <DatePicker date={date} setDate={setDate} />
      
      <div className='alm-income-cost-sub-home'>

        <Panel user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <Cost user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <ManualAdjustment user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <Income user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>

      </div>

    </div>
  )
}

export default IncomeCost