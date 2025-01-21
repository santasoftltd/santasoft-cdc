import React from 'react'
import SecurityTransactionGride from './components/SecurityTransactionGride'

function SecurityTransaction({ user, addMessageHandler }) {

  

  return (
    <div className='table-container'>
      <SecurityTransactionGride user={user} addMessageHandler={addMessageHandler} />
    </div>
  )
}

export default SecurityTransaction