import SalamDataGrid from './components/SalamDataGrid'
import SalamInformation from './components/SalamInformation'
import SalamHeader from './components/SalamHeader'

import './Salam.css'

import Loader from '../../../santasoft/components/loader/Loader'
import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../App'

function Salam({user, date, refresh, onSalamTransactionClicked, salamId, addMessageHandler}) {

  const [isloading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState('empty')

  const [sort, setSort] = useState('empty')

  const rootDealTitles = [
    {
      name: "Customer",
      accessor: "c_name"
    },
    {
      name: "Product",
      accessor: "product"
    },
    {
      name: "Days",
      accessor: "days"
    },
    {
      name: "Actual amount",
      accessor: "actual_amount"
    },
    {
      name: "Deal date",
      accessor: "deal_date"
    },
    {
      name: "Dealer",
      accessor: "dealer"
    },
    {
      name: "Currency",
      accessor: "ccy"
    },
    {
      name: "Deal rate",
      accessor: "deal_rate"
    },
    {
      name: "Remaining amount",
      accessor: "remaining_amount"
    },
    {
      name: "Outstanding",
      accessor: "remaining_amount"
    },
    {
      name: "Maturity date",
      accessor: "maturity_date"
    },
    {
      name: "Take-up date",
      accessor: "take_up_date"
    },
    {
      name: "Third ccy cross",
      accessor: "third_ccy_cross"
    },
    {
      name: "IB rate",
      accessor: "ib_rate"
    }
  ]

  const [rootDeal, setRootDeal] = useState({
    "id": null,
    "c_name": null,
    "dealer": null,
    "take_up_date": null,
    "product": null,
    "ccy": null,
    "third_ccy_cross": null,
    "days": null,
    "deal_rate": null,
    "ib_rate": null,
    "actual_amount": null,
    "remaining_amount": null,
    "deal_date": null,
    "maturity_date": null
  })

  const [dataSummary, setDataSummary] = useState({
    "id": 0,
    "totalTakeUpAmount": 0,
    "totalOverDueAmount": 0,
    "totalCancelAmount": 0,
    "count": 0
  })

  const [fetchedData, setFetchedData] = useState([
    {
      "id": null,
      "ttdate": null,
      "take_up_amount": null,
      "od_amount": null,
      "cancel_amount": null,
      "c_rate": null,
      "lT2": null,
      "lT3": null,
      "nostro": null,
      "c_rem_2": null,
      "validate": null
    }
  ])

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip+'/sfe01/CkE&OAygflNWIKC$wpTRGyzREsoWDtG$K7G1nL1CMNW!!IGuic/' + filter + '/' + sort + '/empty/' + salamId + '/ss_n/');
        let result = await response.json();
        setIsLoading(false);
        
        if(response.status === 200){
          setRootDeal(result.parent[0]);
          setFetchedData(result.salamDeal);
          setDataSummary(result.summary);
        }
      
        else if(response.status === 500 || response.status === 406){
          addMessageHandler({
            title: 'Unable to load',
            content: result.message,
            type: 4
          })
        }
      } 
      catch (err) {
        console.log(err);
      }
    }
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, filter, sort]);

  return (
    <div className='black-background'>
      <div className='float-component'>
      {isloading && <Loader margin={'65%'} />}
        <div>
          <SalamHeader/>
        </div>
        <div className='Salam-home'>
          <div className='Salam-sub-home'>
            <SalamInformation rootDealTitles={rootDealTitles} rootDeal={rootDeal}/>
            <SalamDataGrid user={user} rootDeal={rootDeal} date={date} dataSummary={dataSummary} fetchedData={fetchedData} salamId={salamId} setRootDeal={setRootDeal} setDataSummary={setDataSummary} setFetchedData={setFetchedData} filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} addMessageHandler={addMessageHandler}/>
            <button className='cancel-button' onClick={e => onSalamTransactionClicked()}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Salam