import React from 'react'
import serviceImgae from './res/search-alt-free-icon-font.png'
import './Home.css'

const services = [
  {
    category: 'Money Market',
    name: 'Fixed Income Trading',
    value: 'SM15'
  },
  {
    category: 'Foreign Exchange',
    name: 'FX Corporate',
    value: 'SFE01'
  },
  {
    category: 'Foreign Exchange',
    name: 'FX Interbank',
    value: 'SFE05'
  },
  {
    category: 'Money Market',
    name: 'Money Market',
    value: 'SM01'
  },
  {
    category: 'Finance',
    name: 'Risk',
    value: 'SF05'
  },
  {
    category: 'Finance',
    name: 'Lease',
    value: 'SF10'
  },
  {
    category: 'Finance',
    name: 'Deposit',
    value: 'SF15'
  },
  {
    category: 'Finance',
    name: 'Equity',
    value: 'SF20'
  },
  {
    category: 'Regulations',
    name: 'RTGS',
    value: 'SR05'
  },
  {
    category: 'Regulations',
    name: 'IFRS9',
    value: 'SR10'
  },
  {
    category: 'Regulations',
    name: 'Assest Valuation',
    value: 'SR25'
  },
  {
    category: 'Regulations',
    name: 'KYC / AML',
    value: 'SR30'
  },
  {
    category: 'Money Market',
    name: 'Front Office',
    value: 'SM01'
  },
  {
    category: 'Money Market',
    name: 'Back Office',
    value: 'SR10'
  },
  {
    category: 'Accounts',
    name: 'General Ledger',
    value: 'SA10'
  },
  {
    category: 'Admin Controls',
    name: 'Admin',
    value: 'SAC01'
  },
]

function Home({onServiceClicked, user, normalize}) {
  return (
    <div className='Home' onClick={() => normalize()}>
      <div className='Home-container'>
        <div>
          <p className='Welcome-left'>Welcome</p>
        </div>
        <div>
          <p className='Note-left'>You are currently login with username: <span style={{display:'inline', color:'rgb(65, 65, 255)'}}>{user}</span></p>
        </div>
      </div>

      <div className='Home-container'>  
        <div>
          <p className='Title-left'>Quick access</p>
        </div>
        <div className='Services'>
          {services.map((module, index) =>(
            <div className='Service' key={index} onClick={() => onServiceClicked(module.category,module.name,module.value)}>
              <div>
                <img className='Services-pic' src={serviceImgae} title="Navigation menu" alt="Menu"/>
              </div>
              <div>
                <p className='Services-title' style={{whiteSpace:'nowrap'}}>{module.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='Services-all'>
          <div className='services2' onClick={() => onServiceClicked(true,'Explore','all')}>
            <div>
              <img className='services-pic' src={serviceImgae} title="Navigation menu" alt="Menu"/>
            </div>
            <div>
              <p className='services-title'>View all modules</p>
            </div>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Home