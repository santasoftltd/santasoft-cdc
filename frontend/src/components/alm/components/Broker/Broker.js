import PopUpWindowHeader from '../../../santasoft/components/header/PopUpWindowHeader'
import BrokerForm from './components/BrokerForm'
import BrokerGrid from './components/BrokerGrid'

import { useState } from 'react'

import './Broker.css'

function Broker({ user, refresh, date, addMessageHandler, onSubModuleSideMenuClear }) {

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
          <PopUpWindowHeader title={'Brokers'} onNewEntryClicked={null} />
        </div>

        <div className="ALM-broker">

          <div className='alm-broker-home'>
            <div className='alm-broker-sub-home'>
              <BrokerForm user={user} refresh={refresh} date={date} userInput={userInput} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
            </div>
          </div>

          <div className='alm-broker-home' style={{ paddingTop: '0px' }}>
            <div className='alm-broker-sub-home'>
              <BrokerGrid user={user} refresh={refresh} date={date} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
              <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Broker