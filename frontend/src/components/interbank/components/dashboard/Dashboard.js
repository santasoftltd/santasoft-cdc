import CurrencyBlotter from './components/CurrencyBlotter'
import YoursMineBlotter from './components/YoursMineBlotter'
import SbpBlotter from './components/SbpBlotter'

import CurrencyPosition from './components/CurrencyPosition'
import Transaction from './components/Transaction'

import DatePicker from '../../../santasoft/components/DatePicker'

import React from 'react'
import './Dashboard.css'

import { useState } from 'react'

function Dashboard({ user, refresh, date, setDate, dropdownLists, dataSummary, setDataSummary, fetchedData, setFetchedData, onUpdateHandler, addMessageHandler }) {

  const [table, setTable] = useState('currency-blotter')

  const onTableSelect = tableClicked => {
    setTable(tableClicked)
  }

  return (
    <div className='home'>
      <DatePicker date={date} setDate={setDate} />
      <div className='dashboard-sub-home'>
        {table === 'currency-blotter' && <CurrencyBlotter user={user} refresh={refresh} date={date} onTableSelect={onTableSelect} addMessageHandler={addMessageHandler}/>}
        {table === 'yours-mine-blotter' && <YoursMineBlotter user={user} refresh={refresh} date={date} onTableSelect={onTableSelect} addMessageHandler={addMessageHandler}/>}
        {table === 'sbp-blotter' && <SbpBlotter user={user} refresh={refresh} date={date} onTableSelect={onTableSelect} addMessageHandler={addMessageHandler}/>}
        <CurrencyPosition user={user} refresh={refresh} date={date} dropdownLists={dropdownLists} addMessageHandler={addMessageHandler}/>
        <Transaction user={user} refresh={refresh} date={date} dropdownLists={dropdownLists} dataSummary={dataSummary} setDataSummary={setDataSummary} fetchedData={fetchedData} setFetchedData={setFetchedData} onUpdateHandler={onUpdateHandler} addMessageHandler={addMessageHandler}/>
      </div>

    </div>
  )
}

export default Dashboard