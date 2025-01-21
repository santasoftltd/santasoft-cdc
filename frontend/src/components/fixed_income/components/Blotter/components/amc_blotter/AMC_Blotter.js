import DatePicker from '../../../../../santasoft/components/DatePicker'

import AMC_BlotterGride from './AMC_BlotterGride'
import AMC_BlotterGraph from './AMC_BlotterGraph'
import AMC_BlotterSummary from './AMC_BlotterSummary'

import { useState } from 'react'

function AMC_Blotter({user, addMessageHandler}) {

  const [account, setAccount] = useState('all')

  const [status, setStatus] = useState('all')

  const [accountList, setAccountList] = useState([])

  const [statusList, setStatusList] = useState([])

  const getDate = () => {
    var date = new Date();
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  const [date, setDate] = useState(getDate())

  return (
    <div className='fixed-income-amc-blotter-sub-home'>

      <DatePicker date={date} setDate={setDate}/>

      <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '3', gridColumnStart: '1', gridColumnEnd: '2' }}><AMC_BlotterGride user={user} date={date} account={account} setAccount={setAccount} status={status} setStatus={setStatus} accountList={accountList} statusList={statusList} addMessageHandler={addMessageHandler}/></div>

      <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '2', gridColumnStart: '2', gridColumnEnd: '3' }}><AMC_BlotterGraph user={user} date={date} account={account} setAccount={setAccount} status={status} setStatus={setStatus} addMessageHandler={addMessageHandler}/></div>

      <div className='table-container' style={{ gridRowStart: '2', gridRowEnd: '3', gridColumnStart: '2', gridColumnEnd: '3' }}><AMC_BlotterSummary user={user} date={date} account={account} setAccount={setAccount} status={status} setStatus={setStatus} addMessageHandler={addMessageHandler}/></div>

    </div>
  )
}

export default AMC_Blotter