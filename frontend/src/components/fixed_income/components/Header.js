import addImgae from '../res/add.png'
import refreshImgae from '../res/refresh.png'

import React from 'react'

import { useState } from 'react'

import '../FixedIncomeTrading.css'

function Header({page, onNewEntryClicked, onRefreshClicked}) {

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const getDate = () => {
    var date = new Date();
    return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + ('0' + date.getDate()).slice(-2) + ', ' + date.getFullYear();
  }

  const [date, setDate] = useState(getDate)

  return (
    <div className='page-header'>
      <p className='page-title'>{date}</p>
      
      {/* <div className='header-action' onClick={() => onNewEntryClicked()}><img className='header-pics' src={addImgae} title="Add" alt="Add"/><p className='header-title'>ADD DEAL</p></div> */}
      {/* <div className='header-action' onClick={() => onRefreshClicked()}><img className='header-pics' src={refreshImgae} title="Refresh" alt="Refresh"/><p className='header-title'>REFRESH</p></div> */}
    </div>
  )
}

export default Header