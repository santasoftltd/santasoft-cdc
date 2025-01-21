import React from 'react'
import {formatter, dateFormatter} from '../../../../../Formatter'
import { numberWithCommas } from '../../../../santasoft/components/Formatter'

function SalamDataGridTableBody({columns, object, editHandler, onRowSelect, edit, onDoubleClickedCell, onUpdate}) {

  return (
    <tr key={object["id"]}>
      <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{cursor:'pointer'}}/></td>
      {columns[0].display && <td>{dateFormatter(object.ttdate)}</td>}
      {columns[1].display && <td onDoubleClick={() => onDoubleClickedCell(columns[1].accessor,object)}>{( edit.column === columns[1].accessor && edit.object.id === object["id"]) ? <input type="text" name="take_up_amount" id="id_take_up_amount" className='update-input' style={{border:'1px solid #1c4966', width:'90%'}} onChange={e => editHandler({...edit.object, take_up_amount:e.target.value})} value={numberWithCommas(edit.object.take_up_amount)} onBlur={() => onUpdate()}/> : formatter(object.take_up_amount) }</td>}
      {columns[2].display && <td onDoubleClick={() => onDoubleClickedCell(columns[2].accessor,object)}>{( edit.column === columns[2].accessor && edit.object.id === object["id"]) ? <input type="text" name="od_amount" id="id_od_amount" className='update-input' style={{border:'1px solid #1c4966', width:'90%'}} onChange={e => editHandler({...edit.object, od_amount:e.target.value})} value={numberWithCommas(edit.object.od_amount)} onBlur={() => onUpdate()}/> : formatter(object.od_amount) }</td>}
      {columns[3].display && <td onDoubleClick={() => onDoubleClickedCell(columns[3].accessor,object)}>{( edit.column === columns[3].accessor && edit.object.id === object["id"]) ? <input type="text" name="cancel_amount" id="id_cancel_amount" className='update-input' style={{border:'1px solid #1c4966', width:'90%'}} onChange={e => editHandler({...edit.object, cancel_amount:e.target.value})} value={numberWithCommas(edit.object.cancel_amount)} onBlur={() => onUpdate()}/> : formatter(object.cancel_amount) }</td>}
      {columns[4].display && <td onDoubleClick={() => onDoubleClickedCell(columns[4].accessor,object)}>{( edit.column === columns[4].accessor && edit.object.id === object["id"]) ? <input type="text" name="c_rate" id="id_c_rate" className='update-input' style={{border:'1px solid #1c4966', width:'90%'}} onChange={e => editHandler({...edit.object, c_rate:e.target.value})} value={edit.object.c_rate} onBlur={() => onUpdate()}/> : formatter(object.c_rate) }</td>}
      {columns[5].display && <td onDoubleClick={() => onDoubleClickedCell(columns[5].accessor,object)}>{( edit.column === columns[5].accessor && edit.object.id === object["id"]) ? <input type="text" name="lT2" id="id_lT2" className='update-input' style={{border:'1px solid #1c4966', width:'90%'}} onChange={e => editHandler({...edit.object, lT2:e.target.value})} value={edit.object.lT2} onBlur={() => onUpdate()}/> : formatter(object.lT2) }</td>}
      {columns[6].display && <td onDoubleClick={() => onDoubleClickedCell(columns[6].accessor,object)}>{( edit.column === columns[6].accessor && edit.object.id === object["id"]) ? <input type="text" name="lT3" id="id_lT3" className='update-input' style={{border:'1px solid #1c4966', width:'90%'}} onChange={e => editHandler({...edit.object, lT3:e.target.value})} value={edit.object.lT3} onBlur={() => onUpdate()}/> : formatter(object.lT3) }</td>}
      {columns[7].display && <td>{object.nostro}</td>}
      {columns[8].display && <td>{object.c_rem_2}</td>}
      {columns[9].display && <td>{object.validate}</td>}
    </tr>
  )
}

export default SalamDataGridTableBody