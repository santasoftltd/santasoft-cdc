import PopUpWindowHeader from '../../../santasoft/components/header/PopUpWindowHeader'
import CounterpartyForm from './components/CounterpartyForm'
import CounterpartyGrid from './components/CounterpartyGrid'

import { useState } from 'react'

import './CounterParty.css'

function CounterParty({ user, refresh, date, addMessageHandler, onSubModuleSideMenuClear }) {

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
      "spot_limit": '',
      "forward_limit": '',
    }
  )

  return (
    <div className='black-background'>
      <div className='float-component1'>
        <div>
          <PopUpWindowHeader title={'Counterparties'} onNewEntryClicked={null} />
        </div>

        <div className="ALM-counterparty">

          <div className='alm-counterparty-home'>
            <div className='alm-counterparty-sub-home'>
              <CounterpartyForm user={user} refresh={refresh} date={date} userInput={userInput} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
            </div>
          </div>

          <div className='alm-counterparty-home' style={{ paddingTop: '0px' }}>
            <div className='alm-counterparty-sub-home'>
              <CounterpartyGrid user={user} refresh={refresh} date={date} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
              <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CounterParty