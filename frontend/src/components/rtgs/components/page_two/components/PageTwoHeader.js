import React from 'react'
import '../PageTwo.css'

function PageTwoHeader({page}) {
  return (
    <div className='page-header'>
      <p className='page-title'>{page.name}</p>
    </div>
  )
}

export default PageTwoHeader