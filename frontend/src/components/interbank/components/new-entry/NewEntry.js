import NewEntryHeader from './components/NewEntryHeader'
// import NewEntryInformation from './components/NewEntryInformation'
import NewEntryInput from './components/NewEntryInput'

import React from 'react'
import './NewEntry.css'

function NewEntry({user, updateObject, setUpdateObject, onNewEntryClicked, date, dropdownLists, rates, transaction, addMessageHandler}) {
  return (
    <div className='black-background'>
      <div className='float-component'>
        <div>
          <NewEntryHeader/>
        </div>
        <div className='Salam-home'>
          <div className='Salam-sub-home'>
            {/* <NewEntryInformation user={user} rates={rates}/> */}
            <NewEntryInput user={user} updateObject={updateObject} setUpdateObject={setUpdateObject} onNewEntryClicked={onNewEntryClicked} date={date} dropdownLists={dropdownLists} setDataSummary={transaction.setDataSummary} fetchedData={transaction.fetchedData} setFetchedData={transaction.setFetchedData} addMessageHandler={addMessageHandler}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewEntry