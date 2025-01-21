import { useState } from 'react'
import React from 'react'

import { formatter } from '../../../../santasoft/components/Formatter'

import Loader from '../../../../santasoft/components/loader/Loader'
import { ip } from '../../../../../App'

function NewEntryInput({ user, updateObject, setUpdateObject, onNewEntryClicked, date, dropdownLists, setDataSummary, fetchedData, setFetchedData, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const onAmountEntered = () => {
    if (userInput.amount < 1000000) {
      setUserInput({ ...userInput, amount: userInput.amount * 1000000 })
    }
    else {
      setUserInput({ ...userInput, amount: userInput.amount })
    }
  }

  const getObject = () => {
    if (updateObject !== null) {
      return updateObject
    }
    else {
      return {
        "id": null,
        "deal_type": 'Ready',
        "deal_date": date,
        "value_date": date,
        "dealer_desk": '',
        "counter_party": '',
        "buy_sell": 'Buy',
        "ccy_1": '',
        "ccy_2": '',
        "amount": '',
        "rate": '',
        "equiv_amount": '',
        "ib_rate": '',
        "deal_mode": '',
        "posted": 'N',
        "brokerage": '',
        "usd_rate": '',
        "equiv_usd": null,
        "equiv_pkr": null,
        "dtm": null,
        "reval_rate": null,
        "gain_loss": null,
      }
    }
  }

  const [userInput, setUserInput] = useState(getObject())

  const eraseHandler = () => {
    setUserInput({
      "id": null,
      "deal_type": 'Ready',
      "deal_date": date,
      "value_date": date,
      "dealer_desk": '',
      "counter_party": '',
      "buy_sell": 'Buy',
      "ccy_1": '',
      "ccy_2": '',
      "amount": '',
      "rate": '',
      "equiv_amount": '',
      "ib_rate": '',
      "deal_mode": '',
      "posted": 'N',
      "brokerage": '',
      "usd_rate": '',
      "equiv_usd": '',
      "equiv_pkr": '',
      "dtm": '',
      "reval_rate": '',
      "gain_loss": '',
    }
    )
  }

  const defaultSubmitHandler = () => {
    if (updateObject !== null) {
      onUpdate()
    }
    else {
      submitHandler()
    }
  }

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe05/gGUPFrzJiw$DZEfGpIpIoC&R$U5oJaFEhr&mmB8qIbPiB1DEhG/empty/empty/empty/0/0/' + date + '/0/', {
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
        setFetchedData([result.object, ...fetchedData]);
        setUserInput({
          "id": null,
          "deal_type": 'Ready',
          "deal_date": date,
          "value_date": date,
          "dealer_desk": '',
          "counter_party": '',
          "buy_sell": 'Buy',
          "ccy_1": '',
          "ccy_2": '',
          "amount": '',
          "rate": '',
          "equiv_amount": '',
          "ib_rate": '',
          "deal_mode": '',
          "posted": 'N',
          "brokerage": '',
          "usd_rate": '',
          "equiv_usd": '',
          "equiv_pkr": '',
          "dtm": '',
          "reval_rate": '',
          "gain_loss": '',
        });
        setDataSummary(result.summary);
        addMessageHandler({
          title: 'Transaction saved',
          content: result.message,
          type: 3
        })
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
          title: 'Transaction not saved',
          content: 'Unable to saved due to unauthorized request.',
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

  const onUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe05/gGUPFrzJiw$DZEfGpIpIoC&R$U5oJaFEhr&mmB8qIbPiB1DEhG/empty/empty/empty/0/0/' + date + '/' + updateObject.id + '/', {
        method: 'PUT',
        body: JSON.stringify(userInput),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setFetchedData(current =>
          current.map(obj => {
            if (obj['id'] === updateObject['id']) {
              return result.object
            }
            else {
              return obj
            }
          })
        );
        eraseHandler();
        setUpdateObject(null);
        setDataSummary(result.summary);
        addMessageHandler({
          title: 'Transaction Updated',
          content: result.message,
          type: 3
        });
      }

      else if (response.status === 400) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: 'Unable to update due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 412) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 404) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 409) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 406) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className='form-container' style={{ height: '50%' }}>

      {isloading && <Loader margin={'65%'} />}

      <div className='table-container'>

        <div className='table-container-name'>
          <p>Form</p>
        </div>

        <form className='table-container-form' onSubmit={submitHandler}>

          <div>
            <label>Deal type</label>
            <br />
            <select onChange={e => setUserInput({ ...userInput, 'deal_type': e.target.value })} value={userInput.deal_type}>
              <option value='Forward'>Forward</option>
              <option value='Ready'>Ready</option>
            </select>
          </div>

          <div>
            <label>Deal date</label>
            <br />
            <input type="date" value={userInput.deal_date.replace(" 00:00:00", "")} disabled />
          </div>

          <div>
            <label>Value date</label>
            <br />
            {userInput.deal_type === 'Forward'
              ?
              <input type="date" onChange={e => setUserInput({ ...userInput, value_date: e.target.value })} value={userInput.value_date.replace(" 00:00:00", "")} />
              :
              <input type="date" value={userInput.value_date.replace(" 00:00:00", "")} disabled />
            }
          </div>

          <div>
            <label>Dealer desk</label>
            <br />
            <select onChange={e => setUserInput({ ...userInput, 'dealer_desk': e.target.value })} value={userInput.dealer_desk}>
              <option value=''></option>
              {
                dropdownLists.dealerDeskList.map((item, key) => {
                  return <option key={key} value={item.id}>{item.id} - {item.name}</option>
                })
              }
            </select>
          </div>

          <div>
            <label>Counter party</label>
            <br />
            <select onChange={e => setUserInput({ ...userInput, 'counter_party': e.target.value })} value={userInput.counter_party}>
              <option value=''></option>
              {
                dropdownLists.counterPartyList.map((item, key) => {
                  return <option key={key} value={item.id}>{item.name}</option>
                })
              }
            </select>
          </div>

          <div>
            <label>Buy/Sell</label>
            <br />
            <select onChange={e => setUserInput({ ...userInput, 'buy_sell': e.target.value })} value={userInput.buy_sell}>
              <option value='Buy'>Buy</option>
              <option value='Sell'>Sell</option>
            </select>
          </div>

          <div>
            <label>First currency</label>
            <br />
            <select onChange={e => setUserInput({ ...userInput, 'ccy_1': e.target.value })} value={userInput.ccy_1}>
              <option value=''></option>
              {
                dropdownLists.currency.map((item, key) => {
                  return <option key={key} value={item.name}>{item.name}</option>
                })
              }
            </select>
          </div>

          <div>
            <label>Second currency</label>
            <br />
            <select onChange={e => setUserInput({ ...userInput, 'ccy_2': e.target.value })} value={userInput.ccy_2}>
              <option value=''></option>
              {
                dropdownLists.currency.map((item, key) => {
                  return <option key={key} value={item.name}>{item.name}</option>
                })
              }
            </select>
          </div>

          <div>
            <label>Amount</label>
            <br />
            <input type="text" onBlur={() => onAmountEntered()} onChange={e => setUserInput({ ...userInput, 'amount': e.target.value })} value={userInput.amount} />
          </div>

          <div>
            <label>Rate</label>
            <br />
            <input type="text" onChange={e => setUserInput({ ...userInput, 'rate': e.target.value })} value={userInput.rate} />
          </div>

          <div>
            <label>Equiv. amount</label>
            <br />
            <input type="text" value={formatter(userInput.equiv_amount)} disabled />
          </div>

          <div>
            <label>Interrbank rate</label>
            <br />
            <input type="text" onChange={e => setUserInput({ ...userInput, 'ib_rate': e.target.value })} value={userInput.ib_rate} />
          </div>

          <div>
            <label>Deal mode</label>
            <br />
            <select onChange={e => setUserInput({ ...userInput, 'deal_mode': e.target.value })} value={userInput.deal_mode}>
              <option value=''></option>
              {
                dropdownLists.dealModeList.map((item, key) => {
                  return <option key={key} value={item.id}>{item.name}</option>
                })
              }
            </select>
          </div>

          <div>
            <label>Brokerage</label>
            <br />
            <input type="text" value={formatter(userInput.brokerage)} disabled />
          </div>

          <div>
            <label>USD rate</label>
            <br />
            <input type="text" onBlur={() => defaultSubmitHandler()} onChange={e => setUserInput({ ...userInput, 'usd_rate': e.target.value })} value={userInput.usd_rate} />
          </div>

          <div>
            <label>Equiv. USD</label>
            <br />
            <input type="text" value={formatter(userInput.equiv_usd)} disabled />
          </div>

          <div>
            <label>Equiv. PKR</label>
            <br />
            <input type="text" value={formatter(userInput.equiv_pkr)} disabled />
          </div>

          <div>
            <label>DTM</label>
            <br />
            <input type="text" value={formatter(userInput.dtm)} disabled />
          </div>

          <div>
            <label>Reval rate</label>
            <br />
            <input type="text" value={formatter(userInput.reval_rate)} disabled />
          </div>

          <div>
            <label>Gain/Loss</label>
            <br />
            <input type="text" value={formatter(userInput.gain_loss)} disabled />
          </div>

          <div></div>

        </form>

      </div>

      <div>
        <button className='cancel-button' type='submit' style={{ display: 'inline' }} onClick={() => defaultSubmitHandler()}>Save</button>
        <button className='cancel-button' style={{ display: 'inline', backgroundColor: 'white', color: '#1c4966', marginLeft: '20px' }} onClick={() => onNewEntryClicked()}>Cancel</button>
      </div>

    </div>
  )
}

export default NewEntryInput