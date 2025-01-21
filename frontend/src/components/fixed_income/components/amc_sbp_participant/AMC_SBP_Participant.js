import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"
import AMC_SBP_ParticipantGrid from "./components/AMC_SBP_ParticipantGrid"
import AMC_SBP_ParticipantForm from "./components/AMC_SBP_ParticipantForm"

import { useState } from 'react'

import './AMC_SBP_Participant.css'

function AMC_SBP_Participant({ user, date, addMessageHandler, onSubModuleSideMenuClear }) {

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
                    <PopUpWindowHeader title={'AMC & SBP Participant'} onNewEntryClicked={null} />
                </div>

                <div className="amc-sbp-participant">

                    <div className='amc-sbp-participant-home'>
                        <div className='amc-sbp-participant-sub-home'>
                            <AMC_SBP_ParticipantForm user={user} date={date} userInput={userInput} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                        </div>
                    </div>

                    <div className='amc-sbp-participant-home' style={{paddingTop:'0px'}}>
                        <div className='amc-sbp-participant-sub-home'>
                            <AMC_SBP_ParticipantGrid user={user} date={date} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                            <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AMC_SBP_Participant