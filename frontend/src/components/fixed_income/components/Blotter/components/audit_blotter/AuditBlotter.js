import DualDatePicker from '../../../../../santasoft/components/DualDatePicker'

import AuditBlotterGride from './AuditBlotterGride'
import AuditBlotterGraph from './AuditBlotterGraph'
import AuditBlotterSummary from './AuditBlotterSummary'

import { useState } from 'react'

function AuditBlotter({user, addMessageHandler}) {

  const [account, setAccount] = useState('all')

  const [accountList, setAccountList] = useState([])


  const getDate = () => {
    var date = new Date();
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  const [fromDate, setFromDate] = useState(getDate())

  const [toDate, setToDate] = useState(getDate())

  return (
    <div className='fixed-income-audit-blotter-sub-home'>

      <DualDatePicker toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate}/>

      <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '3', gridColumnStart: '1', gridColumnEnd: '2' }}><AuditBlotterGride user={user} fromDate={fromDate} toDate={toDate} account={account} setAccount={setAccount} accountList={accountList} addMessageHandler={addMessageHandler}/></div>

      <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '2', gridColumnStart: '2', gridColumnEnd: '3' }}><AuditBlotterGraph user={user} fromDate={fromDate} toDate={toDate} account={account}  addMessageHandler={addMessageHandler}/></div>

      <div className='table-container' style={{ gridRowStart: '2', gridRowEnd: '3', gridColumnStart: '2', gridColumnEnd: '3' }}><AuditBlotterSummary user={user} fromDate={fromDate} toDate={toDate} account={account}  addMessageHandler={addMessageHandler}/></div>

    </div>
  )
}

export default AuditBlotter