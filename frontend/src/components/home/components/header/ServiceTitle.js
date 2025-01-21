import React from 'react'
import serviceImgae from './res/arrow.png'

function ServiceTitle({service}) {
  return (
    <div className='Header-item service'>
        <div>
          {service === '' ? (<></>) : (<img src={serviceImgae} className="service-pic" title="Navigation menu" alt="Menu"/>)}
        </div>
        <div>
          {service === '' ? (<></>) : (<p className='service-title'>{service}</p>)}
        </div>
    </div>
  )
}

export default ServiceTitle