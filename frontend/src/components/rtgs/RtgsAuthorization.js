import React from 'react'
import Rtgs from './Rtgs'
import Enabled from '../../Enabled'

function RtgsAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Rtgs user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default RtgsAuthorization