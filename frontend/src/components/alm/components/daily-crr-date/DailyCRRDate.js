import DailyCRRDateHeader from './components/DailyCRRDateHeader'
import DailyCRRDateGrid from './components/DailyCRRDateGrid'
import React from 'react'
import './DailyCRRDate.css'

function DailyCRRDate({ user, refresh, date, onDailyCRRDateClicked, addMessageHandler }) {
  return (
    <div className='black-background'>
            <div className='float-component'>
                <div>
                    <DailyCRRDateHeader />
                </div>
                <div className='DailyCRRDate-home'>
                    <div className='DailyCRRDate-sub-home'>
                        <DailyCRRDateGrid user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} />
                        <button className='cancel-button' onClick={() => onDailyCRRDateClicked()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default DailyCRRDate