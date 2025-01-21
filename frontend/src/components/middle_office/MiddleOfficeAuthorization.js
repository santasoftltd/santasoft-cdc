import React from 'react'
import MiddleOffice from './MiddleOffice'
import Enabled from '../../Enabled'

function MiddleOfficeAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <MiddleOffice user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default MiddleOfficeAuthorization