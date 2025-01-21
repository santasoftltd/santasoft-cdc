import { useState, useEffect } from 'react'
import React from 'react'

import Loader from '../../../../santasoft/components/loader/Loader'
import { ip } from '../../../../../App'
import { numberWithCommas } from '../../../../santasoft/components/Formatter'

function NewEntryInput({ user, dealer, updateObject, setUpdateObject, onNewEntryClicked, date, dropdownLists, setDataSummary, fetchedData, setFetchedData, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [startDateDay, setStartDateDay] = useState('')

  const [endDateDay, setEndDateDay] = useState('')

  const getFormattedDate = (formattedDate) => {
    formattedDate = formattedDate.split('-')
    return formattedDate[2] + '-' + formattedDate[1] + '-' + formattedDate[0]
  }

  const getObject = () => {
    if (updateObject !== null) {
      return {...updateObject, 'vdate': getFormattedDate(updateObject.vdate.replace(" 00:00:00", "")), 'vdate2': getFormattedDate(updateObject.vdate2.replace(" 00:00:00", "")) }
    }
    else {
      return {
        "id": null,
        "dealer_name": user.name,
        "c_name": '',
        "cif": '',
        "branch_code": '0',
        "cltype": '',
        "recv": 'N',
        "product": '',
        "calc": '.',
        "days": 0,
        "vdate": getFormattedDate(date),
        "days2": 0,
        "vdate2": getFormattedDate(date),
        "ccy": '',
        "n_c": 'Nor',
        "export": '',
        "importt": '',
        "deal_rate": '',
        "i_b_rate": '',
        "third_ccy_cross": '',
        "i_b_premium": '',
        "option_premium": '',
        "third_ccy_premium": '',
        "branch": '',
        "spread": '',
        "profit": '',
        "nostro_ac": '',
        "ttdate": getFormattedDate(date),
        "timestamp": '',
        "at_risk_income_fwd": '',
        "at_risk_income_salam": '',
        "take_up_loss": '',
        "pkr": '',
        "usd": '',
        "salam_yield": '',
        "fbp_profit": '',
        "salam_cost": '',
        "fbp_loss": '',
        "fwd_take_up": '',
        "take_close": '.',
        "c_rem": '',
      }
    }
  }

  const [userInput, setUserInput] = useState(getObject())

  const eraseHandler = () => {
    setUserInput({
      "id": null,
      "dealer_name": user.name,
      "c_name": '',
      "cif": '',
      "branch_code": '0',
      "cltype": '',
      "recv": 'N',
      "product": '',
      "calc": '.',
      "days": 0,
      "vdate": getFormattedDate(date),
      "days2": 0,
      "vdate2": getFormattedDate(date),
      "ccy": '',
      "n_c": 'Nor',
      "export": '',
      "importt": '',
      "deal_rate": '',
      "i_b_rate": '',
      "third_ccy_cross": '',
      "i_b_premium": '',
      "option_premium": '',
      "third_ccy_premium": '',
      "branch": '',
      "spread": '',
      "profit": '',
      "nostro_ac": '',
      "ttdate": getFormattedDate(date),
      "timestamp": '',
      "at_risk_income_fwd": '',
      "at_risk_income_salam": '',
      "take_up_loss": '',
      "pkr": '',
      "usd": '',
      "salam_yield": '',
      "fbp_profit": '',
      "salam_cost": '',
      "fbp_loss": '',
      "fwd_take_up": '',
      "take_close": '.',
      "c_rem": '',
    }
    )
  }

  // useEffect(() => {
  //   var branch = dropdownLists.branch.filter(obj => { return obj.name === userInput.branch_code })
  //   if (branch.length) {
  //     branch = branch[0]
  //     setUserInput({ ...userInput, 'branch': branch.branch_name })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userInput.branch_code]);

  async function fetchBranchAPI(branchCode) {
    try {
      const response = await fetch(ip + '/sfe01/p0WGWX&O$LZzk5uynjw&Bpb2qeYxu@VGX7ij8eft7X*wRJLtU1/' + branchCode + '/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });

      let result = await response.json();

      if (response.status === 200 && result.branchList.length !== 0) {
        setUserInput({ ...userInput, 'branch': result.branchList[0].branch_name })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Branch name failed to load due.',
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
    fetchBranchAPI(userInput.branch_code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput.branch_code]);

  useEffect(() => {
    var customer = dropdownLists.customer.filter(obj => { return obj.name === userInput.c_name })
    if (customer.length) {
      customer = customer[0]
      setUserInput({ ...userInput, 'cif': customer.cif, 'cltype': customer.client_type })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput.c_name]);

  useEffect(() => {
    var customer = dropdownLists.customer.filter(obj => { return obj.cif === parseInt(userInput.cif) })
    if (customer.length) {
      customer = customer[0]
      setUserInput({ ...userInput, 'c_name': customer.name, 'cltype': customer.client_type })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput.cif]);

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

      if (startDateDay === 'Saturday' || startDateDay === 'Sunday' || endDateDay === 'Saturday' || endDateDay === 'Sunday') {
        addMessageHandler({
          title: 'Transaction not saved',
          content: 'Option date or Maturity date cannot fall on weekend.',
          type: 4
        })
        return
      }

      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/fbUmedhohi0D$p3j4C1cz90fJemU@h&yGgmqhSq@To44eQ0iOG/empty/empty/empty/' + date + '/' + dealer + '/0/', {
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
        eraseHandler()
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
          title: 'Transaction bot saved',
          content: 'Unabled to saved due to unauthorized request.',
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

  const addDays = (maturity, days) => {
    var dealDate
    if (days === '') {
      days = '0'
    }
    days = parseInt(days)
    if (maturity === 'no') {
      dealDate = new Date(date);
      dealDate.setDate(dealDate.getDate() + days);
      return dealDate.getDate() + "-" + (dealDate.getMonth() + 1) + "-" + dealDate.getFullYear();
    }
    else {
      dealDate = userInput['vdate'];
      var splittedDate = dealDate.split('-')
      dealDate = splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0]
      dealDate = new Date(dealDate);
      dealDate.setDate(dealDate.getDate() + days);
      return dealDate.getDate() + "-" + (dealDate.getMonth() + 1) + "-" + dealDate.getFullYear();
    }
  }

  const onUpdate = async () => {
    if (user.name === userInput.dealer_name) {
      try {

        if (startDateDay === 'Saturday' || startDateDay === 'Sunday' || endDateDay === 'Saturday' || endDateDay === 'Sunday') {
          addMessageHandler({
            title: 'Transaction not saved',
            content: 'Option date or Maturity date cannot fall on weekend.',
            type: 4
          })
          return
        }

        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/fbUmedhohi0D$p3j4C1cz90fJemU@h&yGgmqhSq@To44eQ0iOG/empty/empty/empty/' + date + '/' + dealer + '/' + updateObject.id + '/', {
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
    else {
      addMessageHandler({
        title: 'Transaction not updated',
        content: 'You cannot modify other dealer deals.',
        type: 2
      })
    }
  }

  useEffect(() => {
    setStartDateDay(getDay(userInput.vdate))
    setEndDateDay(getDay(userInput.vdate2))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput.vdate, userInput.vdate2]);

  const getDay = (date) => {
    var splittedDate = date.split('-')
    date = splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0]
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date(date);
    let day = weekday[d.getDay()];
    return day
  }

  const getDayColor = (day) => {
    const workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    if (workingDays.includes(day)) {
      return 'green'
    }
    else {
      return 'red'
    }
  }

  return (
    <div className='form-container'>

      {isloading && <Loader margin={'65%'} />}

      <div className='table-container'>

        <div className='table-container-name'>
          <p>Deal Form</p>
        </div>

        <form className='table-container-form' onSubmit={submitHandler}>

          <div>
            <label>Branch code</label>
            <br />
            <input type="text" name="branch_code" id="id_branch_code" onChange={e => { setUserInput({ ...userInput, 'branch_code': e.target.value }) }} onBlur={e => dropdownLists.onBranchCodeEntered(e.target.value)} value={userInput.branch_code} />
          </div>

          <div>
            <label>Branch name</label>
            <br />
            <input type="text" name="branch" id="id_branch" onChange={e => setUserInput({ ...userInput, branch: e.target.value })} value={userInput.branch} />
          </div>

          <div></div>

          <div style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
            <label>Customer name</label>
            <br />
            <input type="text" name="c_name" list='c_name' id="id_c_name" onChange={e => setUserInput({ ...userInput, c_name: e.target.value })} value={userInput.c_name} />
          </div>

          <div></div>

          <div>
            <label>CIF</label>
            <br />
            <input type="text" name="cif" id="id_cif" onChange={e => setUserInput({ ...userInput, cif: e.target.value })} value={userInput.cif} />
          </div>

          <div>
            <label>Client type</label>
            <br />
            <input type="text" name="cltype" id="id_cltype" onChange={e => setUserInput({ ...userInput, cltype: e.target.value })} value={userInput.cltype} />
          </div>

          <div></div>

          <div>
            <label>Product</label>
            <br />
            <select name="product" id="id_product" onChange={e => setUserInput({ ...userInput, product: e.target.value })} value={userInput.product}>
              <option value=''></option>
              {
                dropdownLists.product.map((item, key) => {
                  return <option key={key} value={item.name}>{item.name}</option>
                })
              }
            </select>
          </div>

          <div>
            <label>Currency</label>
            <br />
            <select name="ccy" id="id_ccy" onChange={e => setUserInput({ ...userInput, ccy: e.target.value })} value={userInput.ccy}>
              <option value=''></option>
              {
                dropdownLists.currency.map((item, key) => {
                  return <option key={key} value={item.name}>{item.name}</option>
                })
              }
            </select>
          </div>

          <div></div>

          <div>
            <label>Fixed days</label>
            <br />
            <input type="text" name="days" maxLength="100" id="id_days" onChange={e => setUserInput({ ...userInput, days: e.target.value, vdate: addDays('no', e.target.value), vdate2: addDays('no', e.target.value) })} value={userInput.days} />
          </div>

          <div>
            <label style={{ display: 'inline' }} >Option date:</label> <label style={{ display: 'inline', color: getDayColor(startDateDay) }}>{startDateDay}</label>
            <br />
            <input type="text" disabled value={userInput.vdate} />
          </div>

          <div></div>

          <div>
            <label>Option days</label>
            <br />
            <input type="text" name="days2" maxLength="100" id="id_days2" onChange={e => setUserInput({ ...userInput, days2: e.target.value, vdate2: addDays('yes', e.target.value) })} value={userInput.days2} />
          </div>

          <div>
            <label style={{ display: 'inline' }}>Maturity date:</label> <label style={{ display: 'inline', color: getDayColor(endDateDay) }}>{endDateDay}</label>
            <br />
            <input type="text" disabled value={userInput.vdate2} />
          </div>

          <div></div>

          <div>
            <label>Export</label>
            <br />
            <input type="text" name="export" id="id_export" onChange={e => setUserInput({ ...userInput, export: e.target.value })} value={numberWithCommas(userInput.export)} />
          </div>

          <div>
            <label>Import</label>
            <br />
            <input type="text" name="importt" id="id_importt" onChange={e => setUserInput({ ...userInput, importt: e.target.value })} value={numberWithCommas(userInput.importt)} />
          </div>

          <div></div>

          <div>
            <label>Deal rate</label>
            <br />
            <input type="text" name="deal_rate" id="id_deal_rate" onChange={e => setUserInput({ ...userInput, deal_rate: e.target.value })} value={userInput.deal_rate} />
          </div>

          <div>
            <label>Interbank rate</label>
            <br />
            <input type="text" name="i_b_rate" id="id_i_b_rate" onChange={e => setUserInput({ ...userInput, i_b_rate: e.target.value })} value={userInput.i_b_rate} />
          </div>

          <div></div>

          <div>
            <label>Third currency cross</label>
            <br />
            <input type="text" name="third_ccy_cross" id="id_third_ccy_cross" onChange={e => setUserInput({ ...userInput, third_ccy_cross: e.target.value })} value={userInput.third_ccy_cross} />
          </div>

          <div>
            <label>Interbank premium</label>
            <br />
            <input type="text" name="i_b_premium" id="id_i_b_premium" onChange={e => setUserInput({ ...userInput, i_b_premium: e.target.value })} value={userInput.i_b_premium} />
          </div>

          <div></div>

          <div>
            <label>Option premium</label>
            <br />
            <input type="text" name="option_premium" id="id_option_premium" onChange={e => setUserInput({ ...userInput, option_premium: e.target.value })} value={userInput.option_premium} />
          </div>

          <div>
            <label>Third currency premium</label>
            <br />
            <input type="text" name="third_ccy_premium" id="id_third_ccy_premium" onChange={e => setUserInput({ ...userInput, third_ccy_premium: e.target.value })} value={userInput.third_ccy_premium} />
          </div>

          <div></div>

          <div>
            <label>Normal/Cross</label>
            <br />
            <select name="n_c" id="id_n_c" onChange={e => setUserInput({ ...userInput, n_c: e.target.value })} value={userInput.n_c}>
              <option value=''></option>
              <option value='Nor'>Normal</option>
              <option value='Cro'>Cross</option>
            </select>
          </div>

          <div>
            <label>Nostro account</label>
            <br />
            <select name="nostro_ac" id="id_nostro_ac" onChange={e => setUserInput({ ...userInput, nostro_ac: e.target.value })} value={userInput.nostro_ac}>
              <option value=''></option>
              {
                dropdownLists.nostro.filter(obj => obj.ccy === userInput.ccy).map(item => <option key={item.nostro} value={item.nostro}>{item.nostro}</option>)
              }
            </select>
          </div>

          <div></div>

        </form>

        <datalist id='c_name'>
          {
            dropdownLists.customer.map((item, key) => {
              return <option key={key} value={item.name}>{item.name}</option>
            })
          }
        </datalist>

      </div>

      <div>
        <button className='cancel-button' type='submit' style={{ display: 'inline' }} onClick={() => defaultSubmitHandler()}>Save</button>
        <button className='cancel-button' style={{ display: 'inline', backgroundColor: 'white', color: '#1c4966', marginLeft: '20px' }} onClick={() => onNewEntryClicked()}>Cancel</button>
      </div>

    </div>
  )
}

export default NewEntryInput