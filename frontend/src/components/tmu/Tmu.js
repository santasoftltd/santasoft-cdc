import SideBarMenu from '../santasoft/components/SideBarMenu'
import Header from './components/Header'
import Dashboard from './components/dashboard/Dashboard'
import ForwardDeals from './components/forward-deals/ForwardDeals'
import SalamDeals from './components/salam-deals/SalamDeals'
import ForwardUtilized from './components/forward-deals/ForwardUtilized'
import SalamSheet from './components/salam-deals/SalamSheet'
import InterbankRates from './components/interbank_rates/InterbankRates'
import MIS from './components/mis/MIS'
import NewEntry from './components/new-entry/NewEntry'
import YoursMineCompoent from './components/yours-mine/YoursMine'
import DealEntry from './components/deal-entry/DealEntry'
import CustomerSpread from './components/customer_spread/CustomerSpread'
import ForwardDealsAll from './components/forward_deals_all/FowardDealsAll'

import Customers from './components/customers/Customers'
import Branches from './components/branches/Branches'
import Products from './components/products/Products'
import Currencies from './components/currencies/Currencies'
import Holiday from './components/holiday/Holiday'

import SbpRates from './components/sbp-rates/SbpRates'
import SwapPoints from './components/swap-points/SwapPoints'

import './Tmu.css'
import './SideBarMenu.css'

import Loader from '../santasoft/components/loader/Loader'
import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../App'

const pages = [
  {
    'name': 'Dashboard',
    'value': 'p01',
    'subMenu': false
  },
  {
    'name': 'Deal entry',
    'value': 'p13',
    'subMenu': false
  },
  {
    'name': 'Interbank rates',
    'value': 'p06',
    'subMenu': false
  },
  {
    'name': 'SBP revaluation rates',
    'value': 'p15',
    'subMenu': false
  },
  {
    'name': 'Swap points',
    'value': 'p16',
    'subMenu': false
  },
  {
    'name': 'Yours Mine',
    'value': 'p12',
    'subMenu': false
  },
  {
    'name': 'Forward deals',
    'value': 'p02',
    'subMenu': false
  },
  {
    'name': 'Salam deals',
    'value': 'p03',
    'subMenu': false
  },
  {
    'name': 'Forward utilized',
    'value': 'p04',
    'subMenu': false
  },
  {
    'name': 'Salam sheet',
    'value': 'p05',
    'subMenu': false
  },
  {
    'name': 'Resources view ->',
    'value': null,
    'subMenu': true,
    'pages': [
      {
        'name': 'Customers',
        'value': 'p08',
        'subMenu': false
      },
      {
        'name': 'Branches',
        'value': 'p09',
        'subMenu': false
      },
      {
        'name': 'Products',
        'value': 'p10',
        'subMenu': false
      },
      {
        'name': 'Currencies',
        'value': 'p11',
        'subMenu': false
      },
      {
        'name': 'Holidays',
        'value': 'p18',
        'subMenu': false
      },
    ]
  },
  {
    'name': 'Customer spread',
    'value': 'p14',
    'subMenu': false
  },
  {
    'name': 'Forward Deals - Period wise',
    'value': 'p17',
    'subMenu': false
  },
  {
    'name': 'MIS',
    'value': 'p07',
    'subMenu': false
  },
]

function Tmu({ user, module, normalize, addMessageHandler }) {

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

  const [isInterbankRates, setIsInterbankRates] = useState(false)
  
  const [isYoursMine, setIsYoursMine] = useState(false)

  const [isSbpRates, setIsSbpRates] = useState(false)

  const [isSwapPoints, setIsSwapPoints] = useState(false)

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

  const onInterbankRatesClicked = () => {
    if (isInterbankRates) {
      setIsInterbankRates(false)
    }
    else {
      setIsInterbankRates(true)
    }
  }

  const onYoursMineClicked = () => {
    if (isYoursMine) {
      setIsYoursMine(false)
    }
    else {
      setIsYoursMine(true)
    }
  }

  const onSbpRatesClicked = () => {
    if (isSbpRates) {
      setIsSbpRates(false)
    }
    else {
      setIsSbpRates(true)
    }
  }

  const onSwapPointsClicked = () => {
    if (isSwapPoints) {
      setIsSwapPoints(false)
    }
    else {
      setIsSwapPoints(true)
    }
  }

  const onModuleSideMenuClicked = (name, value) => {
    if (value === 'p06') {
      onInterbankRatesClicked()
    }
    else if (value === 'p15')
    {
      onSbpRatesClicked()
    }
    else if (value === 'p16')
    {
      onSwapPointsClicked()
    }
    else if (value === 'p12')
    {
      onYoursMineClicked()
    }
    else {
      setPage({ name: name, value: value, enabled: false, description: '' })
    }
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
    "totalExport": 0,
    "totalImport": 0,
    "totalProfit": 0,
    "totalAtRiskIncomeFwd": 0,
    "totalAtRiskIncomeSalam": 0,
    "totalTakeUpLoss": 0,
    "totalPkr": 0,
    "totalUsd": 0,
    "count": 0
  })

  const [fetchedData, setFetchedData] = useState([
    {
      "id": null,
      "dealer_name": null,
      "branch_code": null,
      "c_name": null,
      "cif": null,
      "cltype": null,
      "recv": null,
      "product": null,
      "calc": null,
      "days": null,
      "vdate": null,
      "days2": null,
      "vdate2": null,
      "ccy": null,
      "n_c": null,
      "export": null,
      "importt": null,
      "deal_rate": null,
      "i_b_rate": null,
      "third_ccy_cross": null,
      "i_b_premium": null,
      "option_premium": null,
      "third_ccy_premium": null,
      "branch": null,
      "spread": null,
      "profit": null,
      "nostro_ac": null,
      "ttdate": null,
      "timestamp": null,
      "at_risk_income_fwd": null,
      "at_risk_income_salam": null,
      "take_up_loss": null,
      "pkr": null,
      "usd": null,
      "salam_yield": null,
      "fbp_profit": null,
      "salam_cost": null,
      "fbp_loss": null,
      // eslint-disable-next-line
      "take_up_loss": null,
      "take_close": null,
      "c_rem": null
    }
  ])

  const transaction = {
    "dataSummary": dataSummary,
    "setDataSummary": setDataSummary,
    "fetchedData": fetchedData,
    "setFetchedData": setFetchedData
  }

  const [rates, setRates] = useState({
    "id": 0,
    "salamSalesPreviousLowest": 0,
    "salamSalesPreviousHighest": 0,
    "salamSalesTodaysLowest": 0,
    "salamSalesTodaysHighest": 0,
    "salamInterbankPreviousLowest": 0,
    "salamInterbankPreviousHighest": 0,
    "salamInterbankTodaysLowest": 0,
    "salamInterbankTodaysHighest": 0,
    "libor": 0,
    "kibor": 0
  })

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/M3ZWwpVJ0geqoE0mxOkkfKjZxdB1ZQJRe5uWlin7FrqjQz122c/' + date + '/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setRates(result.transactionRates[0]);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Transaction rates grid failed to load due to unauthorized request.',
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
  }, [refresh, fetchedData, date]);

  const [customerList, setCustomerList] = useState([])

  const [branchCode, setBranchCode] = useState(0)

  const onBranchCodeEntered = (code) => {
    setBranchCode(code)
  }

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/zgTSr4hZXf8y!NwifPJOyvpuA@VL0@OrgP*lx6VIzVN1QYIzHT/' + branchCode + '/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setCustomerList(result.customerList);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Customers list failed to load due to unauthorized request.',
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
  }, [refresh, branchCode]);

  const [productList, setProductList] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/QzIZad8Qgzhmw6Np!mamitm$LZw0SvZ@7F!0JIrkUJ6zrf1Jm3/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setProductList(result.productList);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Products list failed to load due to unauthorized request.',
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

  // useEffect(() => {
  //   async function fetchAPI() {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(ip + '/sfe01/p0WGWX&O$LZzk5uynjw&Bpb2qeYxu@VGX7ij8eft7X*wRJLtU1/', {
  //         method: 'Get',
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8',
  //           'Authorization': 'Token ' + user.token + ''
  //         },
  //       });
  //       setIsLoading(false);

  //       let result = await response.json();

  //       if (response.status === 200) {
  //         setBranchList(result.branchList);
  //       }

  //       else if (response.status === 401) {
  //         addMessageHandler({
  //           title: 'Unable to load',
  //           content: 'Branch list failed to load due to unauthorized request.',
  //           type: 4
  //         })
  //       }

  //       else if (response.status === 500) {
  //         addMessageHandler({
  //           title: 'Unable to load',
  //           content: result.message,
  //           type: 4
  //         })
  //       }
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchAPI()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [refresh]);

  const [nostroList, setNostroList] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/iP1NNRfSQQXsh*jWMr4&n!Zv!ty1KoUvctlYBb88WnNYsImdjq/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setNostroList(result.nostroList);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Nostro a/c list failed to load due to unauthorized request.',
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
    "onBranchCodeEntered": onBranchCodeEntered,
    "customer": customerList,
    "product": productList,
    "currency": currencyList,
    "nostro": nostroList
  }

  const [dealer, setDealer] = useState(user.name)

  return (
    <div onClick={() => normalize}>
      {isloading && <Loader margin={'45%'} />}
      <SideBarMenu module={module} pages={pages} onModuleSideMenuClicked={onModuleSideMenuClicked} onSubModuleSideMenuClicked={onSubModuleSideMenuClicked} />
      <Header page={page} onNewEntryClicked={onNewEntryClicked} onRefreshClicked={onRefreshClicked} />
      <div className='Tmu'>
        {page.value === 'p01' && <Dashboard user={user} refresh={refresh} dealer={dealer} setDealer={setDealer} date={date} setDate={setDate} dropdownLists={dropdownLists} rates={rates}  setRates={setRates} transaction={transaction} onUpdateHandler={onUpdateHandler} addMessageHandler={addMessageHandler} />}
        {page.value === 'p13' && <DealEntry user={user} refresh={refresh} date={date} setDate={setDate} rates={rates}  setRates={setRates} dropdownLists={dropdownLists} addMessageHandler={addMessageHandler} />}
        {page.value === 'p02' && <ForwardDeals user={user} refresh={refresh} date={date} setDate={setDate} dropdownLists={dropdownLists} addMessageHandler={addMessageHandler} />}
        {page.value === 'p03' && <SalamDeals user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p04' && <ForwardUtilized user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p05' && <SalamSheet user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler}/>}
        {page.value === 'p14' && <CustomerSpread user={user} refresh={refresh} date={date} setDate={setDate} addMessageHandler={addMessageHandler}/>}
        {page.value === 'p07' && <MIS user={user} refresh={refresh} date={getDate} addMessageHandler={addMessageHandler} />}
        {page.value === 'p17' && <ForwardDealsAll user={user} refresh={refresh} currentDate={getDate} date={date} dropdownLists={dropdownLists} addMessageHandler={addMessageHandler} />}

        {subPage.value === 'p08' && <Customers user={user} refresh={refresh} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
        {subPage.value === 'p09' && <Branches user={user} refresh={refresh} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
        {subPage.value === 'p10' && <Products user={user} refresh={refresh} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
        {subPage.value === 'p11' && <Currencies user={user} refresh={refresh} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
        {subPage.value === 'p18' && <Holiday user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear}/>}
      </div>
      {isInterbankRates && <InterbankRates user={user} refresh={refresh} onInterbankRatesClicked={onInterbankRatesClicked} addMessageHandler={addMessageHandler} />}
      {isSbpRates && <SbpRates user={user} refresh={refresh} date={date} onSbpRatesClicked={onSbpRatesClicked} addMessageHandler={addMessageHandler} />}
      {isSwapPoints && <SwapPoints user={user} refresh={refresh} date={date} onSwapPointsClicked={onSwapPointsClicked} addMessageHandler={addMessageHandler} />}
      {isYoursMine && <YoursMineCompoent user={user} refresh={refresh} date={date} dropdownLists={dropdownLists} onYoursMineClicked={onYoursMineClicked} addMessageHandler={addMessageHandler} />}
      {isNewEntry && <NewEntry user={user} dealer={dealer} updateObject={updateObject} setUpdateObject={setUpdateObject} onNewEntryClicked={onNewEntryClicked} date={date} dropdownLists={dropdownLists} rates={rates} transaction={transaction} addMessageHandler={addMessageHandler} />}
    </div>
  )
}

export default Tmu