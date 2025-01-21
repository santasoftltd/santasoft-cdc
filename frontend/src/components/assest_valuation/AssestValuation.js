import PageOne from './components/page_one/PageOne'
import PageOneHeader from './components/page_one/components/PageOneHeader'
import PageTwo from './components/page_two/PageTwo'
import PageTwoHeader from './components/page_two/components/PageTwoHeader'
import PageThree from './components/page_three/PageThree'
import PageThreeHeader from './components/page_three/components/PageThreeHeader'
import PageFour from './components/page_four/PageFour'
import PageFourHeader from './components/page_four/components/PageFourHeader'

import React from 'react'
import TmuServiceSideBar from './SideBarMenu'
import './AssestValuation.css'
import './SideBarMenu.css'
import { useState } from 'react'

const pages = [
  {
    'name': 'Assest Valaution Page One',
    'value': 'p1'
  },
  {
    'name': 'Assest Valaution Page Two',
    'value': 'p2'
  },
  {
    'name': 'Assest Valaution Page Three',
    'value': 'p3'
  },
  {
    'name': 'Assest Valaution Page Four',
    'value': 'p4'
  },
]

function AssestValuation({user, module, normalize}) {
  const [page, setPage] = useState({name:'Page One', value:'p1', enabled:false, description:''})

  const onModuleSideMenuClicked = (name, value) => {
    setPage({name: name, value: value, enabled:false, description:''})
  }
  
  return (
    <div onClick={() => normalize}>
      <TmuServiceSideBar module={module} pages={pages} onModuleSideMenuClicked={onModuleSideMenuClicked}/>
      <div>
        {page.value === 'p1' && <PageOneHeader page={page}/>}
        {page.value === 'p2' && <PageTwoHeader page={page}/>}
        {page.value === 'p3' && <PageThreeHeader page={page}/>}
        {page.value === 'p4' && <PageFourHeader page={page}/>}
      </div>
      <div className='AssestValuation'>
        {page.value === 'p1' && <PageOne page={page}/>}
        {page.value === 'p2' && <PageTwo page={page}/>}
        {page.value === 'p3' && <PageThree page={page}/>}
        {page.value === 'p4' && <PageFour page={page}/>}
      </div>
    </div>
  )
}

export default AssestValuation