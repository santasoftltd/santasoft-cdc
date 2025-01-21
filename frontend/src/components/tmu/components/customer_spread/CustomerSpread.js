import CustomerSpreadGrid from './components/CustomerSpreadGrid'
import React from 'react'
import './CustomerSpread.css'

function CustomerSpread({user, refresh, date, addMessageHandler}) {
  return (
    <div className='home'>
        <div className='customer-spread-sub-home'>
            <CustomerSpreadGrid user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler}/>
        </div>
    </div>
  )
}

export default CustomerSpread