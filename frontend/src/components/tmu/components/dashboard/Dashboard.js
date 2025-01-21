import Blotter from './components/Blotter'
import ForwardMaturityToday from './components/ForwardMaturityToday'
import ForwardOutstanding from './components/ForwardOutstanding'
import SalamMaturityToday from './components/SalamMaturityToday'
import SalamOutstanding from './components/SalamOutstanding'
import YoursMine from './components/YoursMine'
import OBDX from './components/OBDX'
import Transactions from './components/Transactions'

import Forward from '../forward/Forward'
import Salam from '../salam/Salam'

import DatePicker from '../../DatePicker'

import React from 'react'
import './Dashboard.css'

import { useState } from 'react'

function Dashboard({user, refresh, dealer, setDealer, date, setDate, dropdownLists, rates, setRates, transaction, onUpdateHandler, addMessageHandler}) {

  const [table, setTable] = useState('forward-maturity-today')

  const [dispalyForward, setDispalyForward] = useState(false)

  const [forwardId, setForwardId] = useState('')

  const [dispalySalam, setDispalySalam] = useState(false)

  const [salamId, setSalamId] = useState('')

  const onTableSelect = tableClicked => {
    setTable(tableClicked)
  }

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

  const onSalamTransactionClicked = id => {
    if (dispalySalam)
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
      <div className='Dashboard-sub-home'>
        
        <Blotter user={user} date={date} addMessageHandler={addMessageHandler}/>

        {table === 'forward-maturity-today' && <ForwardMaturityToday user={user} refresh={refresh} date={date} onTableSelect={onTableSelect} onForwardTransactionClicked={onForwardTransactionClicked} singleTitle={false} addMessageHandler={addMessageHandler}/>}

        {table === 'forward-outstanding' && <ForwardOutstanding user={user} refresh={refresh} date={date} onTableSelect={onTableSelect} onForwardTransactionClicked={onForwardTransactionClicked} singleTitle={false} addMessageHandler={addMessageHandler}/>}

        {table === 'salam-maturity-today' && <SalamMaturityToday user={user} refresh={refresh} date={date} onTableSelect={onTableSelect} onSalamTransactionClicked={onSalamTransactionClicked} singleTitle={false} addMessageHandler={addMessageHandler}/>}

        {table === 'salam-outstanding' && <SalamOutstanding user={user} refresh={refresh} date={date} onTableSelect={onTableSelect} onSalamTransactionClicked={onSalamTransactionClicked} singleTitle={false} addMessageHandler={addMessageHandler}/>}

        {table === 'yours-mine' && <YoursMine user={user} refresh={refresh} date={date} onTableSelect={onTableSelect} dropdownLists={dropdownLists} loaderPosition={'45%'} addMessageHandler={addMessageHandler}/>}

        {table === 'obdx' && <OBDX user={user} date={date} onTableSelect={onTableSelect} addMessageHandler={addMessageHandler}/>}

        {dispalyForward && <Forward user={user} refresh={refresh} date={date} onForwardTransactionClicked={onForwardTransactionClicked} forwardId={forwardId} dropdownLists={dropdownLists} addMessageHandler={addMessageHandler}/>}

        {dispalySalam && <Salam user={user} date={date} refresh={refresh} onSalamTransactionClicked={onSalamTransactionClicked} salamId={salamId} addMessageHandler={addMessageHandler}/>}

        <Transactions user={user} refresh={refresh} dealer={dealer} setDealer={setDealer} date={date} dropdownLists={dropdownLists} rates={rates} setRates={setRates} dataSummary={transaction.dataSummary} setDataSummary={transaction.setDataSummary} fetchedData={transaction.fetchedData} setFetchedData={transaction.setFetchedData} onUpdateHandler={onUpdateHandler} addMessageHandler={addMessageHandler}/>

      </div>
    
    </div>
  )
}

export default Dashboard