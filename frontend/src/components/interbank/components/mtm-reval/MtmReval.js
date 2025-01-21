import InterbankSpot from './components/InterbankSpot'
import InterbankForward from './components/InterbankForward'
import SalesForward from './components/SalesForward'
import DatePicker from '../../../santasoft/components/DatePicker'

import React from 'react'
import { useState } from 'react'
import './MtmReval.css'

function MtmReval({ user, refresh, date, setDate, dropdownLists, addMessageHandler }) {

  const [currencyOne, setCurrencyOne] = useState('USD')

  const [currencyTwo, setCurrencyTwo] = useState('PKR')

  return (
    <div className='home'>

      <DatePicker date={date} setDate={setDate} />
      
      <div className='currencyBlock' >
        <p style={{ display: 'inline' }}>1st ccy: </p>
        <select onChange={e => setCurrencyOne(e.target.value)} value={currencyOne} style={{ marginLeft: '5px' , float: 'right', marginRight: '10px', marginBottom: '0.1%', backgroundColor: '#071e31', color: 'white', fontSize: 'x-small', width: '70px', borderRadius: '10px', border:'none', textAlign: 'center' }}>
          {
            dropdownLists.currency.map((item, key) => {
              return <option key={key} value={item.name}>{item.name}</option>
            })
          }
        </select>

        <p style={{ display: 'inline' }}>2nd ccy: </p>
        <select onChange={e => setCurrencyTwo(e.target.value)} value={currencyTwo} style={{ marginLeft: '5px' , float: 'right', marginRight: '10px', marginBottom: '0.1%', backgroundColor: '#071e31', color: 'white', fontSize: 'x-small', width: '70px', borderRadius: '10px', border:'none', textAlign: 'center' }}>
          {
            dropdownLists.currency.map((item, key) => {
              return <option key={key} value={item.name}>{item.name}</option>
            })
          }
        </select>
      </div>
      
      <div className='mtm-reval-sub-home'>
        <InterbankSpot user={user} refresh={refresh} date={date} currencyOne={currencyOne} currencyTwo={currencyTwo} addMessageHandler={addMessageHandler} />
        <InterbankForward user={user} refresh={refresh} date={date} currencyOne={currencyOne} currencyTwo={currencyTwo} addMessageHandler={addMessageHandler} />
        <SalesForward user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} />
      </div>

    </div>
  )
}

export default MtmReval