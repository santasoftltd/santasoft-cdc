import React from 'react'
import FixedIncomeTrading from './FixedIncomeTrading'
import Enabled from '../../Enabled'

function FixedIncomeTradingAuthorization({module, user, setSubPageTitle, authorized, normalize, addMessageHandler}) {
    
    return (
        <div>
            {(module.enabled && authorized) ? <FixedIncomeTrading user={user} module={module} setSubPageTitle={setSubPageTitle} normalize={normalize} addMessageHandler={addMessageHandler}/> : <Enabled module={module}/>}
        </div>
    )
}

export default FixedIncomeTradingAuthorization