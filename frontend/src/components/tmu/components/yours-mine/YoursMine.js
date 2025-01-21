import YoursMine from '../dashboard/components/YoursMine'
import React from 'react'
import './YoursMine.css'

function YoursMineCompoent({ user, refresh, date, dropdownLists, onYoursMineClicked, addMessageHandler }) {
    return (
        <div className='black-background'>
            <div className='float-component'>
                <div>
                    <div className='Salam-page-header3'>
                        <p className='Salam-page-title'>Yours Mine</p>
                    </div>
                </div>
                <div className='yours-mine-home'>
                    <div className='yours-mine-sub-home'>
                        <YoursMine user={user} refresh={refresh} date={date} onTableSelect={null} dropdownLists={dropdownLists} loaderPosition={'65%'} addMessageHandler={addMessageHandler}/>
                        <button className='cancel-button' onClick={() => onYoursMineClicked()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YoursMineCompoent