import MISMain from './components/MISMain'
import MISSpecific from './components/MISSpecific'
import DualDatePicker from '../../DualDatePicker'

import './MIS.css'

import { useState } from 'react'

function PageTwo({user, refresh, date, addMessageHandler}) {

  const [misSpecific, setMisSpecific] = useState('')

  const [misCategory, setMISCategory] = useState('dealer')

  const onMisSpecificSelection = value => {
    setMisSpecific(value)
  }

  const [fromDate, setFromDate] = useState(date)

  const [toDate, setToDate] = useState(date)

  return (
    <div className='home'>
      <DualDatePicker toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate}/>
      <div className='MIS-sub-home'>
        <MISMain user={user} refresh={refresh} fromDate={fromDate} toDate={toDate}  misCategory={misCategory} setMISCategory={setMISCategory} onMisSpecificSelection={onMisSpecificSelection} addMessageHandler={addMessageHandler}/>
        <MISSpecific user={user} refresh={refresh} fromDate={fromDate} toDate={toDate}  misCategory={misCategory} misSpecific={misSpecific} addMessageHandler={addMessageHandler}/>
      </div>
    </div>
  )
}

export default PageTwo