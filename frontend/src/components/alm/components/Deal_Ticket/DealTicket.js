import DatePicker from '../../../santasoft/components/DatePicker'

import DealTicketForm from './components/DealTicketForm'

import Securities from './components/Securities/Securities'

import Deals from './components/Deals/Deals'

import React from 'react'
import { useState, useEffect } from 'react'

import './DealTicket.css'

import { ip } from '../../../../App'

function DealTicket({ user, refresh, date, setDate, addMessageHandler }) {

  const [isRefresh, setIsRefresh] = useState(false)

  const [isloading, setIsLoading] = useState(false)

  const [userInput, setUserInput] = useState(
    {
      "id": null,
      "contract_number": '',
      "transaction_type": '',
      "instrument": '',
      "ccy": "PKR",
      "deal_date": date,
      "start_date": date,
      "deal_days": 0,
      "end_date": date,
      "face_value": '',
      "yield": '',
      "ac_value": '',
      "pkrv": '',

      "issue_date": '',
      "maturity_date": '',
      "last_coupon": '',
      "next_coupon": '',
      "coupon_frequency": 'semi-annually',
      "total_coupon": '',
      "coupon_available": '',
      "coupon_days": '',
      "days_to_maturity": '',
      "start_price": '',
      "end_price": '',
      "start_amount": '',
      "maturity_amount": '',
      "issuer": '',
      "instruction": '',
      "account": '0',
      "sbp_status": '',

      "tax": '',
      "tax_amount": '',
      "markup": '',
      "accrued_days": 0,
      "accrued_profit": '',
      "sbp_cheque_amount": '',

      "counter_party": '',
      "mode": '',
      "brokerage": '',
      "remarks": '',

      "confirm": '',
      "validate": '',
    }
  )

  const fetchDeal = async (id) => {
    try {

      setIsLoading(true);
      const response = await fetch(ip + '/sm01/VPmvhjaELzyR9FJPCZCqpoXVerjLJXJOUurgvT*jVn2Uk*5zHw/' + id + '/', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setUserInput(result.data)
      }

      else if (response.status === 400) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Transaction bot saved',
          content: 'Unabled to saved due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 412) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 409) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 406) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='home'>

      <DatePicker date={date} setDate={setDate} />

      <div className='deal-ticket-sub-home'>

        <DealTicketForm user={user} refresh={refresh} date={date} isRefresh={isRefresh} setIsRefresh={setIsRefresh} userInput={userInput} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />

        <Securities user={user} refresh={refresh} date={date} singleTitle={false} isRefresh={isRefresh} fetchDeal={fetchDeal} addMessageHandler={addMessageHandler} />

        <Deals user={user} refresh={refresh} date={date} singleTitle={false} isRefresh={isRefresh} fetchDeal={fetchDeal} addMessageHandler={addMessageHandler} />

      </div>

    </div>
  )
}

export default DealTicket