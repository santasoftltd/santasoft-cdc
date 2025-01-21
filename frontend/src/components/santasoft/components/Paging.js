import React from 'react'

import '../santasoft.css'

function Paging({page, onPageSelect}) {
  return (
    <div className='expand' style={{width:'100px'}}>
      <p>Show up to</p>
      <div style={{height:'58px', overflow:'auto', border:'1px solid rgb(148, 148, 148)', width:'100%', marginLeft:'-1px', position:'absolute', backgroundColor:'white'}}>
        {page.map((object,index) => (
          <span key={index}>
            <input checked={object.status} onChange={() => onPageSelect(object.label)} style={{marginLeft:'5px'}} type='checkbox'/>
            <label>{object.label}</label><br/>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Paging