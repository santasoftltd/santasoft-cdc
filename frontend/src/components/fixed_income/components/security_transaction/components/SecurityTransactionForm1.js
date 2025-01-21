import { getDate, getFormattedDate } from '../../../../santasoft/components/Formatter'

import Loader from '../../../../santasoft/components/loader/Loader'

import crossImgae from '../../../../santasoft/res/black-cross.png'

import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

function IPS_AccountForm({ user, account, userInput, setUserInput, setFloatForm, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const clearButtonHandler = () => {
    setUserInput({
      "id": null,
      "account_number": "",
      "account_prefix": "",
      "account_title": "",
      "amc": "",
      "type": "",
      "opening_date": getDate(),
      "closing_date": "",
      "exeption": "",
      "taxation": "",
      "resident": "",
      "ntn_cnic": "",
    })
  }

  const checkRequiredField = () => {
    if (userInput.account_prefix === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Account prefix is required.',
        type: 4
      })
      return false
    }
    else if (userInput.account_title === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Account title is required.',
        type: 4
      })
      return false
    }
    else if (userInput.amc === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'AMC managing IPS is required.',
        type: 4
      })
      return false
    }
    else if (userInput.type === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Client type is required.',
        type: 4
      })
      return false
    }
    else if (userInput.exeption === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Clinet exeption status is required.',
        type: 4
      })
      return false
    }
    else if (userInput.taxation === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Client taxation status is required.',
        type: 4
      })
      return false
    }
    else if (userInput.resident === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Client resident status is required.',
        type: 4
      })
      return false
    }
    else {
      return true
    }
  }

  const getAction = () => {
    if (userInput.id === null) {
      return 'create'
    }
    else {
      return 'update'
    }
  }

  const submitHandler = async () => {
    try {
      if (checkRequiredField()) {
        setIsLoading(true);
        const response = await fetch(ip + '/sm15/d3JXdnRtaloKFJcfEWp8Ih2hQU9cNCTq66vW5e5ge7so3uJz2h/none/none/none/none/none/none/none/0/0/', {
          method: 'POST',
          body: JSON.stringify({ ...userInput, action: getAction() }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        })
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          clearButtonHandler()
          addMessageHandler({
            title: 'Success',
            content: result.message,
            type: 3
          })
        }

        else if (response.status === 400) {
          addMessageHandler({
            title: 'Failed',
            content: result.message,
            type: 4
          })
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Failed',
            content: 'Unauthorized request.',
            type: 4
          })
        }

        else if (response.status === 412) {
          addMessageHandler({
            title: 'Failed',
            content: result.message,
            type: 4
          })
        }

        else if (response.status === 409) {
          addMessageHandler({
            title: 'Failed',
            content: result.message,
            type: 4
          })
        }

        else if (response.status === 406) {
          addMessageHandler({
            title: 'Failed',
            content: result.message,
            type: 4
          })
        }

        else if (response.status === 500) {
          addMessageHandler({
            title: 'Failed',
            content: result.message,
            type: 4
          })
        }
      }
    }
    catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='black-background'>

      {isloading && <Loader margin={'45%'} />}

      <div className='float-component2'>

        {/* SecurityFloatForm */}
        <div className='table-container'>

          {/* Table Title */}
          <div className='table-container-name' style={{ paddingBottom: '4px', paddingTop: '4px' }}>
            <p style={{ display: 'inline', cursor: 'pointer', margin: '0px 0px 0px 10px' }}>IPS Account</p>
            <div style={{ float: 'right', marginRight: '10px', marginTop: '3px' }}><img onClick={() => setFloatForm(false)} className='transaction-grid-picture' style={{ cursor: 'pointer' }} src={crossImgae} title="Close" alt="Close" /></div>
          </div>

          {userInput.status !== 'Approved'
            ?
            <div className='deal-form'>

              <div className='deal-form-container'>

                <div style={{ width: '200px' }}>
                  <label>Account Number:</label>
                  <input type="text" disabled value={userInput.account_number} />
                </div>

                <div style={{ width: '200px' }}>
                  <label>Account Prefix:</label>
                  <input type="text" onChange={e => setUserInput({ ...userInput, 'account_prefix': e.target.value })} value={userInput.account_prefix} />
                </div>

              </div>

              <div className='deal-form-container'>

                <div style={{ width: '425px' }}>
                  <label>Account Title:</label>
                  <input type="text" onChange={e => setUserInput({ ...userInput, 'account_title': e.target.value })} value={userInput.account_title} />
                </div>

              </div>

              <div className='deal-form-container'>

                {account === 'amc'
                  ?
                  <div style={{ width: '415px' }}>
                    <label>Managed by:</label>
                    <select onChange={e => setUserInput({ ...userInput, 'amc': e.target.value })} value={userInput.amc}>
                      <option value=''></option>
                      <option value='MTB'>MTD</option>
                      <option value='PIB'>PIB</option>
                      <option value='GIS'>GIS</option>
                    </select>
                  </div>
                  :
                  <div style={{ width: '415px' }}>
                    <label>Managed by:</label>
                    <select onChange={e => setUserInput({ ...userInput, 'amc': e.target.value })} value={userInput.amc}>
                      <option value='CDC - Retail Client Account'>CDC - Retail Client Account</option>
                    </select>
                  </div>
                }

              </div>

              <div className='deal-form-container'>

                <div style={{ width: '120px' }}>
                  <label>Client Type:</label>
                  <select onChange={e => setUserInput({ ...userInput, 'type': e.target.value })} value={userInput.type}>
                    <option value=''></option>
                    <option value='abc'>abc</option>
                    <option value='xyz'>xyz </option>
                  </select>
                </div>

                <div style={{ width: '120px' }}>
                  <label>Opening date:</label>
                  <input type="date" disabled value={userInput.opening_date} />
                  {/* <p>{getFormattedDate(userInput.opening_date)}</p> */}
                </div>

                <div style={{ width: '120px' }}>
                  <label>Closing date:</label>
                  <input type="date" onChange={e => setUserInput({ ...userInput, 'closing_date': e.target.value })} value={userInput.closing_date} />
                </div>



              </div>

              <div className='deal-form-container'>

                <div style={{ width: '120px' }}>
                  <label>Exeption:</label>
                  <select onChange={e => setUserInput({ ...userInput, 'exeption': e.target.value })} value={userInput.exeption}>
                    <option value=''></option>
                    <option value='Exempted'>Exempted</option>
                    <option value='Non-Exempted '>Non-Exempted</option>
                  </select>
                </div>

                <div style={{ width: '120px' }}>
                  <label>Taxation:</label>
                  <select onChange={e => setUserInput({ ...userInput, 'taxation': e.target.value })} value={userInput.taxation}>
                    <option value=''></option>
                    <option value='Filer'>Filer</option>
                    <option value='Non-Filer'>Non-Filer</option>
                  </select>
                </div>

                <div style={{ width: '120px' }}>
                  <label>Resident:</label>
                  <select onChange={e => setUserInput({ ...userInput, 'resident': e.target.value })} value={userInput.resident}>
                    <option value=''></option>
                    <option value='Resident'>Resident</option>
                    <option value='Non-Resident'>Non-Resident</option>
                  </select>
                </div>



              </div>

              <div className='deal-form-container'>

                <div style={{ width: '120px' }}>
                  <label>CNIC/NTN:</label>
                  <input type="text" placeholder="43101-1234567-8" onChange={e => setUserInput({ ...userInput, 'ntn_cnic': e.target.value })} value={userInput.cnic} />
                </div>

              </div>

              <div className='deal-form-container'>

                <div style={{ width: '80px' }}>
                  <button className='deal-form-button deal-form-button-save' style={{ fontSize: 'x-small' }} onClick={() => submitHandler()}>Save</button>
                </div>

                <div style={{ width: '80px' }}>
                  <button className='deal-form-button deal-form-button-clear' style={{ fontSize: 'x-small' }} onClick={() => clearButtonHandler()}>Clear</button>
                </div>

              </div>

            </div>
            :
            <div className='deal-form'>

              <div className='deal-form-container'>

                <div style={{ width: '200px' }}>
                  <label>Account Number:</label>
                  <input type="text" disabled value={userInput.account_number} />
                </div>

                <div style={{ width: '200px' }}>
                  <label>Account Prefix:</label>
                  <input type="text" disabled value={userInput.account_prefix} />
                </div>

              </div>

              <div className='deal-form-container'>

                <div style={{ width: '425px' }}>
                  <label>Account Title:</label>
                  <input type="text" disabled value={userInput.account_title} />
                </div>

              </div>

              <div className='deal-form-container'>

                {account === 'amc'
                  ?
                  <div style={{ width: '415px' }}>
                    <label>Managed by:</label>
                    <select disabled value={userInput.amc}>
                      <option value=''></option>
                      <option value='MTB'>MTD</option>
                      <option value='PIB'>PIB</option>
                      <option value='GIS'>GIS</option>
                    </select>
                  </div>
                  :
                  <div style={{ width: '415px' }}>
                    <label>Managed by:</label>
                    <select disabled value={userInput.amc}>
                      <option value='CDC - Retail Client Account'>CDC - Retail Client Account</option>
                    </select>
                  </div>
                }

              </div>

              <div className='deal-form-container'>

                <div style={{ width: '120px' }}>
                  <label>Client Type:</label>
                  <select disabled value={userInput.type}>
                    <option value=''></option>
                    <option value='abc'>abc</option>
                    <option value='xyz'>xyz </option>
                  </select>
                </div>

                <div style={{ width: '120px' }}>
                  <label>Opening date:</label>
                  <input type="date" disabled value={userInput.opening_date} />
                  {/* <p>{getFormattedDate(userInput.opening_date)}</p> */}
                </div>

                <div style={{ width: '120px' }}>
                  <label>Closing date:</label>
                  <input type="date" onChange={e => setUserInput({ ...userInput, 'closing_date': e.target.value })} value={userInput.closing_date} />
                </div>



              </div>

              <div className='deal-form-container'>

                <div style={{ width: '120px' }}>
                  <label>Exeption:</label>
                  <select disabled value={userInput.exeption}>
                    <option value=''></option>
                    <option value='Exempted'>Exempted</option>
                    <option value='Non-Exempted '>Non-Exempted</option>
                  </select>
                </div>

                <div style={{ width: '120px' }}>
                  <label>Taxation:</label>
                  <select disabled  value={userInput.taxation}>
                    <option value=''></option>
                    <option value='Filer'>Filer</option>
                    <option value='Non-Filer'>Non-Filer</option>
                  </select>
                </div>

                <div style={{ width: '120px' }}>
                  <label>Resident:</label>
                  <select disabled  value={userInput.resident}>
                    <option value=''></option>
                    <option value='Resident'>Resident</option>
                    <option value='Non-Resident'>Non-Resident</option>
                  </select>
                </div>



              </div>

              <div className='deal-form-container'>

                <div style={{ width: '120px' }}>
                  <label>CNIC/NTN:</label>
                  <input type="text" placeholder="43101-1234567-8" disabled value={userInput.cnic} />
                </div>

              </div>

              <div className='deal-form-container'>

                <div style={{ width: '80px' }}>
                  <button className='deal-form-button deal-form-button-save' style={{ fontSize: 'x-small' }} onClick={() => submitHandler()}>Save</button>
                </div>

                <div style={{ width: '80px' }}>
                  <button className='deal-form-button deal-form-button-clear' style={{ fontSize: 'x-small' }} onClick={() => clearButtonHandler()}>Clear</button>
                </div>

              </div>

            </div>
          }



        </div>
      </div>
    </div>
  )
}

export default IPS_AccountForm