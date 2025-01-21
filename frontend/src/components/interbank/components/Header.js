import addImgae from '../res/add.png'
import refreshImgae from '../res/refresh.png'

import React from 'react'

import '../Interbank.css'

function Header({page, onNewEntryClicked, onRefreshClicked}) {

  return (
    <div className='page-header'>
      <p className='page-title'>{page.name}</p>

      <div className='header-action' onClick={() => onNewEntryClicked()}><img className='header-pics' src={addImgae} title="Add" alt="Add"/><p className='header-title'>ADD DEAL</p></div>
      <div className='header-action' onClick={() => onRefreshClicked()}><img className='header-pics' src={refreshImgae} title="Refresh" alt="Refresh"/><p className='header-title'>REFRESH</p></div>
    </div>
  )
}

export default Header