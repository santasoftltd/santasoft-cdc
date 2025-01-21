import React from 'react'

function SecurityApprovalDashboardSelector({ isApprovalDashboard, setApprovalDashboard }) {

    const getButtonBackGroundColor = (name) => {
        if (name === isApprovalDashboard) {
            return '#2196F3';
        }
        else {
            return 'white';
        }
    }

    const getButtonFontColor = (name) => {
        if (name === isApprovalDashboard) {
            return 'white';
        }
        else {
            return 'black';
        }
    }

    return (
        <div className='fixed-income-blotter-selector-container'>
            <div className='fixed-income-blotter-selector' style={{backgroundColor:getButtonBackGroundColor('security_panel'), color:getButtonFontColor('security_panel')}} onClick={() => setApprovalDashboard('security_panel')}>
                Security Panel
            </div>
            <div className='fixed-income-blotter-selector' style={{backgroundColor:getButtonBackGroundColor('approval_dashboard'), color:getButtonFontColor('approval_dashboard')}} onClick={() => setApprovalDashboard('approval_dashboard')}>
                Approval Dashboard
            </div>
        </div>
    )
}

export default SecurityApprovalDashboardSelector