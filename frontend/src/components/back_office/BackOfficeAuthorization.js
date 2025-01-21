import React from 'react'
import BackOffice from './BackOffice'
import Enabled from '../../Enabled'

function BackOfficeAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <BackOffice user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default BackOfficeAuthorization