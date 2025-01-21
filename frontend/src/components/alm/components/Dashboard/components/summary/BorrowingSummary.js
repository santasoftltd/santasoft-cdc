import { formatter } from '../../../../../santasoft/components/Formatter'

import React from 'react'
import '../../Dashboard.css'

function BorrowingSummary({ user, refresh, date, addMessageHandler }) {
  return (
    <div className='summary'>
      <label className='summary-heading' style={{color:'black'}}>Borrowings:</label>
      <div>
        <label>Repo:</label>
        <input type="text" style={{ 'width':'40%' }} value={formatter(0)} />
      </div>
      <div>
        <label>CALL:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label>COI:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label>Long Term Loan:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label>LOP:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label>Islamic Funding:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label style={{'fontWeight': 'bold'}}>Net Borrowing:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
    </div>
  )
}

export default BorrowingSummary