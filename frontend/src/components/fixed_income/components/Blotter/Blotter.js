import BlotterSelector from './components/BlotterSelector'

import RealTimeBlotter from './components/real_time_blotter/RealTimeBlotter'
import SecuritiesBlotter from './components/securities_blotter/SecuritiesBlotter'
import CashBlotter from './components/cash_blotter/CashBlotter'
import AMC_Blotter from './components/amc_blotter/AMC_Blotter'
import AuditBlotter from './components/audit_blotter/AuditBlotter'
import OverallBlotter from './components/overall_blotter/OverallBlotter'

import { useState, useEffect } from 'react'

import './Blotter.css'

function Blotter({user, addMessageHandler}) {

  const [blotter, setBlotter] = useState('real-time-blotter')

  return (
    <div className="home">
      
      <BlotterSelector blotter={blotter} setBlotter={setBlotter}/>

      {blotter === 'real-time-blotter' && <RealTimeBlotter user={user} addMessageHandler={addMessageHandler}/>}
      {blotter === 'securities-blotter' && <SecuritiesBlotter user={user} addMessageHandler={addMessageHandler}/>}
      {blotter === 'cash-blotter' && <CashBlotter user={user} addMessageHandler={addMessageHandler}/>}
      {blotter === 'amc-blotter' && <AMC_Blotter user={user} addMessageHandler={addMessageHandler}/>}
      {blotter === 'audit-blotter' && <AuditBlotter user={user} addMessageHandler={addMessageHandler}/>}
      {blotter === 'overall-blotter' && <OverallBlotter user={user} addMessageHandler={addMessageHandler}/>}

    </div>
  )
}

export default Blotter