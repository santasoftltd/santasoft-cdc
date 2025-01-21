import { formatter } from '../../../../santasoft/components/Formatter';

import Loader from '../../../../santasoft/components/loader/Loader';

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../App';

function InfoBarFour({ user, refresh, date, addMessageHandler, data, setData }) {
  
  const [isloading, setIsLoading] = useState(false)

  // const [data, setData] = useState([
  //   {
  //     "id": null,
  //     "normal_clearing": 0,
  //     "returns": 0,
  //     "same_day_clearing": 0,
  //     "special_clearing": 0,
  //     'FxMaturityToday': 0,
  //     'MmMaturityToday': 0,
  //     'SukukMaturityToday': 0,
  //     'Coupon': 0,
  //   },
  // ])

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sm01/*NbONIMx&Gs6FiMppdrS&QME3*XWjjdotqTXur!q5gsNLJzEfp/' + date + '/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setData(result.data);
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Blotter grid failed to load due to unauthorized request.',
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

  return (
    <div className='table-container alm-pkr-blotter-sub-home-container-one-child-four'>
      {isloading && <Loader margin={'45%'} />}
      <div className='table-container-summary' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop:'2%' }}>
        <div>
          <p className='table-container-summary-item1'>FX Maturity:</p>
          <p className='table-container-summary-item2'>{formatter(data[0].FxMaturityToday)}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>MM Maturity:</p>
          <p className='table-container-summary-item2'>{formatter(data[0].MmMaturityToday)}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Sukuk Maturity:</p>
          <p className='table-container-summary-item2'>{formatter(data[0].SukukMaturityToday)}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Coupon (Sukuk):</p>
          <p className='table-container-summary-item2'>{formatter(data[0].Coupon)}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Normal Clearing:</p>
          <p className='table-container-summary-item2'>{formatter(data[0].normal_clearing)}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Returns:</p>
          <p className='table-container-summary-item2'>{formatter(data[0].returns)}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Same Day Clearing:</p>
          <p className='table-container-summary-item2'>{formatter(data[0].same_day_clearing)}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Special Clearing:</p>
          <p className='table-container-summary-item2'>{formatter(data[0].special_clearing)}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Total:</p>
          <p className='table-container-summary-item2'>{formatter(data[0].total)}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoBarFour