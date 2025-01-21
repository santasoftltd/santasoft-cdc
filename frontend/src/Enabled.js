import serviceImgae from './components/home/res/search-alt-free-icon-font.png'
import React from 'react'
import './Enabled.css'

function Enabled({module}) {

    const moduleMessage = <p id="message">{module.name} module may not have been enabled for your organisation. Please contact your organisation IT or SantaSoft to enabled the {module.name} module. Learn more about <a href='santasoftltd.com/' rel="noreferrer" target="_blank">SantaSoft Platform.</a></p>

    const userMessage = <p id="message">You may not have been authorized for {module.name} module. Please contact your organisation IT or SantaSoft to authorized the {module.name} module for you. Learn more about <a href='santasoftltd.com/' rel="noreferrer" target="_blank">SantaSoft Platform.</a></p>

  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <div className='Enabled'>
            <div>
                <div className='services-Enabled'>
                    <div>
                        <img className='services-pic-Enabled' src={serviceImgae} title="Navigation menu" alt="Menu"/>
                    </div>
                    <div>
                        <p className='services-title-Enabled'>{module.name}</p>
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    {!module.enabled ? moduleMessage : userMessage}
                </ul>
            </div>
            <div>
                <div>
                    <p id='One-One-Enabled'>Overview</p>
                </div>
                <div>
                    <p id='One-Two-Enabled'>{module.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Enabled