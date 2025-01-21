import BranchForm from './components/BranchForm'
import BranchGrid from './components/BranchGrid'
import FloatForm from "../../../santasoft/components/FloatForm/FloatForm"
import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"

import './Branches.css'

import { useState } from 'react'

function Branches({ user, refresh, addMessageHandler, onSubModuleSideMenuClear }) {

  const [isNewEntry, setIsNewEntry] = useState(false)

  const onNewEntryClicked = () => {
    if (isNewEntry) {
      setIsNewEntry(false)
    }
    else {
      setIsNewEntry(true)
    }
  }

  return (
    <div className='black-background'>
      <div className='float-component1'>
        <div>
          <PopUpWindowHeader title={'Branches'} onNewEntryClicked={null} />
        </div>
        <div className='branches-home'>
          <div className='branches-sub-home'>
            <BranchGrid user={user} refresh={refresh} addMessageHandler={addMessageHandler} />
            <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
          </div>
        </div>
      </div>
      {isNewEntry && <FloatForm newItem={true} title={'branch'} onNewEntryClicked={onNewEntryClicked} floatFormBody={<BranchForm />} />}
    </div>
  )
}

export default Branches