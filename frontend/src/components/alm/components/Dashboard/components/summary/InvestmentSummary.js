import { formatter } from '../../../../../santasoft/components/Formatter'

import React from 'react'
import '../../Dashboard.css'

function InvestmentSummary({ user, refresh, date, addMessageHandler }) {
  return (
    <div className='summary'>
      <label className='summary-heading' style={{color:'black'}}>Investments:</label>
      <div>
        <label>T-Bills:</label>
        <input type="text" style={{ 'width':'40%' }} value={formatter(0)} />
      </div>
      <div>
        <label>PIBs:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label>TFCs:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label>Sukuk:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label>Comm. Paper:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label>Funds:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label>NIT:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label style={{'fontWeight': 'bold'}}>Net Investement:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
    </div>

  )
}

export default InvestmentSummary