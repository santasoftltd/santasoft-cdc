import React from 'react'

import { useState } from 'react'

import '../santasoft.css'

function DualDatePicker({toDate, setToDate, fromDate, setFromDate}) {

    const [toValue, setToValue] = useState(toDate)

    const [fromValue, setFromValue] = useState(fromDate)

    const dateChangeHandler = () => {
        setFromDate(fromValue)
        setToDate(toValue)
    }

    var months = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];

    const getDate = (value) => {
        var date = new Date(value);
        return ('0' + date.getDate()).slice(-2) + '-' + months[date.getMonth()] + '-' + date.getFullYear();
    }

    return (
        <div  className='santasoft-dual-date-parent' onBlur={() => dateChangeHandler()}>
            <div className='santasoft-dual-date-child'>
                From:
                <input type='date' value={fromValue} onChange={e => setFromValue(e.target.value)}/>
                {getDate(fromValue)}
            </div>
            <div className='santasoft-dual-date-child'>
                To:
                <input type='date' value={toValue} onChange={e => setToValue(e.target.value)}/>
                {getDate(toValue)}
            </div>
        </div>
    )
}

export default DualDatePicker