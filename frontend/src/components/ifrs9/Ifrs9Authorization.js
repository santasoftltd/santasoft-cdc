import React from 'react'
import Ifrs9 from './Ifrs9'
import Enabled from '../../Enabled'

function Ifrs9Authorization({module, user, authorized}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <Ifrs9 user={user} module={module}/> : <Enabled module={module}/>}
        </div>
    )
}

export default Ifrs9Authorization