import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"
import HolidayGrid from "./components/HolidayGrid"
import HolidayForm from "./components/HolidayForm"

import { useState } from 'react'

import './Holiday.css'

function Holiday({ user, refresh, date, addMessageHandler, onSubModuleSideMenuClear }) {

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
                    <PopUpWindowHeader title={'Holidays'} onNewEntryClicked={null} />
                </div>

                <div className="Holiday">

                    <div className='holiday-home'>
                        <div className='holiday-sub-home'>
                            <HolidayForm user={user} refresh={refresh} date={date} userInput={userInput} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                        </div>
                    </div>

                    <div className='holiday-home' style={{paddingTop:'0px'}}>
                        <div className='holiday-sub-home'>
                            <HolidayGrid user={user} refresh={refresh} date={date} data={data} setData={setData} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />
                            <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Holiday