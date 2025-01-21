import DualDatePicker from '../../../tmu/DualDatePicker'

import AccruedIncomeOne from './components/AccruedIncomeOne'
import AccruedIncomeTwo from './components/AccruedIncomeTwo'
import AccruedIncomeThree from './components/AccruedIncomeThree'
import AccruedIncomeFour from './components/AccruedIncomeFour'

import { useState } from 'react'

import React from 'react'
import './AccrualTreasury.css'

function AccrualTreasury({ user, refresh, date, addMessageHandler }) {

  const [fromDate, setFromDate] = useState(date)

  const [toDate, setToDate] = useState(date)

  return (
    <div className='home'>

      <DualDatePicker toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate}/>

      <div className='accrued-treasury-sub-home'>
      
        <AccruedIncomeOne user={user} refresh={refresh} fromDate={fromDate} toDate={toDate} addMessageHandler={addMessageHandler}/>
        <AccruedIncomeTwo user={user} refresh={refresh} fromDate={fromDate} toDate={toDate} addMessageHandler={addMessageHandler}/>
        <AccruedIncomeThree user={user} refresh={refresh} fromDate={fromDate} toDate={toDate} addMessageHandler={addMessageHandler}/>
        <AccruedIncomeFour user={user} refresh={refresh} fromDate={fromDate} toDate={toDate} addMessageHandler={addMessageHandler}/>
      
      </div>
      
    </div>
  )
}

export default AccrualTreasury