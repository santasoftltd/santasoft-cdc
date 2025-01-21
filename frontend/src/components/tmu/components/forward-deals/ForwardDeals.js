import React from 'react'

import ForwardMaturityToday from '../dashboard/components/ForwardMaturityToday'
import ForwardOutstanding from '../dashboard/components/ForwardOutstanding'
import Forward from '../forward/Forward'

import DatePicker from '../../DatePicker'

import { useState } from 'react'

import './ForwardDeals.css'

function ForwardDeals({user, refresh, date, setDate, dropdownLists, addMessageHandler}) {

  const [forwardId, setForwardId] = useState('')

  const [dispalyForward, setDispalyForward] = useState(false)

  const onForwardTransactionClicked = id => {
    if(dispalyForward)
    {
      setDispalyForward(false)
    }
    else{
      setForwardId(id)
      setDispalyForward(true)
    }
  }

  return (
    <div className='home'>
      <DatePicker date={date} setDate={setDate}/>
      <div className='forward-deals-sub-home'>
        <ForwardMaturityToday user={user} refresh={refresh} date={date} forwardId={forwardId} onForwardTransactionClicked={onForwardTransactionClicked} singleTitle={true} addMessageHandler={addMessageHandler}/>
        <ForwardOutstanding user={user} refresh={refresh} date={date} forwardId={forwardId} onForwardTransactionClicked={onForwardTransactionClicked} singleTitle={true} addMessageHandler={addMessageHandler}/>
        {dispalyForward && <Forward user={user} refresh={refresh} date={date} onForwardTransactionClicked={onForwardTransactionClicked} forwardId={forwardId} dropdownLists={dropdownLists} addMessageHandler={addMessageHandler}/>}
      </div>
    </div>
  )
}

export default ForwardDeals