import React from 'react'
import FrontOffice from './FrontOffice'
import Enabled from '../../Enabled'

function FrontOfficeAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <FrontOffice user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default FrontOfficeAuthorization