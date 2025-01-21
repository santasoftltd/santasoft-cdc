import React from 'react'
import serviceImgae from './res/search-alt-free-icon-font.png'
import './SubSideMenu.css';

function SubSideBarMenu({pages, onSubModuleSideMenuClicked, display}) {
  return (
    <div style={{display: display}}>
      <div className='tmu-module-subSideBar'>
        <div style={{borderRight:'1px solid rgb(206, 206, 206)', height:'100vh'}}>
          <div className='features-block'>
          {pages.map((page,index) =>(
            <div className='module-features' key={index} onClick={() => onSubModuleSideMenuClicked(page.name, page.value)}>
              <div className='module-features-image'>
                <img className='Module-services-pic' src={serviceImgae} title="Navigation menu" alt="Menu"/>
              </div>
              <div className='module-features-title'>
                <p className='Module-services-title'>{page.name}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubSideBarMenu