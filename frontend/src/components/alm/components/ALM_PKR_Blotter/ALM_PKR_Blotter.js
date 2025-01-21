import DatePicker from '../../../santasoft/components/DatePicker'
import InfoBarOne from './components/InfoBarOne'
import InfoBarTwo from './components/InfoBarTwo'
import InfoBarThree from './components/InfoBarThree'
import InfoBarFour from './components/InfoBarFour'
import InfoBarFive from './components/InfoBarFive'
import BranchPositionGrid from '../Branch_Position/components/BranchPositionGrid'
import CRR from './components/CRR'
import InflowOutflow from './components/InflowOutflow'

import Loader from '../../../santasoft/components/loader/Loader'

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../App'

import './ALM_PKR_Blotter.css'

function ALM_PKR_Blotter({ user, refresh, date, setDate, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [userInput, setUserInput] = useState(
    {
      "id": null,
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

  const [infoBarOnedata, setInfoBarOneData] = useState([
    {
      "id": null,
      "fx_today": 0,
      "mm_today": 0,
      "sukuk_today": 0,
      "total": 0,
    },
  ])

  const [infoBarFourdata, setInfoBarFourData] = useState([
    {
      "id": null,
      "normal_clearing": 0,
      "returns": 0,
      "same_day_clearing": 0,
      "special_clearing": 0,
      'FxMaturityToday': 0,
      'MmMaturityToday': 0,
      'SukukMaturityToday': 0,
      'Coupon': 0,
      'total': 0,
    },
  ])

  const [inflowOutflowDataSummary, setInflowOutflowDataSummary] = useState({
    "id": null,
    "total_inflow": 0,
    "total_outflow": 0,
    "net_impact": 0,
  })

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sm01/lPnJnzpC@!p$wbv$haRIa705bfeasHqJUqvsP&iBW&RM7H&f54/' + date + '/0/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setUserInput(result.data);
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Failed to load due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 406) {
        addMessageHandler({
          title: 'Unable to load',
          content: result.message,
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
  }, [refresh, date]);

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sm01/lPnJnzpC@!p$wbv$haRIa705bfeasHqJUqvsP&iBW&RM7H&f54/' + date + '/0/', {
        method: 'POST',
        body: JSON.stringify(userInput),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setUserInput(result.data);
        addMessageHandler({
          title: 'Saved',
          content: result.message,
          type: 3
        })
      }

      else if (response.status === 400) {
        setUserInput(result.data);
        addMessageHandler({
          title: 'Error: Not Saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Error: Not Saved',
          content: 'Unable to saved due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 412) {
        setUserInput(result.data);
        addMessageHandler({
          title: 'Error: Not Saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 409) {
        addMessageHandler({
          title: 'Error: Not Saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 406) {
        addMessageHandler({
          title: 'Error: Not Saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 500) {
        setUserInput(result.data);
        addMessageHandler({
          title: 'Error: Not Saved',
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

      {isloading && <Loader margin={'45%'} />}

      <DatePicker date={date} setDate={setDate} />

      <div className='alm-pkr-blotter-sub-home'>

        <div className='alm-pkr-blotter-sub-home-container-one'>
          <InfoBarOne user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} data={infoBarOnedata} setData={setInfoBarOneData} />
          <InfoBarTwo userInput={userInput} setUserInput={setUserInput} submitHandler={submitHandler}/>
          <InfoBarThree userInput={userInput} setUserInput={setUserInput} submitHandler={submitHandler}/>
          <InfoBarFour user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} data={infoBarFourdata} setData={setInfoBarFourData} />
          <InfoBarFive userInput={userInput} setUserInput={setUserInput} submitHandler={submitHandler}/>
        </div>

        <div className='alm-pkr-blotter-sub-home-container-two'><BranchPositionGrid user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} infoBarOnedata={infoBarOnedata} infoBarFourdata={infoBarFourdata} inflowOutflowDataSummary={inflowOutflowDataSummary} /></div>

        <div className='alm-pkr-blotter-sub-home-container-three'><InflowOutflow user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} dataSummary={inflowOutflowDataSummary} setDataSummary={setInflowOutflowDataSummary} /></div>

        <div className='alm-pkr-blotter-sub-home-container-four'><CRR user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} /></div>


      </div>

    </div>
  )
}

export default ALM_PKR_Blotter