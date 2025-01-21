import React from 'react'

import { useState } from 'react'

function DatePicker({date, setDate})
{
    const [value, setValue] = useState(date)

    const dateChangeHandler = () => {
        setDate(value)
    }

    return (
        <div className='date'>
            Date:
            <input type='date' value={value} onChange={e => setValue(e.target.value)} onBlur={() => dateChangeHandler()}/>
        </div>
    )
}

export default DatePicker