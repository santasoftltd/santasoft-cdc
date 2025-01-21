import React from 'react'
import './Loader.css'
import loadImgae from '../../res/loading.png'

function Loader({margin}) {
    return (
        <div className='load' style={{marginLeft:margin}}>
            <img className='load-image' src={loadImgae} title="Add" alt="Add"/>
            <p style={{marginLeft:'8px'}}>Loading</p>
        </div>
    )
}

export default Loader