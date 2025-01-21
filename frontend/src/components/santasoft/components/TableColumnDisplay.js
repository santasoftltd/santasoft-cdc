import React from 'react'

import '../santasoft.css'

function TableColumnDisplay({columns, allColumns, onExpandSelectClicked}) {
  return (
    <div className='expand'>
      <p>Display columns</p>
      <span key='all' style={{display:'block'}}>
        <input checked={allColumns} type='checkbox' id='all' onChange={e => onExpandSelectClicked('all')}/>
        <label>All</label><br/>
      </span>
      <div style={{height:'100px', overflow:'auto', border:'1px solid rgb(148, 148, 148)', width:'100%', marginLeft:'-1px', position:'absolute', backgroundColor:'white'}}>
        {columns.map((item,index) => (
          <span key={index}>
            <input checked={item.display} onChange={() => onExpandSelectClicked(item.accessor)} style={{marginLeft:'5px'}} type='checkbox'/>
            <label>{item.label}</label><br/>
          </span>
        ))}
      </div>
    </div>
  )
}

export default TableColumnDisplay