import ForwardDataGrid from './components/ForwardDataGrid'
import ForwardInformation from './components/ForwardInformation'
import ForwardHeader from './components/ForwardHeader'

import './Forward.css'

import Loader from '../../../santasoft/components/loader/Loader'
import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../App'

function Forward({ user, refresh, date, onForwardTransactionClicked, forwardId, dropdownLists, addMessageHandler }) {

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
      name: "Option starting",
      accessor: "option_date"
    },
    {
      name: "Take-up date",
      accessor: "deal_date"
    },
    {
      name: "Normal/Cross",
      accessor: "n_c"
    },
    {
      name: "Take-up days",
      accessor: "ar_days"
    },
    {
      name: "Take-up loss",
      accessor: "take_up_loss"
    },
    {
      name: "Maturity date",
      accessor: "maturity_date"
    },
  ]

  const [rootDeal, setRootDeal] = useState({
    "id": null,
    "c_name": null,
    "dealer": null,
    "take_up_date": null,
    "product": null,
    "ccy": null,
    "n_c": null,
    "days": null,
    "deal_rate": null,
    "ar_days": null,
    "actual_amount": null,
    "remaining_amount": null,
    "take_up_loss": null,
    "deal_date": null,
    "maturity_date": null,
    "option_date": null
  })

  const [dataSummary, setDataSummary] = useState({
    "id": 0,
    "totalTakeUpAmount": 0,
    "totalCancelAmount": 0,
    "totalArDays": 0,
    "count": 0
  })

  const [fetchedData, setFetchedData] = useState([
    {
      "id": null,
      "ttdate": null,
      "c_rem_4": null,
      "take_up_amount": null,
      "nostro": null,
      "cancel_amount": null,
      "c_rate": null,
      "c_rem_3": null,
      "take_up_date_days": null,
      "lT1": null,
      "lT2": null,
      "lT3": null,
      "lT4": null,
      "lT5": null,
      "lT6": null,
      "lT7": null,
      "lT8": null,
      "validate": null,
      "c_rem_2": null
    }
  ])

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/EjdTE6FnOZHQFkfYE68&sgV2dgIUE3P3bsr2mdXiQVpSUeO0nh/' + filter + '/' + sort + '/empty/none/none/' + forwardId + '/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setRootDeal(result.parent[0]);
          setFetchedData(result.forwardDeal);
          setDataSummary(result.summary);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Forward grid failed to load due to unauthorized request.',
            type: 4
          })
        }

        else if (response.status === 500 || response.status === 406) {
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
          <ForwardHeader />
        </div>
        <div className='Forward-home'>
          <div className='Forward-sub-home'>
            <ForwardInformation user={user} rootDealTitles={rootDealTitles} rootDeal={rootDeal} />
            <ForwardDataGrid user={user} rootDeal={rootDeal} date={date} dataSummary={dataSummary} fetchedData={fetchedData} forwardId={forwardId} setRootDeal={setRootDeal} setDataSummary={setDataSummary} setFetchedData={setFetchedData} dropdownLists={dropdownLists} filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} addMessageHandler={addMessageHandler} />
            <button className='cancel-button' onClick={() => onForwardTransactionClicked()}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forward