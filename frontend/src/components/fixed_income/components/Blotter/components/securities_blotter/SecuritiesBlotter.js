import DualDatePicker from '../../../../../santasoft/components/DualDatePicker'

import SecuritiesBlotterGride from './SecuritiesBlotterGride'
import SecuritiesBlotterGraph from './SecuritiesBlotterGraph'
import SecuritiesBlotterSummary from './SecuritiesBlotterSummary'

import { useState } from 'react'

function SecuritiesBlotter({user, addMessageHandler}) {

  const [type, setType] = useState('all')

  const getDate = () => {
    var date = new Date();
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  const [fromDate, setFromDate] = useState(getDate())

  const [toDate, setToDate] = useState(getDate())

  return (
    <div className='fixed-income-securities-blotter-sub-home'>

      <DualDatePicker toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate}/>

      <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '3', gridColumnStart: '1', gridColumnEnd: '2' }}><SecuritiesBlotterGride user={user} fromDate={fromDate} toDate={toDate} type={type} setType={setType} addMessageHandler={addMessageHandler}/></div>

      <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '2', gridColumnStart: '2', gridColumnEnd: '3' }}><SecuritiesBlotterGraph user={user} fromDate={fromDate} toDate={toDate} type={type} addMessageHandler={addMessageHandler}/></div>

      <div className='table-container' style={{ gridRowStart: '2', gridRowEnd: '3', gridColumnStart: '2', gridColumnEnd: '3' }}><SecuritiesBlotterSummary user={user} fromDate={fromDate} toDate={toDate} type={type} addMessageHandler={addMessageHandler}/></div>

    </div>
  )
}

export default SecuritiesBlotter