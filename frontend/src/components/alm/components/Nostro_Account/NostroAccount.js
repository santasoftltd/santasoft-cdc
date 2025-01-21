import PopUpWindowHeader from '../../../santasoft/components/header/PopUpWindowHeader'
import NostroAccountForm from './components/NostroAccountForm'
import NostroAccountGrid from './components/NostroAccountGrid'

import { useState } from 'react'

import './NostroAccount.css'

function NostroAccount({ user, refresh, date, addMessageHandler, onSubModuleSideMenuClear }) {

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
      "currency": '',
      "name": '',
    }
  )

  return (
    <div className='black-background'>
      <div className='float-component1'>
        <div>
          <PopUpWindowHeader title={'Nostro Accounts'} onNewEntryClicked={null} />
        </div>

        <div className="ALM-nostro-account">

          <div className='alm-nostro-account-home'>
            <div className='alm-nostro-account-sub-home'>
              <NostroAccountForm user={user} refresh={refresh} date={date} userInput={userInput} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
            </div>
          </div>

          <div className='alm-nostro-account-home' style={{ paddingTop: '0px' }}>
            <div className='alm-nostro-account-sub-home'>
              <NostroAccountGrid user={user} refresh={refresh} date={date} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
              <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NostroAccount