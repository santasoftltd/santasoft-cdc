import React from 'react'

function IPS_AccountApprovalDashboardSelector({ isApprovalDashboard, setApprovalDashboardHandler }) {

    const getButtonBackGroundColor = () => {
        if (isApprovalDashboard) {
            return '#2196F3';
        }
        else {
            return 'white';
        }
    }

    const getButtonFontColor = () => {
        if (isApprovalDashboard) {
            return 'white';
        }
        else {
            return 'black';
        }
    }

    return (
        <div className='fixed-income-blotter-selector-container' style={{marginLeft:'350px'}}>
            <div className='fixed-income-blotter-selector' style={{backgroundColor:getButtonBackGroundColor(), color:getButtonFontColor()}} onClick={() => setApprovalDashboardHandler()}>
                Approval Dashboard
            </div>
        </div>
    )
}

export default IPS_AccountApprovalDashboardSelector