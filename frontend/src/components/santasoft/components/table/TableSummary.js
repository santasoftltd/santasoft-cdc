import React from 'react'

function TableSummary({dataSummaryTitles, dataSummary, display}) {

  const dis = display

  return (
    <div className='table-container-summary'>
      {dataSummaryTitles.map((item,index) =>(
        <div key={index}>
          <p className='table-container-summary-item1' style={{ display: dis }}>{item.name}</p>
          <p className='table-container-summary-item2' style={{ display: dis }}>{dataSummary[item.accessor].toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div> 
      ))}
    </div>
  )
}

export default TableSummary