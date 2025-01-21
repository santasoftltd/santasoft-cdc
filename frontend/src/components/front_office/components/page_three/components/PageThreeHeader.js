import React from 'react'
import '../PageThree.css'

function PageThreeHeader({page}) {
  return (
    <div className='page-header'>
      <p className='page-title'>{page.name}</p>
    </div>
  )
}

export default PageThreeHeader