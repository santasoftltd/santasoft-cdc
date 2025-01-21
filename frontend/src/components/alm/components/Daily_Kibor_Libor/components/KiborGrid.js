import { formatter, dateFormatter } from '../../../../santasoft/components/Formatter'

import downloadImgae from '../../../../santasoft/res/download.png'
import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort.png'
import sortDownImgae from '../../../../santasoft/res/sort.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableHeader from '../../../../santasoft/components/table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function KiborGrid({ user, refresh, date, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const [columns, setColumns] = useState([
    {
      label: 'Date',
      accessor: 'date',
      display: true,
      sortable: true
    },
    {
      label: 'Week 1',
      accessor: 'week_1',
      display: true,
      sortable: true
    },
    {
      label: 'Week 2',
      accessor: 'week_2',
      display: true,
      sortable: true
    },
    {
      label: 'Month 1',
      accessor: 'month_1',
      display: true,
      sortable: true
    },
    {
      label: 'Month 2',
      accessor: 'month_2',
      display: true,
      sortable: true
    },
    {
      label: 'Month 3',
      accessor: 'month_3',
      display: true,
      sortable: true
    },
    {
      label: 'Month 6',
      accessor: 'month_6',
      display: true,
      sortable: true
    },
    {
      label: 'Month 9',
      accessor: 'month_9',
      display: true,
      sortable: true
    },
    {
      label: 'Month 12',
      accessor: 'month_12',
      display: true,
      sortable: true
    },
    {
      label: 'Year 2',
      accessor: 'year_2',
      display: true,
      sortable: true
    },
    {
      label: 'Year 3',
      accessor: 'year_3',
      display: true,
      sortable: true
    },
  ])

  const [data, setData] = useState([
    {
      "id": null,
      "date": null,
      "week_1": null,
      "week_2": null,
      "month_1": null,
      "month_2": null,
      "month_3": null,
      "month_6": null,
      "month_9": null,
      "month_12": null,
      "year_2": null,
      "year_3": null,
    },
  ])

  // const fetchAPI = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(ip + '/sm01/Y3PB6Hb74E9zW$CPKs3YwL4sBDdC8irt4FwZVT4Hkq0P1*Aigm/' + date + '/', {
  //       method: 'Get',
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //         'Authorization': 'Token ' + user.token + ''
  //       },
  //     });
  //     setIsLoading(false);

  //     let result = await response.json();

  //     if (response.status === 200) {
  //       setData(result.data);
  //       // setDataSummary(result.summary);
  //     }

  //     else if (response.status === 401) {
  //       addMessageHandler({
  //         title: 'Unable to load',
  //         content: 'Blotter grid failed to load due to unauthorized request.',
  //         type: 4
  //       })
  //     }

  //     else if (response.status === 406) {
  //       addMessageHandler({
  //         title: 'Unable to load',
  //         content: result.message,
  //         type: 4
  //       })
  //     }

  //     else if (response.status === 500) {
  //       addMessageHandler({
  //         title: 'Unable to load',
  //         content: result.message,
  //         type: 4
  //       })
  //     }
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   fetchAPI();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [refresh, date]);

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

  return (
    <div className='table-container'>

      {isloading && <Loader margin={'45%'} />}

      {/* Table Title */}
      <div className='table-container-name' style={{borderBottom: 'none'}}>
        <p style={{ display: 'inline' }}>Daily KIBOR</p>
        <div style={{ float: 'right', marginRight: '10px', marginTop: '0.2%' }}><img onClick={() => onDownloadButtonClicked(data, selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
      </div>

      {/* Table Summary Bar */}
      {/* <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary} display={'inline'} /> */}

      {/* Table Data Grid */}
      <div className='table-container-grid'>
        <table>
          <thead>
            <TableHeader columns={columns} getSortingImage={getSortingImage} handleSortingChange={handleSortingChange} />
          </thead>
          <tbody>
            {data.map((object) => (
              <tr key={object["id"]}>
                <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                {columns[0].display && <td>{dateFormatter(object["date"])}</td>}
                {columns[1].display && <td>{formatter(object["week_1"])}</td>}
                {columns[2].display && <td>{formatter(object["week_2"])}</td>}
                {columns[3].display && <td>{formatter(object["month_1"])}</td>}
                {columns[4].display && <td>{formatter(object["month_2"])}</td>}
                {columns[5].display && <td>{formatter(object["month_3"])}</td>}
                {columns[6].display && <td>{formatter(object["month_6"])}</td>}
                {columns[7].display && <td>{formatter(object["month_9"])}</td>}
                {columns[8].display && <td>{formatter(object["month_12"])}</td>}
                {columns[9].display && <td>{formatter(object["year_2"])}</td>}
                {columns[10].display && <td>{formatter(object["year_3"])}</td>}
              </tr>
            ))
            }
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default KiborGrid