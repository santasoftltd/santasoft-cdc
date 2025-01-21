import React from 'react'
import supportImage from './res/support.png'

function SupportBar({onHeaderCliked}) {
  return (
    <div className='Header-item' onClick={() => onHeaderCliked('support')}>
      <img src={supportImage} className="menu-bar" title="Support" alt="Support"/>        
    </div>
  )
}

export default SupportBar