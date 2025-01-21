import '../DealEntry.css'

import Loader from '../../../../santasoft/components/loader/Loader'

import TransactionsRates from '../../dashboard/components/TransactionsRates'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'
import { formatter, numberWithCommas } from '../../../../santasoft/components/Formatter'

function DealTicket({ user, refresh, rates, setRates, date, dropdownLists, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [startDateDay, setStartDateDay] = useState('')

    const [endDateDay, setEndDateDay] = useState('')

    const getFormattedDate = (formattedDate) => {
        formattedDate = formattedDate.split('-')
        return formattedDate[2] + '-' + formattedDate[1] + '-' + formattedDate[0]
    }

    const [userInput, setUserInput] = useState(
        {
            "id": null,
            "dealer_name": user.name,
            "c_name": '',
            "cif": '',
            "branch_code": '',
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

    const submitHandler = async () => {
        try {

            if(startDateDay === 'Saturday' || startDateDay === 'Sunday' || endDateDay === 'Saturday' || endDateDay === 'Sunday' )
            {
                addMessageHandler({
                    title: 'Transaction not saved',
                    content: 'Option date or Maturity date cannot fall on weekend.',
                    type: 4
                })
                return
            }

            setIsLoading(true);
            const response = await fetch(ip + '/sfe01/fbUmedhohi0D$p3j4C1cz90fJemU@h&yGgmqhSq@To44eQ0iOG/empty/empty/empty/' + date + '/' + user.name + '/0/', {
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
                setUserInput({...result.object, 'vdate': getFormattedDate(result.object.vdate.replace("T00:00:00", "")), 'vdate2': getFormattedDate(result.object.vdate2.replace("T00:00:00", ""))});
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

    const updateHandler = async () => {
        try {

            if(startDateDay === 'Saturday' || startDateDay === 'Sunday' || endDateDay === 'Saturday' || endDateDay === 'Sunday' )
            {
                addMessageHandler({
                    title: 'Transaction not saved',
                    content: 'Option date or Maturity date cannot fall on weekend.',
                    type: 4
                })
                return
            }

            setIsLoading(true);
            const response = await fetch(ip + '/sfe01/fbUmedhohi0D$p3j4C1cz90fJemU@h&yGgmqhSq@To44eQ0iOG/empty/empty/empty/' + date + '/' + user.name + '/' + userInput.id + '/', {
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
                setUserInput({...result.object, 'vdate': getFormattedDate(result.object.vdate.replace("T00:00:00", "")), 'vdate2': getFormattedDate(result.object.vdate2.replace("T00:00:00", ""))});
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

    const onSaveButttonClick = () => {
        if(userInput.id == null){
            submitHandler()
        }
        else if(userInput.id != null){
            updateHandler()
        }
    }

    const clearButtonHandler = () => {
        setUserInput({
            "id": null,
            "dealer_name": user.name,
            "c_name": '',
            "cif": '',
            "branch_code": '',
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
        })
    }

    const addDays = (maturity, days) => {
        var dealDate
        if (days === '') {
            days = '0'
        }
        days = parseInt(days)
        if (maturity === 'no') {
            dealDate = new Date(date);
            dealDate.setDate(dealDate.getDate() + days);
            dealDate = dealDate.getDate() + "-" + (dealDate.getMonth() + 1) + "-" + dealDate.getFullYear();
            setUserInput({ ...userInput, days: days, vdate: dealDate, vdate2: dealDate })
        }
        else {
            dealDate = userInput['vdate'];
            var splittedDate = dealDate.split('-')
            dealDate = splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0]
            dealDate = new Date(dealDate);
            dealDate.setDate(dealDate.getDate() + days);
            dealDate = dealDate.getDate() + "-" + (dealDate.getMonth() + 1) + "-" + dealDate.getFullYear();
            setUserInput({ ...userInput, days2: days, vdate2: dealDate })
        }
    }

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

            if (response.status === 200) {
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

    useEffect(() => {
        var startDate, endDate, days
        days = parseInt(userInput.days)
        startDate = new Date(date);
        startDate.setDate(startDate.getDate() + days);
        startDate = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
        endDate = startDate
        var splittedDate = endDate.split('-')
        endDate = splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0]
        endDate = new Date(endDate);
        days = parseInt(userInput.days2)
        endDate.setDate(endDate.getDate() + days);
        endDate = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
        setUserInput({ ...userInput, vdate: startDate, vdate2: endDate, ttdate: getFormattedDate(date)})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    useEffect(() => {
        setStartDateDay(getDay(userInput.vdate))
        setEndDateDay(getDay(userInput.vdate2))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInput.vdate, userInput.vdate2]);

    const getDay = (date) => {
        var splittedDate = date.split('-')
        date = splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0]
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const d = new Date(date);
        let day = weekday[d.getDay()];
        return day
    }

    const getDayColor = (day) => {
        const workingDays = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
        if(workingDays.includes(day))
        {
            return 'green'
        }
        else{
            return 'red'
        }
    }

    return (
        <div className='table-container deal-entry-sub-home-third-child'>

            {isloading && <Loader margin={'45%'} />}

            {/* Table Title */}
            <div className='table-container-name'>
                <p>Transaction</p>
            </div>

            <TransactionsRates user={user} refresh={refresh} rates={rates} setRates={setRates} date={date} border={'1px solid rgb(148, 148, 148)'} addMessageHandler={addMessageHandler} />

            <div className='deal-form'>
                <div className='deal-form-container'>

                    <div>
                        <label>Dealer name:</label>
                        <input type="text" disabled value={userInput.dealer_name} />
                    </div>

                    <div>
                        <label>Branch code:</label>
                        <input type="text" value={userInput.branch_code} onChange={e => { setUserInput({ ...userInput, 'branch_code': e.target.value }) }} onBlur={e => dropdownLists.onBranchCodeEntered(e.target.value) } />
                    </div>

                    <div>
                        <label>Branch:</label>
                        {userInput.branch !== ''
                            ? <input type="text" name="branch" id="id_branch" onChange={e => setUserInput({ ...userInput, 'branch': e.target.value })} value={userInput.branch} />
                            : <input type="text" name="branch" id="id_branch" onChange={e => setUserInput({ ...userInput, 'branch': e.target.value })} value={userInput.branch} />
                        }
                    </div>

                    <div style={{ gridColumnStart: '4', gridColumnEnd: '6' }}>
                        <label>Customer:</label>
                        {userInput.c_name !== ''
                            ? <input type="text" name="c_name" list='c_name' id="id_c_name" onChange={e => setUserInput({ ...userInput, 'c_name': e.target.value })} value={userInput.c_name} />
                            : <input type="text" name="c_name" list='c_name' id="id_c_name" onChange={e => setUserInput({ ...userInput, 'c_name': e.target.value })} value={userInput.c_name} />
                        }
                    </div>

                    <div>
                        <label>CIF:</label>
                        {userInput.cif !== ''
                            ? <input type="text" name="c_cif" id="id_cif" onChange={e => setUserInput({ ...userInput, 'cif': e.target.value })} value={userInput.cif} />
                            : <input type="text" name="c_cif" id="id_cif" onChange={e => setUserInput({ ...userInput, 'cif': e.target.value })} value={userInput.cif} />
                        }
                    </div>

                    <div>
                        <label>Client type:</label>
                        {userInput.cltype !== ''
                            ? <input type="text" name="cltype" id="id_cltype" onChange={e => setUserInput({ ...userInput, 'cltype': e.target.value })} value={userInput.cltype} />
                            : <input type="text" name="cltype" id="id_cltype" onChange={e => setUserInput({ ...userInput, 'cltype': e.target.value })} value={userInput.cltype} />
                        }
                    </div>

                    <div>
                        <label>Normal/Cross:</label>
                        <select onChange={e => setUserInput({ ...userInput, 'n_c': e.target.value })} defaultValue={'Nor'}>
                            <option value='Nor'>Normal</option>
                            <option value='Cro'>Cross</option>
                        </select>
                    </div>

                </div>

                <div className='deal-form-container'>

                    <div>
                        <label>Product:</label>
                        <select name="product" id="id_product" onChange={e => setUserInput({ ...userInput, 'product': e.target.value })} value={userInput.product}>
                            <option value=''></option>
                            {
                                dropdownLists.product.map((item, key) => {
                                    return <option key={key} value={item.name}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>

                    <div>
                        <label>Currency:</label>
                        <select name="ccy" id="id_ccy" onChange={e => setUserInput({ ...userInput, 'ccy': e.target.value })} value={userInput.ccy}>
                            <option value=''></option>
                            {
                                dropdownLists.currency.map((item, key) => {
                                    return <option key={key} value={item.name}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>

                    <div>
                        <label>Fixed days:</label>
                        <input type="number" name="days" maxLength="100" id="id_days" onChange={e => addDays('no', e.target.value)} value={userInput.days} />
                    </div>

                    <div>
                        <label style={{display:'inline'}}>Option date:</label> <label style={{display:'inline', color: getDayColor(startDateDay)}}>{startDateDay}</label>
                        <input type="text" disabled value={userInput.vdate} />
                    </div>

                    <div>
                        <label>Option days:</label>
                        <input type="number" name="days2" maxLength="100" id="id_days2" onChange={e => addDays('yes', e.target.value)} value={userInput.days2} />
                    </div>

                    <div>
                        <label style={{display:'inline'}}>Maturity date:</label> <label style={{display:'inline', color: getDayColor(endDateDay)}}>{endDateDay}</label>
                        <input type="text" disabled value={userInput.vdate2} />
                    </div>

                    <div>
                        <label>Export:</label>
                        <input type="text" value={numberWithCommas(userInput.export)} onChange={e => setUserInput({ ...userInput, 'export': e.target.value })} />
                    </div>

                    <div>
                        <label>Import:</label>
                        <input type="text" value={numberWithCommas(userInput.importt)} onChange={e => setUserInput({ ...userInput, 'importt': e.target.value })} />
                    </div>

                </div>

                <div className='deal-form-container'>

                    <div>
                        <label>Deal rate:</label>
                        <input type="text" value={userInput.deal_rate} onChange={e => setUserInput({ ...userInput, 'deal_rate': e.target.value })} />
                    </div>

                    <div>
                        <label>Interbank rate:</label>
                        <input type="text" value={userInput.i_b_rate} onChange={e => setUserInput({ ...userInput, 'i_b_rate': e.target.value })} />
                    </div>

                    <div>
                        <label>Thir currency cross:</label>
                        <input type="text" value={userInput.third_ccy_cross} onChange={e => setUserInput({ ...userInput, 'third_ccy_cross': e.target.value })} />
                    </div>

                    <div>
                        <label>Interbank premium:</label>
                        <input type="text" value={userInput.i_b_premium} onChange={e => setUserInput({ ...userInput, 'i_b_premium': e.target.value })} />
                    </div>

                    <div>
                        <label>Option premium:</label>
                        <input type="text" value={userInput.option_premium} onChange={e => setUserInput({ ...userInput, 'option_premium': e.target.value })} />
                    </div>

                    <div>
                        <label>Third currency premium:</label>
                        <input type="text" value={userInput.third_ccy_premium} onChange={e => setUserInput({ ...userInput, 'third_ccy_premium': e.target.value })} />
                    </div>

                    <div style={{ gridColumnStart: '7', gridColumnEnd: '9' }}>
                        <label>Nostro account:</label>
                        <select name="nostro_ac" id="id_nostro_ac" defaultValue={userInput.nostro_ac} onChange={e => setUserInput({ ...userInput, 'nostro_ac': e.target.value })}>
                            <option value=''></option>
                            {
                                dropdownLists.nostro.filter(obj => obj.ccy === userInput.ccy).map(item => <option key={item.nostro} value={item.nostro}>{item.nostro}</option>)
                            }
                        </select>
                    </div>

                </div>

                <div className='deal-form-container'>

                    <div>
                        <label>Spread:</label>
                        <input type="text" disabled value={userInput.spread} />
                    </div>

                    <div>
                        <label>Profit:</label>
                        <input type="text" disabled value={formatter(userInput.profit)} />
                    </div>

                    <div>
                        <label>Equiv. PKR:</label>
                        <input type="text" disabled value={formatter(userInput.pkr)} />
                    </div>

                    <div>
                        <label>Equiv. USD:</label>
                        <input type="text" disabled value={formatter(userInput.usd)} />
                    </div>

                    <div>
                        <label>Salam yield:</label>
                        <input type="text" disabled value={userInput.salam_yield} />
                    </div>

                    <div>
                        <label>Salam cost:</label>
                        <input type="text" disabled value={formatter(userInput.salam_cost)} />
                    </div>

                    <div>
                        <button className='deal-form-button deal-form-button-save' onClick={() => onSaveButttonClick()}>Save</button>
                    </div>

                    <div>
                        <button className='deal-form-button deal-form-button-clear' onClick={() => clearButtonHandler()}>Clear</button>
                    </div>

                    <datalist id='c_name'>
                        {
                            dropdownLists.customer.map((item, key) => {
                                return <option key={key} value={item.name}>{item.name}</option>
                            })
                        }
                    </datalist>

                </div>
            </div>

        </div>
    )
}

export default DealTicket