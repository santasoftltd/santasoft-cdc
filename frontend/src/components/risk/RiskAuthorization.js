import React from 'react'
import Risk from './Risk'
import Enabled from '../../Enabled'

function RiskAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Risk user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default RiskAuthorization