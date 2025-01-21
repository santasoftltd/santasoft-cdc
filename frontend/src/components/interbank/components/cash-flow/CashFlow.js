// import sortImgae from '../../../santasoft/res/sort.png'
// import sortUpImgae from '../../../santasoft/res/sort.png'
// import sortDownImgae from '../../../santasoft/res/sort.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../santasoft/components/loader/Loader'
import DatePicker from '../../../santasoft/components/DatePicker'

import CashFlowTables from './components/CashFlowTables';

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../App'

import './CashFlow.css'

function CashFlow({ user, refresh, date, setDate, dropdownLists, addMessageHandler }) {

  const [currencyOne, setCurrencyOne] = useState('USD')

  const [currencyTwo, setCurrencyTwo] = useState('PKR')

  let newDate = new Date(date)

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const monthNumbers = { "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12 };

  const [dataMonths, setDataMonths] = useState([])

  const [dataYears, setDataYears] = useState([])

  const populateDataMonths = () => {
    setDataMonths([])
    let tempArray = [], tempArray2 = []
    let i = newDate.getMonth()
    let j = newDate.getFullYear()
    for (let index = 0; index < 12; index++) {
      if (i === 12) {
        i = 0
        j++
      }
      tempArray.push(i)
      tempArray2.push(j)
      i++;
    }
    setDataMonths(tempArray)
    setDataYears(tempArray2)
  }

  useEffect(() => {
    populateDataMonths()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const getMonthNumber = (x) => {
    if (x == null) {
      let month = new Date(date)
      return month.getMonth() + 1;
    }
    else {
      let j
      j = monthNumbers[x];
      if (j >= 1 && j <= 9) {
        return "-0" + j.toString() + "-"
      }
      else {
        return "-" + j.toString() + "-"
      }
    }
  }

  const getMonth = () => {
    let year = new Date(date)
    return year.getMonth() + 1;
  }

  const getYear = () => {
    let year = new Date(date)
    return year.getFullYear();
  }

  const [year, setYear] = useState(getYear())

  const [monthNumber, setMonthNumber] = useState(getMonth())

  useEffect(() => {
    setYear(getYear());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    setMonthNumber(getMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const [isloading, setIsLoading] = useState(false)

  const [columns, setColumns] = useState([
    {
      label: 'Date',
      accessor: 'date',
      display: true,
      sortable: false
    },
    {
      label: '1st ccy.',
      accessor: 'ccy1',
      display: true,
      sortable: false
    },
    {
      label: '2nd ccy.',
      accessor: 'ccy2',
      display: true,
      sortable: false
    },
    {
      label: 'Outflow',
      accessor: 'outflow',
      display: true,
      sortable: false
    },
    {
      label: 'Inflow',
      accessor: 'inflow',
      display: false,
      sortable: false
    },
  ])

  // const dataSummaryTitles = [
  //   {
  //     name: "Total profit",
  //     accessor: "totalProfit"
  //   },
  //   {
  //     name: "Total spread",
  //     accessor: "totalSpread"
  //   }
  // ]

  const [data, setData] = useState([
    // {
    //   "id": null,
    //   "date": null,
    //   "ccy1": null,
    //   "ccy2": null,
    //   "outflow": null,
    //   "inflow": null,
    // }
  ])

  // const [dataSummary, setDataSummary] = useState({
  //   "id": 0,
  //   "totalProfit": 0,
  //   "totalSpread": 0
  // })

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe05/hNQDY27UjuWK!6tFXLQuDKosBYXx&Qa0mPtQCI7O4NKd0S6zvo/' + year + '/' + monthNumber + '/' + currencyOne + '/' + currencyTwo + '/', {
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
        // setDataSummary(result.summary);
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
  }, [refresh, year, monthNumber, currencyOne, currencyTwo]);

  // 
  //  Selecting Rows 
  // 

  // const [selectedRows, setSelectedRows] = useState([])

  // const onRowSelect = id => {
  //   if (selectedRows.includes(id)) {
  //     setSelectedRows(current =>
  //       current.filter(row => {
  //         return row !== id;
  //       }),
  //     );
  //   }
  //   else {
  //     setSelectedRows([...selectedRows, id])
  //   }
  // }

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

  // const [sortField, setSortField] = useState("");
  // const [order, setOrder] = useState("asc");

  // const handleSortingChange = (accessor) => {
  //   const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
  //   setSortField(accessor);
  //   setOrder(sortOrder);
  //   handleSorting(accessor, sortOrder);
  // };

  // const handleSorting = (sortField, sortOrder) => {
  //   if (sortField) {
  //     const sorted = [...data].sort((a, b) => {
  //       if (a[sortField] === null) return 1;
  //       if (b[sortField] === null) return -1;
  //       if (a[sortField] === null && b[sortField] === null) return 0;
  //       return (
  //         a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
  //           numeric: true,
  //         }) * (sortOrder === "asc" ? 1 : -1)
  //       );
  //     });
  //     setData(sorted);
  //   }
  // };

  // const getSortingImage = (object) => {
  //   const image = object.sortable
  //     ? sortField === object.accessor && order === "asc"
  //       ? sortUpImgae
  //       : sortField === object.accessor && order === "desc"
  //         ? sortDownImgae
  //         : sortImgae
  //     : sortImgae;
  //   return image;
  // }

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

  // const isFilter = (rowObject) => {
  //   var filter = false
  //   filterFields.map((filterObject) => {
  //     if (rowObject[filterObject.accessor] !== null) {
  //       if (filterObject[filterObject.accessor] === rowObject[filterObject.accessor].toString()) {
  //         filter = true
  //         return filter
  //       }
  //     }
  //     return null
  //   })
  //   return filter
  // }

  // 
  //   Download
  // 

  const onDownloadButtonClicked = async () => {
    let fileName = 'santasoft - ' + new Date()
    // if (selectedRows.length) {
    //   const selectedBlotter = data.filter(obj => {
    //     return selectedRows.includes(obj['id'])
    //   })
    //   const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    //   const fileExtension = ".xlsx";
    //   const ws = XLSX.utils.json_to_sheet(selectedBlotter);
    //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    //   const fileData = new Blob([excelBuffer], { type: fileType });
    //   FileSaver.saveAs(fileData, fileName + fileExtension);
    // }
    // else {
    //   const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    //   const fileExtension = ".xlsx";
    //   const ws = XLSX.utils.json_to_sheet(data);
    //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    //   const fileData = new Blob([excelBuffer], { type: fileType });
    //   FileSaver.saveAs(fileData, fileName + fileExtension);
    // }
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(fileData, fileName + fileExtension);
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
    "selectedRows": null,
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

      <div className='currencyBlock' >
        <p style={{ display: 'inline' }}>1st ccy: </p>
        <select onChange={e => setCurrencyOne(e.target.value)} value={currencyOne} style={{ marginLeft: '5px', float: 'right', marginRight: '10px', marginBottom: '0.1%', backgroundColor: '#071e31', color: 'white', fontSize: 'x-small', width: '70px', borderRadius: '10px', border: 'none', textAlign: 'center' }}>
          {
            dropdownLists.currency.map((item, key) => {
              return <option key={key} value={item.name}>{item.name}</option>
            })
          }
        </select>

        <p style={{ display: 'inline' }}>2nd ccy: </p>
        <select onChange={e => setCurrencyTwo(e.target.value)} value={currencyTwo} style={{ marginLeft: '5px', float: 'right', marginRight: '10px', marginBottom: '0.1%', backgroundColor: '#071e31', color: 'white', fontSize: 'x-small', width: '70px', borderRadius: '10px', border: 'none', textAlign: 'center' }}>
          {
            dropdownLists.currency.map((item, key) => {
              return <option key={key} value={item.name}>{item.name}</option>
            })
          }
        </select>
      </div>

      <div className='cash-flow-sub-home'>

        {isloading && <Loader margin={'45%'} />}

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[0]]} year={dataYears[0]} monthNumber={getMonthNumber(months[dataMonths[0]])} />

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[1]]} year={dataYears[1]} monthNumber={getMonthNumber(months[dataMonths[1]])} />

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[2]]} year={dataYears[2]} monthNumber={getMonthNumber(months[dataMonths[2]])} />

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[3]]} year={dataYears[3]} monthNumber={getMonthNumber(months[dataMonths[3]])} />

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[4]]} year={dataYears[4]} monthNumber={getMonthNumber(months[dataMonths[4]])} />

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[5]]} year={dataYears[5]} monthNumber={getMonthNumber(months[dataMonths[5]])} />

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[6]]} year={dataYears[6]} monthNumber={getMonthNumber(months[dataMonths[6]])} />

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[7]]} year={dataYears[7]} monthNumber={getMonthNumber(months[dataMonths[7]])} />

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[8]]} year={dataYears[8]} monthNumber={getMonthNumber(months[dataMonths[8]])} />

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[9]]} year={dataYears[9]} monthNumber={getMonthNumber(months[dataMonths[9]])} />

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[10]]} year={dataYears[10]} monthNumber={getMonthNumber(months[dataMonths[10]])} />

        <CashFlowTables columns={columns} data={data} actions={actions} month={months[dataMonths[11]]} year={dataYears[11]} monthNumber={getMonthNumber(months[dataMonths[11]])} />

      </div>

    </div>
  )
}

export default CashFlow