import DatePicker from '../../../santasoft/components/DatePicker'

import SecurityGridForTrading from '../Securities/components/SecurityGridForTrading'
// import SecurityGrid from '../Securities/components/SecurityGrid'
import AuctionForm from './components/AuctionForm'
import AuthorizedCashTransactionGride from '../cash_transaction/components/AuthorizedCashTransactionGride'
import AuctionGride from './components/AuctionGride'

import { useState } from 'react'

import './Auction.css'

function Auction({ user, date, setDate, addMessageHandler }) {

  const [securityType, setSecurityType] = useState('MTB')

  return (
    <div className='home'>

      <div className='fixed-income-auction-sub-home'>

        <DatePicker date={date} setDate={setDate} />

        <div className='table-container' style={{gridRowStart:'1', gridRowEnd:'3'}}><SecurityGridForTrading user={user} securityType={securityType} setSecurityType={setSecurityType} addMessageHandler={addMessageHandler} /></div>

        <div className='table-container' style={{gridRowStart:'1', gridRowEnd:'2', gridColumnStart:'2', gridColumnEnd:'3'}}><AuctionForm user={user} addMessageHandler={addMessageHandler} /></div>
        
        <div className='table-container' style={{gridRowStart:'2', gridRowEnd:'3', gridColumnStart:'2', gridColumnEnd:'3'}}><AuthorizedCashTransactionGride user={user} addMessageHandler={addMessageHandler} /></div>

        <div className='table-container' style={{gridRowStart:'3', gridRowEnd:'4', gridColumnStart:'1', gridColumnEnd:'3'}}><AuctionGride user={user} addMessageHandler={addMessageHandler} /></div>
      
      </div>
      
    </div>
  )
}

export default Auction