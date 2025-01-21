import sortImgae from '../../../res/sort.png'
import sortUpImgae from '../../../res/sort-up.png'
import sortDownImgae from '../../../res/sort-down.png'

import Loader from '../../../../santasoft/components/loader/Loader'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { dateFormatter } from '../../../../../Formatter'

import ForwardInput from './ForwardInput'

import TableTitle from '../../../table/TableTitle'
import TableSummary from '../../../table/TableSummary'
import TableActions from '../../../table/TableActions'
import TableHeader from '../../../table/TableHeader'
import ForwardDataGridTableBody from './ForwardDataGridTableBody'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function ForwardDataGrid({ user, rootDeal, date, dataSummary, fetchedData, forwardId, setRootDeal, setDataSummary, setFetchedData, dropdownLists, filter, setFilter, sort, setSort, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [userInput, setUserInput] = useState(
    {
      "id": null,
      "ttdate": dateFormatter(date),
      "c_rem_4": '',
      "take_up_amount": '',
      "nostro": '',
      "cancel_amount": '',
      "c_rate": '',
      "c_rem_3": '',
      "take_up_date_days": '',
      "lT1": '',
      "lT2": '',
      "lT3": '',
      "lT4": '',
      "lT5": '',
      "lT6": '',
      "lT7": '',
      "lT8": '',
      "validate": '',
      "c_rem_2": ''
    },
  )

  const onInput = (key, value) => {
    if (value === 'Full Take_up') {
      setUserInput({ ...userInput, [key]: value, take_up_amount: rootDeal["remaining_amount"] })
    }
    else {
      setUserInput({ ...userInput, [key]: value })
    }
  }

  const checkIsOptionStarted = (optionDate1) => {
    console.log(optionDate1)
    var optionDate = new Date(optionDate1);
    var takeUpDate = new Date(date);
    console.log(optionDate)
    console.log(takeUpDate)
    if (takeUpDate < optionDate) {
      return false
    }
    else {
      return true
    }
    // console.log((takeUpDate-optionDate).getDays())
  }

  const submitHandler = async () => {
    if (!checkIsOptionStarted(rootDeal.option_date)) {
      addMessageHandler({
        title: 'Error',
        content: 'Option not started.',
        type: 4
      })
    }
    else {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/EjdTE6FnOZHQFkfYE68&sgV2dgIUE3P3bsr2mdXiQVpSUeO0nh/' + filter + '/' + sort + '/empty/' + date + '/forward-maturity-today/' + forwardId + '/', {
          method: 'POST',
          body: JSON.stringify({ ...userInput, 'ttdate': date, 'remaining_amount': rootDeal["remaining_amount"] }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        })
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setFetchedData([result.object, ...fetchedData]);
          setRootDeal(result.parent[0]);
          setDataSummary(result.summary);
          eraseHandler();
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

        else if (response.status === 404) {
          addMessageHandler({
            title: 'Transaction not saved',
            content: result.message,
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
    }

  };

  const eraseHandler = () => {
    setUserInput({
      "id": null,
      "ttdate": dateFormatter(date),
      "c_rem_4": '',
      "take_up_amount": '',
      "nostro": '',
      "cancel_amount": '',
      "c_rate": '',
      "c_rem_3": '',
      "take_up_date_days": '',
      "lT1": '',
      "lT2": '',
      "lT3": '',
      "lT4": '',
      "lT5": '',
      "lT6": '',
      "lT7": '',
      "lT8": '',
      "validate": '',
      "c_rem_2": ''
    })
  }

  const [edit, setEdit] = useState({ column: '', object: { "id": 0 } })

  const onDoubleClickedCell = (column, object) => { setEdit({ column: column, object: object }) }

  const editHandler = (newObject) => { setEdit({ ...edit, object: newObject }) }

  const onUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/EjdTE6FnOZHQFkfYE68&sgV2dgIUE3P3bsr2mdXiQVpSUeO0nh/' + filter + '/' + sort + '/empty/' + date + '/forward-maturity-today/' + forwardId + '/', {
        method: 'PUT',
        body: JSON.stringify({ ...edit.object, 'remaining_amount': rootDeal["remaining_amount"] }),
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
        setRootDeal(result.parent[0]);
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
          const response = await fetch(ip + '/sfe01/EjdTE6FnOZHQFkfYE68&sgV2dgIUE3P3bsr2mdXiQVpSUeO0nh/' + filter + '/' + sort + '/empty/' + date + '/forward-maturity-today/' + forwardId + '/', {
            method: 'DELETE',
            body: JSON.stringify({ "id": selectedRows[0] }),
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
            setRootDeal(result.parent[0]);
            setDataSummary(result.summary);
            setSelectedRows([]);
            addMessageHandler({
              title: 'Transaction Deleted',
              content: result.message,
              type: 3
            });
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
  }

  const [columns, setColumns] = useState([
    {
      label: 'Date',
      accessor: 'ttdate',
      display: true,
      sortable: true
    },
    {
      label: 'Transaction type',
      accessor: 'c_rem_4',
      display: true,
      sortable: true
    },
    {
      label: 'Take-up amount',
      accessor: 'take_up_amount',
      display: true,
      sortable: true
    },
    {
      label: 'Nostro A/C',
      accessor: 'nostro',
      display: true,
      sortable: true
    },
    {
      label: 'Close-out amount',
      accessor: 'cancel_amount',
      display: true,
      sortable: true
    },
    {
      label: 'Close-out rate',
      accessor: 'c_rate',
      display: true,
      sortable: true
    },
    {
      label: 'Export/Import',
      accessor: 'c_rem_3',
      display: true,
      sortable: true
    },
    {
      label: 'Take-up days',
      accessor: 'take_up_date_days',
      display: true,
      sortable: true
    },
    {
      label: 'Deal rate',
      accessor: 'lT1',
      display: true,
      sortable: true
    },
    {
      label: 'Rate',
      accessor: 'blank',
      display: true,
      sortable: false
    },
    {
      label: 'Reval ready',
      accessor: 'lT2',
      display: true,
      sortable: true
    },
    {
      label: 'Gain/Loss',
      accessor: 'lT3',
      display: true,
      sortable: true
    },
    {
      label: 'DTM',
      accessor: 'lT4',
      display: true,
      sortable: true
    },
    {
      label: 'Reval forward rate',
      accessor: 'lT5',
      display: true,
      sortable: true
    },
    {
      label: 'GL rev',
      accessor: 'lT6',
      display: true,
      sortable: true
    },
    {
      label: 'GL bb',
      accessor: 'lT7',
      display: true,
      sortable: true
    },

    {
      label: 'Net impact',
      accessor: 'lT8',
      display: true,
      sortable: true
    },
    {
      label: 'Validate',
      accessor: 'validate',
      display: true,
      sortable: true
    },
    {
      label: 'Remarks',
      accessor: 'c_rem_2',
      display: true,
      sortable: true
    },
  ])

  const dataSummaryTitles = [
    {
      name: "Total take-up",
      accessor: "totalTakeUpAmount"
    },
    {
      name: "Total cancel",
      accessor: "totalCancelAmount"
    },
    {
      name: "Total take-up days",
      accessor: "totalArDays"
    }
  ]

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
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
        const response = await fetch(ip + '/sfe01/EjdTE6FnOZHQFkfYE68&sgV2dgIUE3P3bsr2mdXiQVpSUeO0nh/' + filter + '/' + sort + '/download/none/none/' + forwardId + '/', {
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

      {isloading && <Loader margin={'65%'} />}

      {/* Table Title */}
      <TableTitle title={'Transactions'} />

      {/* Data Summary */}
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
            <ForwardInput userInput={userInput} onInput={onInput} columns={columns} rootDeal={rootDeal} dropdownLists={dropdownLists} submitHandler={submitHandler} />
            {
              data.map((object) => (
                <ForwardDataGridTableBody columns={columns} object={object} editHandler={editHandler} onRowSelect={onRowSelect} edit={edit} onDoubleClickedCell={onDoubleClickedCell} onUpdate={onUpdate} />
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ForwardDataGrid