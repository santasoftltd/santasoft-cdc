import { formatter } from '../../../../../santasoft/components/Formatter'

import React from 'react'
import '../../Dashboard.css'

function TreasuryLendingSummary({ user, refresh, date, addMessageHandler }) {
  return (
    <div className='summary'>
      <label className='summary-heading' style={{color:'black'}}>Treasury Lendings:</label>
      <div>
        <label>Lending:</label>
        <input type="text" style={{ 'width':'40%' }} value={formatter(0)} />
      </div>
    </div>
  )
}

export default TreasuryLendingSummary