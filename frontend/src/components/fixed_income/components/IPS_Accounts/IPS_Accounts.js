import { getDate } from '../../../santasoft/components/Formatter'

import AccountSelector from './components/AccountSelector'
import IPS_AccountApprovalDashboardSelector from './components/IPS_AccountApprovalDashboardSelector'
import IPS_AccountsGride from './components/IPS_AccountsGride'
import IPSGridForAuthorization from './components/IPSGridForAuthorization'
import IPS_AccountForm from './components/IPS_AccountForm'

import { useState, useEffect } from 'react'

import './IPS_Accounts.css'

function IPS_Accounts({ user, addMessageHandler }) {

  const [account, setAccount] = useState('amc')

  const [isApprovalDashboard, setApprovalDashboard] = useState(false)

  const setApprovalDashboardHandler = () => {
    if (isApprovalDashboard) {
      setApprovalDashboard(false)
    }
    else {
      setApprovalDashboard(true)
    }
  }

  const [isFloatForm, setFloatForm] = useState(false)

  const [userInput, setUserInput] = useState(
    {
      "id": null,
      "account_number": "",
      "account_prefix": "",
      "account_title": "",
      "amc": "",
      "type": "",
      "opening_date": getDate(),
      "closing_date": "",
      "exeption": "",
      "taxation": "",
      "resident": "",
      "ntn_cnic": "",
    }
  )

  useEffect(() => {
    if (account === 'retail') {
      setUserInput({ ...userInput, amc: 'CDC - Retail Client Account' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div className='home'>

      <IPS_AccountApprovalDashboardSelector isApprovalDashboard={isApprovalDashboard} setApprovalDashboardHandler={setApprovalDashboardHandler} />

      <AccountSelector account={account} setAccount={setAccount} />

      {!isApprovalDashboard &&

        <div className='fixed-income-ips-accounts-sub-home'>

          <div className='ips-account-action-button' style={{ backgroundColor: 'MediumSeaGreen' }} onClick={() => setFloatForm(true)}>New Account</div>

          <IPS_AccountsGride user={user} setFloatForm={setFloatForm} account={account} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />

        </div>
      }



      {isApprovalDashboard && <IPSGridForAuthorization user={user} setFloatForm={setFloatForm} account={account} setUserInput={setUserInput} addMessageHandler={addMessageHandler} />}

      {isFloatForm && <IPS_AccountForm user={user} account={account} userInput={userInput} setUserInput={setUserInput} setFloatForm={setFloatForm} addMessageHandler={addMessageHandler} />}

    </div>
  )
}

export default IPS_Accounts