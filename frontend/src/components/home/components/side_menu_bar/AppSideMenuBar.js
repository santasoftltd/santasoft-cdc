import React from 'react'
import serviceImgae from './res/search-alt-free-icon-font.png'
import './AppSideMenuBar.css';

function AppSideMenuBar({onServiceClicked, services}) {
  return (
    <div>
        <div className='SideMenuBar'>
            <div className='services-block'>
                <div className='services' onClick={() => onServiceClicked(true,'','')}>
                    <div>
                        <img className='services-pic' src={serviceImgae} title="Navigation menu" alt="Menu"/>
                    </div>
                    <div>
                        <p className='services-title' style={{textTransform: 'none'}}>Platform overview</p>
                    </div>
                </div>
                <div className='services all-services' onClick={() => onServiceClicked(true,'Explore','all')}>
                    <div>
                        <img className='services-pic' src={serviceImgae} title="Navigation menu" alt="Menu"/>
                    </div>
                    <div>
                        <p className='services-title'>View all modules</p>
                    </div>
                </div>
            </div>
            <div  className='services-block' style={{borderTop:'1px solid rgb(151, 151, 151)', overflow:'scroll'}}>
                {services.map((service, index) => {
                    return(
                        <div key={index}>
                            <p className='group-services'>{service.category}</p>
                            {service.modules.map((module, index) => {
                                return(
                                <div onClick={() => onServiceClicked(service.category,module.name,module.value)} className='services' key={index} >
                                    <div>
                                        <img className='services-pic' src={serviceImgae} title="Navigation menu" alt="Menu"/>
                                    </div>
                                    <div>
                                        <p className='services-title'>{module.name}</p>
                                    </div>
                                </div>
                                )}
                            )}
                        </div>    
                    )}
                )}
            </div>
        </div>
    </div>
  )
}

export default AppSideMenuBar