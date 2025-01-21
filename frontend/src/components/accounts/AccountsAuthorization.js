import React from 'react'
import Accounts from './Accounts'
import Enabled from '../../Enabled'

function AccountsAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Accounts user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default AccountsAuthorization