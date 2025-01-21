import React from 'react'
import {formatter, dateFormatter, timestampFormatter} from '../../../../../Formatter'

function TransactionTableBody({columns, object, onRowSelect, onUpdateHandler}) {
  
  return (
    <tr key={object["id"]} onDoubleClick={() => onUpdateHandler(object)}>
      <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{cursor:'pointer'}}/></td>
      {columns[0].display && <td>{object.dealer_name}</td>}
      {columns[1].display && <td>{object.branch_code}</td>}
      {columns[2].display && <td>{object.c_name}</td>}
      {columns[3].display && <td>{object.cif}</td>}
      {columns[4].display && <td>{object.cltype}</td>}
      {columns[5].display && <td>{object.recv}</td>}
      {columns[6].display && <td>{object.product}</td>}
      {columns[7].display && <td>{object.calc}</td>}
      {columns[8].display && <td>{object.days}</td>}
      {columns[9].display && <td>{dateFormatter(object.vdate)}</td>}
      {columns[10].display && <td>{object.days2}</td>}
      {columns[11].display && <td>{dateFormatter(object.vdate2)}</td>}
      {columns[12].display && <td >{object.ccy}</td>}
      {columns[13].display && <td>{object.n_c}</td>}
      {columns[14].display && <td>{formatter(object.export)}</td>}
      {columns[15].display && <td>{formatter(object.importt)}</td>}
      {columns[16].display && <td>{formatter(object.deal_rate)}</td>}
      {columns[17].display && <td>{formatter(object.i_b_rate)}</td>}
      {columns[18].display && <td>{formatter(object.third_ccy_cross)}</td>}
      {columns[19].display && <td>{formatter(object.i_b_premium)}</td>}
      {columns[20].display && <td>{formatter(object.option_premium)}</td>}
      {columns[21].display && <td>{formatter(object.third_ccy_premium)}</td>}
      {columns[22].display && <td >{object.branch }</td>}
      {columns[23].display && <td>{formatter(object.spread)}</td>}
      {columns[24].display && <td>{formatter(object.profit)}</td>}
      {columns[25].display && <td >{object.nostro_ac}</td>}
      {columns[26].display && <td>{dateFormatter(object.ttdate)}</td>}
      {columns[27].display && <td>{timestampFormatter(object.timestamp)}</td>}
      {columns[28].display && <td>{formatter(object.at_risk_income_fwd)}</td>}
      {columns[29].display && <td>{formatter(object.at_risk_income_salam)}</td>}
      {columns[30].display && <td>{formatter(object.take_up_loss)}</td>}
      {columns[31].display && <td>{formatter(object.pkr)}</td>}
      {columns[32].display && <td>{formatter(object.usd)}</td>}
      {columns[33].display && <td>{formatter(object.salam_yield)}</td>}
      {columns[34].display && <td>{formatter(object.fbp_profit)}</td>}
      {columns[35].display && <td>{formatter(object.salam_cost)}</td>}
      {columns[36].display && <td>{formatter(object.fbp_loss)}</td>}
      {columns[37].display && <td>{formatter(object.fwd_take_up)}</td>}
      {columns[38].display && <td>{object.take_close}</td>}
      {columns[39].display && <td>{object.c_rem}</td>}
    </tr>
  )
}

export default TransactionTableBody