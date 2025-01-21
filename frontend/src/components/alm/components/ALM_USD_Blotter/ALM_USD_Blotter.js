import DatePicker from '../../../santasoft/components/DatePicker'

import { formatter, dateFormatter } from '../../../santasoft/components/Formatter'

import downloadImgae from '../../../santasoft/res/download.png'
import sortImgae from '../../../santasoft/res/sort.png'
import sortUpImgae from '../../../santasoft/res/sort.png'
import sortDownImgae from '../../../santasoft/res/sort.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../santasoft/components/loader/Loader'

import TableActions from '../../../santasoft/components/table/TableActions'
import TableSummary from '../../../santasoft/components/table/TableSummary'
import TableHeader from '../../../tmu/table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

import './ALM_USD_Blotter.css'

function ALM_USD_Blotter({ user, refresh, date, setDate, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [columns, setColumns] = useState([
    {
      label: 'Currency',
      accessor: 'ccy',
      display: true,
      sortable: true
    },
    {
      label: 'Nostro account',
      accessor: 'nostro',
      display: true,
      sortable: true
    },
    {
      label: 'Opening',
      accessor: 'opening',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity',
      accessor: 'maturity1',
      display: true,
      sortable: true
    },
    {
      label: 'Ready deals',
      accessor: 'ready_deals1',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity',
      accessor: 'maturity2',
      display: true,
      sortable: true
    },
    {
      label: 'Ready deals',
      accessor: 'ready_deals2',
      display: true,
      sortable: true
    },
    {
      label: 'Misclenous payment',
      accessor: 'misclenous_Payment',
      display: true,
      sortable: true
    },
    {
      label: 'Nostro A/C transfers',
      accessor: 'nostro_transfers',
      display: true,
      sortable: true
    },
    {
      label: 'Import payments',
      accessor: 'import_payments',
      display: true,
      sortable: true
    },
    {
      label: 'Closing balance',
      accessor: 'closing',
      display: true,
      sortable: true
    },
  ])

  const dataSummaryTitles = [
    {
      name: "Total Actual: ",
      accessor: "total_actual"
    },
  ]

  const [data, setData] = useState([
    {
      "id": null,
      "ccy": null,
      "nostro": null,
      "opening": null,
      "maturity1": null,
      "ready_deals1": null,
      "maturity2": null,
      "ready_deals2": null,
      "misclenous_Payment": null,
      "nostro_transfers": null,
      "import_payments": null,
      "closing": null,
    },
  ])

  const [dataSummary, setDataSummary] = useState({
    "id": null,
    "total_actual": 0,
  })

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
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const fileData = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(fileData, fileName + fileExtension);
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
    <div className='home'>

      <DatePicker date={date} setDate={setDate} />

      <div className='alm-usd-blotter-sub-home'>

        <div className='table-container'>

          {isloading && <Loader margin={'45%'} />}

          {/* Table Title */}
          {/* <TableTitle title={'TMU sheet'} actions={actions} /> */}

          <div className='table-container-name'>
            <p style={{ display: 'inline' }}>FCY Blotter</p>
            <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
            {/* <div style={{ float: 'right', marginRight: '8px', marginTop: '0.08%', backgroundColor: '#2196F3', color: 'white', fontSize: 'small', fontWeight: 'bold', width: '120px', borderRadius: '4px', textAlign: 'center', cursor: 'pointer' }} onClick={() => runRevalProcess()}>Save TMU closings</div> */}
            {/* <div style={{ float: 'right', marginRight: '8px', marginTop: '0.08%', backgroundColor: '#2196F3', color: 'white', fontSize: 'small', fontWeight: 'bold', width: '120px', borderRadius: '4px', textAlign: 'center', cursor: 'pointer' }} onClick={() => runGainLossProcess()}>Calc. G&L</div> */}
          </div>

          {/* Table Summary Bar */}
          <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary} display={'inline'} />

          {/* Table Actions Bar */}
          <TableActions actions={actions} />

          {/* Table Data Grid */}
          <div className='table-container-grid'>
            <table>
              <thead>
                <tr>
                  <th style={{ borderBottom: 'none', textAlign: 'center' }}></th>
                  <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                  <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                  <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                  <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Placement / Coupon / Sukuk</th>
                  <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Interbank</th>
                  <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                  <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                  <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                  <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                </tr>
                <TableHeader columns={columns} getSortingImage={getSortingImage} handleSortingChange={handleSortingChange} />
              </thead>
              <tbody>
                {
                  data.map((object) => (
                    <tr key={object["id"]}>
                      <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                      {columns[0].display && <td>{dateFormatter(object["ccy"])}</td>}
                      {columns[1].display && <td>{object["nostro"]}</td>}
                      {columns[2].display && <td>{object["opening"]}</td>}
                      {columns[3].display && <td>{formatter(object["maturity1"])}</td>}
                      {columns[4].display && <td>{dateFormatter(object["ready_deals1"])}</td>}
                      {columns[5].display && <td>{object["maturity2"]}</td>}
                      {columns[6].display && <td>{object["ready_deals2"]}</td>}
                      {columns[7].display && <td>{formatter(object["misclenous_Payment"])}</td>}
                      {columns[8].display && <td>{dateFormatter(object["nostro_transfers"])}</td>}
                      {columns[9].display && <td>{object["import_payments"]}</td>}
                      {columns[10].display && <td>{object["closing"]}</td>}
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

export default ALM_USD_Blotter