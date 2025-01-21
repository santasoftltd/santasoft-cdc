import Rates from './components/Rates'
import BiddingRates from './components/BiddingRates'

import DatePicker from '../../../santasoft/components/DatePicker'

import { useState, useEffect } from 'react'

import React from 'react'
import './InterbankRates.css'

import { ip } from '../../../../App'

function InterbankRates({ user, refresh, date, setDate, addMessageHandler }) {

  const [currencies, setCurrencies] = useState([])

  const fetchAPI = async () => {
    try {
      const response = await fetch(ip + '/sfe01/lQF!OFzqLV!1BwK6!BmAyJDvlJCQCcgd41cR!*u3sNMmeOURd7/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });

      let result = await response.json();

      if (response.status === 200) {
        setCurrencies(result.currencyList);
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Currencies list failed to load due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Unable to load',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='home'>
      <DatePicker date={date} setDate={setDate} />
      <div className='interbank-rates-sub-home'>
        <Rates user={user} refresh={refresh} currencies={currencies} addMessageHandler={addMessageHandler}/>
        <BiddingRates user={user} refresh={refresh} currencies={currencies} addMessageHandler={addMessageHandler}/>
      </div>

    </div>
  )
}

export default InterbankRates