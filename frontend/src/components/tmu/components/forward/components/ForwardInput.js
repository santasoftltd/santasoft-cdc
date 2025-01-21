import React from 'react'
import { numberWithCommas } from '../../../../santasoft/components/Formatter'

function ForwardInput({userInput, onInput, columns, rootDeal, dropdownLists, submitHandler}) {
  return (
    <tr className='transaction-input' style={{backgroundColor:'white'}}>
        <td style={{borderLeft:'none'}}></td>
        {columns[0].display && <td>{userInput.ttdate}</td>}
        {columns[1].display &&<td>
                <select name="c_rem_4" id="id_c_rem_4" onChange={e => onInput('c_rem_4', e.target.value)} value={userInput.c_rem_4}>
                    <option value=''></option>
                    <option value='Full Take_up'>Full Take-up</option>
                    <option value='Partial Take_up'>Partial Take-up</option>
                    <option value='Close Out'>Close out</option>
                    <option value='Discount'>Discount</option>
                </select>
            </td>
        }
        {columns[2].display && <td><input type="text" name="take_up_amount" id="id_take_up_amount" onChange={e => onInput('take_up_amount', e.target.value)} value={numberWithCommas(userInput.take_up_amount)}/></td>}
        {columns[3].display && 
            <td>
                <select name="nostro_ac" id="id_nostro_ac" onChange={e => onInput('nostro_ac', e.target.value )}>
                    <option value=''></option>
                    {
                        dropdownLists.nostro.filter(obj => obj.ccy === rootDeal.ccy).map(item => <option key={item.nostro} value={item.nostro}>{item.nostro}</option>)
                    }
                </select>
            </td>
        }
        {columns[4].display && <td><input type="text" name="cancel_amount" id="id_cancel_amount" onChange={e => onInput('cancel_amount', e.target.value)} value={numberWithCommas(userInput.cancel_amount)}/></td>}
        {columns[5].display && <td><input type="text" name="c_rate" id="id_c_rate" onChange={e => onInput('c_rate', e.target.value)} value={userInput.c_rate}/></td>}
        {columns[6].display &&
            <td>
                <select name="c_rem_3" id="id_c_rem_3" onChange={e => onInput('c_rem_3', e.target.value)} value={userInput.c_rem_3} onBlur={() => submitHandler()}>
                    <option value=''></option>
                    <option value='export'>Export</option>
                    <option value='Import'>Import</option>
                </select>
            </td>
        }
        {columns[7].display && <td>{userInput.take_up_date_days}</td>}
        {columns[8].display && <td>{userInput.lT1}</td>}
        {columns[9].display && <td></td>}
        {columns[10].display && <td>{userInput.lT2}</td>}
        {columns[11].display && <td>{userInput.lT3}</td>}
        {columns[12].display && <td>{userInput.lT4}</td>}
        {columns[13].display && <td>{userInput.lT5}</td>}
        {columns[14].display && <td>{userInput.lT6}</td>}
        {columns[15].display && <td>{userInput.lT7}</td>}
        {columns[16].display && <td>{userInput.lT8}</td>}
        {columns[17].display && <td>{userInput.validate}</td>}
        {columns[18].display && <td>{userInput.c_rem_2}</td>}
    </tr>
  )
}

export default ForwardInput