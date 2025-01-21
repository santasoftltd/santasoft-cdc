import Loader from '../santasoft/components/loader/Loader'
import Header from './components/Header'
import SideBarMenu from '../santasoft/components/SideBarMenu'

import ALM_PKR_Blotter from './components/ALM_PKR_Blotter/ALM_PKR_Blotter'
import ALM_USD_Blotter from './components/ALM_USD_Blotter/ALM_USD_Blotter'
import DealTicket from './components/Deal_Ticket/DealTicket'
import Dashboard from './components/Dashboard/Dashboard'
import NostroManagement from './components/Nostro_Managment/NostroManagement'
// import BranchPosition from './components/Branch_Position/BranchPosition'
import Interbank from './components/Interbank/Interbank'
import Holdings from './components/Holdings/Holdings'
import DTL_SLR from './components/DTL_SLR/DTL_SLR'
import RevalAccrualAmortization from './components/Reval_Accrual_Amortization/RevalAccrualAmortization'
import PkrRv from './components/PKR_RV/PkrRv'
import AccrualTreasury from './components/Accrual_Treasury/AccrualTreasury'
import IncomeCost from './components/Income_Cost/IncomeCost'
import DailyKiborLibor from './components/Daily_Kibor_Libor/DailyKiborLibor'
// import DailyKibor from './components/Daily_Kibor/DailyKibor'
// import DailyLibor from './components/Daily_Libor/DailyLibor'
import MaturityProfile from './components/Maturity_Profile/MaturityProfile'
import CashFlow from './components/Cash_Flow/CashFlow'
import GapChart from './components/Gap_Chart/GapChart'

import NostroAccount from './components/Nostro_Account/NostroAccount'
import Branches from './components/Branches/Branches'
import CounterParty from './components/Counter_Party/CounterParty'
import Broker from './components/Broker/Broker'

import React from 'react'
import { useState, useEffect } from 'react'

import './MoneyMarket.css'

import { ip } from '../../App'

const pages = [
  {
    'name': 'Dash Board',
    'value': 'p04',
    'subMenu': false
  },
  {
    'name': 'PKR Blotter',
    'value': 'p01',
    'subMenu': false
  },
  {
    'name': 'FCY Blotter',
    'value': 'p02',
    'subMenu': false
  },
  {
    'name': 'Deal Ticket',
    'value': 'p03',
    'subMenu': false
  },
  {
    'name': 'Nostro Management',
    'value': 'p05',
    'subMenu': false
  },
  // {
  //   'name': 'Branch Position',
  //   'value': 'p06',
  //   'subMenu': false
  // },
  {
    'name': 'Interbank',
    'value': 'p07',
    'subMenu': false
  },
  {
    'name': 'Holdings',
    'value': 'p08',
    'subMenu': false
  },
  {
    'name': 'DTL / SLR',
    'value': 'p09',
    'subMenu': false
  },
  {
    'name': 'Reval, Accrual & Amortization',
    'value': 'p10',
    'subMenu': false
  },
  {
    'name': 'PKR RV (PIB/T-Bill)',
    'value': 'p11',
    'subMenu': false
  },
  {
    'name': 'Accrual Treasury',
    'value': 'p12',
    'subMenu': false
  },
  {
    'name': 'Income / Cost',
    'value': 'p13',
    'subMenu': false
  },
  {
    'name': 'Daily Kibor & Libor',
    'value': 'p14',
    'subMenu': false
  },
  // {
  //   'name': 'Daily Libor',
  //   'value': 'p15',
  //   'subMenu': false
  // },
  {
    'name': 'Maturity Profile',
    'value': 'p16',
    'subMenu': false
  },
  {
    'name': 'Cash Flow',
    'value': 'p17',
    'subMenu': false
  },
  {
    'name': 'GAP Chart',
    'value': 'p18',
    'subMenu': false
  },
  {
    'name': 'Resources view',
    'value': null,
    'subMenu': true,
    'pages': [
      {
        'name': 'Nostro A/C',
        'value': 'p19',
        'subMenu': false
      },
      {
        'name': 'Branches',
        'value': 'p20',
        'subMenu': false
      },
      {
        'name': 'Counter Party',
        'value': 'p21',
        'subMenu': false
      },
      {
        'name': 'Broker',
        'value': 'p22',
        'subMenu': false
      }
    ]
  },
]

function MoneyMarket({ user, module, normalize, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [refresh, setRefresh] = useState(false)

  const onRefreshClicked = () => {
    if (refresh) {
      setRefresh(false)
    }
    else {
      setRefresh(true)
    }
  }

  const getDate = () => {
    var date = new Date();
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  const [date, setDate] = useState(getDate)

  const [page, setPage] = useState({name:'Dash Board', value:'p04', enabled:false, description:''})

  const [subPage, setSubPage] = useState({ name: '', value: '', enabled: false, description: '' })

  const [isNewEntry, setIsNewEntry] = useState(false)

  const [updateObject, setUpdateObject] = useState(null)

  const onUpdateHandler = (obj) => {
    setUpdateObject(obj)
    setIsNewEntry(true)
  }

  const onNewEntryClicked = () => {
    if (isNewEntry) {
      setIsNewEntry(false)
      setUpdateObject(null)
    }
    else {
      setIsNewEntry(true)
    }
  }

  const onModuleSideMenuClicked = (name, value) => {
    setPage({ name: name, value: value, enabled: false, description: '' })
  }

  const onSubModuleSideMenuClicked = (name, value) => {
    setSubPage({ name: name, value: value, enabled: false, description: '' })
  }

  const onSubModuleSideMenuClear = (name, value) => {
    setSubPage({ name: '', value: '', enabled: false, description: '' })
  }
  
  return (
    <div onClick={() => normalize}>
      {isloading && <Loader margin={'45%'} />}
      <SideBarMenu module={module} pages={pages} onModuleSideMenuClicked={onModuleSideMenuClicked} onSubModuleSideMenuClicked={onSubModuleSideMenuClicked} />
      <Header page={page} onNewEntryClicked={onNewEntryClicked} onRefreshClicked={onRefreshClicked} />
      <div className='Tmu'>
        
        {page.value === 'p01' && <ALM_PKR_Blotter user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p02' && <ALM_USD_Blotter user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p03' && <DealTicket user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p04' && <Dashboard user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p05' && <NostroManagement user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {/* {page.value === 'p06' && <BranchPosition user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />} */}
        {page.value === 'p07' && <Interbank user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p08' && <Holdings user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p09' && <DTL_SLR user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p10' && <RevalAccrualAmortization user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p11' && <PkrRv user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p12' && <AccrualTreasury user={user} refresh={refresh} date={getDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p13' && <IncomeCost user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p14' && <DailyKiborLibor user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {/* {page.value === 'p14' && <DailyKibor user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />} */}
        {/* {page.value === 'p15' && <DailyLibor user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />} */}
        {page.value === 'p16' && <MaturityProfile user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p17' && <CashFlow user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p18' && <GapChart user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}

        {subPage.value === 'p19' && <NostroAccount user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
        {subPage.value === 'p20' && <Branches user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
        {subPage.value === 'p21' && <CounterParty user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
        {subPage.value === 'p22' && <Broker user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
      
      </div>
    </div>
  )
}

export default MoneyMarket