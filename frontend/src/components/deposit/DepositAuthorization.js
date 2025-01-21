import React from 'react'
import Deposit from './Deposit'
import Enabled from '../../Enabled'

function DepositAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Deposit user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default DepositAuthorization