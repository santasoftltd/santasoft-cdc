import React from 'react'

function AccountSelector({ account, setAccount }) {
    return (
        <div>
            {account === 'retail'
                ?
                <div className='fixed-income-dashboard-selector-container'>
                    <div className='fixed-income-dashboard-selector' onClick={() => setAccount('amc')}>
                        AMC
                    </div>
                    <div className='fixed-income-dashboard-selector' style={{backgroundColor:'#2196F3', color:'white'}} onClick={() => setAccount('retail')}>
                        Retail
                    </div>
                </div>
                :
                <div className='fixed-income-dashboard-selector-container'>
                    <div className='fixed-income-dashboard-selector' style={{backgroundColor:'#2196F3', color:'white'}} onClick={() => setAccount('amc')}>
                        AMC
                    </div>
                    <div className='fixed-income-dashboard-selector' onClick={() => setAccount('retail')}>
                        Retail
                    </div>
                </div>
            }

        </div>
    )
}

export default AccountSelector