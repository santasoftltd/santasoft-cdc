import DualDatePicker from '../../../santasoft/components/DualDatePicker'

import ApprovalDashboardSelector from '../../../santasoft/components/ApprovalDashboardSelector'
import TransactionSelector from './components/TransactionSelector'
import UploadTransactionsButton from './components/UploadTransactionsButton'

import SecurityGridForTrading from '../Securities/components/SecurityGridForTrading'
// import SecurityGrid from '../Securities/components/SecurityGrid'
// import SecurityTransactionForm from '../security_transaction/components/SecurityTransactionForm'
import SecurityTransactionGride from '../security_transaction/components/SecurityTransactionGride'
import SecurityTransactionForm from '../security_transaction/components/SecurityTransactionForm'
// import AuthorizedSecurityTransactionGride from '../security_transaction/components/AuthorizedSecurityTransactionGride'
import UploadSecurityTransactions from '../security_transaction/components/UploadSecurityTransactions'

import CashTransactionForm from '../cash_transaction/components/CashTransactionForm'
import CashTransactionGride from '../cash_transaction/components/CashTransactionGride'
import AuthorizedCashTransactionGride from '../cash_transaction/components/AuthorizedCashTransactionGride'
import UploadCashTransactions from '../cash_transaction/components/UploadCashTransactions'

import SecurityMaturities from '../Securities/components/SecurityMaturities'

import UploadSBPCharges from './components/UploadSBPCharges'

import { useState, useEffect } from 'react'

import './Transactions.css'

function Transactions({ user, date, setDate, addMessageHandler }) {

    const [isApprovalDashboard, setApprovalDashboard] = useState(false)

    const [securityType, setSecurityType] = useState('MTB')

    const [isSecurity, setIsSecurity] = useState('security')

    const [isSecurityTransactionUpload, setSecurityTransactionUpload] = useState(false)

    const [isCashTransactionUpload, setCashTransactionUpload] = useState(false)

    const [isSBPChargesUpload, setSBPChargesUpload] = useState(false)

    const [fromDate, setFromDate] = useState(date)

    const [toDate, setToDate] = useState(date)

    const [isSecurityFormClicked, setSecurityFormClicked] = useState(true)

    const [userInput, setUserInput] = useState(
        {
            "id": null,
            "transaction_id": "",
            "fms_transaction_id": "",
            "account_number": "",
            "account_prefix": "",
            "account_title": "",
            "account_manager": "",
            "transaction_type": "",
            "settlement_date": "",
            "counter_party": "",
            "face_value": "",
            "settlement_amount": "",
            "remarks": "",
            "security_code": "",
            "issue_date": "",
            "maturity_date": "",
            "security_type": "",
            "security_tenor": "",
            "instrument": "",
        }
    )

    return (
        <div className='home'>

            <DualDatePicker toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate} />

            <TransactionSelector isSecurity={isSecurity} setIsSecurity={setIsSecurity} />

            <UploadTransactionsButton name={'SBP Charges'} setUpload={setSBPChargesUpload} x={'710px'} />

            <ApprovalDashboardSelector isApprovalDashboard={isApprovalDashboard} setApprovalDashboard={setApprovalDashboard} marginLeft={'350px'} />

            {isSecurity === 'security' ?
                <div className='fixed-income-security-dashboard-sub-home'>

                    <UploadTransactionsButton name={'Security Transactions'} setUpload={setSecurityTransactionUpload} x={'520px'} />

                    {isSecurityTransactionUpload && <UploadSecurityTransactions user={user} setSecurityTransactionUpload={setSecurityTransactionUpload} addMessageHandler={addMessageHandler} />}

                    <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '2', gridColumnStart: '1', gridColumnEnd: '2' }}><SecurityGridForTrading user={user} securityType={securityType} setSecurityType={setSecurityType} setSecurityFormClicked={setSecurityFormClicked} addMessageHandler={addMessageHandler} /></div>

                    <div className='table-container' style={{ gridRowStart: '2', gridRowEnd: '3', gridColumnStart: '1', gridColumnEnd: '3' }}><SecurityTransactionGride user={user} fromDate={fromDate} toDate={toDate} addMessageHandler={addMessageHandler} /></div>

                    {isSecurityFormClicked && <SecurityTransactionForm user={user} userInput={userInput} setUserInput={setUserInput} setSecurityFormClicked={setSecurityFormClicked} addMessageHandler={addMessageHandler} />}

                </div>
                :
                <div className='fixed-income-cash-dashboard-sub-home'>

                    <UploadTransactionsButton name={'Cash Transactions'} setUpload={setCashTransactionUpload} x={'520px'} />

                    {isCashTransactionUpload && <UploadCashTransactions user={user} setCashTransactionUpload={setCashTransactionUpload} addMessageHandler={addMessageHandler} />}

                    <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '2', gridColumnStart: '1', gridColumnEnd: '2' }}><CashTransactionForm user={user} addMessageHandler={addMessageHandler} /></div>

                    <div className='table-container' style={{ gridRowStart: '1', gridRowEnd: '3', gridColumnStart: '2', gridColumnEnd: '3' }}><AuthorizedCashTransactionGride user={user} addMessageHandler={addMessageHandler} /></div>

                    <div className='table-container' style={{ gridRowStart: '3', gridRowEnd: '5', gridColumnStart: '1', gridColumnEnd: '3' }}><CashTransactionGride user={user} addMessageHandler={addMessageHandler} /></div>

                </div>
            }

            {isSBPChargesUpload && <UploadSBPCharges user={user} setSBPChargesUpload={setSBPChargesUpload} addMessageHandler={addMessageHandler} />}

        </div>
    )
}

export default Transactions