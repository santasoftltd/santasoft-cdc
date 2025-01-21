import React from 'react'
import Ips from './Ips'
import Enabled from '../../Enabled'

function IpsAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Ips user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default IpsAuthorization