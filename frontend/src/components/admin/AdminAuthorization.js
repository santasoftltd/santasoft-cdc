import React from 'react'
import Admin from './Admin'
import Enabled from '../../Enabled'

function AdminAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Admin user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default AdminAuthorization