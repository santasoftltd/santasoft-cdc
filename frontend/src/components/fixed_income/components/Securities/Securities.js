
import SecurityFloatForm from "./components/SecurityFloatForm"

import SecurityGrid from "./components/SecurityGrid"
import SecurityGridForAuthorization from "./components/SecurityGridForAuthorization"
import CouponSchedule from "./components/CouponSchedule"
import SecuritiesForm from "./components/SecuritiesForm"
import SecurityMaturities from "./components/SecurityMaturities"

import SecurityApprovalDashboardSelector from "./components/SecurityApprovalDashboardSelector"

import { useState } from 'react'

import './Securities.css'

function Securities({ user, addMessageHandler }) {

  const [securityType, setSecurityType] = useState('MTB')

  const [isApprovalDashboard, setApprovalDashboard] = useState('security_panel')

  const [isFloatForm, setFloatForm] = useState(false)

  const setFloatFormHandler = () => {
    if(isFloatForm){
      setFloatForm(false)
    }
    else{
      setFloatForm(true)
    }
  }

  const [userInput, setUserInput] = useState(
    {
      "id": null,
      "security_code": "",
      "instrument": "",
      "tenor": "",
      "issue_date": "",
      "maturity_date": "",
      "shut_period": "",
      "coupon_rate": "",
      "coupon_frequency": '2',
      "coupon_type": 'fixed',
    },
  )

  return (
    <div className='home'>

      <SecurityApprovalDashboardSelector isApprovalDashboard={isApprovalDashboard} setApprovalDashboard={setApprovalDashboard} />

      {isApprovalDashboard === 'security_panel' &&
        <div className='fixed-income-securities-sub-home'>

          <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '3', gridColumnStart: '1', gridColumnEnd: '2' }}><SecurityGrid user={user} securityType={securityType} setSecurityType={setSecurityType} setUserInput={setUserInput} addMessageHandler={addMessageHandler} /></div>

          <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '2', gridColumnStart: '2', gridColumnEnd: '3' }}><SecuritiesForm user={user} securityType={securityType} userInput={userInput} setUserInput={setUserInput} addMessageHandler={addMessageHandler} /></div>

          <div className='table-container' style={{ gridRowStart: '2', gridRowEnd: '4', gridColumnStart: '2', gridColumnEnd: '3' }}><CouponSchedule user={user} addMessageHandler={addMessageHandler} /></div>

          <div className='table-container' style={{ gridRowStart: '3', gridRowEnd: '4', gridColumnStart: '1', gridColumnEnd: '2' }}><SecurityMaturities user={user} addMessageHandler={addMessageHandler} /></div>

        </div>
      }

      {isApprovalDashboard === 'approval_dashboard' &&<SecurityGridForAuthorization user={user} setFloatFormHandler={setFloatFormHandler} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />}

      {isFloatForm && <SecurityFloatForm user={user} securityType={securityType} userInput={userInput} setUserInput={setUserInput} setFloatForm={setFloatForm} addMessageHandler={addMessageHandler} />}

    </div>
  )
}

export default Securities