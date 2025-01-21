import SbpRatesHeader from './components/SbpRatesHeader'
import SbpRatesGrid from './components/SbpRatesGrid'
import React from 'react'
import './SbpRates.css'

function SbpRates({ user, refresh, date, onSbpRatesClicked, addMessageHandler }) {
    return (
        <div className='black-background'>
            <div className='float-component'>
                <div>
                    <SbpRatesHeader />
                </div>
                <div className='SbpRates-home'>
                    <div className='SbpRates-sub-home'>
                        <SbpRatesGrid user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} />
                        <button className='cancel-button' onClick={() => onSbpRatesClicked()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SbpRates