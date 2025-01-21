import { formatter } from '../../../../../santasoft/components/Formatter'

import React from 'react'
import '../../Dashboard.css'

function TreasuryBorrowingSummary({ user, refresh, date, addMessageHandler }) {
  return (
    <div className='summary'>
      <label className='summary-heading' style={{color:'black'}}>Treasury Borrowings:</label>
      <div>
        <label>Borrowing:</label>
        <input type="text" style={{ 'width':'40%' }} value={formatter(0)} />
      </div>
    </div>
  )
}

export default TreasuryBorrowingSummary