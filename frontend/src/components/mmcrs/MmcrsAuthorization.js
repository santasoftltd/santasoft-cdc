import React from 'react'
import Mmcrs from './Mmcrs'
import Enabled from '../../Enabled'

function MmcrsAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Mmcrs user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default MmcrsAuthorization