import React from 'react'
import './SbpRates.css'

function SbpRatesForm({ setUserInput }) {
    return (
        <div className='form-body-container' style={{ height: '10vh' }}>

            <div className='form-body-container-one-field'>
                <label>Upload the excel sheet</label>
                <input type='file' style={{ border: 'none', backgroundColor: 'white', font: 'caption', cursor: 'pointer' }} onChange={e => setUserInput(e)}></input>
            </div>

        </div>
    )
}

export default SbpRatesForm