import React from 'react'
import { numberWithCommas } from '../../../../santasoft/components/Formatter'

function SalamInput({userInput, onInput, columns, submitHandler}) {
  return (
    <tr className='transaction-input' style={{ backgroundColor: 'white' }}>
      <td style={{ borderLeft: 'none' }}></td>
      {columns[0].display && <td>{userInput.ttdate}</td>}
      {columns[1].display && <td><input type="text" name="take_up_amount" id="id_take_up_amount" onChange={e => onInput('take_up_amount', e.target.value)} value={numberWithCommas(userInput.take_up_amount)} /></td>}
      {columns[2].display && <td><input type="text" name="od_amount" id="id_od_amount" onChange={e => onInput('od_amount', e.target.value)} value={numberWithCommas(userInput.od_amount)} /></td>}
      {columns[3].display && <td><input type="text" name="cancel_amount" id="id_cancel_amount" onChange={e => onInput('cancel_amount', e.target.value)} value={numberWithCommas(userInput.cancel_amount)} /></td>}
      {columns[4].display && <td><input type="text" name="c_rate" id="id_c_rate" onChange={e => onInput('c_rate', e.target.value)} value={userInput.c_rate} /></td>}
      {columns[5].display && <td><input type="text" name="lT2" id="id_lT2" onChange={e => onInput('lT2', e.target.value)} value={userInput.lT2} /></td>}
      {columns[6].display && <td><input type="text" name="lT3" id="id_lT3" onChange={e => onInput('lT3', e.target.value)} value={userInput.lT3} /></td>}
      {columns[7].display && <td>{userInput.nostro}</td>}
      {columns[8].display &&
        <td>
          <select name="product" id="id_product" onChange={e => onInput('c_rem_2', e.target.value)} value={userInput.c_rem_2} onBlur={() => submitHandler()}>
            <option value=''></option>
            <option value='Full Take_up'>Full Take_up</option>
            <option value='Partial Take_up'>Partial Take_up</option>
            <option value='Take_up'>Take_up</option>
            <option value='Over Due'>Over Due</option>
            <option value='Close Out'>Close Out</option>
            <option value='Matured'>Matured</option>
          </select>
        </td>
      }
      {columns[9].display && <td>{userInput.validate}</td>}
    </tr>
  )
}

export default SalamInput