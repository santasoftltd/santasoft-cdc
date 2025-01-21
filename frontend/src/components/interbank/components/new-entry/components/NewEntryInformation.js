import TransactionsRates from '../../dashboard/components/TransactionsRates'

import React from 'react'

function NewEntryInformation({ user, rates }) {

  return (
    <div className='table-container' style={{ height: '100px' }}>
      <div className='table-container-name'>
        <p>Transaction Details</p>
      </div>
      <TransactionsRates user={user} rates={rates} border={'none'} />

    </div>
  )
}

export default NewEntryInformation