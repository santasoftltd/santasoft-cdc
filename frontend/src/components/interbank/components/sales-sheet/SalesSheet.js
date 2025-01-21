import { dateFormatter, formatter } from '../../../santasoft/components/Formatter'

import sortImgae from '../../../santasoft/res/sort.png'
import sortUpImgae from '../../../santasoft/res/sort-up.png'
import sortDownImgae from '../../../santasoft/res/sort-down.png'
import downloadImgae from '../../../santasoft/res/download.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../santasoft/components/loader/Loader'
import DatePicker from '../../../santasoft/components/DatePicker'

import TableSummary from '../../../santasoft/components/table/TableSummary'
import TableActions from '../../../santasoft/components/table/TableActions'
import TableHeader from '../../../santasoft/components/table/TableHeader'

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../App'

import './SalesSheet.css'

function SalesSheet({ user, refresh, date, setDate, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState('empty')

  const [sort, setSort] = useState('empty')

  const [currency, setCurrency] = useState('All')

  const [currenciesList, setCurrenciesList] = useState(['All'])

  const [columns, setColumns] = useState([
    {
      label: 'Deal date',
      accessor: 'deal_date',
      display: true,
      sortable: true
    },
    {
      label: 'Dealer',
      accessor: 'dealer',
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
      accessor: 'yours',
      display: true,
      sortable: true
    },
    {
      label: 'Mine',
      accessor: 'mine',
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
      label: 'Fwd. rate',
      accessor: 'fwd_rate',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity',
      accessor: 'maturity',
      display: true,
      sortable: true
    },
    {
      label: 'DTM',
      accessor: 'dtm',
      display: true,
      sortable: true
    },
    {
      label: 'Reval rate',
      accessor: 'reval_rate',
      display: true,
      sortable: true
    },
    {
      label: 'Gain/Loss',
      accessor: 'gain_loss',
      display: true,
      sortable: true
    },
    {
      label: 'Remarks',
      accessor: 'remarks',
      display: true,
      sortable: true
    },
    {
      label: 'Posted',
      accessor: 'ib_auth',
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
      label: 'Product',
      accessor: 'product',
      display: true,
      sortable: true
    },
    {
      label: 'Timestamp',
      accessor: 'timestamp',
      display: true,
      sortable: true
    },
  ])

  const dataSummaryTitles = [
    {
      name: "Total yours: ",
      accessor: "totalYours"
    },
    {
      name: "Total mine: ",
      accessor: "totalMine"
    },
    {
      name: "Net (yours - mine): ",
      accessor: "net_yours_mine"
    },
    {
      name: "Total Gain/Loss: ",
      accessor: "totalGainLoss"
    },
    {
      name: "Total third currency: ",
      accessor: "totalThirdCcy"
    }
  ]

  const [data, setData] = useState([
    {
      "id": null,
      "deal_date": null,
      "dealer": null,
      "ccy": null,
      "yours": null,
      "mine": null,
      "bid_rate": null,
      "offer_rate": null,
      "fwd_rate": null,
      "maturity": null,
      "dtm": null,
      "reval_rate": null,
      "gain_loss": null,
      "remarks": null,
      "ib_auth": null,
      "desk": null,
      "product": null,
      "timestamp": null,
    }
  ])

  const [dataSummary, setDataSummary] = useState({
    "id": 0,
    "totalYours": 0,
    "totalMine": 0,
    "net_yours_mine": 0,
    "totalGainLoss": 0,
    "totalThirdCcy": 0,
    "count": 0,
  })

  useEffect(() => {
    async function fetchAPI2() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe05/2aV2Bxo685o6&AqeHIx06*Ke6u1DxBb8qrKn2lvfT$zp&9e2TYr/' + date + '/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setCurrenciesList(result.data);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Currencies list failed to load due to unauthorized request.',
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
    fetchAPI2()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, date]);

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe05/aV2Bxo685o6&AqeHIx06*Ke6u1DxBb8qrKn2lvfT$zp&9e2TYr/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/' + date + '/0/' + currency + '/none/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setData(result.data);
        setDataSummary(result.summary);
        setDataCount(result.summary.count);
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Blotter grid failed to load due to unauthorized request.',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, refresh, filter, sort, currency]);

  const onChangeHandler = (e, object) => {
    setData(current =>
      current.map(obj => {
        if (obj['id'] === object['id']) {
          return { ...object, 'gain_loss': e.target.value }
        }
        else {
          return obj
        }
      })
    )
  }

  const updateHandler = (object) => {
    if (object['ib_auth'] === 'N    ') {
      onAuthUpdate(object, 'Y    ')
    }
    else {
      onAuthUpdate(object, 'N    ')
    }
  }

  const onUpdate = async (object) => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe05/aV2Bxo685o6&AqeHIx06*Ke6u1DxBb8qrKn2lvfT$zp&9e2TYr/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/' + date + '/' + object['id'] + '/' + currency + '/none/', {
        method: 'PUT',
        // body: JSON.stringify({ ...object, 'ib_auth': auth }),
        body: JSON.stringify({ ...object, 'gain_loss': object['gain_loss'].replace(',', '') }),
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

  const onAuthUpdate = async (object, auth) => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe05/aV2Bxo685o6&AqeHIx06*Ke6u1DxBb8qrKn2lvfT$zp&9e2TYr/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/' + date + '/' + object['id'] + '/' + currency + '/none/', {
        method: 'PUT',
        body: JSON.stringify({ ...object, 'ib_auth': auth }),
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

  const runRevalProcess = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe05/aV2Bxo685o6&AqeHIx06*Ke6u1DxBb8qrKn2lvfT$zp&9e2TYr/empty/empty/empty/0/0/' + date + '/0/' + currency + '/none/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        addMessageHandler({
          title: 'Process completed',
          content: result.message,
          type: 3
        })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Process failed',
          content: 'Blotter grid failed to load due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 406) {
        addMessageHandler({
          title: 'Process failed',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Process failed',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const runGainLossProcess = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe05/aV2Bxo685o6&AqeHIx06*Ke6u1DxBb8qrKn2lvfT$zp&9e2TYr/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/' + date + '/0/' + currency + '/GL/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setData(result.data);
        setDataSummary(result.summary);
        setDataCount(result.summary.count);
        addMessageHandler({
          title: 'Gain/Loss calculated successfully',
          content: result.message,
          type: 3
        })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Blotter grid failed to load due to unauthorized request.',
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
          title: 'Gain/Loss calculation failed',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  // 
  //  Paging 
  // 

  const [pageSize, setPageSize] = useState(100)

  const [currentPage, setCurrentPage] = useState(1);

  const [dataCount, setDataCount] = useState(0);

  // let totolPages = Math.ceil(dataSummary.count / pageSize)

  const onNextPage = () => {
    if (currentPage === dataCount) {
      setCurrentPage(dataCount)
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

  // const getPage = () => {
  //   const firstPageIndex = (currentPage - 1) * pageSize;
  //   const lastPageIndex = firstPageIndex + pageSize;
  //   return fetchedData.slice(firstPageIndex, lastPageIndex);
  // }

  // const [data, setData] = useState(getPage)

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, filter, sort, date, currentPage, pageSize]);

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
      label: 100,
      status: true
    },
    {
      label: 250,
      status: false
    },
    {
      label: 500,
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
        const response = await fetch(ip + '/sfe05/aV2Bxo685o6&AqeHIx06*Ke6u1DxBb8qrKn2lvfT$zp&9e2TYr/' + filter + '/' + sort + '/download/' + currentPage + '/' + pageSize + '/' + date + '/0/' + currency + '/none/', {
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
    "modifiable": false,
    "columns": columns,
    "data": data,
    "deleteHandler": null,
    "eraseHandler": null,
    "submitHandler": null,
    "onDownloadButtonClicked": onDownloadButtonClicked,
    "count": dataCount,
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
    <div className='home'>
      <DatePicker date={date} setDate={setDate} />
      <div className='salam-sheet-sub-home'>
        <div className='table-container'>

          {isloading && <Loader margin={'45%'} />}

          {/* Table Title */}
          {/* <TableTitle title={'TMU sheet'} actions={actions} /> */}

          <div className='table-container-name'>
            <p style={{ display: 'inline' }}>TMU sheet - </p>
            <select style={{ marginLeft: '0px' }} onChange={e => setCurrency(e.target.value)}>
              <option value='All'>All</option>
              {currenciesList.map((item, index) => (
                <option key={index} value={item.ccy}>{item.ccy}</option>
              ))}
            </select>
            <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
            <div className='transaction-grid-button' onClick={() => runRevalProcess()}>Save TMU closings</div>
            <div className='transaction-grid-button' onClick={() => runGainLossProcess()}>Calc. G&L</div>
          </div>

          {/* Table Summary Bar */}
          <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary} display={'inline'} />

          {/* Table Actions Bar */}
          <TableActions actions={actions} />

          {/* Table Data Grid */}
          <div className='table-container-grid'>
            <table>
              <thead>
                <TableHeader columns={columns} getSortingImage={getSortingImage} handleSortingChange={handleSortingChange} />
              </thead>
              <tbody>
                {
                  data.map((object) => (
                    <tr key={object["id"]}>
                      <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                      {columns[0].display && <td>{dateFormatter(object["deal_date"])}</td>}
                      {columns[1].display && <td>{object["dealer"]}</td>}
                      {columns[2].display && <td>{object["ccy"]}</td>}
                      {columns[3].display && <td>{formatter(object["yours"])}</td>}
                      {columns[4].display && <td>{formatter(object["mine"])}</td>}
                      {columns[5].display && <td>{formatter(object["bid_rate"])}</td>}
                      {columns[6].display && <td>{formatter(object["offer_rate"])}</td>}
                      {columns[7].display && <td>{formatter(object["fwd_rate"])}</td>}
                      {columns[8].display && <td>{dateFormatter(object["maturity"])}</td>}
                      {columns[9].display && <td>{object["dtm"]}</td>}
                      {columns[10].display && <td>{formatter(object["reval_rate"])}</td>}
                      {columns[11].display && <td><input type="text" onChange={e => onChangeHandler(e, object)} onBlur={() => onUpdate(object)} value={formatter(object["gain_loss"])} /></td>}
                      {columns[12].display && <td>{object["remarks"]}</td>}
                      {columns[13].display &&
                        <td>
                          <select onChange={() => updateHandler(object)} value={object["ib_auth"]}>
                            <option value='N    '></option>
                            <option value='Y    '>Y</option>
                          </select>
                        </td>}
                      {columns[14].display && <td>{object["desk"]}</td>}
                      {columns[15].display && <td>{object["product"]}</td>}
                      {columns[16].display && <td>{object["timestamp"]}</td>}
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </div>

        </div>
      </div>

    </div>
  )
}

export default SalesSheet