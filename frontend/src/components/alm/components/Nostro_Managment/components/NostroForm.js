import Loader from '../../../../santasoft/components/loader/Loader'
import { useState, useEffect } from 'react'
import React from 'react'
import { numberWithCommas } from '../../../../santasoft/components/Formatter'

import { ip } from '../../../../../App'

function NostroForm({ user, refresh, date, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [userInput, setUserInput] = useState(
    {
      "id": null,
      "currency": '',
      "fromAccount": '',
      "toAccount": '',
      "amount": '',
    }
  )

  const [currencyList, setCurrencyList] = useState([])

  useEffect(() => {
    async function fetchCurrencyList() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/lQF!OFzqLV!1BwK6!BmAyJDvlJCQCcgd41cR!*u3sNMmeOURd7/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setCurrencyList(result.currencyList);
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
    fetchCurrencyList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const [accountList, setAccountList] = useState([])

  useEffect(() => {
    async function fetchAccountList() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sm01/T*i68i3s8&!$h&sqKcG6!PPExiKX6HpSVuZ!C2DsVdApK6J&J!/' + userInput.currency + '/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setAccountList(result.data);
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
    fetchAccountList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput.currency]);

  const clearButtonHandler = () => {
    setUserInput({
      "id": null,
      "currency": '',
      "fromAccount": '',
      "toAccount": '',
      "amount": '',
    })
  }

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sm01/Kj8kVuToFHRI&aBdQ7EI8AbXQyzBBs8ch@RhjX8XJ8CGq4Vw!5/' + date + '/' + date + '/null/0/0/null/', {
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
        addMessageHandler({
          title: 'Transaction Successful',
          content: result.message,
          type: 3
        })
        clearButtonHandler();
        setAccountList([]);
      }

      else if (response.status === 400) {
        addMessageHandler({
          title: 'Transaction Failed',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Transaction Failed',
          content: 'Unable to saved due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 412) {
        addMessageHandler({
          title: 'Transaction Failed',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 409) {
        addMessageHandler({
          title: 'Transaction Failed',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 406) {
        addMessageHandler({
          title: 'Transaction Failed',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Transaction Failed',
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
    <div className='table-container'>

      {isloading && <Loader margin={'45%'} />}

      {/* Table Title */}
      <div className='table-container-name'>
        <p>Form</p>
      </div>

      <div className='deal-form'>

        <div className='deal-form-container'>

          <div>
            <label>Currency:</label>
            <select style={{width:'60px'}} onChange={e => setUserInput({ ...userInput, 'currency': e.target.value })} value={userInput.currency}>
              <option value=''></option>
              {
                currencyList.map((item, key) => {
                  return <option key={key} value={item.name}>{item.name}</option>
                })
              }
            </select>
          </div>

          <div>
            <label>From Account:</label>
            <select style={{width:'120px'}} onChange={e => setUserInput({ ...userInput, 'fromAccount': e.target.value })} value={userInput.fromAccount}>
              <option value=''></option>
              {
                accountList.map((item, key) => {
                  return <option key={key} value={item.name}>{item.name}</option>
                })
              }
            </select>
          </div>

          <div>
            <label>To Account:</label>
            <select style={{width:'120px'}} onChange={e => setUserInput({ ...userInput, 'toAccount': e.target.value })} value={userInput.toAccount}>
              <option value=''></option>
              {
                accountList.map((item, key) => {
                  return <option key={key} value={item.name}>{item.name}</option>
                })
              }
            </select>
          </div>

          <div>
            <label>Amount:</label>
            <input style={{ width: '100px' }} type="text" onChange={e => setUserInput({ ...userInput, 'amount': e.target.value })} value={numberWithCommas(userInput.amount)} />
          </div>

          <div>
            <button className='deal-form-button deal-form-button-save' style={{ fontSize: 'x-small', marginTop:'12%', width:'100px' }} onClick={() => submitHandler()}>Transfer</button>
          </div>

          <div>
            <button className='deal-form-button deal-form-button-clear' style={{ fontSize: 'x-small', marginTop:'18%', width:'60px' }} onClick={() => clearButtonHandler()}>Clear</button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default NostroForm