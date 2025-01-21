import React from 'react'
import Cfa from './Cfa'
import Enabled from '../../Enabled'

function CfaAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Cfa user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default CfaAuthorization