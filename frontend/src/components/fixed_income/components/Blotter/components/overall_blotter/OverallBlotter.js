import DatePicker from "../../../../../santasoft/components/DatePicker"

import OverallBlotterSummary from "./OverallBlotterSummary"
import OverallBlotterGrideOne from "./OverallBlotterGrideOne"
import OverallBlotterGrideTwo from "./OverallBlotterGrideTwo"
import OverallBlotterGrideThree from "./OverallBlotterGrideThree"

import { useState } from 'react'

function OverallBlotter({user, addMessageHandler}) {

  const [type, setType] = useState('all')

  const getDate = () => {
    var date = new Date();
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  const [date, setDate] = useState(getDate())

  return (
    <div className='fixed-income-overall-blotter-sub-home'>

      <DatePicker date={date} setDate={setDate}/>

      <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '2', gridColumnStart: '1', gridColumnEnd: '2' }}><OverallBlotterSummary user={user} date={date} addMessageHandler={addMessageHandler}/></div>

      <div className='table-container' style={{ gridRowStart: '2', gridRowEnd: '3', gridColumnStart: '1', gridColumnEnd: '2' }}><OverallBlotterGrideOne user={user} date={date} addMessageHandler={addMessageHandler}/></div>

      <div className='table-container' style={{ gridRowStart: '3', gridRowEnd: '4', gridColumnStart: '1', gridColumnEnd: '2' }}><OverallBlotterGrideTwo user={user} date={date} addMessageHandler={addMessageHandler}/></div>

      <div className='table-container' style={{ gridRowStart: '4', gridRowEnd: '5', gridColumnStart: '1', gridColumnEnd: '2' }}><OverallBlotterGrideThree user={user} date={date} addMessageHandler={addMessageHandler}/></div>

    </div>
  )
}

export default OverallBlotter