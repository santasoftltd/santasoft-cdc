import Loader from '../santasoft/components/loader/Loader'
import Header from './components/Header'
import SideBarMenu from '../santasoft/components/SideBarMenu'

import Dashboard from './components/dashboard/Dashboard'
import InterbankRates from './components/interbank-rates/InterbankRates'
import SalesSheet from './components/sales-sheet/SalesSheet'
import CashFlow from './components/cash-flow/CashFlow'
import SwapPoints from './components/swap-points/SwapPoints'
import SbpRates from './components/sbp-rates/SbpRates'
import MtmReval from './components/mtm-reval/MtmReval'
import IncomeDetail from './components/income-detail/IncomeDetail'
import DailyIncome from './components/daily-income/DailyIncome'
import IncomeFormatOne from './components/income-format-one/IncomeFormatOne'
import IncomeFormatTwo from './components/income-format-two/IncomeFormatTwo'

import Holiday from './components/holiday/Holiday'

import NewEntry from './components/new-entry/NewEntry'

import React from 'react'
import { useState, useEffect } from 'react'

import './Interbank.css'

import { ip } from '../../App'

const pages = [
  {
    'name': 'Dashboard',
    'value': 'p01',
    'subMenu': false
  },
  {
    'name': 'Interbank rates',
    'value': 'p02',
    'subMenu': false
  },
  {
    'name': 'TMU sheet',
    'value': 'p03',
    'subMenu': false
  },
  {
    'name': 'Swap points',
    'value': 'p05',
    'subMenu': false
  },
  {
    'name': 'SBP revaluation rates',
    'value': 'p06',
    'subMenu': false
  },
  {
    'name': 'Cash flow',
    'value': 'p04',
    'subMenu': false
  },
  {
    'name': 'MTM reval',
    'value': 'p07',
    'subMenu': false
  },
  {
    'name': 'Income detail',
    'value': 'p08',
    'subMenu': false
  },
  {
    'name': 'Daily income',
    'value': 'p09',
    'subMenu': false
  },
  {
    'name': 'Resources view ->',
    'value': null,
    'subMenu': true,
    'pages': [
      {
        'name': 'Holidays',
        'value': 'p12',
        'subMenu': false
      },
    ]
  },
  {
    'name': 'Income format-1',
    'value': 'p10',
    'subMenu': false
  },
  {
    'name': 'Income format-2',
    'value': 'p11',
    'subMenu': false
  },
]

function Interbank({ user, module, normalize, addMessageHandler }) {

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

  const [page, setPage] = useState({ name: 'Dashboard', value: 'p01', enabled: false, description: '' })

  const [subPage, setSubPage] = useState({ name: '', value: '', enabled: false, description: '' })

  const [isNewEntry, setIsNewEntry] = useState(false)

  const onUpdateHandler = (obj) => {
    setUpdateObject(obj)
    setIsNewEntry(true)
  }

  const [updateObject, setUpdateObject] = useState(null)

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

  const getDate = () => {
    var date = new Date();
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  const [date, setDate] = useState(getDate)

  const [dataSummary, setDataSummary] = useState({
    "id": 0,
    "total_amount": 0,
    "rate": 0,
    "total_equiv_amount": 0,
    "total_equiv_usd": 0,
    "total_equiv_pkr": 0,
    "total_gain_loss": 0,
  })

  const [fetchedData, setFetchedData] = useState([
    {
      "id": null,
      "deal_type": null,
      "deal_date": null,
      "value_date": null,
      "dealer_desk": null,
      "counter_party": null,
      "buy_sell": null,
      "ccy_1": null,
      "ccy_2": null,
      "amount": null,
      "rate": null,
      "equiv_amount": null,
      "ib_rate": null,
      "deal_mode": null,
      "posted": null,
      "brokerage": null,
      "usd_rate": null,
      "equiv_usd": null,
      "equiv_pkr": null,
      "dtm": null,
      "reval_rate": null,
      "gain_loss": null,
    }
  ])

  const transaction = {
    "dataSummary": dataSummary,
    "setDataSummary": setDataSummary,
    "fetchedData": fetchedData,
    "setFetchedData": setFetchedData
  }

  const [currencyList, setCurrencyList] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/lQF!OFzqLV!1BwK6!BmAyJDvlJCQCcgd41cR!*u3sNMmeOURd7/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setCurrencyList(result.currencyList);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Currencies list failed to load due to unauthorized request.',
            type: 4
          })
        }

        else if (response.status === 500) {
          addMessageHandler({
            title: 'Unable to load',
            content: result.message,
            type: 4
          })
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const [dealerDeskList, setDealerDeskList] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe05/OTlG1EIl2OlwJc*hahJWp95vMtNEoM0o@qU8t1QFnVmzR5a1*G/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setDealerDeskList(result.data);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Currencies list failed to load due to unauthorized request.',
            type: 4
          })
        }

        else if (response.status === 500) {
          addMessageHandler({
            title: 'Unable to load',
            content: result.message,
            type: 4
          })
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const [counterPartyList, setCounterPartyList] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe05/6VVz@YdMFQftv1sMB3nYoYal*Owe0ot2n1J9p2CIeFjwtQ8TW2/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setCounterPartyList(result.data);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Currencies list failed to load due to unauthorized request.',
            type: 4
          })
        }

        else if (response.status === 500) {
          addMessageHandler({
            title: 'Unable to load',
            content: result.message,
            type: 4
          })
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const [dealModeList, setDealModeList] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe05/uf8E1SEP&WY0J*mxbdDg8nSAlA1!vvnPXGw&&r50FM$GIWFvjD/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setDealModeList(result.data);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Currencies list failed to load due to unauthorized request.',
            type: 4
          })
        }

        else if (response.status === 500) {
          addMessageHandler({
            title: 'Unable to load',
            content: result.message,
            type: 4
          })
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const dropdownLists = {
    "currency": currencyList,
    "dealerDeskList": dealerDeskList,
    "counterPartyList": counterPartyList,
    "dealModeList": dealModeList,
  }

  return (
    <div onClick={() => normalize}>
      {isloading && <Loader margin={'45%'} />}
      <SideBarMenu module={module} pages={pages} onModuleSideMenuClicked={onModuleSideMenuClicked} onSubModuleSideMenuClicked={onSubModuleSideMenuClicked} />
      <Header page={page} onNewEntryClicked={onNewEntryClicked} onRefreshClicked={onRefreshClicked} />
      <div className='Tmu'>
        {page.value === 'p01' && <Dashboard user={user} refresh={refresh} date={date} setDate={setDate} dropdownLists={dropdownLists} dataSummary={dataSummary} setDataSummary={setDataSummary} fetchedData={fetchedData} setFetchedData={setFetchedData} onUpdateHandler={onUpdateHandler} addMessageHandler={addMessageHandler} />}
        {page.value === 'p02' && <InterbankRates user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p03' && <SalesSheet user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p04' && <CashFlow user={user} refresh={refresh} date={date} setDate={setDate} dropdownLists={dropdownLists} addMessageHandler={addMessageHandler} />}
        {page.value === 'p05' && <SwapPoints user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p06' && <SbpRates user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p07' && <MtmReval user={user} refresh={refresh} date={date} setDate={setDate} dropdownLists={dropdownLists} addMessageHandler={addMessageHandler} />}
        {page.value === 'p08' && <IncomeDetail refresh={refresh} user={user} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p09' && <DailyIncome user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p10' && <IncomeFormatOne user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p11' && <IncomeFormatTwo user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}

        {subPage.value === 'p12' && <Holiday user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear}/>}
      </div>
      {isNewEntry && <NewEntry user={user} updateObject={updateObject} setUpdateObject={setUpdateObject} onNewEntryClicked={onNewEntryClicked} date={date} dropdownLists={dropdownLists} rates={null} transaction={transaction} addMessageHandler={addMessageHandler} />}
    </div>
  )
}

export default Interbank