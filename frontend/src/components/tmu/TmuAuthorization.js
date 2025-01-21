import React from 'react'
import Tmu from './Tmu'
import Enabled from '../../Enabled'

function TmuAuthorization({module, user, authorized, addMessageHandler}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Tmu user={user} module={module} addMessageHandler={addMessageHandler}/> : <Enabled module={module}/>}
        </div>
    )
}

export default TmuAuthorization