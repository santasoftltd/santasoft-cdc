import SubSideBarMenu from './SubSideMenu'

import serviceImgae from './res/search-alt-free-icon-font.png'
import './SideBarMenu.css';

import { useState } from "react";

function SideBarMenuItems({pages, onModuleSideMenuClicked, onSubModuleSideMenuClicked}) {

  const [dropdown, setDropdown] = useState('none');

  const setDisplyBlock = (page) => {
    if(page.subMenu){
        setDropdown('block')
    }
  }

  const setDisplyNone = (page) => {
    if(page.subMenu){
        setDropdown('none')
    }
  }
  
  return (
    <div className='features-block'>
      {pages.map((page,index) =>(
        page.subMenu ?
          <div className='module-features' key={index} onMouseEnter={()=> setDisplyBlock(page)} onMouseLeave={()=> setDisplyNone(page)}>
            <div className='module-features-image'>
              <img className='Module-services-pic' src={serviceImgae} title="Navigation menu" alt="Menu"/>
            </div>
            <div className='module-features-title'>
              <p className='Module-services-title'>{page.name}</p>
            </div>
            <SubSideBarMenu pages={page.pages} onSubModuleSideMenuClicked={onSubModuleSideMenuClicked} display={dropdown}/>
          </div>
        :
          <div className='module-features' key={index} onClick={() => onModuleSideMenuClicked(page.name, page.value)} onMouseEnter={()=> setDisplyBlock(page)} onMouseLeave={()=> setDisplyNone(page)}>
            <div className='module-features-image'>
              <img className='Module-services-pic' src={serviceImgae} title="Navigation menu" alt="Menu"/>
            </div>
            <div className='module-features-title'>
              <p className='Module-services-title'>{page.name}</p>
            </div>
          </div>
      ))}
    </div>
  )
}

export default SideBarMenuItems