import React from 'react'
import './DropDown.css'

function Notification({notifications}) {
    
  return (
    <div id='drop-One'>
        <div id='drop-One-one'><p>Notifications</p></div>
        <div id='drop-One-two'>
          {notifications.map((notification,index) => (
            <p key={index}>{notification}</p>
          ))}
        </div>
    </div>
  )
}

export default Notification