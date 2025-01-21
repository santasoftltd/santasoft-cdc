import { formatter, dateFormatter, timestampFormatter } from '../../../../santasoft/components/Formatter'

import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort-up.png'
import sortDownImgae from '../../../../santasoft/res/sort-down.png'

import downloadImgae from '../../../../santasoft/res/download.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableHeader from '../../../../santasoft/components/table/TableHeader'
import TableActions from '../../../../santasoft/components/table/TableActions'

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

function SecurityTransactionGride({ user, fromDate, toDate, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState('empty')

  const [sort, setSort] = useState('empty')

  const columns = [
    {
      label: 'Transaction ID',
      accessor: 'transaction_id',
      display: true,
      sortable: true
    },
    {
      label: 'FMS ID',
      accessor: 'fms_transaction_id',
      display: true,
      sortable: true
    },
    {
      label: 'Account number',
      accessor: 'account_number',
      display: true,
      sortable: true
    },
    {
      label: 'Account prefix',
      accessor: 'account_prefix',
      display: false,
      sortable: true
    },
    {
      label: 'Account title',
      accessor: 'account_title',
      display: true,
      sortable: true
    },
    {
      label: 'Managed by',
      accessor: 'account_manager',
      display: true,
      sortable: true
    },
    {
      label: 'Counter party',
      accessor: 'counter_party',
      display: true,
      sortable: true
    },
    {
      label: 'Security code',
      accessor: 'security_code',
      display: true,
      sortable: true
    },
    {
      label: 'Security',
      accessor: 'security',
      display: true,
      sortable: true
    },
    {
      label: 'Settlement date',
      accessor: 'settlement_date',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity sate',
      accessor: 'maturity_date',
      display: true,
      sortable: true
    },
    {
      label: 'Transanction type',
      accessor: 'transanction_type',
      display: true,
      sortable: true
    },
    {
      label: 'Sale amount',
      accessor: 'sale_amount',
      display: true,
      sortable: true
    },
    {
      label: 'Purchase amount',
      accessor: 'purchase_amount',
      display: true,
      sortable: true
    },
    {
      label: 'Settlement amount',
      accessor: 'settlement_amount',
      display: true,
      sortable: true
    },
    {
      label: 'SBP charges',
      accessor: 'sbp_charges',
      display: true,
      sortable: true
    },
    {
      label: 'Status',
      accessor: 'status',
      display: true,
      sortable: true
    },
    {
      label: 'Created by',
      accessor: 'created_by',
      display: true,
      sortable: true
    },
    {
      label: 'Created date',
      accessor: 'created_date',
      display: true,
      sortable: true
    },
    {
      label: 'Approved by',
      accessor: 'approved_by',
      display: true,
      sortable: true
    },
    {
      label: 'Approved date',
      accessor: 'approved_date',
      display: true,
      sortable: true
    },
    {
      label: 'Last modified by',
      accessor: 'last_modified_by',
      display: true,
      sortable: true
    },
    {
      label: 'Last modified date',
      accessor: 'last_modified_date',
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
      label: 'Audit trail',
      accessor: 'audit_trail',
      display: true,
      sortable: true
    },
  ]

  const [data, setData] = useState([
    // {
    //   "id": null,
    //   "transaction_id": null,
    //   "fms_transaction_id": null,
    //   "account_number": null,
    //   "account_prefix": null,
    //   "account_title": null,
    //   "account_manager": null,
    //   "counter_party": null,
    //   "security_code": null,
    //   "security": null,
    //   "settlement_date": null,
    //   "maturity_date": null,
    //   "transanction_type": null,
    //   "sale_amount": null,
    //   "purchase_amount": null,
    //   "settlement_amount": null,
    //   "sbp_charges": null,
    //   "status": null,
    //   "created_by": null,
    //   "created_date": null,
    //   "approved_by": null,
    //   "approved_date": null,
    //   "last_modified_by": null,
    //   "last_modified_date": null,
    //   "remarks": null,
    // },
  ])

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sm15/k0uYlauWY@Kay0@fMPn*faC!KgPa9Rs4m@&vUkY&3tnfeTM6U2/view/none/' + fromDate + '/' + toDate + '/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/', {
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
        setDataCount(result.count.count);
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

  // useEffect(() => {
  //     fetchAPI();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [refresh, year, monthNumber]);

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

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate, filter, sort, currentPage, pageSize]);

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
        const response = await fetch(ip + '/sfe05/WCfYb@p4WFqNCMjl6O!Si4bCYOH6NWlrB88wXYC8m$L*Cho&UP/' + filter + '/' + sort + '/download/' + currentPage + '/' + pageSize + '/' + date + '/' + currencyOne + '/' + currencyTwo + '/', {
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
    "allColumns": null,
    "columnExpand": null,
    "onExpandButtonClicked": onExpandButtonClicked,
    "onExpandSelectClicked": onExpandSelectClicked,
    "filterFields": filterFields,
    "onFilterSelect": onFilterSelect,
    "onFilterItemDelete": onFilterItemDelete,
  }

  return (
    <div className='table-container' style={{ gridRowStart: '3', gridColumnStart: '1', gridColumnEnd: '3' }}>

      {isloading && <Loader margin={'45%'} />}
      
      {/* Table Title */}
      <div className='table-container-name' style={{ border: 'none', paddingBottom: '4px' }}>
        <p style={{ display: 'inline', cursor: 'pointer' }}>Blotter</p>
        {/* <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div> */}
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
            {
              data.map((object, index) => (
                <tr key={index}>
                  <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                  {columns[0].display && <td>{object["transaction_id"]}</td>}
                  {columns[1].display && <td>{object["fms_transaction_id"]}</td>}
                  {columns[2].display && <td>{object["account_number"]}</td>}
                  {columns[3].display && <td>{object["account_prefix"]}</td>}
                  {columns[4].display && <td>{object["account_title"]}</td>}
                  {columns[5].display && <td>{object["account_manager"]}</td>}
                  {columns[6].display && <td>{object["counter_party"]}</td>}
                  {columns[7].display && <td>{object["security_code"]}</td>}
                  {columns[8].display && <td>{object["security"]}</td>}
                  {columns[9].display && <td>{dateFormatter(object["settlement_date"])}</td>}
                  {columns[10].display && <td>{dateFormatter(object["maturity_date"])}</td>}
                  {columns[11].display && <td>{object["transanction_type"]}</td>}
                  {columns[12].display && <td>{formatter(object["sale_amount"])}</td>}
                  {columns[13].display && <td>{formatter(object["purchase_amount"])}</td>}
                  {columns[14].display && <td>{formatter(object["settlement_amount"])}</td>}
                  {columns[15].display && <td>{formatter(object["sbp_charges"])}</td>}
                  {columns[16].display && <td>{object["status"]}</td>}
                  {columns[17].display && <td>{object["created_by"]}</td>}
                  {columns[18].display && <td>{timestampFormatter(object["created_date"])}</td>}
                  {columns[19].display && <td>{object["approved_by"]}</td>}
                  {columns[20].display && <td>{timestampFormatter(object["approved_date"])}</td>}
                  {columns[21].display && <td>{object["last_modified_by"]}</td>}
                  {columns[22].display && <td>{timestampFormatter(object["last_modified_date"])}</td>}
                  {columns[23].display && <td>{object["remarks"]}</td>}
                  {columns[24].display && <td style={{ cursor: 'pointer', textDecoration: 'underline', textAlign: 'center' }}>view</td>}
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default SecurityTransactionGride