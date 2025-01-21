import React from 'react'
import '../PageFour.css'

function PageFourHeader({page}) {
  return (
    <div className='page-header'>
      <p className='page-title'>{page.name}</p>
    </div>
  )
}

export default PageFourHeader