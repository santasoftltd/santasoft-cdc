import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"
import IpsAccountTypeGrid from "./components/IpsAccountTypeGrid"
import IpsAccountTypeForm from "./components/IpsAccountTypeForm"

import { useState } from 'react'

import './IpsAccountType.css'

function IpsAccountType({ user, date, addMessageHandler, onSubModuleSideMenuClear }) {

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
                    <PopUpWindowHeader title={'IPS Account Type'} onNewEntryClicked={null} />
                </div>

                <div className="ips-account-type">

                    <div className='ips-account-type-home'>
                        <div className='ips-account-type-sub-home'>
                            <IpsAccountTypeForm user={user} date={date} userInput={userInput} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                        </div>
                    </div>

                    <div className='ips-account-type-home' style={{paddingTop:'0px'}}>
                        <div className='ips-account-type-sub-home'>
                            <IpsAccountTypeGrid user={user} date={date} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                            <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default IpsAccountType