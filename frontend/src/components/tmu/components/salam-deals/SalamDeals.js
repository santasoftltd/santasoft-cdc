import React from 'react'

import SalamMaturityToday from '../dashboard/components/SalamMaturityToday'
import SalamOutstanding from '../dashboard/components/SalamOutstanding'
import Salam from '../salam/Salam'

import DatePicker from '../../DatePicker'

import { useState } from 'react'

import './SalamDeals.css'

function SalamDeals({user, refresh, date, setDate, addMessageHandler}) {

  const [salamId, setSalamId] = useState('')

  const [dispalySalam, setDispalySalam] = useState(false)

  const onSalamTransactionClicked = id => {
    if(dispalySalam)
    {
      setDispalySalam(false)
    }
    else{
      setSalamId(id)
      setDispalySalam(true)
    }
  }

  return (
    <div className='home'>
      <DatePicker date={date} setDate={setDate}/>
      <div className='salam-deals-sub-home'>
        <SalamMaturityToday user={user} refresh={refresh} date={date} onSalamTransactionClicked={onSalamTransactionClicked} singleTitle={true} addMessageHandler={addMessageHandler}/>
        <SalamOutstanding user={user} refresh={refresh} date={date} onSalamTransactionClicked={onSalamTransactionClicked} singleTitle={true} addMessageHandler={addMessageHandler}/>
        {dispalySalam && <Salam user={user} date={date} refresh={refresh} onSalamTransactionClicked={onSalamTransactionClicked} salamId={salamId} addMessageHandler={addMessageHandler}/>}
      </div>
    </div>
  )
}

export default SalamDeals