import React from 'react'
import './DropDown.css'
import profileImage from './res/default.jpg'

function Profile({user, logout}) {
  return (
    <div id='drop-Three'>
      <div id='drop-Three-one'>
        <div id='drop-Three-one-one'>
          <img src={profileImage} className="profile-big" alt="Profile"/>
        </div>
        <div id='drop-Three-one-two'>
          <p style={{fontWeight:'bold'}}>{user.name}</p>
          <p >{user.email}</p>
          <p style={{color:'rgb(65, 65, 255)'}}>{user.username}</p>
        </div>
      </div>
      <div id='drop-Three-two' onClick={() => logout()}>
        <div className='signOut'><p>Sign out</p></div>
      </div>
    </div>
  )
}

export default Profile