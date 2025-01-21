import React from 'react'
import Lease from './Lease'
import Enabled from '../../Enabled'

function LeaseAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Lease user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default LeaseAuthorization