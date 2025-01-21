import Loader from '../../../../santasoft/components/loader/Loader'

import { useState, useEffect } from 'react'
import React from 'react'

import '../DealTicket.css'

import { ip } from '../../../../../App'
import { dateFormatter, formatter, numberWithCommas } from '../../../../santasoft/components/Formatter'

function DealTicketForm({ user, refresh, date, isRefresh, setIsRefresh, userInput, setUserInput, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const clearUserInput = () => {
        setUserInput(
            {
                "id": '',
                "contract_number": '',
                "transaction_type": "",
                "instrument": "",
                "ccy": "PKR",
                "deal_date": date,
                "start_date": date,
                "deal_days": 0,
                "end_date": date,
                "face_value": '',
                "yield": '',
                "ac_value": '',
                "pkrv": '',

                "issue_date": '',
                "maturity_date": '',
                "last_coupon": '',
                "next_coupon": '',
                "coupon_frequency": 'semi-annually',
                "total_coupon": '',
                "coupon_available": '',
                "coupon_days": '',
                "days_to_maturity": '',
                "start_price": '',
                "end_price": '',
                "start_amount": '',
                "maturity_amount": '',
                "issuer": '',
                "instruction": '',
                "account": '0',
                "sbp_status": '',

                "tax": '',
                "tax_amount": '',
                "markup": '',
                "accrued_days": 0,
                "accrued_profit": '',
                "sbp_cheque_amount": '',

                "counter_party": '',
                "mode": '',
                "brokerage": '',
                "remarks": '',

                "confirm": '',
                "validate": '',
            }
        )
    }

    const fetchYield = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/a@iz@6iLN3pAUuIYnf2tA15$TWofzCEOMK3*$dnjpAw6hYuIY*/', {
                method: 'Post',
                body: JSON.stringify(userInput),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setUserInput({ ...userInput, 'yield': result.data });
                // setDataSummary(result.summary);
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Unable to load',
                    content: 'Instruments failed to load due to unauthorized request.',
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

    const [instrumentsList, setInstrumentList] = useState([
        // {
        //     "id": 0,
        //     "name": 0,
        // }
    ])

    const fetchMoneyMarketInstrumentsAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/MK4ZrF2tc*pCV$GtkGrc0M9Zvq3H&S9VIvZ2lHhrw4PLB*x6SV/', {
                method: 'Get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setInstrumentList(result.data);
                // setDataSummary(result.summary);
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Unable to load',
                    content: 'Instruments failed to load due to unauthorized request.',
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
        fetchMoneyMarketInstrumentsAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    const [brokersList, setBrokersList] = useState([
        // {
        //     "id": 0,
        //     "name": 0,
        // }
    ])

    const fetchBrokersAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/TFjgfxEUEV1M&10GsA@h!j*FUeZxzF!Pg0xD!UGBA$58uUg9V5/', {
                method: 'Get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setBrokersList(result.data);
                // setDataSummary(result.summary);
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Unable to load',
                    content: 'Brokers failed to load due to unauthorized request.',
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
        fetchBrokersAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    const [counterpartyList, setCounterpartyList] = useState([
        // {
        //     "id": 0,
        //     "name": 0,
        // }
    ])

    const fetchCounterpartyAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/4b6aJ9PCvF2AWiRmd*97HQ&Jt9pjhRVy1Z7lE&DLRk6asp2p9x/', {
                method: 'Get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setCounterpartyList(result.data);
                // setDataSummary(result.summary);
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Unable to load',
                    content: 'Brokers failed to load due to unauthorized request.',
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
        fetchCounterpartyAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    const addDays = (days) => {
        var dealDate
        if (days === '') {
            days = '0'
        }
        days = parseInt(days)
        dealDate = userInput['start_date'];
        dealDate = new Date(dealDate);
        dealDate.setDate(dealDate.getDate() + days);
        dealDate = dealDate.getFullYear() + "-" + (dealDate.getMonth() + 1) + "-" + dealDate.getDate();
        setUserInput({ ...userInput, deal_days: days, end_date: dealDate })
    }

    const getSecurityMaturityDate = () => {

        if (userInput.transaction_type !== 'lending' && userInput.transaction_type !== 'borrowing') {
            var dealDate, years, months, instrument

            if (userInput.issue_date === '' || userInput.issue_date === null) {
                return ""
            }
            instrument = userInput.instrument.split(" ")
            if (instrument[3] === 'Yr') {
                years = Number(instrument[2])
                dealDate = userInput['issue_date'];
                dealDate = new Date(dealDate);
                dealDate.setFullYear(dealDate.getFullYear() + years)
                dealDate = dealDate.getFullYear() + "-" + (dealDate.getMonth() + 1) + "-" + dealDate.getDate()
                return dealDate
            }
            else if (instrument[3] === 'Mth') {
                months = Number(instrument[2])
                dealDate = userInput['issue_date'];
                dealDate = new Date(dealDate);
                dealDate.setMonth(dealDate.getMonth() + months);
                dealDate = dealDate.getFullYear() + "-" + (dealDate.getMonth() + 1) + "-" + dealDate.getDate();
                return dealDate
            }
            else {
                return ""
            }
        }
        else {
            return ""
        }
    }

    function getMonthDifference(startDate, endDate) {
        return (
            endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear())
        );
    }

    const getTotalCoupons = () => {
        if (userInput.issue_date === '') {
            return
        }
        var months, coupon_frequency
        months = getMonthDifference(new Date(userInput.issue_date), new Date(userInput.maturity_date))
        if (userInput.coupon_frequency === 'annually') {
            coupon_frequency = 12
        }
        else if (userInput.coupon_frequency === 'semi-annually') {
            coupon_frequency = 6
        }
        else if (userInput.coupon_frequency === 'quarterly') {
            coupon_frequency = 3
        }
        else if (userInput.coupon_frequency === 'monthly') {
            coupon_frequency = 1
        }
        return months / coupon_frequency
    }

    const getAvailableCoupons = () => {
        if (userInput.start_date === '') {
            return
        }
        var months, coupon_frequency
        months = getMonthDifference(new Date(userInput.start_date), new Date(userInput.maturity_date))
        if (userInput.coupon_frequency === 'annually') {
            coupon_frequency = 12
        }
        else if (userInput.coupon_frequency === 'semi-annually') {
            coupon_frequency = 6
        }
        else if (userInput.coupon_frequency === 'quarterly') {
            coupon_frequency = 3
        }
        else if (userInput.coupon_frequency === 'monthly') {
            coupon_frequency = 1
        }

        return Math.ceil(months / coupon_frequency)
    }

    const getLastAndNextCouponDate = () => {

        if (userInput.issue_date === '') {
            return ["", ""]
        }

        var date = new Date(userInput.issue_date), start_date = new Date(userInput.start_date), lastDate = '', nextDate = '', coupon_frequency
        if (userInput.coupon_frequency === 'annually') {
            coupon_frequency = 12
        }
        else if (userInput.coupon_frequency === 'semi-annually') {
            coupon_frequency = 6
        }
        else if (userInput.coupon_frequency === 'quarterly') {
            coupon_frequency = 3
        }
        else if (userInput.coupon_frequency === 'monthly') {
            coupon_frequency = 1
        }
        else {
            return ["", ""]
        }

        while (nextDate === '') {
            if (date >= start_date) {
                nextDate = date
                nextDate = nextDate.getFullYear() + "-" + (nextDate.getMonth() + 1) + "-" + nextDate.getDate()
                date.setMonth(date.getMonth() - coupon_frequency)
                lastDate = date
                lastDate = lastDate.getFullYear() + "-" + (lastDate.getMonth() + 1) + "-" + lastDate.getDate()
            }
            date.setMonth(date.getMonth() + coupon_frequency);
        }
        return [lastDate, nextDate]
    }

    const getDaysToMaturity = () => {
        if (userInput.start_date === '' || userInput.maturity_date === '') {
            return
        }
        const oneDay = 24 * 60 * 60 * 1000;
        var days, dealStartDate, securityMaturityDate

        dealStartDate = new Date(userInput.start_date)
        securityMaturityDate = new Date(userInput.maturity_date)

        days = Math.round((securityMaturityDate - dealStartDate) / oneDay)
        return days
    }

    const getCouponDays = (last_coupon, next_coupon) => {
        if (last_coupon === '' || next_coupon === '') {
            return
        }
        const oneDay = 24 * 60 * 60 * 1000;
        var days, lastCoupon, nextCoupon

        lastCoupon = new Date(last_coupon)
        nextCoupon = new Date(next_coupon)

        days = Math.round((nextCoupon - lastCoupon) / oneDay)
        return days
    }

    const getAccruedDays = () => {
        if (userInput.start_date === '' || userInput.maturity_date === '') {
            return
        }
        const oneDay = 24 * 60 * 60 * 1000;
        var days, dealStartDate, lastCouponDate

        dealStartDate = new Date(userInput.start_date)
        lastCouponDate = new Date(userInput.last_coupon)

        days = Math.round((dealStartDate - lastCouponDate) / oneDay)
        return days
    }

    const getAccruedProfit = () => {
        if (userInput.face_value === '') {
            return 0
        }

        var faceValue = userInput.face_value.toString()

        while (faceValue.includes(",")) {
            faceValue = faceValue.replace(",", "")
        }

        if (userInput.transaction_type === 'outrite_purchase' || userInput.transaction_type === 'outrite_sale') {
            return ((faceValue * (userInput.ac_value / 100)) * userInput.accrued_days) / 365
        }
        else {
            return ((faceValue * (userInput.ac_value / 100)) * userInput.deal_days) / 365
        }

    }

    const getSBPChequeAmount = (accruedProfit) => {
        if (userInput.face_value === '') {
            return 0
        }
        var faceValue = userInput.face_value.toString()

        while (faceValue.includes(",")) {
            faceValue = faceValue.replace(",", "")
        }
        if (userInput.transaction_type === 'outrite_purchase' || userInput.transaction_type === 'outrite_sale') {
            if (userInput.start_price === '') {
                return 0
            }
            return (faceValue * (userInput.start_price / 100)) + accruedProfit
        }
        else {
            return (faceValue * 1) + accruedProfit
        }
    }

    const getDealDays = () => {
        if (userInput.issue_date === '' || userInput.maturity_date === '') {
            return
        }
        const oneDay = 24 * 60 * 60 * 1000;
        var days, issueDate, issueMaturity

        issueDate = new Date(userInput.issue_date)
        issueMaturity = new Date(userInput.maturity_date)

        days = Math.round((issueMaturity - issueDate) / oneDay)
        return days
    }

    useEffect(() => {
        if (userInput.start_date !== "" && userInput.issue_date !== "" && userInput.start_date < userInput.issue_date) {
            addMessageHandler({
                title: 'Warning',
                content: 'Issue date cannot be greater than start date',
                type: 2
            })
        }
        var maturity_date
        maturity_date = getSecurityMaturityDate();
        setUserInput({ ...userInput, maturity_date: maturity_date })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInput.instrument, userInput.issue_date]);

    useEffect(() => {
        var total_coupons, available_coupons, last_and_next_coupon_date, days, couponDays, dealDays
        total_coupons = getTotalCoupons();
        available_coupons = getAvailableCoupons();
        last_and_next_coupon_date = getLastAndNextCouponDate();
        couponDays = getCouponDays(last_and_next_coupon_date[0], last_and_next_coupon_date[1])
        days = getDaysToMaturity()
        dealDays = getDealDays()
        setUserInput({ ...userInput, total_coupon: total_coupons, coupon_available: available_coupons, last_coupon: last_and_next_coupon_date[0], next_coupon: last_and_next_coupon_date[1], days_to_maturity: days, coupon_days: couponDays, deal_days: dealDays })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInput.maturity_date, userInput.coupon_frequency]);

    useEffect(() => {
        var days, accruedDays
        days = getDaysToMaturity()
        accruedDays = getAccruedDays()
        setUserInput({ ...userInput, days_to_maturity: days, accrued_days: accruedDays })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInput.start_date, userInput.last_coupon]);

    useEffect(() => {
        var accruedProfit, sbpChequeAmount
        accruedProfit = getAccruedProfit()
        sbpChequeAmount = getSBPChequeAmount(accruedProfit)
        setUserInput({ ...userInput, accrued_profit: accruedProfit, markup: accruedProfit, sbp_cheque_amount: sbpChequeAmount })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInput.face_value, userInput.ac_value, userInput.start_price]);

    useEffect(() => {
        setUserInput({ ...userInput, deal_date: date })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);


    const submitHandler = async () => {
        try {

            setIsLoading(true);
            const response = await fetch(ip + '/sm01/VPmvhjaELzyR9FJPCZCqpoXVerjLJXJOUurgvT*jVn2Uk*5zHw/0/', {
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
                clearUserInput()
                addMessageHandler({
                    title: 'Transaction saved',
                    content: 'Deal has been saved succesfully.',
                    type: 3
                })

                ((isRefresh) ? (setIsRefresh(false)) : (setIsRefresh(true)))
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

    const deleteHandler = async () => {
        if (window.confirm("Selected deal will be deleted from the system!")) {
            try {
                setIsLoading(true);
                const response = await fetch(ip + '/sm01/VPmvhjaELzyR9FJPCZCqpoXVerjLJXJOUurgvT*jVn2Uk*5zHw/' + userInput.id + '/', {
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
                    clearUserInput()
                    addMessageHandler({
                        title: 'Successfull',
                        content: 'Deal has been saved succesfully.',
                        type: 3
                    })

                        ((isRefresh) ? (setIsRefresh(false)) : (setIsRefresh(true)))
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
                        content: 'Unabled to saved due to unauthorized request.',
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
            catch (err) {
                console.log(err.message);
            }
        }
    };

    const setTransactionType = (type) => {
        setUserInput(
            {
                "id": '',
                "contract_number": '',
                "transaction_type": type,
                "instrument": "",
                "ccy": "PKR",
                "deal_date": date,
                "start_date": date,
                "deal_days": 0,
                "end_date": date,
                "face_value": '',
                "yield": '',
                "ac_value": '',
                "pkrv": '',

                "issue_date": '',
                "maturity_date": '',
                "last_coupon": '',
                "next_coupon": '',
                "coupon_frequency": 'semi-annually',
                "total_coupon": '',
                "coupon_available": '',
                "coupon_days": '',
                "days_to_maturity": '',
                "start_price": '',
                "end_price": '',
                "start_amount": '',
                "maturity_amount": '',
                "issuer": '',
                "instruction": '',
                "account": '0',
                "sbp_status": '',

                "tax": '',
                "tax_amount": '',
                "markup": '',
                "accrued_days": 0,
                "accrued_profit": '',
                "sbp_cheque_amount": '',

                "counter_party": '',
                "mode": '',
                "brokerage": '',
                "remarks": '',

                "confirm": '',
                "validate": '',
            }
        )
    }

    return (
        <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '3' }}>

            {isloading && <Loader margin={'45%'} />}

            {/* Table Title */}
            <div className='table-container-name'>
                <p style={{ display: 'inline' }}>Deal Ticket</p>
            </div>

            <div className='mm-deal-form'>

                <div className='mm-deal-form-container'>
                    <div>
                        <label>Contract No:</label>
                        <input type="text" value={userInput.contract_number} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                        <div>
                            <label>Transaction Type:</label>
                            <select onChange={e => setTransactionType(e.target.value)} value={userInput.transaction_type}>
                                <option value=''></option>
                                <option value='lending'>Lending</option>
                                <option value='borrowing'>Borrowing</option>
                                <option value='repo'>Repo</option>
                                <option value='rev_repo'>Rev Repo</option>
                                <option value='outrite_purchase'>Outrite Purchase</option>
                                <option value='outrite_sale'>Outrite Sale</option>
                            </select>
                        </div>
                        <div>
                            <label>Instrument:</label>
                            <select onChange={e => setUserInput({ ...userInput, 'instrument': e.target.value })} value={userInput.instrument}>
                                <option value=''></option>
                                {
                                    instrumentsList.map((item, key) => {
                                        return <option key={key} value={item.name}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    {
                        (userInput.transaction_type !== '')
                        &&
                        <div>
                            <label>Currency:</label>
                            <select onChange={e => setUserInput({ ...userInput, 'ccy': e.target.value })} value={userInput.ccy}>
                                <option value='PKR'>PKR</option>
                                <option value='USD'>USD</option>
                            </select>
                        </div>
                    }

                </div>

                {
                    (userInput.transaction_type !== '')
                        ?
                        <div className='mm-deal-form-container'>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                <div>
                                    <label>Deal date:</label>
                                    <input type="date" value={userInput.deal_date} readOnly />
                                </div>

                                <div>
                                    {
                                        (userInput.transaction_type === 'outrite_purchase' || userInput.transaction_type === 'outrite_sale')
                                            ? <label>Settlement date:</label>
                                            : <label>Start date:</label>
                                    }

                                    <input type="date" value={userInput.start_date} onChange={e => { setUserInput({ ...userInput, 'start_date': e.target.value, 'end_date': e.target.value }) }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                {
                                    (userInput.transaction_type !== 'outrite_purchase' && userInput.transaction_type !== 'outrite_sale')
                                        ?
                                        <div>
                                            <label>Deal days:</label>
                                            <input type="text" defaultValue={userInput.deal_days} onChange={e => addDays(e.target.value)} />
                                        </div>
                                        :
                                        <div>
                                            <label>Deal days:</label>
                                            <input type="text" disabled value={userInput.deal_days} />
                                        </div>
                                }

                                {
                                    (userInput.transaction_type !== 'outrite_purchase' && userInput.transaction_type !== 'outrite_sale')
                                        ?
                                        <div>
                                            <label>End date:</label>
                                            <input type="text" value={dateFormatter(userInput.end_date)} readOnly />
                                        </div>
                                        :
                                        <div>
                                            <label>.</label>
                                            <input type="text" disabled value={""} />
                                        </div>
                                }
                            </div>

                            <div style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                                <label>Face value:</label>
                                <input type="text" style={{ 'width': '93%' }} value={numberWithCommas(userInput.face_value)} onChange={e => { setUserInput({ ...userInput, 'face_value': e.target.value }) }} />
                            </div>

                            {
                                (userInput.transaction_type === 'lending' || userInput.transaction_type === 'borrowing')
                                    ?
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                        <div>
                                            <label>Rate:</label>
                                            <input type="text" value={userInput.ac_value} onChange={e => { setUserInput({ ...userInput, 'ac_value': e.target.value }) }} />
                                        </div>
                                        <div>
                                            <label>.</label>
                                            <input type="text" value={""} disabled />
                                        </div>
                                        <div>
                                            <label>.</label>
                                            <input type="text" value={""} disabled />
                                        </div>
                                    </div>
                                    :
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                        <div>
                                            <label>Yield:</label>
                                            <input type="text" disabled value={userInput.yield} />
                                        </div>
                                        {
                                            (userInput.instrument.includes('Mth'))
                                                ?
                                                <div>
                                                    <label>.</label>
                                                    <input type="text" value={""} disabled />
                                                </div>
                                                :
                                                <div>
                                                    <label>Coupon %:</label>
                                                    <input type="text" value={userInput.ac_value} onChange={e => { setUserInput({ ...userInput, 'ac_value': e.target.value }) }} />
                                                </div>
                                        }

                                        <div>
                                            <label>PKRV:</label>
                                            <input type="text" value={userInput.pkrv} onChange={e => { setUserInput({ ...userInput, 'pkrv': e.target.value }) }} />
                                        </div>
                                    </div>
                            }

                            <div>
                                <label>.</label>
                                <input disabled />
                            </div>

                        </div>
                        :
                        <div className='mm-deal-form-container'></div>
                }

                {
                    (userInput.transaction_type === 'repo' || userInput.transaction_type === 'rev_repo' || userInput.transaction_type === 'outrite_purchase' || userInput.transaction_type === 'outrite_sale')
                        ?
                        <div className='mm-deal-form-container' style={{ gridColumnStart: '2', gridRowStart: '1', gridRowEnd: '4' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                <div>
                                    <label>Issue Date:</label>
                                    <input type="date" value={userInput.issue_date} onChange={e => { setUserInput({ ...userInput, 'issue_date': e.target.value }) }} />
                                </div>
                                <div>
                                    <label>Maturity Date:</label>
                                    <input type="text" value={dateFormatter(userInput.maturity_date)} disabled />
                                </div>
                            </div>
                            {
                                (userInput.instrument.includes('Mth'))
                                    ?
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                        <div>
                                            <label>.</label>
                                            <input type="text" value={""} disabled />
                                        </div>
                                        <div>
                                            <label>.</label>
                                            <input type="text" value={""} disabled />
                                        </div>
                                    </div>
                                    :
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                        <div>
                                            <label>Last Coupon Date:</label>
                                            <input type="text" value={dateFormatter(userInput.last_coupon)} disabled />
                                        </div>
                                        <div>
                                            <label>Next Coupon Date:</label>
                                            <input type="text" value={dateFormatter(userInput.next_coupon)} disabled />
                                        </div>
                                    </div>
                            }

                            {
                                (userInput.instrument.includes('Mth'))
                                    ?
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                        <div>
                                            <label>.</label>
                                            <select disabled>
                                                <option value=''></option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>.</label>
                                            <input type="text" value={""} disabled />
                                        </div>
                                        <div>
                                            <label>.</label>
                                            <input type="text" value={""} disabled />
                                        </div>
                                    </div>
                                    :
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                        <div>
                                            <label>Coupon Frequency:</label>
                                            <select onChange={e => setUserInput({ ...userInput, 'coupon_frequency': e.target.value })} value={userInput.coupon_frequency}>
                                                <option value=''></option>
                                                <option value='annually'>Annually</option>
                                                <option value='semi-annually'>Semi-Annually</option>
                                                <option value='quarterly'>Quarterly</option>
                                                <option value='monthly'>Monthly</option>
                                            </select>
                                        </div>
                                        <div></div>
                                        <div>
                                            <label>TOT CPN:</label>
                                            <input type="text" value={userInput.total_coupon} disabled />
                                        </div>
                                        <div>
                                            <label>CPN Avail:</label>
                                            <input type="text" value={userInput.coupon_available} disabled />
                                        </div>
                                    </div>
                            }


                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                {
                                    (userInput.instrument.includes('Mth'))
                                        ?
                                        <div>
                                            <label>.</label>
                                            <input type="text" value={""} disabled />
                                        </div>
                                        :
                                        <div>
                                            <label>CPN Days:</label>
                                            <input type="text" value={userInput.coupon_days} disabled />
                                        </div>
                                }

                                <div>
                                    <label>DTM:</label>
                                    <input type="text" value={userInput.days_to_maturity} disabled />
                                </div>

                                {
                                    (userInput.transaction_type === 'repo' || userInput.transaction_type === 'rev_repo')
                                        ?
                                        <div>
                                            <label>Start Price:</label>
                                            <input type="text" value={userInput.start_price} onChange={e => { setUserInput({ ...userInput, 'start_price': e.target.value }) }} />
                                        </div>
                                        :
                                        <div>
                                            <label>Price</label>
                                            <input type="text" value={userInput.start_price} onChange={e => { setUserInput({ ...userInput, 'start_price': e.target.value }) }} onBlur={() => fetchYield()} />
                                        </div>
                                }

                                {
                                    (userInput.transaction_type === 'repo' || userInput.transaction_type === 'rev_repo')
                                        ?
                                        <div>
                                            <label>End Price:</label>
                                            <input type="test" value={userInput.end_price} onChange={e => { setUserInput({ ...userInput, 'end_price': e.target.value }) }} />
                                        </div>
                                        :
                                        <div>
                                            <label>.</label>
                                            <input type="text" disabled value={""} />
                                        </div>
                                }
                            </div>
                            {
                                (userInput.transaction_type === 'repo' || userInput.transaction_type === 'rev_repo')
                                    ?
                                    <div style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                                        <label>Start Amount:</label>
                                        <input type="text" style={{ 'width': '93%' }} value={userInput.start_amount} onChange={e => { setUserInput({ ...userInput, 'start_amount': e.target.value }) }} />
                                    </div>
                                    :
                                    <div style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                                        <label>.</label>
                                        <input type="text" disabled style={{ 'width': '93%' }} value={""} />
                                    </div>
                            }

                            {
                                (userInput.transaction_type === 'repo' || userInput.transaction_type === 'rev_repo')
                                    ?
                                    <div style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                                        <label>Maturity Amount:</label>
                                        <input type="text" style={{ 'width': '93%' }} value={userInput.maturity_amount} onChange={e => { setUserInput({ ...userInput, 'maturity_amount': e.target.value }) }} />
                                    </div>
                                    :
                                    <div style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                                        <label>.</label>
                                        <input type="text" disabled style={{ 'width': '93%' }} value={""} />
                                    </div>
                            }

                            <div style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                                <label>Issuer's Name:</label>
                                <select style={{ 'width': '95%' }} defaultValue={''}>
                                    <option value=''></option>
                                </select>
                            </div>

                            <div style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                                <label>Special Instruction:</label>
                                <select style={{ 'width': '95%' }} defaultValue={''}>
                                    <option value=''></option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                <div>
                                    <label>Account:</label>
                                    <select onChange={e => setUserInput({ ...userInput, 'account': e.target.value })} value={userInput.account}>
                                        <option value='0'>Other</option>
                                        <option value='1'>Available for Sale</option>
                                        <option value='2'>Held for Trading</option>
                                        <option value='3'>Held to Maturity</option>
                                        <option value='4'>IPS</option>
                                    </select>
                                </div>
                                <div>
                                    <label>SBP Status:</label>
                                    <select onChange={e => setUserInput({ ...userInput, 'sbp_status': e.target.value })} value={userInput.sbp_status}>
                                        <option value=''></option>
                                        <option value='OMO'>OMO</option>
                                        <option value='Discounting'>Discounting</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='mm-deal-form-container' style={{ gridColumnStart: '2', gridRowStart: '1', gridRowEnd: '4' }}>
                        </div>
                }

                {
                    (userInput.transaction_type !== '')
                        ?
                        (userInput.transaction_type !== 'repo' && userInput.transaction_type !== 'rev_repo' && userInput.transaction_type !== '')
                            ?
                            <div className='mm-deal-form-container'>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                    <div>
                                        <label>Tax %:</label>
                                        <input type="text" value={userInput.tax} onChange={e => { setUserInput({ ...userInput, 'tax': e.target.value }) }} />
                                    </div>
                                    <div>
                                        <label>Tax Amount:</label>
                                        <input type="text" value={userInput.tax_amount} onChange={e => { setUserInput({ ...userInput, 'tax_amount': e.target.value }) }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                    {
                                        (userInput.transaction_type === 'lending' || userInput.transaction_type === 'borrowing')
                                            ?
                                            <div>
                                                <label>Markup:</label>
                                                <input type="text" disabled value={formatter(userInput.markup)} onChange={e => { setUserInput({ ...userInput, 'markup': e.target.value }) }} />
                                            </div>
                                            :
                                            (userInput.instrument.includes('Mth'))
                                                ?
                                                <div>
                                                    <label>.</label>
                                                    <input type="text" value={""} disabled />
                                                </div>
                                                :
                                                <div>
                                                    <label>Accrued Days:</label>
                                                    <input type="text" value={userInput.accrued_days} disabled />
                                                </div>
                                    }

                                    {
                                        (userInput.transaction_type === 'lending' || userInput.transaction_type === 'borrowing')
                                            ?
                                            <div>
                                                <label>.</label>
                                                <input type="text" value={""} disabled />
                                            </div>
                                            :
                                            (userInput.instrument.includes('Mth'))
                                                ?
                                                <div>
                                                    <label>.</label>
                                                    <input type="text" value={""} disabled />
                                                </div>
                                                :
                                                <div>
                                                    <label>Accrued Profit:</label>
                                                    <input type="text" value={formatter(userInput.accrued_profit)} disabled />
                                                </div>
                                    }
                                </div>

                                <div style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                                    <label>SBP Cheque Amount:</label>
                                    <input type="text" style={{ 'width': '93%' }} value={formatter(userInput.sbp_cheque_amount)} disabled />
                                </div>

                            </div>
                            :
                            <div className='mm-deal-form-container'>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                    <div>
                                        <label>.</label>
                                        <input type="text" value={""} disabled />
                                    </div>
                                    <div>
                                        <label>.</label>
                                        <input type="text" value={""} disabled />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                    <div>
                                        <label>.</label>
                                        <input type="text" value={""} disabled />
                                    </div>
                                    <div>
                                        <label>.</label>
                                        <input type="text" value={""} disabled />
                                    </div>
                                </div>

                                <div style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
                                    <label>.</label>
                                    <input type="text" style={{ 'width': '93%' }} value={""} disabled />
                                </div>
                            </div>

                        :
                        <div className='mm-deal-form-container'></div>
                }



                {
                    (userInput.transaction_type !== '')
                        ?
                        <div className='mm-deal-form-container' style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                <div>
                                    <label>Counter Party:</label>
                                    <select style={{ 'width': '95%' }} onChange={e => setUserInput({ ...userInput, 'counter_party': e.target.value })} value={userInput.counter_party}>
                                        <option value=''></option>
                                        {
                                            counterpartyList.map((item, key) => {
                                                return <option key={key} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label>Mode:</label>
                                    <select style={{ 'width': '95%' }} onChange={e => setUserInput({ ...userInput, 'mode': e.target.value })} value={userInput.mode}>
                                        <option value=''></option>
                                        {
                                            brokersList.map((item, key) => {
                                                return <option key={key} value={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                <div>
                                    <label>Brokerage:</label>
                                    <input type="text" style={{ 'width': '93%' }} value={userInput.brokerage} onChange={e => { setUserInput({ ...userInput, 'brokerage': e.target.value }) }} />
                                </div>

                                <div>
                                    <label>Remarks:</label>
                                    <input type="text" style={{ 'width': '93%' }} value={userInput.remarks} onChange={e => { setUserInput({ ...userInput, 'remarks': e.target.value }) }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0px', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                <div style={{ marginTop: '4%' }}>
                                    <label style={{ display: 'inline' }}>Front Office Validation:</label>
                                    {(userInput.validate === "1" || userInput.validate === "Y") ? <input type="checkbox" checked onClick={() => setUserInput({ ...userInput, 'validate': '0' })} /> : <input type="checkbox" onClick={() => setUserInput({ ...userInput, 'validate': '1' })} />}
                                </div>

                                <div style={{ marginTop: '4%' }}>
                                    <label style={{ display: 'inline' }}>Back Office Validation:</label>
                                    {(userInput.confirm === "1" || userInput.confirm === "Y") ? <input type="checkbox" checked onClick={() => setUserInput({ ...userInput, 'confirm': '0' })} /> : <input type="checkbox" onClick={() => setUserInput({ ...userInput, 'confirm': '1' })} />}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', gridColumnStart: '1', gridColumnEnd: '3' }}>
                                <div>
                                    <button className='mm-deal-form-button deal-form-button-save' onClick={() => submitHandler()}><p className='mm-deal-form-button-p'>Save</p></button>
                                </div>

                                <div>
                                    <button className='mm-deal-form-button deal-form-button-save' onClick={() => deleteHandler()}><p className='mm-deal-form-button-p'>Delete</p></button>
                                </div>

                                <div>
                                    <button className='mm-deal-form-button deal-form-button-save'><p className='mm-deal-form-button-p'>Print</p></button>
                                </div>

                                <div>
                                    <button className='mm-deal-form-button deal-form-button-clear' onClick={() => clearUserInput()}><p className='mm-deal-form-button-p'>Clear</p></button>
                                </div>
                            </div>

                        </div>
                        :
                        <div className='mm-deal-form-container' style={{ gridColumnStart: '1', gridColumnEnd: '3' }}></div>
                }
            </div>

        </div>
    )
}

export default DealTicketForm