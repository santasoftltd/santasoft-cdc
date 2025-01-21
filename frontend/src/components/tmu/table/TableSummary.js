import React from 'react'

function TableSummary({dataSummaryTitles, dataSummary}) {
  return (
    <div className='table-container-summary'>
      {dataSummaryTitles.map((item,index) =>(
        <div key={index}>
          <p className='table-container-summary-item1'>{item.name}</p>
          <p className='table-container-summary-item2'>{dataSummary[item.accessor].toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div> 
      ))}
    </div>
  )
}

export default TableSummary