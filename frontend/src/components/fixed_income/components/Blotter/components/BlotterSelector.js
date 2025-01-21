import React from 'react'

function BlotterSelector({ blotter, setBlotter }) {

    const getButtonBackGroundColor = (name) => {
        if (name === blotter) {
            return '#2196F3';
        }
        else {
            return 'white';
        }
    }

    const getButtonFontColor = (name) => {
        if (name === blotter) {
            return 'white';
        }
        else {
            return 'black';
        }
    }

    return (
        <div className='fixed-income-blotter-selector-container'>
            <div className='fixed-income-blotter-selector' style={{backgroundColor:getButtonBackGroundColor('real-time-blotter'), color:getButtonFontColor('real-time-blotter')}} onClick={() => setBlotter('real-time-blotter')}>
                Real Time Blotter
            </div>
            <div className='fixed-income-blotter-selector' style={{backgroundColor:getButtonBackGroundColor('securities-blotter'), color:getButtonFontColor('securities-blotter')}} onClick={() => setBlotter('securities-blotter')}>
                Securities Blotter
            </div>
            <div className='fixed-income-blotter-selector' style={{backgroundColor:getButtonBackGroundColor('cash-blotter'), color:getButtonFontColor('cash-blotter')}} onClick={() => setBlotter('cash-blotter')}>
                Cash Blotter
            </div>
            <div className='fixed-income-blotter-selector' style={{backgroundColor:getButtonBackGroundColor('amc-blotter'), color:getButtonFontColor('amc-blotter')}} onClick={() => setBlotter('amc-blotter')}>
                AMC Blotter
            </div>
            <div className='fixed-income-blotter-selector' style={{backgroundColor:getButtonBackGroundColor('audit-blotter'), color:getButtonFontColor('audit-blotter')}} onClick={() => setBlotter('audit-blotter')}>
                Audit Blotter
            </div>
            <div className='fixed-income-blotter-selector' style={{backgroundColor:getButtonBackGroundColor('overall-blotter'), color:getButtonFontColor('overall-blotter')}} onClick={() => setBlotter('overall-blotter')}>
                Overall Blotter
            </div>
        </div>
    )
}

export default BlotterSelector