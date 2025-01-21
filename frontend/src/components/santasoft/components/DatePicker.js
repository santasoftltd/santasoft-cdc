import React from 'react'

import { useState } from 'react'

import '../santasoft.css'

function DatePicker({date, setDate})
{
    const [value, setValue] = useState(date)

    const dateChangeHandler = () => {
        setDate(value)
    }

    var months = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];

    const getDate = () => {
        var date = new Date(value);
        return ('0' + date.getDate()).slice(-2) + '-' + months[date.getMonth()] + '-' + date.getFullYear();
    }

    return (
        <div className='santasoft-date'>
            <input type='date' value={value} onChange={e => setValue(e.target.value)} onBlur={() => dateChangeHandler()}/>
            {getDate()}
        </div>
    )
}

export default DatePicker