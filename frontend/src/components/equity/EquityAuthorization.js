import React from 'react'
import Equity from './Equity'
import Enabled from '../../Enabled'

function EquityAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Equity user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default EquityAuthorization