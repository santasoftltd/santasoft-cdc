import React from 'react'
import GeneralLedger from './GeneralLedger'
import Enabled from '../../Enabled'

function GeneralLedgerAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <GeneralLedger user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default GeneralLedgerAuthorization