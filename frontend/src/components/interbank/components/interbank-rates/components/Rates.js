import downloadImgae from '../../../../santasoft/res/download.png'
import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort.png'
import sortDownImgae from '../../../../santasoft/res/sort.png'

import '../InterbankRates.css'

import Loader from '../../../../santasoft/components/loader/Loader'
import { onDownloadButtonClicked } from '../../../../santasoft/components/Download'
import { timestampFormatter } from '../../../../santasoft/components/Formatter'

import TableActions from '../../../../santasoft/components/table/TableActions'
import TableHeader from '../../../../santasoft/components/table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

// import { API_Caller } from './ObdxCallApi'

function Rates({ user, refresh, currencies, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [columns, setColumns] = useState([
    {
      label: 'Date',
      accessor: 'ttdate',
      display: true,
      sortable: true
    },
    {
      label: 'Currency',
      accessor: 'ccy',
      display: true,
      sortable: true
    },
    {
      label: 'Bid rate',
      accessor: 'bid_rate',
      display: true,
      sortable: true
    },
    {
      label: 'Offer rate',
      accessor: 'offer_rate',
      display: true,
      sortable: true
    },
    {
      label: 'OBDX push status',
      accessor: 'isPushed',
      display: true,
      sortable: true
    },
    {
      label: 'Action',
      accessor: '',
      display: true,
      sortable: false
    },
  ])

  const [data, setData] = useState([
    // {
    //   "id": null,
    //   "ttdate": null,
    //   "ccy": null,
    //   "offer_rate": null,
    //   "bid_rate": null,
    //   "isPushed": null,
    // }
  ])

  const [userInput, setUserInput] = useState(
    {
      "id": null,
      "ttdate": null,
      "ccy": 'USD',
      "offer_rate": null,
      "bid_rate": null
    }
  )

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/RkfSQRypduURbU5@*is3P5UUwUIJ5trM0CjZHbLATD3DKQEP$W/Interbank/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {

        setData(result.interbankRates);
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Exchange rates grid failed to load due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 500) {
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

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/RkfSQRypduURbU5@*is3P5UUwUIJ5trM0CjZHbLATD3DKQEP$W/Interbank/', {
        method: 'POST',
        body: JSON.stringify(userInput),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setData([result.object, ...data]);
        setUserInput({
          "id": null,
          "ttdate": null,
          "ccy": 'USD',
          "offer_rate": "",
          "bid_rate": ""
        });
        addMessageHandler({
          title: 'Transaction saved',
          content: result.message,
          type: 3
        })
        // OBDX API CALLER
        // API_Caller();
      }

      else if (response.status === 400) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: 'Unable to saved due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 412) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 409) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 406) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Transaction not saved',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const eraseHandler = () => {
    setUserInput({
      "id": null,
      "ttdate": null,
      "ccy": 'USD',
      "offer_rate": "",
      "bid_rate": ""
    })
  }

  const API_Caller = async () => {
    try {

      setIsLoading(true);
      const response = await fetch(ip + '/santasoft.services/api/pushUSDRate/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token'
        },
      });
      setIsLoading(false);

      if (response.status === 200) {
        fetchAPI()
        addMessageHandler({
          title: 'Success',
          content: 'Rates pushed to OBDX successfully.',
          type: 3
        })
      }
      else {
        fetchAPI()
        addMessageHandler({
          title: 'Failed',
          content: 'Rates not pushed to OBDX.',
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  // 
  //  Selecting Rows 
  // 

  const [selectedRows, setSelectedRows] = useState([])

  const onRowSelect = id => {
    if (selectedRows.includes(id)) {
      setSelectedRows(current =>
        current.filter(row => {
          return row !== id;
        }),
      );
    }
    else {
      setSelectedRows([...selectedRows, id])
    }
  }

  // 
  //  Columns Display 
  // 

  const [columnExpand, setColumnExpand] = useState(false)

  const [allColumns, setAllColumns] = useState(true)

  const onExpandSelectClicked = (accessor) => {
    if (accessor === 'all') {
      if (allColumns) {
        setAllColumns(false)
      }
      else {
        setAllColumns(true)
      }
      const newState = columns.map(obj => {
        if (allColumns) {
          return { ...obj, display: false }
        }
        else {
          return { ...obj, display: true }
        }
      })
      setColumns(newState)
    }
    else {
      const newState = columns.map(obj => {
        if (obj.accessor === accessor) {
          if (obj.display) {
            return { ...obj, display: false }
          }
          else {
            return { ...obj, display: true }
          }
        }
        return obj
      })
      setColumns(newState)
    }
  }

  const onExpandButtonClicked = () => {
    if (columnExpand) {
      setColumnExpand(false)
    }
    else {
      setColumnExpand(true)
    }
  }

  // 
  //  Sorting 
  // 

  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...data].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setData(sorted);
    }
  };

  const getSortingImage = (object) => {
    const image = object.sortable
      ? sortField === object.accessor && order === "asc"
        ? sortUpImgae
        : sortField === object.accessor && order === "desc"
          ? sortDownImgae
          : sortImgae
      : sortImgae;
    return image;
  }

  // 
  //  Filtering 
  // 

  const [filterFields, setFilterFields] = useState([
    // {
    //   label: 'Currency',
    //   accessor: 'ccy',
    //   'ccy': 'cccy'
    // },
  ])

  const onFilterSelect = (filterObject, value) => {
    setFilterFields([...filterFields, { label: filterObject.label, accessor: filterObject.accessor, [filterObject.accessor]: value }])
  }

  const onFilterItemDelete = (filterObject) => {
    setFilterFields(filterFields =>
      filterFields.filter(obj => {
        return obj !== filterObject;
      }),
    )
  }

  const isFilter = (rowObject) => {
    var filter = false
    filterFields.map((filterObject) => {
      if (rowObject[filterObject.accessor] !== null) {
        if (filterObject[filterObject.accessor] === rowObject[filterObject.accessor].toString()) {
          filter = true
          return filter
        }
      }
      return null
    })
    return filter
  }

  const actions = {
    "modifiable": true,
    "columns": columns,
    "data": data,
    "deleteHandler": null,
    "eraseHandler": eraseHandler,
    "submitHandler": submitHandler,
    "onDownloadButtonClicked": onDownloadButtonClicked,
    "count": null,
    "currentPage": null,
    "page": null,
    "pageSize": null,
    "showPage": null,
    "pageSizeSelect": null,
    "onShowPageClicked": null,
    "onNextPage": null,
    "onPreviousPage": null,
    "selectedRows": selectedRows,
    "allColumns": allColumns,
    "columnExpand": columnExpand,
    "onExpandButtonClicked": onExpandButtonClicked,
    "onExpandSelectClicked": onExpandSelectClicked,
    "filterFields": filterFields,
    "onFilterSelect": onFilterSelect,
    "onFilterItemDelete": onFilterItemDelete,
  }

  return (
    <div className='table-container'>

      {isloading && <Loader margin={'45%'} />}

      {/* Table Title */}
      <div className='table-container-name' style={{ border: 'none' }}>
        <p style={{ display: 'inline' }}>Interbank Rates</p>
        <div style={{ float: 'right', marginRight: '10px', marginTop: '0.2%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
      </div>

      {/* Table Actions Bar */}
      <TableActions actions={actions} />

      {/* Table Data Grid */}
      <div className='table-container-grid'>
        <table>
          <thead>
            <TableHeader columns={columns} getSortingImage={getSortingImage} handleSortingChange={handleSortingChange} />
          </thead>
          <tbody>
            <tr style={{ backgroundColor: 'white' }}>
              <td></td>
              <td></td>
              <td>
                <select onChange={e => setUserInput({ ...userInput, 'ccy': e.target.value })} value={userInput.ccy}>
                  {currencies.map((item, index) => (
                    <option key={index.name} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </td>
              <td><input type='text' onChange={e => setUserInput({ ...userInput, 'bid_rate': e.target.value })} value={userInput.bid_rate} /></td>
              <td><input type='text' onChange={e => setUserInput({ ...userInput, 'offer_rate': e.target.value })} value={userInput.offer_rate} /></td>
              <td></td>
              <td></td>
            </tr>
            {
              filterFields.length ?

                data.map((object, index) => (
                  isFilter(object) ?
                    <tr key={index}>
                      <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                      {columns[0].display && <td>{timestampFormatter(object["ttdate"])}</td>}
                      {columns[1].display && <td>{object["ccy"]}</td>}
                      {columns[3].display && <td>{object["bid_rate"]}</td>}
                      {columns[2].display && <td>{object["offer_rate"]}</td>}
                      {columns[4].display && <td>{
                        object["isPushed"] === true ? <div className='valid-status-button'>Pushed</div>
                          : <div className='invalid-status-button'>Not Pushed</div>
                      }</td>}
                      {index === 0 ? <td><div className='transaction-grid-button' onClick={() => API_Caller()}>Push</div></td>
                        : <td><div className='transaction-grid-button' style={{ cursor: 'not-allowed', backgroundColor:'#bababa' }}>Push</div></td>}
                    </tr>
                    : null
                ))

                : data.map((object, index) => (
                  <tr key={index}>
                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                    {columns[0].display && <td>{timestampFormatter(object["ttdate"])}</td>}
                    {columns[1].display && <td>{object["ccy"]}</td>}
                    {columns[3].display && <td>{object["bid_rate"]}</td>}
                    {columns[2].display && <td>{object["offer_rate"]}</td>}
                    {columns[4].display && <td>{
                      object["isPushed"] === true ? <div className='valid-status-button'>Pushed</div>
                        : <div className='invalid-status-button'>Not Pushed</div>
                    }</td>}
                    {index === 0 ? <td><div className='transaction-grid-button' onClick={() => API_Caller()}>Push</div></td>
                      : <td><div className='transaction-grid-button' style={{ cursor: 'not-allowed', backgroundColor:'#bababa' }}>Push</div></td>}
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Rates