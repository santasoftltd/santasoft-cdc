import React from 'react'
import profileImage from './res/default.jpg'

function ProfileBar({onHeaderCliked}) {
  return (
    <div className='Header-item' onClick={() => onHeaderCliked('profile')}>
      <img src={profileImage} className="profile-small" alt="Profile"/>
    </div>
  )
}

export default ProfileBar