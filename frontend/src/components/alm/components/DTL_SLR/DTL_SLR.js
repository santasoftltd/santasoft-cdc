import DatePicker from '../../../santasoft/components/DatePicker'

import DTL_SLR_Grid from './components/DTL_SLR_Grid'
import DTL_SLR_Form from './components/DTL_SLR_Form'

import { useState, useEffect } from 'react'

import './DTL_SLR.css'

function DTL_SLR({ user, refresh, date, setDate, addMessageHandler }) {

  const [userInput, setUserInput] = useState(
    {
      "id": null,
      "date": date,
      "dtl": 0,
      "dtl_per": 0,
      "avg_crr": 0,
      "lower_crr": 0,
      "crr_days": 0,
      "balance": 0,
      "sukuk": 0,
      "bankBalance": 0,
      "cashInHand": 0,
    }
  )

  const [data, setData] = useState([
    // {
    //     "id": null,
    //     "date": null,
    //     "dtl_amount": null,
    //     "dtl": null,
    //     "avg_crr": null,
    //     "lower_crr": null,
    //     "crr_days": null,
    //     "sukuk": null,
    //     "bank_balances": null,
    //     "cash_in_hand": null,
    //     "total": null,
    // },
  ])

  return (
    <div className='home'>

      <DatePicker date={date} setDate={setDate} />

      <div className='alm-dtl-slr-sub-home'>

        <DTL_SLR_Form user={user} refresh={refresh} date={date} data={data} setData={setData} userInput={userInput} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />

        <DTL_SLR_Grid user={user} refresh={refresh} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />

      </div>

    </div>
  )
}

export default DTL_SLR