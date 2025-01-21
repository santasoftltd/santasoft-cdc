import React from 'react'
import Interbank from './Interbank'
import Enabled from '../../Enabled'

function InterbankAuthorization({module, user, authorized, normalize, addMessageHandler}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Interbank user={user} module={module} normalize={normalize} addMessageHandler={addMessageHandler}/> : <Enabled module={module}/>}
        </div>
    )
}

export default InterbankAuthorization