import YoursMine from '../dashboard/components/YoursMine'
import BiddingRates from '../interbank_rates/components/BiddingRates'
import DealTicket from './components/DealTicket'
import DatePicker from '../../DatePicker'
import React from 'react'
import './DealEntry.css'

function DealEntry({ user, refresh, date, setDate, rates, setRates, dropdownLists, addMessageHandler }) {
    return (
        <div className='home'>
            <DatePicker date={date} setDate={setDate} />
            <div className='deal-entry-sub-home'>
                <YoursMine user={user} refresh={refresh} date={date} onTableSelect={null} dropdownLists={dropdownLists} loaderPosition={'45%'} addMessageHandler={addMessageHandler}/>
                <BiddingRates user={user} refresh={refresh} addMessageHandler={addMessageHandler}/>
                <DealTicket user={user} refresh={refresh} rates={rates} setRates={setRates} date={date} dropdownLists={dropdownLists} addMessageHandler={addMessageHandler}/>
            </div>
        </div>
    )
}

export default DealEntry