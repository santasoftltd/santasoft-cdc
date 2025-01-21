import React from 'react'
import Payroll from './Payroll'
import Enabled from '../../Enabled'

function PayrollAuthorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Payroll user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default PayrollAuthorization