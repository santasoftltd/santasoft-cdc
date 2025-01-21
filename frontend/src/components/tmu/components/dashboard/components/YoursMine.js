import sortImgae from '../../../res/sort.png'
import sortUpImgae from '../../../res/sort-up.png'
import sortDownImgae from '../../../res/sort-down.png'

import YoursMineInput from './YoursMineInput'

import '../Dashboard.css'

import Loader from '../../../../santasoft/components/loader/Loader'
import { formatter, dateFormatter } from '../../../../../Formatter'
import { numberWithCommas } from '../../../../santasoft/components/Formatter'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import TableSummary from '../../../table/TableSummary'
import TableActions from '../../../table/TableActions'
import TableHeader from '../../../table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function YoursMine({ user, refresh, date, onTableSelect, dropdownLists, loaderPosition, addMessageHandler}) {

  const [isloading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState('empty')

  const [sort, setSort] = useState('empty')

  const [userInput, setUserInput] = useState(
    {
      "id": null,
      "dealer_name": user.name,
      "ccy": '',
      "sell": '',
      "buy": '',
      "bid_rate": '',
      "offer_rate": '',
      "product": '',
      "maturity": '',
      "fwd_rate": '',
      "ib_status": '',
      "desk": '',
      "remarks": 'Normal',
      "ttdate": '',
      "datetime": '',
    }
  )

  const eraseHandler = () => {
    setUserInput({
      "id": null,
      "dealer_name": user.name,
      "ccy": '',
      "sell": '',
      "buy": '',
      "bid_rate": '',
      "offer_rate": '',
      "product": '',
      "maturity": '',
      "fwd_rate": '',
      "ib_status": '',
      "desk": '',
      "remarks": 'Normal',
      "ttdate": '',
      "datetime": '',
    })
  }

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/lejk4bL8kddu*m9mBagSTFf7n2U3Jc8LRLqlhPRwxPBe8H@0NW/' + filter + '/' + sort + '/empty/' + date + '/0/', {
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
        setFetchedData([result.object, ...fetchedData]);
        eraseHandler();
        setDataSummary(result.summary);
        addMessageHandler({
          title: 'Transaction saved',
          content: result.message,
          type: 3
        })
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

  const [edit, setEdit] = useState({ column: '', object: { "id": 0 } })

  const onDoubleClickedCell = (column, object) => { setEdit({ column: column, object: object }) }

  const editHandler = (newObject) => { setEdit({ ...edit, object: newObject }) }

  const onUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/lejk4bL8kddu*m9mBagSTFf7n2U3Jc8LRLqlhPRwxPBe8H@0NW/' + filter + '/' + sort + '/empty/' + date + '/0/', {
        method: 'PUT',
        body: JSON.stringify(edit.object),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setFetchedData(current =>
          current.map(obj => {
            if (obj['id'] === edit.object['id']) {
              return result.object
            }
            else {
              return obj
            }
          })
        );
        setDataSummary(result.summary);
        setEdit({ column: '', object: { "id": 0 } });
        addMessageHandler({
          title: 'Transaction Updated',
          content: result.message,
          type: 3
        });
      }

      else if (response.status === 400) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: 'Unable to update due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 404) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 409) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 406) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 412) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Transaction not updated',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err.message);
    }
  };

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
          const response = await fetch(ip + '/sfe01/lejk4bL8kddu*m9mBagSTFf7n2U3Jc8LRLqlhPRwxPBe8H@0NW/' + filter + '/' + sort + '/empty/' + date + '/' + selectedRows[0] + '/', {
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
            setFetchedData(current =>
              current.filter(obj => obj['id'] !== selectedRows[0]).map(filterData => { return filterData })
            );
            setSelectedRows([]);
            setDataSummary(result.summary);
            addMessageHandler({
              title: 'Transaction Deleted',
              content: result.message,
              type: 3
            });
          }

          else if (response.status === 400) {
            addMessageHandler({
              title: 'Transaction not deleted',
              content: result.message,
              type: 2
            })
          }

          else if (response.status === 401) {
            addMessageHandler({
              title: 'Transaction not deleted',
              content: 'Unable to delete due to unauthorized request.',
              type: 4
            })
          }

          else if (response.status === 404) {
            addMessageHandler({
              title: 'Transaction not deleted',
              content: result.message,
              type: 4
            })
          }

          else if (response.status === 406) {
            addMessageHandler({
              title: 'Transaction not deleted',
              content: result.message,
              type: 4
            })
          }

          else if (response.status === 500) {
            addMessageHandler({
              title: 'Transaction not deleted',
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
  };

  const [columns, setColumns] = useState([
    {
      label: 'Dealer name',
      accessor: 'dealer_name',
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
      label: 'Yours',
      accessor: 'sell',
      display: true,
      sortable: true
    },
    {
      label: 'Mine',
      accessor: 'buy',
      display: true,
      sortable: true
    },
    {
      label: 'Bid',
      accessor: 'bid_rate',
      display: true,
      sortable: true
    },
    {
      label: 'Offer',
      accessor: 'offer_rate',
      display: true,
      sortable: true
    },
    {
      label: 'Product',
      accessor: 'product',
      display: true,
      sortable: true
    },
    {
      label: 'Forward date',
      accessor: 'maturity',
      display: true,
      sortable: true
    },
    {
      label: 'Forward rate',
      accessor: 'fwd_rate',
      display: true,
      sortable: true
    },
    {
      label: 'I/B auth.',
      accessor: 'ib_status',
      display: true,
      sortable: true
    },
    {
      label: 'Desk',
      accessor: 'desk',
      display: true,
      sortable: true
    },
    {
      label: 'Remarks',
      accessor: 'remarks',
      display: true,
      sortable: true
    },
  ])

  const dataSummaryTitles = [
    {
      name: "Total sell",
      accessor: "totalSell"
    },
    {
      name: "Total buy",
      accessor: "totalBuy"
    }
  ]

  const [dataSummary, setDataSummary] = useState({
    "id": 0,
    "totalSell": 0,
    "totalBuy": 0,
    "count": 0
  })

  const [fetchedData, setFetchedData] = useState([
    {
      "id": null,
      "dealer_name": null,
      "ccy": null,
      "sell": null,
      "buy": null,
      "bid_rate": null,
      "offer_rate": null,
      "product": null,
      "maturity": null,
      "fwd_rate": null,
      "ib_status": null,
      "desk": null,
      "remarks": null,
      "ttdate": null,
      "datetime": null,
    }
  ])

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/lejk4bL8kddu*m9mBagSTFf7n2U3Jc8LRLqlhPRwxPBe8H@0NW/' + filter + '/' + sort + '/empty/' + date + '/0/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setFetchedData(result.yoursMine);
        setDataSummary(result.summary);
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Yours/Mine grid failed to load due to unauthorized request.',
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
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAPI();
    let interval = setInterval(() => fetchAPI(), 1000 * 60);
    return function cleanup() {
      clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, filter, sort, date]);

  // 
  //  Paging 
  // 

  const [pageSize, setPageSize] = useState(25)

  const [currentPage, setCurrentPage] = useState(1);

  let totolPages = Math.ceil(dataSummary.count / pageSize)

  const onNextPage = () => {
    if (currentPage === totolPages) {
      setCurrentPage(totolPages)
    }
    else {
      setCurrentPage(currentPage + 1)
    }
  }

  const onPreviousPage = () => {
    if (currentPage === 1) {
      setCurrentPage(1)
    }
    else {
      setCurrentPage(currentPage - 1)
    }
  }

  const getPage = () => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return fetchedData.slice(firstPageIndex, lastPageIndex);
  }

  const [data, setData] = useState(getPage)

  useEffect(() => {
    setData(getPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, fetchedData]);

  const [showPage, setShowPage] = useState(false)

  const onShowPageClicked = () => {
    if (showPage) {
      setShowPage(false)
    }
    else {
      setShowPage(true)
    }
  }

  const [page, setPage] = useState([
    {
      label: 25,
      status: true
    },
    {
      label: 50,
      status: false
    },
    {
      label: 100,
      status: false
    },
  ])

  const pageSizeSelect = (label) => {
    const newState = page.map(obj => {
      if (obj.label === label) {
        return { ...obj, status: true }
      }
      else {
        return { ...obj, status: false }
      }
    })
    setPage(newState)
    setPageSize(label)
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

  const [order, setOrder] = useState("");

  const handleSortingChange = (accessor) => {
    if (order === '') {
      setOrder('asc')
      setSortField(accessor);
    }
    else if (order === 'asc') {
      setOrder('desc')
      setSortField(accessor);
    }
    else if (order === 'desc') {
      setOrder('')
      setSortField('');
    }
  };

  useEffect(() => {
    if (sortField !== '') {
      setSort(sortField + ',' + order)
    }
    else {
      setSort('empty')
    }
  }, [sortField, order]);

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

  useEffect(() => {
    if (filterFields.length) {
      setFilter(filterFields.map((item) => { return item.accessor + ',' + item[item.accessor] }))
    }
    else {
      setFilter('empty')
    }
  }, [filterFields]);

  // 
  //   Download
  // 

  const onDownloadButtonClicked = async () => {
    let fileName = 'santasoft - ' + new Date()
    if (selectedRows.length) {
      const selectedBlotter = data.filter(obj => {
        return selectedRows.includes(obj['id'])
      })
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const ws = XLSX.utils.json_to_sheet(selectedBlotter);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const fileData = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(fileData, fileName + fileExtension);
    }
    else {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/lejk4bL8kddu*m9mBagSTFf7n2U3Jc8LRLqlhPRwxPBe8H@0NW/' + filter + '/' + sort + '/download/' + date + '/0/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);
        let result = await response.json();
        if (response.status === 200) {
          const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          const fileExtension = ".xlsx";
          const ws = XLSX.utils.json_to_sheet(result.data);
          const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
          const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
          const data = new Blob([excelBuffer], { type: fileType });
          FileSaver.saveAs(data, fileName + fileExtension);
        }
        else {
          addMessageHandler({
            title: 'Unable to download',
            content: 'Someting went wrong. Please try agian later.',
            type: 4
          })
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  const actions = {
    "modifiable": true,
    "columns": columns,
    "data": data,
    "deleteHandler": deleteHandler,
    "eraseHandler": eraseHandler,
    "submitHandler": submitHandler,
    "onDownloadButtonClicked": onDownloadButtonClicked,
    "count": dataSummary.count,
    "currentPage": currentPage,
    "page": page,
    "pageSize": pageSize,
    "showPage": showPage,
    "pageSizeSelect": pageSizeSelect,
    "onShowPageClicked": onShowPageClicked,
    "onNextPage": onNextPage,
    "onPreviousPage": onPreviousPage,
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

      {isloading && <Loader margin={loaderPosition} />}

      {/* Table Title */}
      <div className='table-container-name'>
        <select onChange={e => onTableSelect(e.target.value)} value='yours-mine'>
          <option value="forward-maturity-today">Forward maturity today</option>
          <option value="forward-outstanding">Forward outstanding</option>
          <option value="salam-maturity-today">Salam maturity today</option>
          <option value="salam-outstanding">Salam outstanding</option>
          <option value="yours-mine">Yours/Mine</option>
          <option value="obdx">OBDX</option>
        </select>
      </div>

      {/* Table Summary Bar */}
      <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary} />

      {/* Table Actions Bar */}
      <TableActions actions={actions} />

      {/* Table Data Grid */}
      <div className='table-container-grid'>
        <table>
          <thead>
            <TableHeader columns={columns} getSortingImage={getSortingImage} handleSortingChange={handleSortingChange} />
          </thead>
          <tbody>
            <YoursMineInput userInput={userInput} setUserInput={setUserInput} columns={columns} dropdownLists={dropdownLists} submitHandler={submitHandler}/>
            {
              data.map((object) => (

                edit.object.id === object.id
                  ?
                  <tr key={object["id"]}>
                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                    {columns[0].display && <td>{object["dealer_name"]}</td>}
                    {columns[1].display &&
                      <td>{edit.column === columns[1].accessor ?
                        <select className='update-input' style={{ border: '1px solid #1c4966', width: '90%' }} onChange={e => editHandler({ ...edit.object, ccy: e.target.value })} value={edit.object.ccy} onBlur={() => onUpdate()}>
                          {
                            dropdownLists.currency.map((item, key) => {
                              return <option key={key} value={item.name}>{item.name}</option>
                            })
                          }
                        </select>
                        : object.ccy}
                      </td>
                    }
                    {columns[2].display && <td>{edit.column === columns[2].accessor ? <input type="text" className='update-input' style={{ border: '1px solid #1c4966', width: '90%' }} onChange={e => editHandler({ ...edit.object, sell: e.target.value })} value={numberWithCommas(edit.object.sell)} onBlur={() => onUpdate()} /> : formatter(object.sell)}</td>}
                    {columns[3].display && <td>{edit.column === columns[3].accessor ? <input type="text" className='update-input' style={{ border: '1px solid #1c4966', width: '90%' }} onChange={e => editHandler({ ...edit.object, buy: e.target.value })} value={numberWithCommas(edit.object.buy)} onBlur={() => onUpdate()} /> : formatter(object.buy)}</td>}
                    {columns[4].display && <td>{edit.column === columns[4].accessor ? <input type="text" className='update-input' style={{ border: '1px solid #1c4966', width: '90%' }} onChange={e => editHandler({ ...edit.object, bid_rate: e.target.value })} value={edit.object.bid_rate} onBlur={() => onUpdate()} /> : formatter(object.bid_rate)}</td>}
                    {columns[5].display && <td>{edit.column === columns[5].accessor ? <input type="text" className='update-input' style={{ border: '1px solid #1c4966', width: '90%' }} onChange={e => editHandler({ ...edit.object, offer_rate: e.target.value })} value={edit.object.offer_rate} onBlur={() => onUpdate()} /> : formatter(object.offer_rate)}</td>}
                    {columns[6].display &&
                      <td>{edit.column === columns[6].accessor ?
                        <select className='update-input' style={{ border: '1px solid #1c4966', width: '90%' }} onChange={e => editHandler({ ...edit.object, product: e.target.value })} value={edit.object.product} onBlur={() => onUpdate()}>
                          {
                            dropdownLists.product.map((item, key) => {
                              return <option key={key} value={item.name}>{item.name}</option>
                            })
                          }
                        </select>
                        : object.product}
                      </td>
                    }
                    {columns[7].display && <td>{edit.column === columns[7].accessor ? <input type="date" className='update-input' style={{ border: '1px solid #1c4966', width: '90%' }} onChange={e => editHandler({ ...edit.object, maturity: e.target.value })} value={edit.object.maturity} onBlur={() => onUpdate()} /> : dateFormatter(object.maturity)}</td>}
                    {columns[8].display && <td>{edit.column === columns[8].accessor ? <input type="text" className='update-input' style={{ border: '1px solid #1c4966', width: '90%' }} onChange={e => editHandler({ ...edit.object, fwd_rate: e.target.value })} value={edit.object.fwd_rate} onBlur={() => onUpdate()} /> : formatter(object.fwd_rate)}</td>}
                    {columns[9].display && <td>{object["ib_status"]}</td>}
                    {columns[10].display && <td>{object["desk"]}</td>}
                    {columns[11].display &&
                      <td>{edit.column === columns[11].accessor ?
                        <select className='update-input' style={{ border: '1px solid #1c4966', width: '90%' }} onChange={e => editHandler({ ...edit.object, remarks: e.target.value })} value={edit.object.remarks} onBlur={() => onUpdate()}>
                          <option value='Normal'>Normal</option>
                          <option value='Cross'>Cross</option>
                        </select>
                        : object.remarks}
                      </td>
                    }
                  </tr>
                  :
                  <tr key={object["id"]}>
                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                    {columns[0].display && <td>{object["dealer_name"]}</td>}
                    {columns[1].display && <td onDoubleClick={() => onDoubleClickedCell(columns[1].accessor, object)}>{object["ccy"]}</td>}
                    {columns[2].display && <td onDoubleClick={() => onDoubleClickedCell(columns[2].accessor, object)}>{formatter(object["sell"])}</td>}
                    {columns[3].display && <td onDoubleClick={() => onDoubleClickedCell(columns[3].accessor, object)}>{formatter(object["buy"])}</td>}
                    {columns[4].display && <td onDoubleClick={() => onDoubleClickedCell(columns[4].accessor, object)}>{formatter(object["bid_rate"])}</td>}
                    {columns[5].display && <td onDoubleClick={() => onDoubleClickedCell(columns[5].accessor, object)}>{formatter(object["offer_rate"])}</td>}
                    {columns[6].display && <td onDoubleClick={() => onDoubleClickedCell(columns[6].accessor, object)}>{object["product"]}</td>}
                    {columns[7].display && <td onDoubleClick={() => onDoubleClickedCell(columns[7].accessor, object)}>{dateFormatter(object["maturity"])}</td>}
                    {columns[8].display && <td onDoubleClick={() => onDoubleClickedCell(columns[8].accessor, object)}>{formatter(object["fwd_rate"])}</td>}
                    {columns[9].display && <td>{object["ib_status"]}</td>}
                    {columns[10].display && <td>{object["desk"]}</td>}
                    {columns[11].display && <td onDoubleClick={() => onDoubleClickedCell(columns[11].accessor, object)}>{object["remarks"]}</td>}
                  </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default YoursMine