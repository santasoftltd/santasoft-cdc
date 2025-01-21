import sortImgae from '../../res/sort.png'
import sortUpImgae from '../../res/sort-up.png'
import sortDownImgae from '../../res/sort-down.png'

import './SalamSheet.css'

import Loader from '../../../santasoft/components/loader/Loader'
import { formatter, dateFormatter } from '../../../../Formatter'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import TableSummary from '../../table/TableSummary'
import TableActions from '../../table/TableActions'

import DatePicker from '../../DatePicker'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../App'

function SalamSheet({ user, refresh, date, setDate, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState('empty')

  const [sort, setSort] = useState('empty')

  const onUpdate = async (object, value) => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/YOdEcu9Nsxo7Yj9xBX5tmpA!7*Imaz1h*4wTdC6sctW9EgjWJO/' + filter + '/' + sort + '/empty/' + salamSheet + '/0/0/' + date + '/0/', {
        method: 'PUT',
        body: JSON.stringify({ ...object, 'take_close': value }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setData(current =>
          current.filter(obj => obj['id'] !== object['id']).map(filterData => { return filterData })
        );
        setDataSummary(result.summary);
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
          const response = await fetch(ip + '/sfe01/YOdEcu9Nsxo7Yj9xBX5tmpA!7*Imaz1h*4wTdC6sctW9EgjWJO/' + filter + '/' + sort + '/empty/' + salamSheet + '/0/0/' + date + '/' + selectedRows[0] + '/', {
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
      label: 'Days (OD)',
      accessor: 'days_',
      display: true,
      sortable: true
    },
    {
      label: 'Customer name',
      accessor: 'c_name',
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
      label: 'Starting days',
      accessor: 'days',
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
      label: 'Norl./Cross',
      accessor: 'n_c',
      display: true,
      sortable: true
    },
    {
      label: 'Export',
      accessor: 'export',
      display: true,
      sortable: true
    },
    {
      label: 'Import',
      accessor: 'importt',
      display: true,
      sortable: true
    },
    {
      label: 'Deal rate',
      accessor: 'deal_rate',
      display: true,
      sortable: true
    },
    {
      label: 'Branch',
      accessor: 'branch',
      display: true,
      sortable: true
    },
    {
      label: 'Deal date',
      accessor: 'ttdate',
      display: true,
      sortable: true
    },
    {
      label: 'Value date',
      accessor: 'vdate',
      display: true,
      sortable: true
    },
    {
      label: 'Remarks',
      accessor: 'take_close',
      display: true,
      sortable: false
    },
    {
      label: 'Maturity date',
      accessor: 'matured_date',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity days',
      accessor: 'matured_date_days',
      display: true,
      sortable: true
    },
    {
      label: 'Salam yield',
      accessor: 'salam_yield',
      display: true,
      sortable: true
    },
    {
      label: 'Current salam yield',
      accessor: 'cur_salam_yield',
      display: true,
      sortable: true
    },
    {
      label: 'Close out date',
      accessor: 'take_up_date',
      display: true,
      sortable: true
    },
    {
      label: 'Realization days',
      accessor: 'take_up_date_days',
      display: true,
      sortable: true
    },
    {
      label: 'Amt. I/B rate',
      accessor: 'amt_i_b_rate',
      display: true,
      sortable: true
    },
    {
      label: 'Amt. 3rd ccy. cross',
      accessor: 'amt_3rd_ccy_cross',
      display: true,
      sortable: true
    },
    {
      label: 'Amt. I/B premium',
      accessor: 'amt_i_b_prem',
      display: true,
      sortable: true
    },
    {
      label: 'Amt. 3rd ccy. premium',
      accessor: 'amt_3rd_ccy_prem',
      display: true,
      sortable: true
    },
  ])

  const dataSummaryTitles = [
    {
      name: "Total export",
      accessor: "totalExport"
    },
    {
      name: "Total import",
      accessor: "totalImport"
    }
  ]

  const [dataSummary, setDataSummary] = useState({
    "id": 0,
    "totalExport": 0,
    "totalImport": 0,
    "count": 0
  })

  const [data, setData] = useState([
    {
      "id": null,
      "c_name": null,
      "product": null,
      "days": null,
      "ccy": null,
      "n_c": null,
      "export": null,
      "importt": null,
      "deal_rate": null,
      "branch": null,
      "ttdate": null,
      "vdate": null,
      "take_close": null,
      "matured_date": null,
      "matured_date_days": null,
      "salam_yield": null,
      "cur_salam_yield": null,
      "take_up_date": null,
      "take_up_date_days": null,
      "amt_i_b_rate": null,
      "amt_3rd_ccy_cross": null,
      "amt_i_b_prem": null,
      "amt_3rd_ccy_prem": null
    }
  ])

  const [salamSheet, setSalamSheet] = useState('over-due')

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/YOdEcu9Nsxo7Yj9xBX5tmpA!7*Imaz1h*4wTdC6sctW9EgjWJO/' + filter + '/' + sort + '/empty/' + salamSheet + '/' + currentPage + '/' + pageSize + '/' + date + '/0/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setData(result.salamSheet);
        setDataSummary(result.summary);
        setDataCount(result.summary.count);
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Unable to load',
          content: 'Salam sheet grid failed to load due to unauthorized request.',
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
  };

  // 
  //  Paging 
  // 

  const [pageSize, setPageSize] = useState(100);

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
  //   return data.slice(firstPageIndex, lastPageIndex);
  // }

  // const [data, setData] = useState(getPage)

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, filter, sort, salamSheet, currentPage, pageSize]);

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
      label: 150,
      status: false
    },
    {
      label: 200,
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
        const response = await fetch(ip + '/sfe01/YOdEcu9Nsxo7Yj9xBX5tmpA!7*Imaz1h*4wTdC6sctW9EgjWJO/' + filter + '/' + sort + '/download/' + salamSheet + '/' + currentPage + '/' + pageSize + '/' + date + '/0/', {
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
    "eraseHandler": null,
    "submitHandler": null,
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
    <div className='home'>
      {isloading && <Loader margin={'45%'} />}
      <DatePicker date={date} setDate={setDate} />
      <div className='salam-sheet-sub-home'>

        <div className='table-container'>

          {/* Table Title */}
          <div className='table-container-name'>
            {/* Table Title */}
            <div className='table-container-name' style={{ border: 'none' }}>
              <p style={{ display: 'inline' }}>Salam Sheet</p>
              <select onChange={e => setSalamSheet(e.target.value)} value={salamSheet} style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%', backgroundColor: '#071e31', color: 'white', fontSize: 'x-small', width: '150px', borderRadius: '10px', textAlign: 'center' }}>
                <option value="over-due">Over Due</option>
                <option value="matured">Matured</option>
                <option value="take-up">Take-up</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          {/* Table Summary Bar */}
          <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary} />

          {/* Table Actions Bar */}
          <TableActions actions={actions} />

          {/* Table Data Grid */}
          <div className='table-container-grid'>
            <table>
              <thead>
                <th></th>
                {columns[0].display && <th key={columns[0].accessor}> {columns[0].label} <img className='action-pics-sort' src={getSortingImage(columns[0])} onClick={columns[0].sortable ? () => handleSortingChange(columns[0].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[1].display && <th key={columns[1].accessor}> {columns[1].label} <img className='action-pics-sort' src={getSortingImage(columns[1])} onClick={columns[1].sortable ? () => handleSortingChange(columns[1].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[2].display && <th key={columns[2].accessor}> {columns[2].label} <img className='action-pics-sort' src={getSortingImage(columns[2])} onClick={columns[2].sortable ? () => handleSortingChange(columns[2].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[3].display && <th key={columns[3].accessor}> {columns[3].label} <img className='action-pics-sort' src={getSortingImage(columns[3])} onClick={columns[3].sortable ? () => handleSortingChange(columns[3].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[4].display && <th key={columns[4].accessor}> {columns[4].label} <img className='action-pics-sort' src={getSortingImage(columns[4])} onClick={columns[4].sortable ? () => handleSortingChange(columns[4].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[5].display && <th key={columns[5].accessor}> {columns[5].label} <img className='action-pics-sort' src={getSortingImage(columns[5])} onClick={columns[5].sortable ? () => handleSortingChange(columns[5].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[6].display && <th key={columns[6].accessor}> {columns[6].label} <img className='action-pics-sort' src={getSortingImage(columns[6])} onClick={columns[6].sortable ? () => handleSortingChange(columns[6].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[7].display && <th key={columns[7].accessor}> {columns[7].label} <img className='action-pics-sort' src={getSortingImage(columns[7])} onClick={columns[7].sortable ? () => handleSortingChange(columns[7].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[8].display && <th key={columns[8].accessor}> {columns[8].label} <img className='action-pics-sort' src={getSortingImage(columns[8])} onClick={columns[8].sortable ? () => handleSortingChange(columns[8].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[9].display && <th key={columns[9].accessor}> {columns[9].label} <img className='action-pics-sort' src={getSortingImage(columns[9])} onClick={columns[9].sortable ? () => handleSortingChange(columns[9].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[10].display && <th key={columns[10].accessor}> {columns[10].label} <img className='action-pics-sort' src={getSortingImage(columns[10])} onClick={columns[10].sortable ? () => handleSortingChange(columns[10].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[11].display && <th key={columns[11].accessor}> {columns[11].label} <img className='action-pics-sort' src={getSortingImage(columns[11])} onClick={columns[11].sortable ? () => handleSortingChange(columns[11].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[12].display && <th key={columns[12].accessor}> {columns[12].label} <img className='action-pics-sort' src={getSortingImage(columns[12])} onClick={columns[12].sortable ? () => handleSortingChange(columns[12].accessor) : null} title="sort" alt="sort" /></th>}
                {(salamSheet === 'matured' || salamSheet === 'all')
                  &&
                  columns[13].display && <th key={columns[13].accessor}> {columns[13].label} <img className='action-pics-sort' src={getSortingImage(columns[13])} onClick={columns[13].sortable ? () => handleSortingChange(columns[13].accessor) : null} title="sort" alt="sort" /></th>
                }
                {(salamSheet === 'matured' || salamSheet === 'all')
                  &&
                  columns[14].display && <th key={columns[14].accessor}> {columns[14].label} <img className='action-pics-sort' src={getSortingImage(columns[14])} onClick={columns[14].sortable ? () => handleSortingChange(columns[14].accessor) : null} title="sort" alt="sort" /></th>
                }
                {columns[15].display && <th key={columns[15].accessor}> {columns[15].label} <img className='action-pics-sort' src={getSortingImage(columns[15])} onClick={columns[15].sortable ? () => handleSortingChange(columns[15].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[16].display && <th key={columns[16].accessor}> {columns[16].label} <img className='action-pics-sort' src={getSortingImage(columns[16])} onClick={columns[16].sortable ? () => handleSortingChange(columns[16].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[17].display && <th key={columns[17].accessor}> {columns[17].label} <img className='action-pics-sort' src={getSortingImage(columns[17])} onClick={columns[17].sortable ? () => handleSortingChange(columns[17].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[18].display && <th key={columns[18].accessor}> {columns[18].label} <img className='action-pics-sort' src={getSortingImage(columns[18])} onClick={columns[18].sortable ? () => handleSortingChange(columns[18].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[19].display && <th key={columns[19].accessor}> {columns[19].label} <img className='action-pics-sort' src={getSortingImage(columns[19])} onClick={columns[19].sortable ? () => handleSortingChange(columns[19].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[20].display && <th key={columns[20].accessor}> {columns[20].label} <img className='action-pics-sort' src={getSortingImage(columns[20])} onClick={columns[20].sortable ? () => handleSortingChange(columns[20].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[21].display && <th key={columns[21].accessor}> {columns[21].label} <img className='action-pics-sort' src={getSortingImage(columns[21])} onClick={columns[21].sortable ? () => handleSortingChange(columns[21].accessor) : null} title="sort" alt="sort" /></th>}
                {columns[22].display && <th key={columns[22].accessor}> {columns[22].label} <img className='action-pics-sort' src={getSortingImage(columns[22])} onClick={columns[22].sortable ? () => handleSortingChange(columns[22].accessor) : null} title="sort" alt="sort" /></th>}

              </thead>
              <tbody>
                {
                  data.map((object) => (
                    <tr key={object["id"]}>
                      <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                      {columns[0].display && <td></td>}
                      {columns[1].display && <td>{object["c_name"]}</td>}
                      {columns[2].display && <td>{object["product"]}</td>}
                      {columns[3].display && <td>{object["days"]}</td>}
                      {columns[4].display && <td>{object["ccy"]}</td>}
                      {columns[5].display && <td>{object["n_c"]}</td>}
                      {columns[6].display && <td>{formatter(object["export"])}</td>}
                      {columns[7].display && <td>{formatter(object["importt"])}</td>}
                      {columns[8].display && <td>{formatter(object["deal_rate"])}</td>}
                      {columns[9].display && <td>{object["branch"]}</td>}
                      {columns[10].display && <td>{dateFormatter(object["ttdate"])}</td>}
                      {columns[11].display && <td>{dateFormatter(object["vdate"])}</td>}
                      {salamSheet === 'over-due'
                        ?
                        columns[12].display &&
                        <td>
                          <select style={{ width: '100px' }} onChange={e => onUpdate(object, e.target.value)} value={object["take_close"]}>
                            <option value=''></option>
                            <option value='Full Take_up'>Full Take_up</option>
                            <option value='Partial Take_up'>Partial Take_up</option>
                            <option value='Take_up'>Take_up</option>
                            <option value='Over Due'>Over Due</option>
                            <option value='Close Out'>Close Out</option>
                            <option value='Matured'>Matured</option>
                          </select>
                        </td>
                        :
                        columns[12].display && <td>{object["take_close"]}</td>
                      }
                      {(salamSheet === 'matured' || salamSheet === 'all')
                        &&
                        columns[13].display && <td>{dateFormatter(object["matured_date"])}</td>
                      }
                      {(salamSheet === 'matured' || salamSheet === 'all')
                        &&
                        columns[14].display && <td>{object["matured_date_days"]}</td>
                      }
                      {columns[15].display && <td>{formatter(object["salam_yield"])}</td>}
                      {columns[16].display && <td>{formatter(object["cur_salam_yield"])}</td>}
                      {columns[17].display && <td>{dateFormatter(object["take_up_date"])}</td>}
                      {columns[18].display && <td>{object["take_up_date_days"]}</td>}
                      {columns[19].display && <td>{formatter(object["amt_i_b_rate"])}</td>}
                      {columns[20].display && <td>{formatter(object["amt_3rd_ccy_cross"])}</td>}
                      {columns[21].display && <td>{formatter(object["amt_i_b_prem"])}</td>}
                      {columns[22].display && <td>{formatter(object["amt_3rd_ccy_prem"])}</td>}
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

export default SalamSheet