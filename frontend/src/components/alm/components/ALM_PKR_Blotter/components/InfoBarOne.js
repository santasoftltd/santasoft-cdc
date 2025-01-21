import { formatter } from '../../../../santasoft/components/Formatter';

import Loader from '../../../../santasoft/components/loader/Loader';

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../App';

function InfoBarOne({ user, refresh, date, addMessageHandler, data, setData }) {

  const [isloading, setIsLoading] = useState(false)

  // const [data, setData] = useState([
  //   {
  //     "id": null,
  //     "fx_today": 0,
  //     "mm_today": 0,
  //     "sukuk_today": 0,
  //     "total": 0,
  //   },
  // ])

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sm01/2nNi9!2Uh5@k9vVC$MMlyp7dS3cOcY63$glfDn*naeOwSfQo4P/' + date + '/', {
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
    <div className='table-container'>
      {isloading && <Loader margin={'45%'} />}
      <div className='table-container-summary' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '2%' }}>
        <div>
          <p className='table-container-summary-item1'>FX ready deals (Rupee):</p>
          <p className='table-container-summary-item2'>{formatter(data[0].fx_today)}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>MM deals value today:</p>
          <p className='table-container-summary-item2'>{formatter(data[0].mm_today)}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Sukuk deals value today:</p>
          <p className='table-container-summary-item2'>{formatter(data[0].sukuk_today)}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Total:</p>
          <p className='table-container-summary-item2'>{formatter(data[0].total)}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoBarOne