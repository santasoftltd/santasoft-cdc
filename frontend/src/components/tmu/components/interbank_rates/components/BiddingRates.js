import sortImgae from '../../../res/sort.png'
import sortUpImgae from '../../../res/sort-up.png'
import sortDownImgae from '../../../res/sort-down.png'

import '../InterbankRates.css'

import Loader from '../../../../santasoft/components/loader/Loader'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import TableActions from '../../../table/TableActions'
import TableHeader from '../../../table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function BiddingRates({ user, refresh, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [columns, setColumns] = useState([
    {
      label: 'First currency',
      accessor: 'ccy_1',
      display: true,
      sortable: true
    },
    {
      label: 'Second currency',
      accessor: 'ccy_2',
      display: true,
      sortable: true
    },
    {
      label: 'Days',
      accessor: 'days',
      display: true,
      sortable: true
    },
    {
      label: 'Tenor',
      accessor: 'tenor',
      display: true,
      sortable: true
    },
    {
      label: 'Bid',
      accessor: 'bid_c11',
      display: true,
      sortable: true
    },
    {
      label: 'Ask',
      accessor: 'ask_c11',
      display: true,
      sortable: true
    },
  ])

  const [data, setData] = useState([
    {
      "id": null,
      "ccy_1": null,
      "ccy_2": null,
      "days": null,
      "tenor": null,
      "bid_c11": null,
      "ask_c11": null
    }
  ])

  const [firstCurrency, setFirstCurrency] = useState('USD')

  const [secondCurrency, setSecondCurrency] = useState('PKR')

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoading(true);
        const response = await fetch(ip + '/sfe01/kvs0wQeMWIjurTrWP5sE0HAOoSeGUs0F2bcu@2bRsmzg3RtaIi/' + firstCurrency + '/' + secondCurrency + '/TMU/0/', {
          method: 'Get',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + user.token + ''
          },
        });
        setIsLoading(false);

        let result = await response.json();

        if (response.status === 200) {
          setData(result.exchangeRates);
        }

        else if (response.status === 401) {
          addMessageHandler({
            title: 'Unable to load',
            content: 'Bidding rates grid failed to load due to unauthorized request.',
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
  }, [ refresh, firstCurrency, secondCurrency]);

  const [currencies, setCurrencies] = useState([])

  const fetchAPI = async () => {
    try {
      const response = await fetch(ip + '/sfe01/lQF!OFzqLV!1BwK6!BmAyJDvlJCQCcgd41cR!*u3sNMmeOURd7/', {
        method: 'Get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      });

      let result = await response.json();

      if (response.status === 200) {
        setCurrencies(result.currencyList);
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

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFirstCurrencySelect = option => {
    setFirstCurrency(option)
  }

  const onSecondCurrencySelect = option => {
    setSecondCurrency(option)
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
    console.log(filterObject)
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

      {isloading && <Loader margin={'65%'} />}

      {/* Table Title */}
      <div className='table-container-name' style={{ border: 'none' }}>

        <p style={{ display: 'inline' }}>Exchange Rates</p>

        <select onChange={e => onSecondCurrencySelect(e.target.value)} value={secondCurrency} style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%', backgroundColor: '#071e31', color: 'white', fontSize: 'x-small', width: '150px', borderRadius: '10px', textAlign: 'center' }}>
          {currencies.map((item, index) => (
            <option key={index.name} value={item.name}>{item.name}</option>
          ))}
        </select>

        <select onChange={e => onFirstCurrencySelect(e.target.value)} value={firstCurrency} style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%', backgroundColor: '#071e31', color: 'white', fontSize: 'x-small', width: '150px', borderRadius: '10px', textAlign: 'center' }}>
          {currencies.map((item, index) => (
            <option key={index.name} value={item.name}>{item.name}</option>
          ))}
        </select>

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
              filterFields.length ?

                data.map((object, index) => (
                  isFilter(object) ?
                    <tr key={index}>
                      <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                      {columns[0].display && <td>{object["ccy_1"]}</td>}
                      {columns[1].display && <td>{object["ccy_2"]}</td>}
                      {columns[2].display && <td>{object["days"]}</td>}
                      {columns[3].display && <td>{object["tenor"]}</td>}
                      {columns[4].display && <td>{object["bid_c11"]}</td>}
                      {columns[5].display && <td>{object["ask_c11"]}</td>}
                    </tr>
                    : null
                ))

                : data.map((object, index) => (
                  <tr key={index}>
                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                    {columns[0].display && <td>{object["ccy_1"]}</td>}
                    {columns[1].display && <td>{object["ccy_2"]}</td>}
                    {columns[2].display && <td>{object["days"]}</td>}
                    {columns[3].display && <td>{object["tenor"]}</td>}
                    {columns[4].display && <td>{object["bid_c11"]}</td>}
                    {columns[5].display && <td>{object["ask_c11"]}</td>}
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default BiddingRates