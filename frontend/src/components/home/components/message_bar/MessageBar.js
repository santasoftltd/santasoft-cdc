import MessageBox from './MessageBox'
import './MessageBar.css'

import React from 'react'

function MessageBar({ messages, onMessageClosed }) {
  return (
    <div className='message-bar'>
      {messages.map((message, index) => (
        <MessageBox key={index} index={index} message={message} onMessageClosed={onMessageClosed} />
      ))}
    </div>
  )
}

export default MessageBar