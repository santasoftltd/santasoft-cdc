import React from 'react'
import '../PageOne.css'

function PageOneHeader({page}) {
  return (
    <div className='page-header'>
      <p className='page-title'>{page.name}</p>
    </div>
  )
}

export default PageOneHeader