import React from 'react'

import {formatter, dateFormatter} from '../../../../../Formatter'

function ForwardInformation({rootDealTitles, rootDeal}) {

  return (
    <div className='table-container'>

      <div className='table-container-name'>
        <p>Transaction Details</p>
      </div>
      
      <div className='table-container-summary' style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr'}}>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[0].name}</p>
          <p className='table-container-summary-item2'>{rootDeal[rootDealTitles[0].accessor]}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[1].name}</p>
          <p className='table-container-summary-item2'>{rootDeal[rootDealTitles[1].accessor]}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[2].name}</p>
          <p className='table-container-summary-item2'>{rootDeal[rootDealTitles[2].accessor]}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[3].name}</p>
          <p className='table-container-summary-item2'>{formatter(rootDeal[rootDealTitles[3].accessor])}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[4].name}</p>
          <p className='table-container-summary-item2'>{dateFormatter(rootDeal[rootDealTitles[4].accessor])}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[5].name}</p>
          <p className='table-container-summary-item2'>{rootDeal[rootDealTitles[5].accessor]}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[6].name}</p>
          <p className='table-container-summary-item2'>{rootDeal[rootDealTitles[6].accessor]}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[7].name}</p>
          <p className='table-container-summary-item2'>{formatter(rootDeal[rootDealTitles[7].accessor])}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[8].name}</p>
          <p className='table-container-summary-item2'>{formatter(rootDeal[rootDealTitles[8].accessor])}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[9].name}</p>
          <p className='table-container-summary-item2'>{dateFormatter(rootDeal[rootDealTitles[9].accessor])}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[10].name}</p>
          <p className='table-container-summary-item2'>{dateFormatter(rootDeal[rootDealTitles[10].accessor])}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[11].name}</p>
          <p className='table-container-summary-item2'>{rootDeal[rootDealTitles[11].accessor]}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[12].name}</p>
          <p className='table-container-summary-item2'>{rootDeal[rootDealTitles[12].accessor]}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[13].name}</p>
          <p className='table-container-summary-item2'>{formatter(rootDeal[rootDealTitles[13].accessor])}</p>
        </div>
        <div>
          <p className='table-container-summary-item1'>{rootDealTitles[14].name}</p>
          <p className='table-container-summary-item2'>{dateFormatter(rootDeal[rootDealTitles[14].accessor])}</p>
        </div>
      </div>
      
    </div>
  )
}

export default ForwardInformation