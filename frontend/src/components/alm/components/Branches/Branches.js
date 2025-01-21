import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"
import BranchesForm from "./components/BranchesForm"
import BranchesGrid from "./components/BranchesGrid"

import { useState } from 'react'

import './Branches.css'

function Branches({ user, refresh, date, addMessageHandler, onSubModuleSideMenuClear }) {

  const [data, setData] = useState([
    // {
    //     "id": null,
    //     "date": null,
    //     "description": null,
    // }
  ])

  const [userInput, setUserInput] = useState(
    {
      "id": '',
      "code": '',
      "name": '',
    }
  )

  return (
    <div className='black-background'>
      <div className='float-component1'>
        <div>
          <PopUpWindowHeader title={'Branches'} onNewEntryClicked={null} />
        </div>

        <div className="ALM-Branches">

          <div className='alm-branches-home'>
            <div className='alm-branches-sub-home'>
              <BranchesForm user={user} refresh={refresh} date={date} userInput={userInput} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
            </div>
          </div>

          <div className='alm-branches-home' style={{ paddingTop: '0px' }}>
            <div className='alm-branches-sub-home'>
              <BranchesGrid user={user} refresh={refresh} date={date} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
              <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Branches