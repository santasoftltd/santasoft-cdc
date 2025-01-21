import Notification from './Notification';
import Support from './Support';
import Profile from './Profile';
import React from 'react'
import './DropDown.css'

function DropDown({user, header, logout, notifications}) {

  return (
    <div className='Drop'>
      {header === 'notification' && <Notification notifications={notifications}/>}
      
      {header === 'support' && <Support/>}
      
      {header === 'profile' && <Profile user={user} logout={logout}/>}
    </div>
  )
}

export default DropDown