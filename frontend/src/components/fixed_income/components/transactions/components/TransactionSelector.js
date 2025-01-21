import React from 'react'

function TransactionSelector({ isSecurity, setIsSecurity }) {
    return (
        <div>
            {isSecurity === 'security'
                ?
                <div className='fixed-income-dashboard-selector-container'>
                    <div className='fixed-income-dashboard-selector' style={{backgroundColor:'#2196F3', color:'white'}} onClick={() => setIsSecurity('security')}>
                        Security
                    </div>
                    <div className='fixed-income-dashboard-selector' onClick={() => setIsSecurity('cash')}>
                        Cash
                    </div>
                </div>
                :
                <div className='fixed-income-dashboard-selector-container'>
                    <div className='fixed-income-dashboard-selector' onClick={() => setIsSecurity('security')}>
                        Security
                    </div>
                    <div className='fixed-income-dashboard-selector' style={{backgroundColor:'#2196F3', color:'white'}} onClick={() => setIsSecurity('cash')}>
                        Cash
                    </div>
                </div>
            }

        </div>
    )
}

export default TransactionSelector