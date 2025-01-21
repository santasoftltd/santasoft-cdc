import Loader from '../../../../santasoft/components/loader/Loader'
import { useState } from 'react'
import React from 'react'
import { ip } from '../../../../../App'
import { numberWithCommas } from '../../../../santasoft/components/Formatter'

function DTL_SLR_Form({ user, refresh, date, data, setData, userInput, setUserInput, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const clearButtonHandler = () => {
    setUserInput({
      "id": '',
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
    })
  }

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sm01/lPnJnzpC@!p$wbv$haRIa705bfeasHqJUqvsP&iBW&RM7H&f54/' + userInput.date + '/0/', {
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
        // setUserInput(result.data);
        clearButtonHandler()
        addMessageHandler({
          title: 'Saved',
          content: result.message,
          type: 3
        })
      }

      else if (response.status === 400) {
        // setUserInput(result.data);
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
        // setUserInput(result.data);
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
        // setUserInput(result.data);
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

  const deleteHandler = async () => {
    if (userInput.id === '') {
      addMessageHandler({
        title: 'Failed',
        content: 'Please select the data from below table by double clicking the row.',
        type: 2
      })
    }
    else {
      if (window.confirm("Selected deal will be deleted from the system!")) {
        try {
          setIsLoading(true);
          const response = await fetch(ip + '/sm01/lPnJnzpC@!p$wbv$haRIa705bfeasHqJUqvsP&iBW&RM7H&f54/' + date + '/' + userInput.id + '/', {
            method: 'DELETE',
            body: JSON.stringify(userInput),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': 'Token ' + user.token + ''
            },
          })
          setIsLoading(false);

          let result = await response.json();

          if (response.status === 200) {
            // setData(current =>
            //   current.filter(obj => obj['id'] !== userInput.id).map(filterData => { return filterData })
            // );
            clearButtonHandler();
            addMessageHandler({
              title: 'Record Deleted',
              content: result.message,
              type: 3
            });
            clearButtonHandler();
          }

          else if (response.status === 400) {
            addMessageHandler({
              title: 'Record not deleted',
              content: result.message,
              type: 2
            })
          }

          else if (response.status === 401) {
            addMessageHandler({
              title: 'Record not deleted',
              content: 'Unable to delete due to unauthorized request.',
              type: 4
            })
          }

          else if (response.status === 404) {
            addMessageHandler({
              title: 'Record not deleted',
              content: result.message,
              type: 4
            })
          }

          else if (response.status === 406) {
            addMessageHandler({
              title: 'Record not deleted',
              content: result.message,
              type: 4
            })
          }

          else if (response.status === 500) {
            addMessageHandler({
              title: 'Record not deleted',
              content: result.message,
              type: 4
            })
          }
        }
        catch (err) {
          console.log(err.message);
        }
      }
    }
  }

  return (
    <div className='table-container'>

      {isloading && <Loader margin={'45%'} />}

      {/* Table Title */}
      <div className='table-container-name'>
        <p>Form</p>
      </div>

      <div className='deal-form'>

        <div className='alm-dtl-slr-deal-form-container'>

          <div>
            <label>Date:</label>
            <input type="date" onChange={e => setUserInput({ ...userInput, 'date': e.target.value })} value={userInput.date}/>
          </div>

          <div>
            <label>DTL Amount:</label>
            <input style={{ width: '100px' }} type="text" onChange={e => setUserInput({ ...userInput, 'dtl': e.target.value })} value={numberWithCommas(userInput.dtl)} />
          </div>

          <div>
            <label>DTL %:</label>
            <input style={{ width: '100px' }} type="text" onChange={e => setUserInput({ ...userInput, 'dtl_per': e.target.value })} value={userInput.dtl_per} />
          </div>

          <div>
            <label>Avg CRR:</label>
            <input style={{ width: '100px' }} type="text" onChange={e => setUserInput({ ...userInput, 'avg_crr': e.target.value })} value={userInput.avg_crr} />
          </div>

          <div>
            <label>Lower CRR:</label>
            <input style={{ width: '100px' }} type="text" onChange={e => setUserInput({ ...userInput, 'lower_crr': e.target.value })} value={userInput.lower_crr} />
          </div>

          <div>
            <label>CRR Days:</label>
            <input style={{ width: '100px' }} type="text" onChange={e => setUserInput({ ...userInput, 'crr_days': e.target.value })} value={userInput.crr_days} />
          </div>

          <div>
            <label>Sukuk Amount:</label>
            <input style={{ width: '100px' }} type="text" onChange={e => setUserInput({ ...userInput, 'sukuk': e.target.value })} value={numberWithCommas(userInput.sukuk)} />
          </div>

          <div>
            <label>Bank Balance:</label>
            <input style={{ width: '100px' }} type="text" onChange={e => setUserInput({ ...userInput, 'bankBalance': e.target.value })} value={numberWithCommas(userInput.bankBalance)} />
          </div>

          <div>
            <label>Cash in hand:</label>
            <input style={{ width: '100px' }} type="text" onChange={e => setUserInput({ ...userInput, 'cashInHand': e.target.value })} value={numberWithCommas(userInput.cashInHand)} />
          </div>

          <div>
            <button className='deal-form-button deal-form-button-save' style={{ width: '100px',  marginTop: '11px', marginLeft:'30px', fontSize: 'x-small' }} onClick={() => submitHandler()}>Save</button>
          </div>

          <div>
            <button className='deal-form-button deal-form-button-save' style={{ width: '100px', marginTop: '11px', fontSize: 'x-small' }} onClick={() => deleteHandler()}>Delete</button>
          </div>

          <div>
            <button className='deal-form-button deal-form-button-clear' style={{ width: '100px', marginTop: '11px', fontSize: 'x-small' }} onClick={() => clearButtonHandler()}>Clear</button>
          </div>

        </div>
{/* 
        <div className='deal-form-container'>

          

        </div> */}

      </div>
    </div>
  )
}

export default DTL_SLR_Form