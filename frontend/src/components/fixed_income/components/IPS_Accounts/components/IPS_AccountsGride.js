import { dateFormatter, timestampFormatter } from '../../../../santasoft/components/Formatter'

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

function IPS_AccountsGride({ user, setFloatForm, account, setUserInput, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState('empty')

  const [sort, setSort] = useState('empty')

  const [columns, setColumns] = useState([
    {
      label: 'Account No.',
      accessor: 'account_number',
      display: true,
      sortable: true
    },
    {
      label: 'Prefix',
      accessor: 'account_prefix',
      display: true,
      sortable: true
    },
    {
      label: 'Title',
      accessor: 'account_title',
      display: true,
      sortable: true
    },
    {
      label: 'AMC',
      accessor: 'amc',
      display: true,
      sortable: true
    },
    {
      label: 'Opening date',
      accessor: 'opening_date',
      display: true,
      sortable: true
    },
    {
      label: 'Closing date',
      accessor: 'closing_date',
      display: true,
      sortable: true
    },
    {
      label: 'Type',
      accessor: 'type',
      display: true,
      sortable: true
    },
    {
      label: 'Exeption',
      accessor: 'exeption',
      display: true,
      sortable: true
    },
    {
      label: 'Taxation',
      accessor: 'taxation',
      display: true,
      sortable: true
    },
    {
      label: 'Resident',
      accessor: 'resident',
      display: true,
      sortable: true
    },
    {
      label: 'CNIC/NTN',
      accessor: 'cnic_ntn',
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
      label: 'Edit',
      accessor: 'edit',
      display: true,
      sortable: true
    },
    {
      label: 'Audit trail',
      accessor: 'audit_trail',
      display: true,
      sortable: true
    },
  ])

  const [data, setData] = useState([
    {
      "id": null,
      "account_number": null,
      "account_prefix": null,
      "account_title": null,
      "amc": null,
      "opening_date": null,
      "closing_date": null,
      "type": null,
      "exeption": null,
      "taxation": null,
      "resident": null,
      "cnic_ntn": null,
      "status": null,
      "created_by": null,
      "created_date": null,
      "approved_by": null,
      "approved_date": null,
      "last_modified_by": null,
      "last_modified_date": null,
    },
  ])

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sm15/d3JXdnRtaloKFJcfEWp8Ih2hQU9cNCTq66vW5e5ge7so3uJz2h/view/none/' + account + '/none/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/', {
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

  const fetchByID = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sm15/d3JXdnRtaloKFJcfEWp8Ih2hQU9cNCTq66vW5e5ge7so3uJz2h/updating/none/' + account + '/' + id + '/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setUserInput(result.data);
        setFloatForm(true)
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Failed to load due to unauthorized request.',
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
  }, [account, filter, sort, currentPage, pageSize]);

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
    <div className='table-container'>

      {isloading && <Loader margin={'45%'} />}

      {/* Table Title */}
      <div className='table-container-name' style={{ border: 'none', paddingBottom: '4px' }}>
        <p style={{ display: 'inline', cursor: 'pointer', margin: '0px 0px 0px 10px' }}>Accounts</p>
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
                  {columns[0].display && <td>{object["account_number"]}</td>}
                  {columns[1].display && <td>{object["account_prefix"]}</td>}
                  {columns[2].display && <td>{object["account_title"]}</td>}
                  {columns[3].display && <td>{object["amc"]}</td>}
                  {columns[4].display && <td>{dateFormatter(object["opening_date"])}</td>}
                  {columns[5].display && <td>{dateFormatter(object["closing_date"])}</td>}
                  {columns[6].display && <td>{object["type"]}</td>}
                  {columns[7].display && <td>{object["exeption"]}</td>}
                  {columns[8].display && <td>{object["taxation"]}</td>}
                  {columns[9].display && <td>{object["resident"]}</td>}
                  {columns[10].display && <td>{object["cnic_ntn"]}</td>}
                  {columns[11].display && <td>{object["status"]}</td>}
                  {columns[12].display && <td>{object["created_by"]}</td>}
                  {columns[13].display && <td>{timestampFormatter(object["created_date"])}</td>}
                  {columns[14].display && <td>{object["approved_by"]}</td>}
                  {columns[15].display && <td>{timestampFormatter(object["approved_date"])}</td>}
                  {columns[16].display && <td>{object["last_modified_by"]}</td>}
                  {columns[17].display && <td>{timestampFormatter(object["last_modified_date"])}</td>}
                  {(columns[18].display && object["closing_date"] === null) ? <td><div className='transaction-grid-multiple-button' style={{ backgroundColor: '#213af3' }} onClick={() => fetchByID(object["id"])}>Edit</div></td>
                    : <td><div className='transaction-grid-multiple-button' style={{ backgroundColor: '#bababa', cursor: 'not-allowed' }}>Edit</div></td>}
                  {columns[19].display && <td style={{ cursor: 'pointer', textDecoration: 'underline', textAlign: 'center' }}>view</td>}
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default IPS_AccountsGride