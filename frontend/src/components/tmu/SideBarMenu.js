import SideBarMenuItems from './SideBarMenuItems';

import React from 'react'
import serviceImgae from './res/search-alt-free-icon-font.png'
import './SideBarMenu.css';

function SideBarMenu({module, pages, onModuleSideMenuClicked, onSubModuleSideMenuClicked}) {
  return (
    <div>
      <div className='tmu-module-sidebar'>
        <div style={{borderRight:'1px solid rgb(206, 206, 206)', height:'100vh'}}>
          <div className='module-features' style={{borderBottom:'1px solid rgb(206, 206, 206)'}} onClick={() => onModuleSideMenuClicked(pages[0].name, pages[0].value)}>
            <div className='module-features-image'>
              <img className='Module-services-pic Module-main-service-pic' src={serviceImgae} title="Navigation menu" alt="Menu"/>
            </div>
            <div className='module-features-title'>
              <p className='Module-services-title Module-main-service-title' style={{textTransform: 'none'}}>{module.name}</p>
            </div>
          </div>
          <SideBarMenuItems pages={pages} onModuleSideMenuClicked={onModuleSideMenuClicked} onSubModuleSideMenuClicked={onSubModuleSideMenuClicked}/>
        </div>
      </div>
    </div>
  )
}

export default SideBarMenu