import React from 'react'
import bellImage from './res/bell.png'

function NotificationBar({onHeaderCliked}) {
  return (
    <div className='Header-item' onClick={() => onHeaderCliked('notification')}>
      <img src={bellImage} className="menu-bar" title="Notifications" alt="Bell"/>
    </div>
  )
}

export default NotificationBar