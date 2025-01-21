import React from 'react'

import { useState } from 'react'

function DualDatePicker({toDate, setToDate, fromDate, setFromDate}) {

    const [toValue, setToValue] = useState(toDate)

    const [fromValue, setFromValue] = useState(fromDate)

    const dateChangeHandler = () => {
        setFromDate(fromValue)
        setToDate(toValue)
    }

    return (
        <div  className='dual-date-parent' onBlur={() => dateChangeHandler()}>
            <div className='dual-date-child'>
                From Date:
                <input type='date' value={fromValue} onChange={e => setFromValue(e.target.value)}/>
            </div>
            <div className='dual-date-child' style={{marginLeft:'20px'}}>
                To Date:
                <input type='date' value={toValue} onChange={e => setToValue(e.target.value)}/>
            </div>
        </div>
    )
}

export default DualDatePicker