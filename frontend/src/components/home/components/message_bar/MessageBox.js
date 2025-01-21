import React from 'react'
import './MessageBox.css'
import crossImage from '../../../../res/cross.png'

function MessageBox({index, message, onMessageClosed}) {
  const getBorderColor = type =>{
    if(type === 1){
      return '6px solid rgb(255, 255, 50)'
    }
    else if(type === 2){
      return '6px solid rgb(50, 50, 255)'
    }
    else if(type === 3){
      return '6px solid rgb(3, 200, 3)'
    }
    else if(type === 4){
      return '6px solid rgb(255, 50, 50)'
    }
  }
  return (
    <div className='message-box' style={{borderLeft:getBorderColor(message.type)}}>
      <div>
        <p className='message-box-title'>
          {message.title}
        </p>
        <p className='message-box-content'>
          {message.content}
        </p>
      </div>
      <div>
        <img  onClick={() => onMessageClosed(index)} src={crossImage} className="message-box-pic" alt="Cancel" title='Cancel'/>
      </div>
    </div>
  )
}

export default MessageBox