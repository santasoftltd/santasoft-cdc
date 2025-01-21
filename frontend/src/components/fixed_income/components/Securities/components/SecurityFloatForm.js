import Loader from '../../../../santasoft/components/loader/Loader'

import crossImgae from '../../../../santasoft/res/black-cross.png'

import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

function SecurityFloatForm({ user, securityType, userInput, setUserInput, setFloatForm, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const clearButtonHandler = () => {
    setUserInput({
      "id": null,
      "security_code": "",
      "instrument": "",
      "tenor": "",
      "issue_date": "",
      "maturity_date": "",
      "shut_period": "",
      "coupon_rate": "",
      "coupon_frequency": '2',
      "coupon_type": 'fixed',
    })

    setFloatForm(false)
  }

  const checkRequiredField = () => {
    if (userInput.security_code === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Security code is required.',
        type: 4
      })
      return false
    }
    else if (userInput.instrument === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Instrument is required.',
        type: 4
      })
      return false
    }
    else if (userInput.tenor === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Tenor is required.',
        type: 4
      })
      return false
    }
    else if (userInput.issue_date === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Issue date is required.',
        type: 4
      })
      return false
    }
    else if (userInput.maturity_date === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Maturity date is required.',
        type: 4
      })
      return false
    }
    else if (userInput.shut_period === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Shut period is required.',
        type: 4
      })
      return false
    }
    else if (userInput.coupon_rate === "") {
      addMessageHandler({
        title: 'Failed',
        content: 'Coupon rate is required.',
        type: 4
      })
      return false
    }
    else if (userInput.coupon_frequency === "" && userInput.instrument !== 'MTB') {
      addMessageHandler({
        title: 'Failed',
        content: 'Coupon frequency is required.',
        type: 4
      })
      return false
    }
    else if (userInput.coupon_type === "" && userInput.instrument !== 'MTB') {
      addMessageHandler({
        title: 'Failed',
        content: 'Coupon type is required.',
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
        const response = await fetch(ip + '/sm15/FdirYW2qVPoIzLnbP07CW2adi1!0K2Mv*nTyUg5$7yWg*WwSQT/none/none/none/none/none/none/empty/0/0/', {
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

  const addLeadingZero = (number) => {
    if (number < 10) {
      return '0' + number
    }
    else {
      return number
    }
  }

  const getSecurityMaturityDate = () => {
    var dealDate, years, months
    if (userInput.issue_date === '' || userInput.instrument === null || userInput.tenor === null) {
      return ""
    }
    if (userInput.instrument === 'PIB' || userInput.instrument === 'GIS') {
      years = userInput.tenor.split("_")
      years = Number(years[0])
      dealDate = userInput['issue_date'];
      dealDate = new Date(dealDate);
      dealDate.setFullYear(dealDate.getFullYear() + years)
      dealDate = dealDate.getFullYear() + "-" + addLeadingZero(dealDate.getMonth() + 1) + "-" + addLeadingZero(dealDate.getDate())
      return dealDate
    }
    else if (userInput.instrument === 'MTB') {
      months = userInput.tenor.split("_")
      months = Number(months[0])
      dealDate = userInput['issue_date'];
      dealDate = new Date(dealDate);
      dealDate.setMonth(dealDate.getMonth() + months);
      dealDate = dealDate.getFullYear() + "-" + addLeadingZero(dealDate.getMonth() + 1) + "-" + addLeadingZero(dealDate.getDate());
      return dealDate
    }
    else {
      return ""
    }
  }

  const getSecurityShutPeriodDate = () => {
    var dealDate
    if (userInput.maturity_date === '') {
      return ""
    }
    dealDate = userInput['maturity_date'];
    dealDate = new Date(dealDate);
    dealDate.setDate(dealDate.getDate() - 3);
    dealDate = dealDate.getFullYear() + "-" + addLeadingZero(dealDate.getMonth() + 1) + "-" + addLeadingZero(dealDate.getDate())
    return dealDate
  }

  useEffect(() => {
    var maturity_date
    maturity_date = getSecurityMaturityDate();
    setUserInput({ ...userInput, maturity_date: maturity_date })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput.issue_date, userInput.instrument, userInput.tenor]);

  useEffect(() => {
    var shut_period_date
    shut_period_date = getSecurityShutPeriodDate();
    setUserInput({ ...userInput, shut_period: shut_period_date })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput.maturity_date]);

  return (
    <div className='black-background'>
      
      {isloading && <Loader margin={'45%'} />}
      
      <div className='float-component2'>
        
        {/* SecurityFloatForm */}
        <div className='table-container'>

          {/* Table Title */}
          <div className='table-container-name' style={{ paddingBottom: '4px', paddingTop: '4px' }}>
            <p style={{ display: 'inline', cursor: 'pointer', margin: '0px 0px 0px 10px' }}>Security Issue</p>
            <div style={{ float: 'right', marginRight: '10px', marginTop: '3px' }}><img onClick={() => clearButtonHandler()} className='transaction-grid-picture' style={{cursor:'pointer'}} src={crossImgae} title="Close" alt="Close" /></div>
          </div>

          <div className='deal-form'>

            <div className='deal-form-container'>

              <div className='fixed-income-securities-sub-home-float-form'>

              <div style={{ width: '200px' }}>
                <label>Security code:</label>
                <input type="text" required onChange={e => setUserInput({ ...userInput, 'security_code': e.target.value })} value={userInput.security_code} />
              </div>

              <div style={{ width: '200px' }}>
                <label>Instrument:</label>
                <select onChange={e => setUserInput({ ...userInput, 'instrument': e.target.value })} value={userInput.instrument}>
                  <option value=''></option>
                  <option value='MTB'>MTD</option>
                  <option value='PIB'>PIB</option>
                  <option value='GIS'>GIS</option>
                </select>
              </div>

              {userInput.instrument === 'MTB'
                &&
                <div style={{ width: '200px' }}>
                  <label>Tenor:</label>
                  <select onChange={e => setUserInput({ ...userInput, 'tenor': e.target.value })} value={userInput.tenor}>
                    <option value=''></option>
                    <option value='3_Months'>3 Months</option>
                    <option value='6_Months'>6 Months</option>
                    <option value='12_Months'>12 Months</option>
                  </select>
                </div>
              }

              {(userInput.instrument === 'PIB' || userInput.instrument === 'GIS')
                &&
                <div style={{ width: '200px' }}>
                  <label>Tenor:</label>
                  <select onChange={e => setUserInput({ ...userInput, 'tenor': e.target.value })} value={userInput.tenor}>
                    <option value=''></option>
                    <option value='2_Years'>2 Years</option>
                    <option value='3_Years'>3 Years</option>
                    <option value='5_Years'>5 Years</option>
                    <option value='7_Years'>7 Years</option>
                    <option value='10_Years'>10 Years</option>
                    <option value='15_Years'>15 Years</option>
                    <option value='20_Years'>20 Years</option>
                    <option value='30_Years'>30 Years</option>
                  </select>
                </div>
              }

              {userInput.instrument === ''
                &&
                <div style={{ width: '200px' }}>
                  <label>Tenor:</label>
                  <select>
                    <option value=''></option>
                  </select>
                </div>
              }

            {/* </div> */}

            {/* <div className='deal-form-container'> */}

              <div style={{ width: '200px' }}>
                <label>Issue date:</label>
                <input type="date" onChange={e => setUserInput({ ...userInput, 'issue_date': e.target.value })} value={userInput.issue_date} />
              </div>

              <div style={{ width: '200px' }}>
                <label>Maturity date:</label>
                <input type="date" onChange={e => setUserInput({ ...userInput, 'maturity_date': e.target.value })} value={userInput.maturity_date} />
              </div>

              <div style={{ width: '200px' }}>
                <label>Shut period:</label>
                <input type="date" onChange={e => setUserInput({ ...userInput, 'shut_period': e.target.value })} value={userInput.shut_period} />
              </div>

            {/* </div> */}

            {/* <div className='deal-form-container'> */}

              <div style={{ width: '200px' }}>
                <label>Coupon rate:</label>
                <input type="text" onChange={e => setUserInput({ ...userInput, 'coupon_rate': e.target.value })} value={userInput.coupon_rate} />
              </div>

              <div style={{ width: '200px' }}>
                <label>Coupon frequency:</label>
                {
                  userInput.instrument !== 'MTB'
                    ?
                    <select onChange={e => setUserInput({ ...userInput, 'coupon_frequency': e.target.value })} value={userInput.coupon_frequency}>
                      <option value='0'></option>
                      <option value='4'>Quaterly</option>
                      <option value='2'>Semi-annually</option>
                      <option value='1'>Annually</option>
                    </select>
                    :
                    <select disabled value={userInput.coupon_frequency}>
                    </select>
                }

              </div>

              <div style={{ width: '200px' }}>
                <label>Coupon type:</label>
                {
                  userInput.instrument !== 'MTB'
                    ?
                    <select onChange={e => setUserInput({ ...userInput, 'coupon_type': e.target.value })} value={userInput.coupon_type}>
                      <option value=''></option>
                      <option value='fixed'>Fixed</option>
                      <option value='floating'>Floating</option>
                    </select>
                    :
                    <select disabled value={userInput.coupon_type}>
                    </select>
                }
              </div>

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

        </div>
      </div>
    </div>
  )
}

export default SecurityFloatForm