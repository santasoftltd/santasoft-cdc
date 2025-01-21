import sortImgae from '../../../res/sort.png'
import sortUpImgae from '../../../res/sort-up.png'
import sortDownImgae from '../../../res/sort-down.png'

import '../Dashboard.css'

import Loader from '../../../../santasoft/components/loader/Loader'
import { formatter } from '../../../../../Formatter'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import TableTitle from '../../../table/TableTitle'
import TableSummary from '../../../table/TableSummary'
import TableActions from '../../../table/TableActions'
import TableHeader from '../../../table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function Blotter({ user, date, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [columns, setColumns] = useState([
    {
      label: 'Currency',
      accessor: 'ccy',
      display: true,
      sortable: true
    },
    {
      label: 'Export',
      accessor: 'sum_export',
      display: true,
      sortable: true
    },
    {
      label: 'Wt. Avg. (E)',
      accessor: 'wtgBuyAvg',
      display: true,
      sortable: true
    },
    {
      label: 'Import',
      accessor: 'sum_importt',
      display: true,
      sortable: true
    },
    {
      label: 'Wt. Avg. (I)',
      accessor: 'wtgSellAvg',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'sumProfit',
      display: true,
      sortable: true
    },
    {
      label: 'Spread',
      accessor: 'rSpread',
      display: true,
      sortable: true
    },
  ])

  const dataSummaryTitles = [
    {
      name: "Total profit",
      accessor: "totalProfit"
    },
    {
      name: "Total spread",
      accessor: "totalSpread"
    }
  ]

  const [data, setData] = useState([
    {
      "id": null,
      "ccy": null,
      "sum_export": null,
      "wtgBuyAvg": null,
      "sum_importt": null,
      "wtgSellAvg": null,
      "sumProfit": null,
      "rSpread": null
    }
  ])

  const [dataSummary, setDataSummary] = useState({
    "id": 0,
    "totalProfit": 0,
    "totalSpread": 0
  })

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/kr!IskzM4FJkm2QeM@C!gurTtRaFbbetYN29*2faGwQvpaIHcV/' + date + '/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setData(result.blotter);
        setDataSummary(result.summary);
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
    let interval = setInterval(() => fetchAPI(), 1000 * 30);
    return function cleanup() {
      clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

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
    <div className='table-container'>

      {isloading && <Loader margin={'45%'} />}

      {/* Table Title */}
      <TableTitle title={'Blotter'} />

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
            {
              filterFields.length ?
                data.map((object, index) => (
                  isFilter(object) ?
                    <tr key={index}>
                      <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                      {columns[0].display && <td>{object["ccy"]}</td>}
                      {columns[1].display && <td>{formatter(object["sum_export"])}</td>}
                      {columns[2].display && <td>{formatter(object["wtgBuyAvg"])}</td>}
                      {columns[3].display && <td>{formatter(object["sum_importt"])}</td>}
                      {columns[4].display && <td>{formatter(object["wtgSellAvg"])}</td>}
                      {columns[5].display && <td>{formatter(object["sumProfit"])}</td>}
                      {columns[6].display && <td>{formatter(object["rSpread"])}</td>}
                    </tr>
                    : null
                ))
                : data.map((object, index) => (
                  <tr key={index}>
                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                    {columns[0].display && <td>{object["ccy"]}</td>}
                    {columns[1].display && <td>{formatter(object["sum_export"])}</td>}
                    {columns[2].display && <td>{formatter(object["wtgBuyAvg"])}</td>}
                    {columns[3].display && <td>{formatter(object["sum_importt"])}</td>}
                    {columns[4].display && <td>{formatter(object["wtgSellAvg"])}</td>}
                    {columns[5].display && <td>{formatter(object["sumProfit"])}</td>}
                    {columns[6].display && <td>{formatter(object["rSpread"])}</td>}
                  </tr>
                ))
            }
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default Blotter