import React from 'react'
import MoneyMarket from './MoneyMarket'
import Enabled from '../../Enabled'

function MoneyMarketAuthorization({module, user, authorized, addMessageHandler}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <MoneyMarket user={user} module={module} addMessageHandler={addMessageHandler}/> : <Enabled module={module}/>}
        </div>
    )
}

export default MoneyMarketAuthorization