import React from 'react'
import Fxcrs from './Fxcrs'
import Enabled from '../../Enabled'

function FxcrsAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Fxcrs user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default FxcrsAuthorization