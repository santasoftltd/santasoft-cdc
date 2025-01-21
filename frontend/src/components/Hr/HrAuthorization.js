import React from 'react'
import Hr from './Hr'
import Enabled from '../../Enabled'

function HrAuthorization({module, user, authorized}) {
    return (
        <div>
            {(module.enabled && authorized) ? <Hr user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default HrAuthorization