import DualDatePicker from '../../../DualDatePicker'

import sortImgae from '../../../res/sort.png'
import sortUpImgae from '../../../res/sort-up.png'
import sortDownImgae from '../../../res/sort-down.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import TableHeader from '../../../table/TableHeader'
import TableActions from '../../../table/TableActions'
import React from 'react'

import Loader from '../../../../santasoft/components/loader/Loader'

import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

function CustomerSpreadGrid({ user, refresh, date, addMessageHandler }) {

  const [fromDate, setFromDate] = useState(date)

  const [toDate, setToDate] = useState(date)

  const [isloading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState('empty')

  const [sort, setSort] = useState('empty')

  const [columns, setColumns] = useState([
    {
      label: 'CIF',
      accessor: 'cif',
      display: true,
      sortable: true
    },
    {
      label: 'Customer name',
      accessor: 'customer',
      display: true,
      sortable: true
    },
    {
      label: 'Currency',
      accessor: 'currency',
      display: true,
      sortable: true
    },
    {
      label: 'Export',
      accessor: 'Export',
      display: true,
      sortable: true
    },
    {
      label: 'Import',
      accessor: 'Import',
      display: true,
      sortable: true
    },
    {
      label: 'Forward sale',
      accessor: 'ForwardSale',
      display: true,
      sortable: true
    },
    {
      label: 'Forward purchase',
      accessor: 'ForwardPurchase',
      display: true,
      sortable: true
    },
    {
      label: 'FE-25 Export',
      accessor: 'FE25Export',
      display: true,
      sortable: true
    },
    {
      label: 'FE-25 Import',
      accessor: 'FE25Import',
      display: true,
      sortable: true
    },
    {
      label: 'Inverse remittance',
      accessor: 'InverseRemittance',
      display: true,
      sortable: true
    },
    {
      label: 'Outverse remittance',
      accessor: 'OutverseRemittance',
      display: true,
      sortable: true
    },
    {
      label: 'Bai-Salam K',
      accessor: 'BaiSalamK',
      display: true,
      sortable: true
    },
    {
      label: 'Bai-Salam L',
      accessor: 'BaiSalamL',
      display: true,
      sortable: true
    },
    {
      label: 'Usance-Mubaraha K',
      accessor: 'UsanceMubarahaK',
      display: true,
      sortable: true
    },
    {
      label: 'Usance-Mubaraha L',
      accessor: 'UsanceMubarahaL',
      display: true,
      sortable: true
    }
  ])

  const [data, setData] = useState([
    {
      "cif": null,
      "customer": null,
      "currency": null,
      "Export": null,
      "Import": null,
      "ForwardSale": null,
      "BaiSalamK": null,
      "ForwardPurchase": null,
      "FE25Export": null,
      "FE25Import": null,
      "InverseRemittance": null,
      "OutverseRemittance": null,
      "BaiSalamL": null,
      "UsanceMubarahaK": null,
      "UsanceMubarahaL": null
    }
  ])

  const [count, setCount] = useState(0)

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe01/Hyvs35J7ZyZxauaFg415qwrbGMJ1V@E7Ai&HEK8F&ghJLYX2uv/' + fromDate + '/' + toDate + '/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/', {
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
        setCount(result.count.count);
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
  };

  useEffect(() => {
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, fromDate, toDate, filter, sort]);

  // 
  //  Paging 
  // 

  const [pageSize, setPageSize] = useState(50)

  const [currentPage, setCurrentPage] = useState(1);

  // let totolPages = Math.ceil(count / pageSize)

  const onNextPage = () => {
    if (currentPage === count) {
      setCurrentPage(count)
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
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  // useEffect(() => {
  //     totolPages = Math.ceil(count / pageSize)
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [count]);

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
      label: 50,
      status: true
    },
    {
      label: 100,
      status: false
    },
    {
      label: 150,
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

  const onRowSelect = cif => {
    if (selectedRows.includes(cif)) {
      setSelectedRows(current =>
        current.filter(row => {
          return row !== cif;
        }),
      );
    }
    else {
      setSelectedRows([...selectedRows, cif])
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
        return selectedRows.includes(obj['cif'])
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
        const response = await fetch(ip + '/sfe01/Hyvs35J7ZyZxauaFg415qwrbGMJ1V@E7Ai&HEK8F&ghJLYX2uv/' + fromDate + '/' + toDate + '/' + filter + '/' + sort + '/download/' + currentPage + '/' + pageSize + '/', {
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
    "count": count,
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

      <DualDatePicker toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate} />

      {/* Table Title */}
      <div style={{ borderBottom: 'none' }} className='table-container-name'>
        <p>Customers spread</p>
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
                  <td><input type='checkbox' onClick={() => onRowSelect(object["cif"])} style={{ cursor: 'pointer' }} /></td>
                  {columns[0].display && <td>{object["cif"]}</td>}
                  {columns[1].display && <td>{object["customer"]}</td>}
                  {columns[2].display && <td>{object["currency"]}</td>}
                  {columns[3].display && <td>{object["Export"]}</td>}
                  {columns[4].display && <td>{object["Import"]}</td>}
                  {columns[5].display && <td>{object["ForwardSale"]}</td>}
                  {columns[6].display && <td>{object["ForwardPurchase"]}</td>}
                  {columns[7].display && <td>{object["FE25Export"]}</td>}
                  {columns[8].display && <td>{object["FE25Import"]}</td>}
                  {columns[9].display && <td>{object["InverseRemittance"]}</td>}
                  {columns[10].display && <td>{object["OutverseRemittance"]}</td>}
                  {columns[11].display && <td>{object["BaiSalamK"]}</td>}
                  {columns[12].display && <td>{object["BaiSalamL"]}</td>}
                  {columns[13].display && <td>{object["UsanceMubarahaK"]}</td>}
                  {columns[14].display && <td>{object["UsanceMubarahaL"]}</td>}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomerSpreadGrid