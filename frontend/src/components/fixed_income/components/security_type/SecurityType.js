import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"
import SecurityTypeGrid from "./components/SecurityTypeGrid"
import SecurityTypeForm from "./components/SecurityTypeForm"

import { useState } from 'react'

import './SecurityType.css'

function SecurityType({ user, date, addMessageHandler, onSubModuleSideMenuClear }) {

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
            "date": '',
            "description": '',
        }
    )

    return (
        <div className='black-background'>
            <div className='float-component1'>
                <div>
                    <PopUpWindowHeader title={'Security Type'} onNewEntryClicked={null} />
                </div>

                <div className="security-type">

                    <div className='security-type-home'>
                        <div className='security-type-sub-home'>
                            <SecurityTypeForm user={user} date={date} userInput={userInput} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                        </div>
                    </div>

                    <div className='security-type-home' style={{paddingTop:'0px'}}>
                        <div className='security-type-sub-home'>
                            <SecurityTypeGrid user={user} date={date} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                            <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SecurityType