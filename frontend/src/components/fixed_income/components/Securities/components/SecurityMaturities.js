import UpcomingPrincipleMaturities from './UpcomingPrincipleMaturities'
import UpcomingCouponMaturities from './UpcomingCouponMaturities'

import { useState } from 'react'

function SecurityMaturities({ user, addMessageHandler }) {

    const [table, setTable] = useState('principle')

    const onTableSelect = tableClicked => {
        setTable(tableClicked)
    }

    return (
        <div className='table-container'>
            {table === 'principle' && <UpcomingPrincipleMaturities user={user} onTableSelect={onTableSelect} addMessageHandler={addMessageHandler} />}
            {table === 'coupon' && <UpcomingCouponMaturities user={user} onTableSelect={onTableSelect} addMessageHandler={addMessageHandler} />}
        </div>
    )
}

export default SecurityMaturities