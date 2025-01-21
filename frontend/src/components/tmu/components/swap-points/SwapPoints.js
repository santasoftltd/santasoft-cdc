import SwapPointsHeader from './components/SwapPointsHeader'
import SwapPointsGrid from './components/SwapPointsGrid'
import React from 'react'
import './SwapPoints.css'

function SwapPoints({ user, refresh, date, onSwapPointsClicked, addMessageHandler }) {
  return (
    <div className='black-background'>
            <div className='float-component'>
                <div>
                    <SwapPointsHeader />
                </div>
                <div className='SwapPoints-home'>
                    <div className='SwapPoints-sub-home'>
                        <SwapPointsGrid user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} />
                        <button className='cancel-button' onClick={() => onSwapPointsClicked()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SwapPoints