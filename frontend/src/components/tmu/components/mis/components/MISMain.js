import sortImgae from '../../../res/sort.png'
import sortUpImgae from '../../../res/sort-up.png'
import sortDownImgae from '../../../res/sort-down.png'

import '../MIS.css'

import Loader from '../../../../santasoft/components/loader/Loader'
import { formatter } from '../../../../../Formatter'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import TableActions from '../../../table/TableActions'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function MISMain({ user, refresh, fromDate, toDate, misCategory, setMISCategory, onMisSpecificSelection, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState('empty')

  const [sort, setSort] = useState('empty')

  const [parentColumns, setParentColumns] = useState([
    {
      label: 'Total',
      accessor: 'total',
      display: true
    },
    {
      label: 'Export',
      accessor: 'export',
      display: true
    },
    {
      label: 'Import',
      accessor: 'import',
      display: true
    },
    {
      label: 'Forward purchase',
      accessor: 'forward_purchase',
      display: true
    },
    {
      label: 'Forward purchase (IERS)',
      accessor: 'forward_purchase_iers',
      display: true
    },
    {
      label: 'Forward sale',
      accessor: 'forward_sale',
      display: true
    },
    {
      label: 'Bai salam (K)',
      accessor: 'bai_salam_k',
      display: true
    },
    {
      label: 'Bai salam (L)',
      accessor: 'bai_salam_l',
      display: true
    },
    {
      label: 'FE 25 (I)',
      accessor: 'fe_25_e1',
      display: true
    },
    {
      label: 'FE 25 (E)',
      accessor: 'fe_25_e2',
      display: true
    },
    {
      label: 'Inv. rem. import',
      accessor: 'inv_rem-import',
      display: true
    },
    {
      label: 'Out. rem. export',
      accessor: 'out_rem-export',
      display: true
    },
  ])

  const [columns, setColumns] = useState([
    {
      label: 'Name',
      accessor: 'name',
      parentAccessor: null,
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'allProfit',
      parentAccessor: 'total',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'allUsd',
      parentAccessor: 'total',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit0',
      parentAccessor: 'export',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'usd0',
      parentAccessor: 'export',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit1',
      parentAccessor: 'import',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'usd1',
      parentAccessor: 'import',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit2',
      parentAccessor: 'forward_purchase',
      display: true,
      sortable: true
    },
    {
      label: 'At risk income',
      accessor: 'at_risk_income2',
      parentAccessor: 'forward_purchase',
      display: true,
      sortable: true
    },
    {
      label: 'Take up loss',
      accessor: 'take_up_loss2',
      parentAccessor: 'forward_purchase',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'usd2',
      parentAccessor: 'forward_purchase',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit10',
      parentAccessor: 'forward_purchase_iers',
      display: true,
      sortable: true
    },
    {
      label: 'At risk income',
      accessor: 'at_risk_income10',
      parentAccessor: 'forward_purchase_iers',
      display: true,
      sortable: true
    },
    {
      label: 'Take up loss',
      accessor: 'take_up_loss10',
      parentAccessor: 'forward_purchase_iers',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'usd10',
      parentAccessor: 'forward_purchase_iers',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit3',
      parentAccessor: 'forward_sale',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'usd3',
      parentAccessor: 'forward_sale',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit4',
      parentAccessor: 'bai_salam_k',
      display: true,
      sortable: true
    },
    {
      label: 'Salam ALM',
      accessor: 'salam_cost4',
      parentAccessor: 'bai_salam_k',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'usd4',
      parentAccessor: 'bai_salam_k',
      display: true,
      sortable: true
    },
    {
      label: 'FBP loss',
      accessor: 'fbp_loss4',
      parentAccessor: 'bai_salam_k',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit5',
      parentAccessor: 'bai_salam_l',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'usd5',
      parentAccessor: 'bai_salam_l',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit6',
      parentAccessor: 'fe_25_e1',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'usd6',
      parentAccessor: 'fe_25_e1',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit7',
      parentAccessor: 'fe_25_e2',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'usd7',
      parentAccessor: 'fe_25_e2',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit8',
      parentAccessor: 'inv_rem-import',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'usd8',
      parentAccessor: 'inv_rem-import',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit9',
      parentAccessor: 'out_rem-export',
      display: true,
      sortable: true
    },
    {
      label: 'Equiv. Usd',
      accessor: 'usd9',
      parentAccessor: 'out_rem-export',
      display: true,
      sortable: true
    },
  ])

  // const [misCategory, setMISCategory] = useState('dealer')

  const misCategories = [
    {
      label: 'Dealer wise',
      value: 'dealer'
    },
    {
      label: 'Customer wise',
      value: 'customer'
    },
    {
      label: 'Region wise',
      value: 'region'
    },
    {
      label: 'Branch wise',
      value: 'branch'
    },
    {
      label: 'Segment wise',
      value: 'segment'
    }
  ]

  const [dataSummary, setDataSummary] = useState({ "count": 0 })

  const onNameSelect = option => {
    onMisSpecificSelection(option)
  }

  const [fetchedData, setFetchedData] = useState([
    {
      "id": null,
      "name": null,
      "allProfit": null,
      "allUsd": null,
      "profit0": null,
      "usd0": null,
      "profit1": null,
      "usd1": null,
      "profit2": null,
      "at_risk_income2": null,
      "take_up_loss2": null,
      "usd2": null,
      "profit10": null,
      "at_risk_income10": null,
      "take_up_loss10": null,
      "usd10": null,
      "profit3": null,
      "usd3": null,
      "profit4": null,
      "salam_cost4": null,
      "usd4": null,
      "fbp_loss4": null,
      "profit5": null,
      "usd5": null,
      "profit6": null,
      "usd6": null,
      "profit7": null,
      "usd7": null,
      "profit8": null,
      "usd8": null,
      "profit9": null,
      "usd9": null
    }
  ])

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/@KXKFSNEsnyqnd2JqtpHXfo5Spd&AFw*G@eK!W7U7CcS*90Px*/' + filter + '/' + sort + '/empty/' + fromDate + '/' + toDate + '/' + misCategory + '/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {

          setFetchedData(result.misOverview);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'MIS overview grid failed to load due to unauthorized request.',
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
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, filter, sort, fromDate, toDate, misCategory]);

  useEffect(() => {
    setDataSummary({ 'count': fetchedData.length })
  }, [fetchedData]);

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

    console.log(accessor)
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
      const newChildState = columns.map(obj => {
        if (obj.parentAccessor === accessor) {
          if (obj.display) {
            return { ...obj, display: false }
          }
          else {
            return { ...obj, display: true }
          }
        }
        return obj
      })
      setColumns(newChildState)
    }

    if (accessor === 'all') {
      if (allColumns) {
        setAllColumns(false)
      }
      else {
        setAllColumns(true)
      }
      const newState = parentColumns.map(obj => {
        if (allColumns) {
          return { ...obj, display: false }
        }
        else {
          return { ...obj, display: true }
        }
      })
      setParentColumns(newState)
    }
    else {
      const newState = parentColumns.map(obj => {
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
      setParentColumns(newState)
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
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const ws = XLSX.utils.json_to_sheet(fetchedData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const fileData = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(fileData, fileName + fileExtension);
      // try {
      //   setIsLoading(true);
      //   const response = await fetch(ip + '/sfe01/@KXKFSNEsnyqnd2JqtpHXfo5Spd&AFw*G@eK!W7U7CcS*90Px*/' + filter + '/' + sort + '/download/' + fromDate + '/' + toDate + '/' + misCategory + '/', {
      //     method: 'Get',
      //     headers: {
      //       'Content-type': 'application/json; charset=UTF-8',
      //       'Authorization': 'Token ' + user.token + ''
      //     },
      //   });
      //   setIsLoading(false);
      //   let result = await response.json();
      //   if (response.status === 200) {
      //     const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      //     const fileExtension = ".xlsx";
      //     const ws = XLSX.utils.json_to_sheet(result.data);
      //     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      //     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      //     const data = new Blob([excelBuffer], { type: fileType });
      //     FileSaver.saveAs(data, fileName + fileExtension);
      //   }
      //   else {
      //     addMessageHandler({
      //       title: 'Unable to download',
      //       content: 'Someting went wrong. Please try agian later.',
      //       type: 4
      //     })
      //   }
      // }
      // catch (err) {
      //   console.log(err);
      // }
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

      {isloading && <Loader margin={'45%'} />}

      {/* Table Title */}
      <div className='table-container-name' style={{ border: 'none' }}>
        <p style={{ display: 'inline' }}>Overview</p>
        <select onChange={e => setMISCategory(e.target.value)} value={misCategory} style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%', backgroundColor: '#071e31', color: 'white', fontSize: 'x-small', width: '150px', borderRadius: '10px', textAlign: 'center' }}>
          {misCategories.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>

      {/* Table Actions Bar */}
      <TableActions actions={actions} />

      {/* Table Data Grid */}
      <div className='table-container-grid'>
        <table>
          <thead>
            <tr>
              <th style={{ borderBottom: 'none', textAlign: 'center' }}></th>
              <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
              {parentColumns[0].display && <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Total</th>}
              {parentColumns[1].display && <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Export</th>}
              {parentColumns[2].display && <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Import</th>}
              {parentColumns[3].display && <th colSpan="4" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Forward purchase</th>}
              {parentColumns[3].display && <th colSpan="4" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Forward purchase (IERS)</th>}
              {parentColumns[4].display && <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Forward sale</th>}
              {parentColumns[5].display && <th colSpan="4" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Bai salam (K)</th>}
              {parentColumns[6].display && <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Bai salam (L)</th>}
              {parentColumns[7].display && <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>FE 25 (I)</th>}
              {parentColumns[8].display && <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>FE 25 (E)</th>}
              {parentColumns[9].display && <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Inv. rem-import</th>}
              {parentColumns[10].display && <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Out. rem-export</th>}
            </tr>

            <tr>
              <th style={{ borderTop: 'none' }}></th>
              {columns.map((object) => (
                <>
                  {object.display &&
                    <th key={object.accessor} style={{ borderLeft: '1px solid rgb(148, 148, 148)' }}>
                      {object.label}
                      <img className='action-pics-sort' src={getSortingImage(object)} onClick={object.sortable ? () => handleSortingChange(object.accessor) : null} title="sort" alt="sort" />
                    </th>}
                </>
              ))}
            </tr>

          </thead>
          <tbody>
            {
              data.map((object, index) => (
                <tr key={index}>
                  <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                  {columns[0].display && <td style={{ color: '#2196F3', cursor: 'pointer' }} onClick={() => onNameSelect(object["name"])}>{object["name"]}</td>}
                  {columns[1].display && <td>{formatter(object["allProfit"])}</td>}
                  {columns[2].display && <td>{formatter(object["allUsd"])}</td>}
                  {columns[3].display && <td>{formatter(object["profit0"])}</td>}
                  {columns[4].display && <td>{formatter(object["usd0"])}</td>}
                  {columns[5].display && <td>{formatter(object["profit1"])}</td>}
                  {columns[6].display && <td>{formatter(object["usd1"])}</td>}
                  {columns[7].display && <td>{formatter(object["profit2"])}</td>}
                  {columns[8].display && <td>{formatter(object["at_risk_income2"])}</td>}
                  {columns[9].display && <td>{formatter(object["take_up_loss2"])}</td>}
                  {columns[10].display && <td>{formatter(object["usd2"])}</td>}
                  {columns[11].display && <td>{formatter(object["profit10"])}</td>}
                  {columns[12].display && <td>{formatter(object["at_risk_income10"])}</td>}
                  {columns[13].display && <td>{formatter(object["take_up_loss10"])}</td>}
                  {columns[14].display && <td>{formatter(object["usd10"])}</td>}
                  {columns[15].display && <td>{formatter(object["profit3"])}</td>}
                  {columns[16].display && <td>{formatter(object["usd3"])}</td>}
                  {columns[17].display && <td>{formatter(object["profit4"])}</td>}
                  {columns[18].display && <td>{formatter(object["salam_cost4"])}</td>}
                  {columns[19].display && <td>{formatter(object["usd4"])}</td>}
                  {columns[20].display && <td>{formatter(object["fbp_loss4"])}</td>}
                  {columns[21].display && <td>{formatter(object["profit5"])}</td>}
                  {columns[22].display && <td>{formatter(object["usd5"])}</td>}
                  {columns[23].display && <td>{formatter(object["profit6"])}</td>}
                  {columns[24].display && <td>{formatter(object["usd6"])}</td>}
                  {columns[25].display && <td>{formatter(object["profit7"])}</td>}
                  {columns[26].display && <td>{formatter(object["usd7"])}</td>}
                  {columns[27].display && <td>{formatter(object["profit8"])}</td>}
                  {columns[28].display && <td>{formatter(object["usd8"])}</td>}
                  {columns[29].display && <td>{formatter(object["profit9"])}</td>}
                  {columns[30].display && <td>{formatter(object["usd9"])}</td>}
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default MISMain