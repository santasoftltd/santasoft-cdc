import { formatter } from '../../../../santasoft/components/Formatter';
import React from 'react'

function InfoBarFive({ userInput, setUserInput, submitHandler }) {

  return (
    <div className='table-container'>
      <div className='table-container-summary' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop:'2%' }}>
        <div>
          <p className='table-container-summary-item1'><input type="text" style={{ border: 'none', outline: 'none', color: 'black', fontSize:'x-small', width:'10px' }} value={userInput["dtl_per"]} onChange={e => setUserInput({...userInput, 'dtl_per': e.target.value})} onBlur={() => submitHandler()}/> % of DTL:</p>
          <p className='table-container-summary-item2'>{formatter(userInput.dtl * (userInput.dtl_per/100))}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>SLR access/short:</p>
          <p className='table-container-summary-item2'>{2}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoBarFive