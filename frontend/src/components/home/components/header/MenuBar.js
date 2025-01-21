import React from 'react'
import menuImage from './res/menu.png'

function MenuBar({onAppSideBarClick}) {

  return (
    <div className='Header-item'>
      <img onClick={onAppSideBarClick} src={menuImage} className="menu-bar" title="Navigation menu" alt="Menu"/>
    </div>
  )
}

export default MenuBar