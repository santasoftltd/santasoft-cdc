import React from 'react'
import AssestValuation from './AssestValuation'
import Enabled from '../../Enabled'

function AssestValuationAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <AssestValuation user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default AssestValuationAuthorization