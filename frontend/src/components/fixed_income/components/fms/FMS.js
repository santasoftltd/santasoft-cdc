import DualDatePicker from "../../../santasoft/components/DualDatePicker"

import FMS_SecurityTransactions from "./components/FMS_SecurityTransactions"
import FMS_CashTransactions from "./components/FMS_CashTransactions"

import { useState } from 'react'

import './FMS.css'

function FMS({ user, addMessageHandler }) {

    const getDate = () => {
        var date = new Date();
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    }

    const [fromDate, setFromDate] = useState(getDate())

    const [toDate, setToDate] = useState(getDate())

    return (
        <div className='home'>

            <DualDatePicker toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate} />

            <div className='fixed-income-fms-sub-home'>

                <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '2', gridColumnStart: '1', gridColumnEnd: '2' }}><FMS_SecurityTransactions user={user} fromDate={fromDate} toDate={toDate} addMessageHandler={addMessageHandler} /></div>

                <div className='table-container' style={{ gridRowStart: '2', gridRowEnd: '3', gridColumnStart: '1', gridColumnEnd: '2' }}><FMS_CashTransactions user={user} fromDate={fromDate} toDate={toDate} addMessageHandler={addMessageHandler} /></div>

            </div>
        </div>
    )
}

export default FMS