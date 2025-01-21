import React from 'react'
import { formatter } from '../../../../santasoft/components/Formatter'

function InfoBarThree({ userInput, setUserInput, submitHandler }) {
  
  return (
    <div className='table-container'>
      <div className='table-container-summary' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop:'2%' }}>
        <div>
          <p className='table-container-summary-item1'>CRR maintened:</p>
          <p className='table-container-summary-item2'>{formatter(userInput.dtl * (userInput.avg_crr/100))}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>CRR Required:</p>
          <p className='table-container-summary-item2'>{formatter(userInput.dtl * (userInput.avg_crr/100))}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Avg CRR %:</p>
          <p className='table-container-summary-item2'>{userInput.avg_crr}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoBarThree