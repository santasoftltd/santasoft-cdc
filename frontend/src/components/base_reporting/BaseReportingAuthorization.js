import React from 'react'
import BaseReporting from './BaseReporting'
import Enabled from '../../Enabled'

function BaseReportingAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <BaseReporting user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default BaseReportingAuthorization