import { formatter } from '../../../../../santasoft/components/Formatter'

import React from 'react'
import '../../Dashboard.css'

function SharesInvestmentSummary({ user, refresh, date, addMessageHandler }) {
  return (
    <div className='summary'>
      <label className='summary-heading' style={{color:'black'}}>Shares/CFS Investments:</label>
      <div>
        <label>Shares Portfolio:</label>
        <input type="text" style={{ 'width':'40%' }} value={formatter(0)} />
      </div>
      <div>
        <label>CFVs Investment:</label>
        <input type="text" style={{ 'width':'40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label style={{'fontWeight': 'bold'}}>Total:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
    </div>
  )
}

export default SharesInvestmentSummary