import React from 'react'

import '../santasoft.css'

function ApprovalDashboardSelector({ isApprovalDashboard, setApprovalDashboard, marginLeft }) {

    const setApprovalDashboardHandler = () => {
        if (isApprovalDashboard) {
            setApprovalDashboard(false)
        }
        else {
            setApprovalDashboard(true)
        }
    }

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
        <div className='santasoft-dashboard-selector-container' style={{ marginLeft: marginLeft }}>
            <div className='santasoft-dashboard-selector' style={{ backgroundColor: getButtonBackGroundColor(), color: getButtonFontColor() }} onClick={() => setApprovalDashboardHandler()}>
                Approval Dashboard
            </div>
        </div>
    )
}

export default ApprovalDashboardSelector