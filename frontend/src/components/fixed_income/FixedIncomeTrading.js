import Loader from '../santasoft/components/loader/Loader'
import Header from './components/Header'
import SideBarMenu from '../santasoft/components/SideBarMenu'

import Dashboard from './components/Dashboard/Dashboard'
import Transactions from './components/transactions/Transactions'
import Auction from './components/Auction/Auction'
import FMS from './components/fms/FMS'
import Blotter from './components/Blotter/Blotter'
import Securities from './components/Securities/Securities'
import IPS_Accounts from './components/IPS_Accounts/IPS_Accounts'

import AMC_SBP_Participant from './components/amc_sbp_participant/AMC_SBP_Participant'
import BeneficiaryBanks from './components/beneficiary_bank_short_name/BeneficiaryBanks'
import CashTransactionType from './components/cash_transaction_type/CashTransactionType'
import IpsAccountType from './components/ips_account_type/IpsAccountType'
import SecurityTransactionType from './components/security_transaction_type/SecurityTransactionType'
import SecurityType from './components/security_type/SecurityType'

import { useState, useEffect } from 'react'

import './FixedIncomeTrading.css'

const pages = [
    {
        'name': 'Dashboard',
        'value': 'p01',
        'subMenu': false
    },
    {
        'name': 'Transactions',
        'value': 'p13',
        'subMenu': false
    },
    {
        'name': 'Auction',
        'value': 'p02',
        'subMenu': false
    },
    {
        'name': 'FMS',
        'value': 'p12',
        'subMenu': false
    },
    {
        'name': 'Blotter',
        'value': 'p03',
        'subMenu': false
    },
    {
        'name': 'Securities',
        'value': 'p04',
        'subMenu': false
    },
    {
        'name': 'IPS Accounts',
        'value': 'p05',
        'subMenu': false
    },
    {
        'name': 'Reports',
        'value': null,
        'subMenu': true,
        'pages': [
            // {
            //     'name': 'Nostro A/C',
            //     'value': 'p19',
            //     'subMenu': false
            // },
        ]
    },
    {
        'name': 'Resources view',
        'value': null,
        'subMenu': true,
        'pages': [
            {
                'name': 'AMC & SBP Participant',
                'value': 'p06',
                'subMenu': false
            },
            {
                'name': 'Beneficiary Banks',
                'value': 'p07',
                'subMenu': false
            },
            {
                'name': 'Cash Transaction Type',
                'value': 'p08',
                'subMenu': false
            },
            {
                'name': 'IPS Account type',
                'value': 'p09',
                'subMenu': false
            },
            {
                'name': 'Security Transaction Type',
                'value': 'p10',
                'subMenu': false
            },
            {
                'name': 'Security Type',
                'value': 'p11',
                'subMenu': false
            },
        ]
    },
]

function FixedIncomeTrading({ user, module, setSubPageTitle, normalize, addMessageHandler }) {

    const getDate = () => {
        var date = new Date();
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    }

    const [date, setDate] = useState(getDate)

    const [page, setPage] = useState({ name: 'Dashboard', value: 'p01', enabled: false, description: '' })

    const [subPage, setSubPage] = useState({ name: '', value: '', enabled: false, description: '' })

    const onModuleSideMenuClicked = (name, value) => {
        setPage({ name: name, value: value, enabled: false, description: '' })
    }

    const onSubModuleSideMenuClicked = (name, value) => {
        setSubPage({ name: name, value: value, enabled: false, description: '' })
    }

    const onSubModuleSideMenuClear = (name, value) => {
        setSubPage({ name: '', value: '', enabled: false, description: '' })
    }

    useEffect(() => {
        setSubPageTitle(page.name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div onClick={() => normalize}>
            {/* {isloading && <Loader margin={'45%'} />} */}
            <SideBarMenu module={module} pages={pages} onModuleSideMenuClicked={onModuleSideMenuClicked} onSubModuleSideMenuClicked={onSubModuleSideMenuClicked} />
            <Header page={page} onNewEntryClicked={null} onRefreshClicked={null} />
            <div className='FixedIncomeTrading'>

                {page.value === 'p01' && <Dashboard user={user} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
                {page.value === 'p13' && <Transactions user={user} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
                {page.value === 'p02' && <Auction user={user} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
                {page.value === 'p03' && <Blotter user={user} date={date} setDate={setDate} addMessageHandler={addMessageHandler} />}
                {page.value === 'p04' && <Securities user={user} addMessageHandler={addMessageHandler} />}
                {page.value === 'p05' && <IPS_Accounts user={user} addMessageHandler={addMessageHandler} />}
                {page.value === 'p12' && <FMS user={user} addMessageHandler={addMessageHandler} />}

                {subPage.value === 'p06' && <AMC_SBP_Participant user={user} date={date} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
                {subPage.value === 'p07' && <BeneficiaryBanks user={user} date={date} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
                {subPage.value === 'p08' && <CashTransactionType user={user} date={date} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
                {subPage.value === 'p09' && <IpsAccountType user={user} date={date} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
                {subPage.value === 'p10' && <SecurityTransactionType user={user} date={date} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}
                {subPage.value === 'p11' && <SecurityType user={user} date={date} addMessageHandler={addMessageHandler} onSubModuleSideMenuClear={onSubModuleSideMenuClear} />}

            </div>
        </div>
    )
}

export default FixedIncomeTrading