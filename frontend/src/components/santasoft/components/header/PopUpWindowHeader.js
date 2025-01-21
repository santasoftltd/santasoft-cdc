import React from 'react'
import './PopUpWindowHeader.css'
import addImgae from '../../../../res/add.png'

function PopUpWindowHeader({title, onNewEntryClicked}) {
  return (
    <div className='popup-page-header'>
      <p className='popup-page-title'>{title}</p>
      {onNewEntryClicked !== null && <div className='popup-header-action' onClick={() => onNewEntryClicked()}><img className='header-pics' src={addImgae} title="Add" alt="Add"/><p className='header-title'>NEW ENTRY</p></div>}
    </div>
  )
}

export default PopUpWindowHeader