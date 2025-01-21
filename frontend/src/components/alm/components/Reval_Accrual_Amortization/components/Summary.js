import { formatter } from '../../../../santasoft/components/Formatter'

import React from 'react'
import '../RevalAccrualAmortization.css'

function Summary() {
  return (
    <div className='table-container alm-reval-accrual-amortization-sub-home-third-child'>

      <div className='table-container-name'>
        <p style={{ display: 'inline' }}>Summary</p>
        {/* <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img style={{ height: '12px', marginTop: '2px' }} onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='action-pics' src={downloadImgae} title="Download" alt="Download" /></div> */}
      </div>

      <div>
        <label>FCY Sukuk:</label>
        <input type="text" style={{ 'width':'40%' }} value={formatter(0)} />
      </div>
      <div>
        <label>PKR Sukuk:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label style={{'fontWeight': 'bold'}}>Holding: Face Value:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label style={{'fontWeight': 'bold'}}>Original Value:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label style={{'fontWeight': 'bold'}}>Current Value:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label style={{'fontWeight': 'bold'}}>Total Interest Accrued:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>
      <div>
        <label style={{'fontWeight': 'bold'}}>Current Yield of Portfolio:</label>
        <input type="text" style={{ 'width': '40%' }} value={formatter(121000000000)} />
      </div>

    </div>
  )
}

export default Summary