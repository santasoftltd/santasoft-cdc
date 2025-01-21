import NOP_PL from './components/NOP_PL'
import SameDayMTM from './components/SameDayMTM'
import TmuFlow from './components/TMU_Flow'
import IncomeSpot from './components/IncomeSpot'
import IncomeFwd from './components/IncomeFwd'
import IncomeFwdSales from './components/IncomeFwdSales'
import DatePicker from '../../../santasoft/components/DatePicker'

import React from 'react'
import './IncomeDetail.css'

function IncomeDetail({ user, refresh, date, setDate, addMessageHandler }) {
  return (
    <div className='home'>
      <DatePicker date={date} setDate={setDate} />
      <div className='income-detail-sub-home'>
        <NOP_PL user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <SameDayMTM user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <TmuFlow user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <IncomeSpot user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <IncomeFwd user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        <IncomeFwdSales user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
      </div>

    </div>
  )
}

export default IncomeDetail