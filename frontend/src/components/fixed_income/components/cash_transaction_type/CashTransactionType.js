import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"
import CashTransactionTypeGrid from "./components/CashTransactionTypeGrid"
import CashTransactionTypeForm from "./components/CashTransactionTypeForm"

import { useState } from 'react'

import './CashTransactionType.css'

function CashTransactionType({ user, refresh, date, addMessageHandler, onSubModuleSideMenuClear }) {

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
                    <PopUpWindowHeader title={'Cash Transaction Type'} onNewEntryClicked={null} />
                </div>

                <div className="cash-transaction-type">

                    <div className='cash-transaction-type-home'>
                        <div className='cash-transaction-type-sub-home'>
                            <CashTransactionTypeForm user={user} date={date} userInput={userInput} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                        </div>
                    </div>

                    <div className='cash-transaction-type-home' style={{paddingTop:'0px'}}>
                        <div className='cash-transaction-type-sub-home'>
                            <CashTransactionTypeGrid user={user} date={date} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                            <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CashTransactionType