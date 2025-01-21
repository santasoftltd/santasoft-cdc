import React from 'react'
import Credit from './Credit'
import Enabled from '../../Enabled'

function CreditAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Credit user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default CreditAuthorization