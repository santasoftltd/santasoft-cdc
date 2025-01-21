import React from 'react'
import Kyc from './Kyc'
import Enabled from '../../Enabled'

function KycAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Kyc user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default KycAuthorization