import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"
import SecurityTransactionTypeGrid from "./components/SecurityTransactionTypeGrid"
import SecurityTransactionTypeForm from "./components/SecurityTransactionTypeForm"

import { useState } from 'react'

import './SecurityTransactionType.css'

function SecurityTransactionType({ user, date, addMessageHandler, onSubModuleSideMenuClear }) {

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
                    <PopUpWindowHeader title={'Security Transaction Type'} onNewEntryClicked={null} />
                </div>

                <div className="security-transaction-type">

                    <div className='security-transaction-type-home'>
                        <div className='security-transaction-type-sub-home'>
                            <SecurityTransactionTypeForm user={user} date={date} userInput={userInput} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                        </div>
                    </div>

                    <div className='security-transaction-type-home' style={{paddingTop:'0px'}}>
                        <div className='security-transaction-type-sub-home'>
                            <SecurityTransactionTypeGrid user={user} date={date} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                            <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SecurityTransactionType