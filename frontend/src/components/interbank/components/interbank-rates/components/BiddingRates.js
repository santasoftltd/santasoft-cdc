import downloadImgae from '../../../../santasoft/res/download.png'
import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort.png'
import sortDownImgae from '../../../../santasoft/res/sort.png'

import '../InterbankRates.css'

import Loader from '../../../../santasoft/components/loader/Loader'
import { onDownloadButtonClicked } from '../../../../santasoft/components/Download'

import TableActions from '../../../../santasoft/components/table/TableActions'
import TableHeader from '../../../../santasoft/components/table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

import { API_Caller } from './ObdxCallApi'

function BiddingRates({ user, refresh, currencies, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [columns, setColumns] = useState([
    {
      label: 'First currency',
      accessor: 'ccy_1',
      display: true,
      sortable: true
    },
    {
      label: 'Second currency',
      accessor: 'ccy_2',
      display: true,
      sortable: true
    },
    {
      label: 'Days',
      accessor: 'days',
      display: true,
      sortable: true
    },
    {
      label: 'Tenor',
      accessor: 'tenor',
      display: true,
      sortable: true
    },
    {
      label: 'Bid',
      accessor: 'bid_c11',
      display: true,
      sortable: true
    },
    {
      label: 'Ask',
      accessor: 'ask_c11',
      display: true,
      sortable: true
    },
  ])

  const [data, setData] = useState([
    {
      "id": null,
      "ccy_1": null,
      "ccy_2": null,
      "days": null,
      "tenor": null,
      "bid_c11": null,
      "ask_c11": null
    }
  ])

  const [firstCurrency, setFirstCurrency] = useState('USD')

  const [secondCurrency, setSecondCurrency] = useState('PKR')

  const [userInput, setUserInput] = useState(
    {
      "id": null,
      "ccy_1": firstCurrency,
      "ccy_2": secondCurrency,
      "days": null,
      "tenor": null,
      "bid_c11": null,
      "ask_c11": null
    }
  )

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/kvs0wQeMWIjurTrWP5sE0HAOoSeGUs0F2bcu@2bRsmzg3RtaIi/' + firstCurrency + '/' + secondCurrency + '/Interbank/0/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setData(result.exchangeRates);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Bidding rates grid failed to load due to unauthorized request.',
            type: 4
          })
        }

        else if (response.status === 406) {
          addMessageHandler({
            title: 'Unable to load',
            content: result.message,
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

        setUserInput({ ...userInput, 'ccy_1': firstCurrency, 'ccy_2': secondCurrency })
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstCurrency, secondCurrency, refresh]);

  // const [currencies, setCurrencies] = useState([])

  // const fetchAPI = async () => {
  //   try {
  //     const response = await fetch(ip + '/sfe01/lQF!OFzqLV!1BwK6!BmAyJDvlJCQCcgd41cR!*u3sNMmeOURd7/', {
  //       method: 'Get',
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //         'Authorization': 'Token ' + user.token + ''
  //       },
  //     });

  //     let result = await response.json();

  //     if (response.status === 200) {
  //       setCurrencies(result.currencyList);
  //     }

  //     else if (response.status === 401) {
  //       addMessageHandler({
  //         title: 'Unable to load',
  //         content: 'Currencies list failed to load due to unauthorized request.',
  //         type: 4
  //       })
  //     }

  //     else if (response.status === 500) {
  //       addMessageHandler({
  //         title: 'Unable to load',
  //         content: result.message,
  //         type: 4
  //       })
  //     }
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   fetchAPI();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onFirstCurrencySelect = option => {
    setFirstCurrency(option)
  }

  const onSecondCurrencySelect = option => {
    setSecondCurrency(option)
  }

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      console.log(userInput)
      const response = await fetch(ip + '/sfe01/kvs0wQeMWIjurTrWP5sE0HAOoSeGUs0F2bcu@2bRsmzg3RtaIi/' + firstCurrency + '/' + secondCurrency + '/Interbank/0/', {
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
        eraseHandler();
        addMessageHandler({
          title: 'Transaction saved',
          content: result.message,
          type: 3
        })
        // OBDX API CALLER
        API_Caller();
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

  const onChangeHandler = (e, type, object) => {
    if (type === 'bid') {
      setData(current =>
        current.map(obj => {
          if (obj['id'] === object['id']) {
            return { ...object, 'bid_c11': e.target.value }
          }
          else {
            return obj
          }
        })
      )
    }
    else if (type === 'ask') {
      setData(current =>
        current.map(obj => {
          if (obj['id'] === object['id']) {
            return { ...object, 'ask_c11': e.target.value }
          }
          else {
            return obj
          }
        })
      )
    }
    else {
      setData(current =>
        current.map(obj => {
          if (obj['id'] === object['id']) {
            return { ...object, 'days': e.target.value }
          }
          else {
            return obj
          }
        })
      )
    }
  }

  const onUpdate = async (object) => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/kvs0wQeMWIjurTrWP5sE0HAOoSeGUs0F2bcu@2bRsmzg3RtaIi/' + firstCurrency + '/' + secondCurrency + '/Interbank/' + object['id'] + '/', {
        method: 'PUT',
        body: JSON.stringify(object),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setData(current =>
          current.map(obj => {
            if (obj['id'] === object['id']) {
              return result.object
            }
            else {
              return obj
            }
          })
        );
        addMessageHandler({
          title: 'Record Updated',
          content: result.message,
          type: 3
        });

        // OBDX API CALLER
        API_Caller();
        
      }

      else if (response.status === 400) {
        addMessageHandler({
          title: 'Record not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Record not updated',
          content: 'Unable to update due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 412) {
        addMessageHandler({
          title: 'Record not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 404) {
        addMessageHandler({
          title: 'Record not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 409) {
        addMessageHandler({
          title: 'Record not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 406) {
        addMessageHandler({
          title: 'Record not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Record not updated',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err.message);
    }
  }

  const eraseHandler = () => {
    setUserInput({
      "id": null,
      "ccy_1": firstCurrency,
      "ccy_2": secondCurrency,
      "days": '',
      "tenor": '',
      "bid_c11": '',
      "ask_c11": ''
    })
  }

  const deleteHandler = async () => {
    if (selectedRows.length > 1) {
      addMessageHandler({
        title: 'Multiple rows selected',
        content: 'Only one row can be deleted at a time',
        type: 2
      })
    }
    else {
      if (window.confirm("Selected deal will be deleted from the system!")) {
        try {
          setIsLoading(true);
          const response = await fetch(ip + '/sfe01/kvs0wQeMWIjurTrWP5sE0HAOoSeGUs0F2bcu@2bRsmzg3RtaIi/' + firstCurrency + '/' + secondCurrency + '/Interbank/' + selectedRows[0] + '/', {
            method: 'DELETE',
            body: JSON.stringify({ 'user': user.name }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': 'Token ' + user.token + ''
            },
          })
          setIsLoading(false);

          let result = await response.json();

          if (response.status === 200) {
            setData(current =>
              current.filter(obj => obj['id'] !== selectedRows[0]).map(filterData => { return filterData })
            );
            setSelectedRows([]);
            addMessageHandler({
              title: 'Record Deleted',
              content: result.message,
              type: 3
            });
            // OBDX API CALLER
            API_Caller();
          }

          else if (response.status === 400) {
            addMessageHandler({
              title: 'Record not deleted',
              content: result.message,
              type: 2
            })
          }

          else if (response.status === 401) {
            addMessageHandler({
              title: 'Record not deleted',
              content: 'Unable to delete due to unauthorized request.',
              type: 4
            })
          }

          else if (response.status === 404) {
            addMessageHandler({
              title: 'Record not deleted',
              content: result.message,
              type: 4
            })
          }

          else if (response.status === 406) {
            addMessageHandler({
              title: 'Record not deleted',
              content: result.message,
              type: 4
            })
          }

          else if (response.status === 500) {
            addMessageHandler({
              title: 'Record not deleted',
              content: result.message,
              type: 4
            })
          }
        }
        catch (err) {
          console.log(err.message);
        }
      }
    }
  }

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
    console.log(filterObject)
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
    "deleteHandler": deleteHandler,
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

        <p style={{ display: 'inline' }}>Exchange Rates</p>

        <div style={{ float: 'right', marginRight: '10px', marginTop: '0.2%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>

        <select onChange={e => onSecondCurrencySelect(e.target.value)} value={secondCurrency} style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%', backgroundColor: '#071e31', color: 'white', fontSize: 'x-small', width: '150px', borderRadius: '10px', textAlign: 'center' }}>
          {currencies.map((item, index) => (
            <option key={index.name} value={item.name}>{item.name}</option>
          ))}
        </select>

        <select onChange={e => onFirstCurrencySelect(e.target.value)} value={firstCurrency} style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%', backgroundColor: '#071e31', color: 'white', fontSize: 'x-small', width: '150px', borderRadius: '10px', textAlign: 'center' }} >
          {currencies.map((item, index) => (
            <option key={index.name} value={item.name}>{item.name}</option>
          ))}
        </select>

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
              <td>{firstCurrency}</td>
              <td>{secondCurrency}</td>
              <td><input type="text" onChange={e => setUserInput({ ...userInput, 'days': e.target.value })} value={userInput.days} /></td>
              <td>
                <select onChange={e => setUserInput({ ...userInput, 'tenor': e.target.value })} value={userInput.tenor}>
                  <option value=''></option>
                  <option value='Ready'>Ready</option>
                  <option value='Tom'>Tom</option>
                  <option value='Spot'>Spot</option>
                  <option value='1 week'>1 week</option>
                  <option value='2 week'>2 week</option>
                  <option value='1 month'>1 month</option>
                  <option value='2 month'>2 month</option>
                  <option value='3 month'>3 month</option>
                  <option value='4 month'>4 month</option>
                  <option value='5 month'>5 month</option>
                  <option value='6 month'>6 month</option>
                  <option value='7 month'>7 month</option>
                  <option value='8 month'>8 month</option>
                  <option value='9 month'>9 month</option>
                  <option value='10 month'>10 month</option>
                  <option value='11 month'>11 month</option>
                  <option value='12 month'>12 month</option>
                  <option value='1 year'>1 year</option>
                </select>
              </td>
              <td><input type="text" onChange={e => setUserInput({ ...userInput, 'bid_c11': e.target.value })} value={userInput.bid_c11} /></td>
              <td><input type="text" onChange={e => setUserInput({ ...userInput, 'ask_c11': e.target.value })} value={userInput.ask_c11} /></td>
            </tr>
            {
              filterFields.length ?

                data.map((object) => (
                  isFilter(object) ?
                    <tr key={object["id"]}>
                      <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                      {columns[0].display && <td>{object["ccy_1"]}</td>}
                      {columns[1].display && <td>{object["ccy_2"]}</td>}
                      {columns[2].display && <td><input type="text" onChange={e => onChangeHandler(e, 'days', object)} onBlur={() => onUpdate(object)} value={object["days"]} /></td>}
                      {columns[3].display && <td>{object["tenor"]}</td>}
                      {columns[4].display && <td><input type="text" onChange={e => onChangeHandler(e, 'bid', object)} onBlur={() => onUpdate(object)} value={object["bid_c11"]} /></td>}
                      {columns[5].display && <td><input type="text" onChange={e => onChangeHandler(e, 'ask', object)} onBlur={() => onUpdate(object)} value={object["ask_c11"]} /></td>}
                    </tr>
                    : null
                ))

                : data.map((object) => (
                  <tr key={object["id"]}>
                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                    {columns[0].display && <td>{object["ccy_1"]}</td>}
                    {columns[1].display && <td>{object["ccy_2"]}</td>}
                    {columns[2].display && <td><input type="text" onChange={e => onChangeHandler(e, 'days', object)} onBlur={() => onUpdate(object)} value={object["days"]} /></td>}
                    {columns[3].display && <td>{object["tenor"]}</td>}
                    {columns[4].display && <td><input type="text" onChange={e => onChangeHandler(e, 'bid', object)} onBlur={() => onUpdate(object)} value={object["bid_c11"]} /></td>}
                    {columns[5].display && <td><input type="text" onChange={e => onChangeHandler(e, 'ask', object)} onBlur={() => onUpdate(object)} value={object["ask_c11"]} /></td>}
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default BiddingRates