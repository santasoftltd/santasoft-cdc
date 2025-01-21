import React from 'react'
import { useState, useEffect } from 'react'
import Loader from '../../../../santasoft/components/loader/Loader'
import { ip } from '../../../../../App'
import { formatter } from '../../../../../Formatter'

function TransactionsRates({ user, refresh, rates, setRates, date, border, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [libor, setLibor] = useState(rates.libor)

  const [kibor, setKibor] = useState(rates.kibor)

  const [IBvariance, setIBVariance] = useState(0)

  const [dealVariance, setDealVariance] = useState(0)

  useEffect(() => {
    setLibor(rates.libor);
    setKibor(rates.kibor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates]);

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/M3ZWwpVJ0geqoE0mxOkkfKjZxdB1ZQJRe5uWlin7FrqjQz122c/' + date + '/', {
        method: 'POST',
        body: JSON.stringify({ 'libor': libor, 'kibor': kibor }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setRates(result.transactionRates[0]);
        addMessageHandler({
          title: 'Rates updated.',
          content: result.message,
          type: 3
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Unable to update rates',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const [data, setData] = useState([
    {
      "id": null,
      "ttdate": null,
      "ccy": null,
      "offer_rate": null,
      "bid_rate": null
    }
  ])

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/RkfSQRypduURbU5@*is3P5UUwUIJ5trM0CjZHbLATD3DKQEP$W/TMU/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setData(result.interbankRates);
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Exchange rates grid failed to load due to unauthorized request.',
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
    let interval = setInterval(() => fetchAPI(), 1000 * 60);
    return function cleanup() {
      clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    const fetchIBVarianceAPI = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/2M3ZWwpVJ0geqoE0mxOkkfKjZxdB1ZQJRe5uWlin7FrqjQz122c/IB rate/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);
  
        let result = await response.json();
  
        if (response.status === 200) {
          setIBVariance(result.data);
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
    fetchIBVarianceAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    const fetchDealVarianceAPI = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/2M3ZWwpVJ0geqoE0mxOkkfKjZxdB1ZQJRe5uWlin7FrqjQz122c/Deal rate/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);
  
        let result = await response.json();
  
        if (response.status === 200) {
          setDealVariance(result.data);
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
    fetchDealVarianceAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const IBVarianceSubmitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/2M3ZWwpVJ0geqoE0mxOkkfKjZxdB1ZQJRe5uWlin7FrqjQz122c/IB rate/', {
        method: 'POST',
        body: JSON.stringify({ 'variance': IBvariance }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setIBVariance(result.data);
        addMessageHandler({
          title: 'IB Variance updated.',
          content: result.message,
          type: 3
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Unable to update rates',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const DealVarianceSubmitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/2M3ZWwpVJ0geqoE0mxOkkfKjZxdB1ZQJRe5uWlin7FrqjQz122c/Deal rate/', {
        method: 'POST',
        body: JSON.stringify({ 'variance': dealVariance }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setDealVariance(result.data);
        addMessageHandler({
          title: 'Deal Variance updated.',
          content: result.message,
          type: 3
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Unable to update rates',
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
    <div className='table-container-summary' style={{ padding: '2px 0% 0% 0%', borderBottom: border, width:'min-content' }}>
      {isloading && <Loader margin={'45%'} />}
      <div>
        <table style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th className='table-container-summary-item1'>Salam Sales</th>
              <th className='table-container-summary-item1'>Previous</th>
              <th className='table-container-summary-item1'>Today</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='table-container-summary-item1'>Lowest</td>
              <td className='table-container-summary-item2'>{rates.salamSalesPreviousLowest}</td>
              <td className='table-container-summary-item2'>{rates.salamSalesTodaysLowest}</td>
            </tr>
            <tr style={{ padding: '8 px' }}>
              <td className='table-container-summary-item1'>Highest</td>
              <td className='table-container-summary-item2'>{rates.salamSalesPreviousHighest}</td>
              <td className='table-container-summary-item2'>{rates.salamSalesTodaysHighest}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th className='table-container-summary-item1'>Salam Interbank</th>
              <th className='table-container-summary-item1'>Previous</th>
              <th className='table-container-summary-item1'>Today</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='table-container-summary-item1'>Lowest</td>
              <td className='table-container-summary-item2'>{rates.salamInterbankPreviousLowest}</td>
              <td className='table-container-summary-item2'>{rates.salamInterbankTodaysLowest}</td>
            </tr>
            <tr style={{ padding: '8 px' }}>
              <td className='table-container-summary-item1'>Highest</td>
              <td className='table-container-summary-item2'>{rates.salamInterbankPreviousHighest}</td>
              <td className='table-container-summary-item2'>{rates.salamInterbankTodaysHighest}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p className='table-container-summary-item1'>Libor</p>
        <p className='table-container-summary-item2'><input type="text" style={{ border: 'none', outline: 'none', color: '#1c4966', width:'50px' }} onChange={e => setLibor(e.target.value)} value={formatter(libor)} onBlur={() => submitHandler()}/></p>
      </div>
      <div>
        <p className='table-container-summary-item1'>Kibor</p>
        <p className='table-container-summary-item2'><input type="text" style={{ border: 'none', outline: 'none', color: '#1c4966', width:'50px' }} onChange={e => setKibor(e.target.value)} value={formatter(kibor)} onBlur={() => submitHandler()}/></p>
      </div>
      <div>
        <p className='table-container-summary-item1'>USD bid rate</p>
        <p className='table-container-summary-item2'>{formatter(data[0].bid_rate)}</p>
      </div>
      <div>
        <p className='table-container-summary-item1'>USD offer rate</p>
        <p className='table-container-summary-item2'>{formatter(data[0].offer_rate)}</p>
      </div>
      <div>
        <p className='table-container-summary-item1'>IB rate tolerance (%)</p>
        <p className='table-container-summary-item2'><input type="text" style={{ border: 'none', outline: 'none', color: '#1c4966', width:'50px' }} onChange={e => setIBVariance(e.target.value)} value={IBvariance} onBlur={() => IBVarianceSubmitHandler()}/></p>
      </div>
      <div>
        <p className='table-container-summary-item1'>Deal rate tolerance (paise)</p>
        <p className='table-container-summary-item2'><input type="text" style={{ border: 'none', outline: 'none', color: '#1c4966', width:'50px' }} onChange={e => setDealVariance(e.target.value)} value={dealVariance} onBlur={() => DealVarianceSubmitHandler()}/></p>
      </div>
    </div>
  )
}

export default TransactionsRates