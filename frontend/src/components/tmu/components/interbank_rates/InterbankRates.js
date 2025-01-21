import InterbankRatesHeader from './components/InterbankRatesHeader'
import Rates from './components/Rates'
import BiddingRates from './components/BiddingRates'
import React from 'react'
import './InterbankRates.css'

function PageThree({user, refresh, onInterbankRatesClicked, addMessageHandler}) {
  return (
    <div className='black-background'>
      <div className='float-component'>
        <div>
          <InterbankRatesHeader/>
        </div>
        <div className='InterbankRates-home'>
          <div className='InterbankRates-sub-home'>
            <Rates user={user} addMessageHandler={addMessageHandler}/>
            <BiddingRates user={user} refresh={refresh} addMessageHandler={addMessageHandler}/>
            <button className='cancel-button' onClick={() => onInterbankRatesClicked()}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageThree