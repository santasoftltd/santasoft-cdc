import CurrencyForm from './components/CurrencyForm'
import CurrencyGrid from './components/CurrencyGrid'
import FloatForm from "../../../santasoft/components/FloatForm/FloatForm"
import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"

import React from 'react'

import { useState } from 'react'

function Currencies({user, refresh, addMessageHandler, onSubModuleSideMenuClear}) {
    const [isNewEntry, setIsNewEntry] = useState(false)

    const onNewEntryClicked = () => {
      if(isNewEntry){
        setIsNewEntry(false)
      }
      else{
        setIsNewEntry(true)
      }
    }
  
    return (
      <div className='black-background'>
        <div className='float-component1'>
          <div>
            <PopUpWindowHeader title={'Currencies'} onNewEntryClicked={null}/>
          </div>
          <div className='currencies-home'>
            <div className='currencies-sub-home'>
              <CurrencyGrid user={user} refresh={refresh} addMessageHandler={addMessageHandler}/>
              <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
            </div>
          </div>
        </div>
        {isNewEntry && <FloatForm newItem={true} title={'currency'} onNewEntryClicked={onNewEntryClicked} floatFormBody={<CurrencyForm/>}/>}
      </div>
    )
}

export default Currencies