import { formatter } from '../../../../../santasoft/components/Formatter'

import React from 'react'
import '../../Dashboard.css'

function LendingSummary({ user, refresh, date, addMessageHandler }) {
  return (
    <div className='summary'>
      <label className='summary-heading' style={{color:'black'}}>Lendings:</label>
      <div>
        <label>Rev-Repo:</label>
        <input type="text" style={{ 'width':'40%' }} value={formatter(0)} />
      </div>
      <div>
        <label>Clean Lending:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label style={{'fontWeight': 'bold'}}>Net Lending:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
    </div>
  )
}

export default LendingSummary