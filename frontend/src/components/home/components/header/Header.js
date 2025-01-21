import React from 'react'
import MenuBar from './MenuBar'
import AppTitle from './AppTitle'
import ServiceTitle from './ServiceTitle'
// import SearchBar from './SearchBar'
import NotificationBar from './NotificationBar'
import SupportBar from './SupportBar'
import ProfileBar from './ProfileBar'

import './Header.css'

function Header({onAppSideBarClick, subPageTitle, service, onHeaderCliked}) {
  return (
    <div className='Header'>
      
      <MenuBar onAppSideBarClick={onAppSideBarClick}/>
      
      {/* <AppTitle/> */}
        <div className='service-title' style={{fontWeight:'bold'}}>{subPageTitle}</div>
      <ServiceTitle service={service}/>

      <AppTitle/>
        
      {/* <SearchBar services={services}/> */}
      
      <NotificationBar onHeaderCliked={onHeaderCliked}/>
      
      <SupportBar onHeaderCliked={onHeaderCliked}/>
      
      <ProfileBar onHeaderCliked={onHeaderCliked}/>
    
    </div>
  )
}

export default Header