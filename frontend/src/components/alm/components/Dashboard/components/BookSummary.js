import downloadImgae from '../../../../santasoft/res/download.png'

import InvestmentSummary from './summary/InvestmentSummary'
import LendingSummary from './summary/LendingSummary'
import BankBalancesSummary from './summary/BankBalancesSummary'
import SharesInvestmentSummary from './summary/SharesInvestmentSummary'
import TreasuryLendingSummary from './summary/TreasuryLendingSummary'
import BorrowingSummary from './summary/BorrowingSummary'
import TreasuryBorrowingSummary from './summary/TreasuryBorrowingSummary'

import React from 'react'
import '../Dashboard.css'

function BookSummary({ user, refresh, date, addMessageHandler }) {
  return (
    <div className='table-container'>

      <div className='table-container-name'>
        <p style={{ display: 'inline' }}>Daily CRR</p>
        <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
      </div>

      <InvestmentSummary user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} />
      <LendingSummary user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} />
      <BankBalancesSummary user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} />
      <SharesInvestmentSummary user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} />
      <TreasuryLendingSummary user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} />
      <BorrowingSummary user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} />
      <TreasuryBorrowingSummary user={user} refresh={refresh} date={date} addMessageHandler={addMessageHandler} />

    </div>
  )
}

export default BookSummary