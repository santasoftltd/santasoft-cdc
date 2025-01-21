import AccountsAuthorization from './components/accounts/AccountsAuthorization';
import AdminAuthorization from './components/admin/AdminAuthorization';
import MoneyMarketAuthorization from './components/alm/MoneyMarketAuthorization';
import AssestValuationAuthorization from './components/assest_valuation/AssestValuationAuthorization';
import BackOfficeAuthorization from './components/back_office/BackOfficeAuthorization';
import BaseReportingAuthorization from './components/base_reporting/BaseReportingAuthorization';
import CfaAuthorization from './components/cfa/CfaAuthorization';
import CreditAuthorization from './components/credit/CreditAuthorization';
import DepositAuthorization from './components/deposit/DepositAuthorization';
import EquityAuthorization from './components/equity/EquityAuthorization';
import FxcrsAuthorization from './components/fxcrs/FxcrsAuthorization';
import FixedIncomeTrading from './components/fixed_income/FixedIncomeTrading';
import GeneralLedgerAuthorization from './components/general_ledger/GeneralLedgerAuthorization';
import HrAuthorization from './components/Hr/HrAuthorization';
import Ifrs9Authorization from './components/ifrs9/Ifrs9Authorization';
import InterbankAuthorization from './components/interbank/InterbankAuthorization';
import IpsAuthorization from './components/ips/IpsAuthorization';
import KycAuthorization from './components/kyc/KycAuthorization';
import LeaseAuthorization from './components/lease/LeaseAuthorization';
import MiddleOfficeAuthorization from './components/middle_office/MiddleOfficeAuthorization';
import MmcrsAuthorization from './components/mmcrs/MmcrsAuthorization';
import PayrollAuthorization from './components/payroll/PayrollAuthorization';
import RiskAuthorization from './components/risk/RiskAuthorization';
import RtgsAuthorization from './components/rtgs/RtgsAuthorization';
import TmuAuthorization from './components/tmu/TmuAuthorization';

import Header from "./components/home/components/header/Header";
import AppSideMenuBar from "./components/home/components/side_menu_bar/AppSideMenuBar";
import DropDown from './components/home/components/drop_down/DropDown';
import Home from './components/home/Home';
import Modules from './components/home/components/modules/Modules';
import MessageBar from './components/home/components/message_bar/MessageBar';

import React from 'react'
import { useState, useEffect } from 'react'

const services = [
  {
    category: 'Admin Controls',
    description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.',
    modules: [
      { name: 'Admin', value: 'SAC01', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' }
    ]
  },
  {
    category: 'Foreign Exchange',
    description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.',
    modules: [
      { name: 'FX Corporate', value: 'SFE01', enabled: true, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'FX Interbank', value: 'SFE05', enabled: true, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'FX Back Office', value: 'SFE15', enabled: true, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'FX Compliance', value: 'SFE20', enabled: true, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'FXCRS', value: 'SR20', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      // { name: 'Assest & Liability Management', value: 'SFE10', enabled: true, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' }
    ]
  },
  {
    category: 'Money Market',
    description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.',
    modules: [
      { name: 'Fixed Income Trading', value: 'SM15', enabled: true, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'Money Market', value: 'SM01', enabled: true, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      // { name: 'Front Office', value: 'SM01', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'Money Market Compliance', value: 'SM05', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'Money Market Back Office', value: 'SM10', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' }
    ]
  },
  {
    category: 'Finance',
    description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.',
    modules: [
      { name: 'Credit', value: 'SF01', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'Risk', value: 'SF05', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'Lease', value: 'SF10', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'Deposit', value: 'SF15', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'Equity', value: 'SF20', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' }
    ]
  },
  {
    category: 'Accounts',
    description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.',
    modules: [
      { name: 'Corporate Finance Accounting', value: 'SA01', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'Accounting System', value: 'SA05', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'General Ledger', value: 'SA10', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' }
    ]
  },
  {
    category: 'Employee Management',
    description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.',
    modules: [
      { name: 'Payroll', value: 'SC01', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'Human Resource', value: 'SC05', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' }
    ]
  },
  {
    category: 'Regulations',
    description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.',
    modules: [
      { name: 'IPS', value: 'SR01', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'RTGS', value: 'SR05', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'IFRS9', value: 'SR10', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'MMCRS', value: 'SR15', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      
      { name: 'Assest Valuation', value: 'SR25', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'KYC / AML', value: 'SR30', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' },
      { name: 'Base Reporting', value: 'SR35', enabled: false, description: 'View all the modules from the Santasoft Platform.View all the modules from the Santasoft Platform.' }
    ]
  }
]

function Platfrom({ user, logout }) {

  const [isAppMenuBarClicked, setAppMenuBarClicked] = useState(false)
  const [module, setModule] = useState({ name: '', value: '', enabled: false, description: '' })
  const [header, setHeader] = useState('')

  const [subPageTitle, setSubPageTitle] = useState('')

  const [notifications, setNotifications] = useState([])

  const [messages, setMessages] = useState([
    // {
    //   title: 'Transaction Saved1',
    //   content: 'Transaction has been saved successfully. TID:2344',
    //   type: 1
    // },
  ])

  const addMessageHandler = object => {
    setMessages([...messages, object])
  }

  const onMessageClosed = index => {
    setNotifications([messages[index].content, ...notifications])
    var newState = [...messages]
    newState.splice(newState, 1)
    setMessages(newState)
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setMessages([])
    }, 10 * 1000);
    return function cleanup() {
      clearInterval(interval);
    }
    // eslint-disable-next-line
  },[]);

  const onHeaderCliked = (option) => {
    if (option === 'notification') {
      if (header !== 'notification') {
        setHeader('notification')
      }
      else {
        setHeader('')
      }
    }
    if (option === 'support') {
      if (header !== 'support') {
        setHeader('support')
      }
      else {
        setHeader('')
      }
    }
    if (option === 'profile') {
      if (header !== 'profile') {
        setHeader('profile')
      }
      else {
        setHeader('')
      }
    }
  }

  const onAppSideBarClick = () => {
    if (isAppMenuBarClicked) {
      // document.body.style = 'background: white';
      setAppMenuBarClicked(false)
    } else {
      // document.body.style = 'background: rgba(0, 0, 0, 0.443)';
      setAppMenuBarClicked(true)
    }
  }

  const onServiceClicked = (category, name, value) => {
    if (category !== true) {
      let obj = services.find(o => o.category === category);
      let enabled = obj.modules.filter(o => o.name === name)
      setModule({ name: name, value: value, enabled: enabled[0].enabled, description: enabled[0].description })
    }
    else {
      setModule({ name: name, value: value, enabled: category, description: '' })
    }
    setAppMenuBarClicked(false)
    document.body.style = 'background: white';
  }

  const authorized = (module, user) => {
    return user.authorized[module.value]
  }

  const normalize = () => {
    setHeader('')
    document.body.style = 'background: white';
    setAppMenuBarClicked(false)
  }

  return (
    <div>

      <Header onAppSideBarClick={onAppSideBarClick} subPageTitle={subPageTitle} service={module.name} onHeaderCliked={onHeaderCliked} addMessageHandler={addMessageHandler} />
      <DropDown user={user} header={header} logout={logout} notifications={notifications} addMessageHandler={addMessageHandler} />
      <MessageBar messages={messages} onMessageClosed={onMessageClosed} addMessageHandler={addMessageHandler} />
      {isAppMenuBarClicked && <AppSideMenuBar onServiceClicked={onServiceClicked} services={services} addMessageHandler={addMessageHandler} />}
      {module.value === '' && <Home onServiceClicked={onServiceClicked} user={user.username} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'all' && <Modules onServiceClicked={onServiceClicked} services={services} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SA05' && <AccountsAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SAC01' && <AdminAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SM01' && <MoneyMarketAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SR25' && <AssestValuationAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SM10' && <BackOfficeAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SR35' && <BaseReportingAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SA01' && <CfaAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SF01' && <CreditAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SF15' && <DepositAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SF20' && <EquityAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {/* {module.value === 'SM01' && <FrontOfficeAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />} */}
      {module.value === 'SM15' && <FixedIncomeTrading user={user} module={module} setSubPageTitle={setSubPageTitle} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SR20' && <FxcrsAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SA10' && <GeneralLedgerAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SC05' && <HrAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SR10' && <Ifrs9Authorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SFE05' && <InterbankAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SR01' && <IpsAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SR30' && <KycAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SF10' && <LeaseAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SM05' && <MiddleOfficeAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SR15' && <MmcrsAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SC01' && <PayrollAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SF05' && <RiskAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SR05' && <RtgsAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}
      {module.value === 'SFE01' && <TmuAuthorization user={user} module={module} authorized={authorized(module, user)} normalize={normalize} addMessageHandler={addMessageHandler} />}

    </div>
  )
}

export default Platfrom