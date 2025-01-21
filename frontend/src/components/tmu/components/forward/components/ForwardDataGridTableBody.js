import React from 'react'
import {formatter, dateFormatter} from '../../../../../Formatter'
import { numberWithCommas } from '../../../../santasoft/components/Formatter'

function ForwardDataGridTableBody({columns, object, editHandler, onRowSelect, edit, onDoubleClickedCell, onUpdate}) {

    return (
    <tr key={object["id"]}>
        <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{cursor:'pointer'}}/></td>
        {columns[0].display && <td>{ dateFormatter(object.ttdate) }</td>}
        {columns[1].display &&
            <td onDoubleClick={() => onDoubleClickedCell(columns[1].accessor,object)}>{( edit.column === columns[1].accessor && edit.object.id === object["id"]) ?
                <select name="c_rem_4" id="id_c_rem_4" className='update-input' style={{border:'1px solid #1c4966', width:'90%'}} onChange={e => editHandler({...edit.object, c_rem_4:e.target.value})} value={edit.object.c_rem_4} onBlur={() => onUpdate()}>
                    <option value=''></option>
                    <option value='Full Take_up'>Full Take-up</option>
                    <option value='Partial Take_up'>Partial Take-up</option>
                    <option value='Close Out'>Close out</option>
                    <option value='Discount'>Discount</option>
                </select>
                : object.c_rem_4 }
            </td>
        }
        {columns[2].display && <td onDoubleClick={() => onDoubleClickedCell(columns[2].accessor,object)}>{( edit.column === columns[2].accessor && edit.object.id === object["id"]) ? <input type="text" name="take_up_amount" id="id_take_up_amount" className='update-input' style={{border:'1px solid #1c4966', width:'90%'}} onChange={e => editHandler({...edit.object, take_up_amount:e.target.value})} value={numberWithCommas(edit.object.take_up_amount)} onBlur={() => onUpdate()}/> : formatter(object.take_up_amount) }</td>}
        {columns[3].display && <td>{object.nostro}</td>}
        {columns[4].display && <td onDoubleClick={() => onDoubleClickedCell(columns[4].accessor,object)}>{( edit.column === columns[4].accessor && edit.object.id === object["id"]) ? <input type="text" name="cancel_amount" id="id_cancel_amount" className='update-input' style={{border:'1px solid #1c4966', width:'90%'}} onChange={e => editHandler({...edit.object, cancel_amount:e.target.value})} value={numberWithCommas(edit.object.cancel_amount)} onBlur={() => onUpdate()}/> : formatter(object.cancel_amount) }</td>}
        {columns[5].display && <td onDoubleClick={() => onDoubleClickedCell(columns[5].accessor,object)}>{( edit.column === columns[5].accessor && edit.object.id === object["id"]) ? <input type="text" name="c_rate" id="id_c_rate" className='update-input' style={{border:'1px solid #1c4966', width:'90%'}} onChange={e => editHandler({...edit.object, c_rate:e.target.value})} value={edit.object.c_rate} onBlur={() => onUpdate()}/> :  formatter(object.c_rate) }</td>}
        {columns[6].display &&
            <td onDoubleClick={() => onDoubleClickedCell(columns[6].accessor,object)}>{( edit.column === columns[6].accessor && edit.object.id === object["id"]) ?
                <select name="c_rem_3" id="id_c_rem_3" className='update-input' style={{border:'1px solid #1c4966', width:'90%'}} onChange={e => editHandler({...edit.object, c_rem_3:e.target.value})} value={edit.object.c_rem_3} onBlur={() => onUpdate()}>
                    <option value=''></option>
                    <option value='export'>Export</option>
                    <option value='Import'>Import</option>
                </select>
                : object.c_rem_3 }
            </td>
        }
        {columns[7].display && <td>{object.take_up_date_days}</td>}
        {columns[8].display && <td>{formatter(object.lT1)}</td>}
        {columns[9].display && <td></td>}
        {columns[10].display && <td>{formatter(object.lT2)}</td>}
        {columns[11].display && <td>{formatter(object.lT3)}</td>}
        {columns[12].display && <td>{formatter(object.lT4)}</td>}
        {columns[13].display && <td>{formatter(object.lT5)}</td>}
        {columns[14].display && <td>{formatter(object.lT6)}</td>}
        {columns[15].display && <td>{formatter(object.lT7)}</td>}
        {columns[16].display && <td>{formatter(object.lT8)}</td>}
        {columns[17].display && <td>{object.validate}</td>}
        {columns[18].display && <td>{object.c_rem_2}</td>}
    </tr>
  )
}

export default ForwardDataGridTableBody