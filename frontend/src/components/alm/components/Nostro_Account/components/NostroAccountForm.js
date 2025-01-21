import Loader from '../../../../santasoft/components/loader/Loader'
import { useState } from 'react'
import React from 'react'
import { ip } from '../../../../../App'

function NostroAccountForm({ user, refresh, date, userInput, setUserInput, data, setData, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const clearButtonHandler = () => {
    setUserInput({
      "id": '',
      "currency": '',
      "name": '',
    })
  }

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe05/57lLHq4554yGGY5bpQFFL2azHQbX&A6zY4GfAD7OeJYjk67!CFpJV/null/' + date + '/0/0/', {
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
        if (userInput.id === '') {
          setData([result.object, ...data])
        }
        else {
          setData(current =>
            current.map(obj => {
              if (obj['id'] === userInput.id) {
                return result.object
              }
              else {
                return obj
              }
            })
          );
        }
        addMessageHandler({
          title: 'Transaction saved',
          content: result.message,
          type: 3
        })
        clearButtonHandler();
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
          const response = await fetch(ip + '/sfe05/57lLHq4yGGY5bpQFF45456L2azHQbX&A6zY4GfAD7OeJYjk67!CFpJV/null/' + date + '/0/0/', {
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
            setData(current =>
              current.filter(obj => obj['id'] !== userInput.id).map(filterData => { return filterData })
            );
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

        <div className='deal-form-container'>

          <div>
            <label>Currency:</label>
            <input type="text" style={{ width: '80px' }} onChange={e => setUserInput({ ...userInput, 'currency': e.target.value })} value={userInput.currency} />
          </div>

          <div>
            <label>Name:</label>
            <input type="text" style={{ width: '300px' }} onChange={e => setUserInput({ ...userInput, 'name': e.target.value })} value={userInput.name} />
          </div>

        </div>

        <div className='deal-form-container'>

          <div>
            <button className='deal-form-button deal-form-button-save' style={{ fontSize: 'x-small' }} onClick={() => submitHandler()}>Save</button>
          </div>

          <div>
            <button className='deal-form-button deal-form-button-save' style={{ fontSize: 'x-small' }} onClick={() => deleteHandler()}>Delete</button>
          </div>

          <div>
            <button className='deal-form-button deal-form-button-clear' style={{ fontSize: 'x-small' }} onClick={() => clearButtonHandler()}>Clear</button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default NostroAccountForm