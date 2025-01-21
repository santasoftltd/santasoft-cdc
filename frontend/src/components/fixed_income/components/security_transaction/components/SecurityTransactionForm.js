import { formatter, dateFormatter } from '../../../../santasoft/components/Formatter'

import crossImgae from '../../../../santasoft/res/black-cross.png'

import Loader from '../../../../santasoft/components/loader/Loader'

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

import '../SecurityTransaction.css'

function SecurityTransactionForm({ user, account, userInput, setUserInput, setSecurityFormClicked, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const clearButtonHandler = () => {
        setUserInput({
            "id": null,
            "transaction_id": "",
            "fms_transaction_id": "",
            "account_number": "",
            "account_prefix": "",
            "account_title": "",
            "account_manager": "",
            "transaction_type": "",
            "settlement_date": "",
            "counter_party": "",
            "face_value": "",
            "settlement_amount": "",
            "remarks": "",
            "security_code": "",
            "issue_date": "",
            "maturity_date": "",
            "security_type": "",
            "security_tenor": "",
            "instrument": "",
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

    const [transactionTypeList, setTransactionTypeList] = useState([])

    useEffect(() => {
        async function fetchAPI() {
            try {
                setIsLoading(true);
                const response = await fetch(ip + '/sm15/htpxn*U$DUxvX9WxkHxk2T*JGHg&M7N$82t$4@GtYJ7cc5ADUB/', {
                    method: 'Get',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Authorization': 'Token ' + user.token + ''
                    },
                });
                setIsLoading(false);

                let result = await response.json();

                if (response.status === 200) {
                    setTransactionTypeList(result.data);
                }

                else if (response.status === 401) {
                    addMessageHandler({
                        title: 'Unable to load',
                        content: 'Products list failed to load due to unauthorized request.',
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
        fetchAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [securityCodeList, setSecurityCodeList] = useState([])

    useEffect(() => {
        async function fetchAPI() {
            try {
                setIsLoading(true);
                const response = await fetch(ip + '/sm15/HQ@htspjJeRigAAL&TJojURPuwRp2nvUKZ5woGUjG8KE5HS4tH/', {
                    method: 'Get',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Authorization': 'Token ' + user.token + ''
                    },
                });
                setIsLoading(false);

                let result = await response.json();

                if (response.status === 200) {
                    setSecurityCodeList(result.data);
                }

                else if (response.status === 401) {
                    addMessageHandler({
                        title: 'Unable to load',
                        content: 'Products list failed to load due to unauthorized request.',
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
        fetchAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [accountNumberList, setAccountNumberList] = useState([])

    useEffect(() => {
        async function fetchAPI() {
            try {
                setIsLoading(true);
                const response = await fetch(ip + '/sm15/QzS&zIlH&19f0PO5kXTK!eOOst9ves5Qafc!sYuaHYSzk7Dmlv/', {
                    method: 'Get',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Authorization': 'Token ' + user.token + ''
                    },
                });
                setIsLoading(false);

                let result = await response.json();

                if (response.status === 200) {
                    setAccountNumberList(result.data);
                }

                else if (response.status === 401) {
                    addMessageHandler({
                        title: 'Unable to load',
                        content: 'Products list failed to load due to unauthorized request.',
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
        fetchAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='black-background'>

            {isloading && <Loader margin={'45%'} />}

            <div className='float-component2'>

                <div className='table-container'>

                    <div className='table-container-name' style={{ paddingBottom: '4px', paddingTop: '4px' }}>
                        <p style={{ display: 'inline', cursor: 'pointer', margin: '0px 0px 0px 10px' }}>New Transaction</p>
                        <div style={{ float: 'right', marginRight: '10px', marginTop: '3px' }}><img onClick={() => setSecurityFormClicked(false)} className='transaction-grid-picture' style={{ cursor: 'pointer' }} src={crossImgae} title="Close" alt="Close" /></div>
                    </div>

                    <div className='security-transaction-form'>

                        <div className='security-transaction-deal-form'>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Transaction Number:</label>
                                    <input type="text" disabled value={userInput.transaction_id} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>FMS Number:</label>
                                    <input type="text" onChange={e => setUserInput({ ...userInput, 'fms_transaction_id': e.target.value })} value={userInput.fms_transaction_id} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Account Number:</label>
                                    <input type="text" list='account_number' onChange={e => setUserInput({ ...userInput, 'account_number': e.target.value })} value={userInput.account_number} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Client code:</label>
                                    <input type="text" onChange={e => setUserInput({ ...userInput, 'account_prefix': e.target.value })} value={userInput.account_prefix} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Client full name:</label>
                                    <input type="text" onChange={e => setUserInput({ ...userInput, 'account_title': e.target.value })} value={userInput.account_title} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Assest management Company:</label>
                                    <input type="text" style={{ width: '240px' }} onChange={e => setUserInput({ ...userInput, 'account_manager': e.target.value })} value={userInput.account_manager} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Transaction Type:</label>
                                    <select onChange={e => setUserInput({ ...userInput, 'transaction_type': e.target.value })} value={userInput.transaction_type}>
                                        <option value=''></option>
                                        {
                                            transactionTypeList.map(item => <option key={item.name} value={item.name}>{item.name}</option>)
                                        }
                                    </select>
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Settlement date:</label>
                                    <input type="date" onChange={e => setUserInput({ ...userInput, 'settlement_date': e.target.value })} value={userInput.settlement_date} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Counter party:</label>
                                    <input type="text" onChange={e => setUserInput({ ...userInput, 'counter_party': e.target.value })} value={userInput.counter_party} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Face value:</label>
                                    <input type="text" onChange={e => setUserInput({ ...userInput, 'face_value': e.target.value })} value={userInput.face_value} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Settlement amount:</label>
                                    <input type="text" onChange={e => setUserInput({ ...userInput, 'settlement_amount': e.target.value })} value={userInput.settlement_amount} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Remarks:</label>
                                    <input type="text" style={{ width: '240px' }} onChange={e => setUserInput({ ...userInput, 'remarks': e.target.value })} value={userInput.remarks} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div style={{ width: '80px' }}>
                                    <button className='security-transaction-deal-form-button security-transaction-deal-form-button-save' style={{ fontSize: 'x-small' }} onClick={() => submitHandler()}>Save</button>
                                </div>

                                <div style={{ width: '80px' }}>
                                    <button className='security-transaction-deal-form-button security-transaction-deal-form-button-clear' style={{ fontSize: 'x-small' }} onClick={() => clearButtonHandler()}>Clear</button>
                                </div>

                            </div>

                        </div>

                        <div className='security-transaction-deal-form'>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Security code:</label>
                                    <select onChange={e => setUserInput({ ...userInput, 'security_code': e.target.value })} value={userInput.security_code}>
                                        <option value=''></option>
                                        {
                                            securityCodeList.map(item => <option key={item.name} value={item.name}>{item.name}</option>)
                                        }
                                    </select>
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Issue date:</label>
                                    <input type="text" disabled onChange={e => setUserInput({ ...userInput, 'issue_date': e.target.value })} value={userInput.issue_date} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Maturity date:</label>
                                    <input type="text" disabled onChange={e => setUserInput({ ...userInput, 'maturity_date': e.target.value })} value={userInput.maturity_date} />
                                </div>

                            </div>


                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Security type:</label>
                                    <input type="text" disabled onChange={e => setUserInput({ ...userInput, 'security_type': e.target.value })} value={userInput.security_type} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Security tenor:</label>
                                    <input type="text" disabled onChange={e => setUserInput({ ...userInput, 'security_tenor': e.target.value })} value={userInput.security_tenor} />
                                </div>

                            </div>

                            <div className='security-transaction-deal-form-container'>

                                <div>
                                    <label>Instrument:</label>
                                    <input type="text" disabled onChange={e => setUserInput({ ...userInput, 'instrument': e.target.value })} value={userInput.instrument} />
                                </div>

                            </div>

                        </div>

                        <datalist id='account_number'>
                            {
                                accountNumberList.map((item, key) => {
                                    return <option key={key} value={item.name}>{item.name}</option>
                                })
                            }
                        </datalist>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SecurityTransactionForm