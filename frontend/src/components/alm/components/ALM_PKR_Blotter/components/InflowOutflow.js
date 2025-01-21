import { formatter, dateFormatter } from '../../../../santasoft/components/Formatter'

import downloadImgae from '../../../../santasoft/res/download.png'
import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort.png'
import sortDownImgae from '../../../../santasoft/res/sort.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableSummary from '../../../../santasoft/components/table/TableSummary'
import TableActions from '../../../../santasoft/components/table/TableActions'
import TableHeader from '../../../../santasoft/components/table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function InflowOutflow({ user, refresh, date, addMessageHandler, dataSummary, setDataSummary }) {

  const [isloading, setIsLoading] = useState(false)

  const [columns, setColumns] = useState([
    {
      label: 'Date',
      accessor: 'date',
      display: false,
      sortable: true
    },
    {
      label: 'Description',
      accessor: 'description',
      display: true,
      sortable: true
    },
    {
      label: 'Inflow',
      accessor: 'inflow',
      display: true,
      sortable: true
    },
    {
      label: 'Outflow',
      accessor: 'outflow',
      display: true,
      sortable: true
    },
  ])

  const dataSummaryTitles = [
    {
      name: "Total Inflow: ",
      accessor: "total_inflow"
    },
    {
      name: "Total Outflow: ",
      accessor: "total_outflow"
    },
    {
      name: "Net Impact: ",
      accessor: "net_impact"
    },
  ]

  const [data, setData] = useState([
    {
      "id": null,
      "date": null,
      "description": null,
      "inflow": null,
      "outflow": null,
    },
  ])

  // const [dataSummary, setDataSummary] = useState({
  //   "id": null,
  //   "total_inflow": 0,
  //   "total_outflow": 0,
  //   "net_impact": 0,
  // })

  const [userInput, setUserInput] = useState(
    {
      "id": null,
      "date": date,
      "description": '',
      "inflow": '',
      "outflow": '',
    }
  )

  const eraseHandler = () => {
    setUserInput({
      "id": null,
      "date": date,
      "description": '',
      "inflow": '',
      "outflow": '',
    })
  }

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sm01/Q@PP1SXNKQGS384Hbdfp0Rp6NYn8R5B$eutWDX!p4OpEkXaPs@/' + date + '/0/', {
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
    eraseHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, date]);

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sm01/Q@PP1SXNKQGS384Hbdfp0Rp6NYn8R5B$eutWDX!p4OpEkXaPs@/' + date + '/0/', {
        method: 'POST',
        body: JSON.stringify(userInput),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Token ' + user.token + ''
        },
      })
      setIsLoading(false);

      let result = await response.json();

      if (response.status === 200) {
        setData([result.object, ...data]);
        eraseHandler();
        setDataSummary(result.summary);
        addMessageHandler({
          title: 'Saved',
          content: result.message,
          type: 3
        })
      }

      else if (response.status === 400) {
        addMessageHandler({
          title: 'Error: Not Saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 401) {
        addMessageHandler({
          title: 'Error: Not Saved',
          content: 'Unable to saved due to unauthorized request.',
          type: 4
        })
      }

      else if (response.status === 412) {
        addMessageHandler({
          title: 'Error: Not Saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 409) {
        addMessageHandler({
          title: 'Error: Not Saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 406) {
        addMessageHandler({
          title: 'Error: Not Saved',
          content: result.message,
          type: 4
        })
      }

      else if (response.status === 500) {
        addMessageHandler({
          title: 'Error: Not Saved',
          content: result.message,
          type: 4
        })
      }
    }
    catch (err) {
      console.log(err.message);
    }
  };

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
          const response = await fetch(ip + '/sm01/Q@PP1SXNKQGS384Hbdfp0Rp6NYn8R5B$eutWDX!p4OpEkXaPs@/' + date + '/' + selectedRows[0] + '/', {
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
              title: 'Deleted',
              content: result.message,
              type: 3
            });
          }

          else if (response.status === 400) {
            addMessageHandler({
              title: 'Error: Not deleted',
              content: result.message,
              type: 2
            })
          }

          else if (response.status === 401) {
            addMessageHandler({
              title: 'Error: Not deleted',
              content: 'Unable to delete due to unauthorized request.',
              type: 4
            })
          }

          else if (response.status === 404) {
            addMessageHandler({
              title: 'Error: Not deleted',
              content: result.message,
              type: 4
            })
          }

          else if (response.status === 406) {
            addMessageHandler({
              title: 'Error: Not deleted',
              content: result.message,
              type: 4
            })
          }

          else if (response.status === 500) {
            addMessageHandler({
              title: 'Error: Not deleted',
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
    "modifiable": true,
    "columns": columns,
    "data": data,
    "deleteHandler": deleteHandler,
    "eraseHandler": eraseHandler,
    "submitHandler": submitHandler,
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
      {/* <TableTitle title={'TMU sheet'} actions={actions} /> */}

      <div className='table-container-name'>
        <p style={{ display: 'inline' }}>Daily Inflows/Outflows</p>
        <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
      </div>

      {/* Table Summary Bar */}
      <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary} display={'inline'} />

      {/* Table Actions Bar */}
      <TableActions actions={actions} />

      {/* Table Data Grid */}
      <div className='table-container-grid'>
        <table>
          <thead>
            <TableHeader columns={columns} getSortingImage={getSortingImage} handleSortingChange={handleSortingChange} />
          </thead>
          <tbody>
            <tr className='transaction-input' style={{ backgroundColor: 'white' }}>
              <td></td>
              {columns[0].display && <td>{userInput.date}</td>}
              {columns[1].display && <td><input type="text" onChange={e => setUserInput({ ...userInput, 'description': e.target.value })} value={userInput.description} /></td>}
              {columns[2].display && <td><input type="text" onChange={e => setUserInput({ ...userInput, 'inflow': e.target.value })} value={userInput.inflow} /></td>}
              {columns[3].display && <td><input type="text" onChange={e => setUserInput({ ...userInput, 'outflow': e.target.value })} value={userInput.outflow} /></td>}
            </tr>
            {
              data.map((object) => (
                <tr key={object["id"]}>
                  <td><input type='checkbox' onClick={() => onRowSelect(object["id"])}/></td>
                  {columns[0].display && <td>{dateFormatter(object["date"])}</td>}
                  {columns[1].display && <td>{object["description"]}</td>}
                  {columns[2].display && <td>{formatter(object["inflow"])}</td>}
                  {columns[3].display && <td>{formatter(object["outflow"])}</td>}
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default InflowOutflow