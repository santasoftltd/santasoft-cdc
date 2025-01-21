import sortImgae from '../../../res/sort.png'
import sortUpImgae from '../../../res/sort-up.png'
import sortDownImgae from '../../../res/sort-down.png'

import '../Dashboard.css'

import { onDownloadButtonClicked } from '../../../Download'

import TableSummary from '../../../table/TableSummary'
import TableActions from '../../../table/TableActions'
import TableHeader from '../../../table/TableHeader'

import { useState,useEffect } from 'react'
import React from 'react'

function OBDX({date, onTableSelect, addMessageHandler}) {

  const [columns, setColumns] = useState([
    {
      label: 'Deal no.',
      accessor: 'dealNo',
      display: true,
      sortable: true
    },
    {
      label: 'Dealer',
      accessor: 'dealer_name',
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
      label: 'Start date',
      accessor: 'vdate',
      display: true,
      sortable: true
    },
    {
      label: 'Deal days',
      accessor: 'days2',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity date',
      accessor: 'vdate2',
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
      label: 'I/B rate',
      accessor: 'i_b_rate',
      display: true,
      sortable: true
    },
    {
      label: '3rd ccy. cross',
      accessor: 'third_ccy_cross',
      display: true,
      sortable: true
    },
    {
      label: 'I/B premium',
      accessor: 'i_b_premium',
      display: true,
      sortable: true
    },
    {
      label: 'Option premium',
      accessor: 'option_premium',
      display: true,
      sortable: true
    },
    {
      label: '3rd ccy premium',
      accessor: 'third_ccy_premium',
      display: true,
      sortable: true
    },
    {
      label: 'Spread',
      accessor: 'spread',
      display: true,
      sortable: true
    },
    {
      label: 'Profit',
      accessor: 'profit',
      display: true,
      sortable: true
    },
    {
      label: 'Branch code',
      accessor: 'branch_code',
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
      label: 'Pkr',
      accessor: 'pkr',
      display: true,
      sortable: true
    },
    {
      label: 'Usd',
      accessor: 'usd',
      display: true,
      sortable: true
    },
    {
      label: 'Value Date',
      accessor: 'ttdate',
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
    },
    {
      name: "Total profit",
      accessor: "totalProfit"
    },
    {
      name: "Total risk income forward",
      accessor: "totalAtRiskIncomeFwd"
    },
    {
      name: "Total risk income salam",
      accessor: "totalAtRiskIncomeSalam"
    },
    {
      name: "Total take-up loss",
      accessor: "totalTakeUpLoss"
    },
    {
      name: "Total pkr",
      accessor: "totalPkr"
    },
    {
      name: "Total usd",
      accessor: "totalUsd"
    },
  ]
  
  // eslint-disable-next-line
  const [dataSummary, setDataSummary] = useState({
    "id": 0,
    "totalExport": 0,
    "totalImport": 0,
    "totalProfit": 0,
    "totalAtRiskIncomeFwd": 0,
    "totalAtRiskIncomeSalam": 0,
    "totalTakeUpLoss": 0,
    "totalPkr": 0,
    "totalUsd": 0,
    "count": 0
  })

  // eslint-disable-next-line
  const [fetchedData, setFetchedData] = useState([
    {
      "id": null,
      "dealer_name": null,
      "c_name": null,
      "product": null,
      "days": null,
      "vdate": null,
      "days2": null,
      "vdate2": null,
      "ccy": null,
      "n_c": null,
      "export": null,
      "importt": null,
      "deal_rate": null,
      "i_b_rate": null,
      "third_ccy_cross": null,
      "i_b_premium": null,
      "option_premium": null,
      "third_ccy_premium": null,
      "spread": null,
      "profit": null,
      "branch_code": null,
      "branch": null,
      "pkr": null,
      "usd": null,
      "ttdate": null,
    }
  ])

  // 
  //  Paging 
  // 

  const [pageSize, setPageSize] = useState(25)

  const [currentPage, setCurrentPage] = useState(1);

  let totolPages = Math.ceil(dataSummary.count/pageSize)

  const onNextPage = () => {
    if (currentPage === totolPages){
      setCurrentPage(totolPages)
    }
    else{
      setCurrentPage(currentPage+1)
    }
  }

  const onPreviousPage = () => {
    if(currentPage === 1){
      setCurrentPage(1)
    }
    else{
      setCurrentPage(currentPage-1)
    }
  }

  const getPage = () => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return fetchedData.slice(firstPageIndex, lastPageIndex);
  }

  const [data, setData] = useState(getPage)

  useEffect(() => {
    // eslint-disable-next-line
    setData(getPage)
    // eslint-disable-next-line
  }, [currentPage, pageSize, fetchedData]);

  const [showPage, setShowPage] = useState(false)
  
  const onShowPageClicked = () => {
    if(showPage){
      setShowPage(false)
    }
    else{
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
      if(obj.label === label) {
        return {...obj, status:true}
      }
      else{
        return {...obj, status:false}
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
    if(selectedRows.includes(id)){
      setSelectedRows(current =>
        current.filter(row => {
          return row !== id;
        }),
      );
    }
    else{
      setSelectedRows([...selectedRows, id])
    }
  }

  // 
  //  Columns Display 
  // 

  const [columnExpand, setColumnExpand] = useState(false)

  const [allColumns, setAllColumns] = useState(true)

  const onExpandSelectClicked = (accessor) => {
    if(accessor === 'all'){
      if(allColumns){
        setAllColumns(false)
      }
      else{
        setAllColumns(true)
      }
      const newState = columns.map(obj => {
        if (allColumns) {
          return {...obj, display:false}
        }
        else{
          return {...obj, display:true}
        }
      })
      setColumns(newState)
    }
    else{
      const newState = columns.map(obj => {
        if (obj.accessor === accessor) {
          if(obj.display){
            return {...obj, display:false}
          }
          else{
            return {...obj, display:true}
          }
        }
        return obj
      })
      setColumns(newState)
    }
  }

  const onExpandButtonClicked = () => {
    if(columnExpand){
      setColumnExpand(false)
    }
    else{
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
    setFilterFields([...filterFields, {label: filterObject.label, accessor: filterObject.accessor, [filterObject.accessor]: value}])
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
      if(rowObject[filterObject.accessor] !== null)
      {
        if (filterObject[filterObject.accessor] === rowObject[filterObject.accessor].toString()) {
          filter = true
          return filter
        }
      }
      return null
    })
    return filter
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

      {/* Table Title */}
      <div className='table-container-name'>
        <select onChange={e => onTableSelect(e.target.value)} value='obdx'>
          <option value="forward-maturity-today">Forward maturity today</option>
          <option value="forward-outstanding">Forward outstanding</option>
          <option value="salam-maturity-today">Salam maturity today</option>
          <option value="salam-outstanding">Salam outstanding</option>
          <option value="yours-mine">Yours/Mine</option>
          <option value="obdx">OBDX</option>
        </select>
      </div>
      
      {/* Table Summary Bar */}
      <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary}/>
      
      {/* Table Actions Bar */}
      <TableActions actions={actions}/>
      
      {/* Table Data Grid */}
      <div className='table-container-grid'>
        <table>
          <thead>
            <TableHeader columns={columns} getSortingImage={getSortingImage} handleSortingChange={handleSortingChange}/>
          </thead>
          <tbody>
            {
              filterFields.length ?
              
              data.map((object,index) =>(
                isFilter(object) ?
                <tr key={index}>
                  <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{cursor:'pointer'}}/></td>
                  {columns[0].display && <td>{object["dealNo"]}</td>}
                  {columns[1].display && <td>{object["dealer_name"]}</td>}
                  {columns[2].display && <td>{object["c_name"]}</td>}
                  {columns[3].display && <td>{object["product"]}</td>}
                  {columns[4].display && <td>{object["days"]}</td>}
                  {columns[5].display && <td>{object["vdate"]}</td>}
                  {columns[6].display && <td>{object["days2"]}</td>}
                  {columns[7].display && <td>{object["vdate2"]}</td>}
                  {columns[8].display && <td>{object["ccy"]}</td>}
                  {columns[9].display && <td>{object["n_c"]}</td>}
                  {columns[10].display && <td>{object["export"]}</td>}
                  {columns[11].display && <td>{object["importt"]}</td>}
                  {columns[12].display && <td>{object["deal_rate"]}</td>}
                  {columns[13].display && <td>{object["i_b_rate"]}</td>}
                  {columns[14].display && <td>{object["third_ccy_cross"]}</td>}
                  {columns[15].display && <td>{object["i_b_premium"]}</td>}
                  {columns[16].display && <td>{object["option_premium"]}</td>}
                  {columns[17].display && <td>{object["third_ccy_premium"]}</td>}
                  {columns[18].display && <td>{object["spread"]}</td>}
                  {columns[19].display && <td>{object["profit"]}</td>}
                  {columns[20].display && <td>{object["branch_code"]}</td>}
                  {columns[21].display && <td>{object["branch"]}</td>}
                  {columns[22].display && <td>{object["pkr"]}</td>}
                  {columns[23].display && <td>{object["usd"]}</td>}
                  {columns[24].display && <td>{object["ttdate"]}</td>}
                </tr>
                : null
              ))

              : data.map((object,index) =>(
                <tr key={index}>
                  <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{cursor:'pointer'}}/></td>
                  {columns[0].display && <td>{object["dealNo"]}</td>}
                  {columns[1].display && <td>{object["dealer_name"]}</td>}
                  {columns[2].display && <td>{object["c_name"]}</td>}
                  {columns[3].display && <td>{object["product"]}</td>}
                  {columns[4].display && <td>{object["days"]}</td>}
                  {columns[5].display && <td>{object["vdate"]}</td>}
                  {columns[6].display && <td>{object["days2"]}</td>}
                  {columns[7].display && <td>{object["vdate2"]}</td>}
                  {columns[8].display && <td>{object["ccy"]}</td>}
                  {columns[9].display && <td>{object["n_c"]}</td>}
                  {columns[10].display && <td>{object["export"]}</td>}
                  {columns[11].display && <td>{object["importt"]}</td>}
                  {columns[12].display && <td>{object["deal_rate"]}</td>}
                  {columns[13].display && <td>{object["i_b_rate"]}</td>}
                  {columns[14].display && <td>{object["third_ccy_cross"]}</td>}
                  {columns[15].display && <td>{object["i_b_premium"]}</td>}
                  {columns[16].display && <td>{object["option_premium"]}</td>}
                  {columns[17].display && <td>{object["third_ccy_premium"]}</td>}
                  {columns[18].display && <td>{object["spread"]}</td>}
                  {columns[19].display && <td>{object["profit"]}</td>}
                  {columns[20].display && <td>{object["branch_code"]}</td>}
                  {columns[21].display && <td>{object["branch"]}</td>}
                  {columns[22].display && <td>{object["pkr"]}</td>}
                  {columns[23].display && <td>{object["usd"]}</td>}
                  {columns[24].display && <td>{object["ttdate"]}</td>}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    
    </div>
  )
}

export default OBDX