import { formatter, numberWithCommas } from '../../../../santasoft/components/Formatter';
import React from 'react'

function InfoBarTwo({ userInput, setUserInput, submitHandler }) {

  return (
    <div className='table-container'>
      <div className='table-container-summary' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '2%' }}>
        <div>
          <p className='table-container-summary-item1'>DTL:</p>
          <p className='table-container-summary-item2'><input type="text" style={{ border: 'none', outline: 'none', color: '#1c4966', width:'50px' }} value={numberWithCommas(userInput["dtl"])} onChange={e => setUserInput({...userInput, 'dtl': e.target.value})} onBlur={() => submitHandler()}/></p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Avg CRR %: <input type="text" style={{ border: 'none', outline: 'none', color: 'black', fontSize:'x-small', width:'10px' }} value={userInput["avg_crr"]} onChange={e => setUserInput({...userInput, 'avg_crr': e.target.value})} onBlur={() => submitHandler()}/></p>
          <p className='table-container-summary-item2'>{formatter(userInput.dtl * (userInput.avg_crr/100))}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Lower CRR %: <input type="text" style={{ border: 'none', outline: 'none', color: 'black', fontSize:'x-small', width:'10px' }} value={userInput["lower_crr"]} onChange={e => setUserInput({...userInput, 'lower_crr': e.target.value})} onBlur={() => submitHandler()}/></p>
          <p className='table-container-summary-item2'>{formatter(userInput.dtl * (userInput.lower_crr/100))}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>Balance:</p>
          <p className='table-container-summary-item2'>{formatter(userInput.balance)}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoBarTwo