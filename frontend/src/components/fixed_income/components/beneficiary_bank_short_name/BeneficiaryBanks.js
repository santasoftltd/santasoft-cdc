import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"
import BeneficiaryBanksGrid from "./components/BeneficiaryBanksGrid"
import BeneficiaryBanksForm from "./components/BeneficiaryBanksForm"

import { useState } from 'react'

import './BeneficiaryBanks.css'

function BeneficiaryBanks({ user, date, addMessageHandler, onSubModuleSideMenuClear }) {

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
                    <PopUpWindowHeader title={'Beneficiary Banks'} onNewEntryClicked={null} />
                </div>

                <div className="beneficiary-banks">

                    <div className='beneficiary-banks-home'>
                        <div className='beneficiary-banks-sub-home'>
                            <BeneficiaryBanksForm user={user} date={date} userInput={userInput} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                        </div>
                    </div>

                    <div className='beneficiary-banks-home' style={{paddingTop:'0px'}}>
                        <div className='beneficiary-banks-sub-home'>
                            <BeneficiaryBanksGrid user={user} date={date} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                            <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BeneficiaryBanks