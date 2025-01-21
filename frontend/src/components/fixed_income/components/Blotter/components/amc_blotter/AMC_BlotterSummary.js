import { formatter, dateFormatter } from '../../../../../santasoft/components/Formatter'

import sortImgae from '../../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../../santasoft/res/sort-up.png'
import sortDownImgae from '../../../../../santasoft/res/sort-down.png'

import downloadImgae from '../../../../../santasoft/res/download.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../../santasoft/components/loader/Loader'

import TableHeader from '../../../../../santasoft/components/table/TableHeader'

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../../App'

function AMC_BlotterSummary({ user, date, account, setAccount, status, setStatus, addMessageHandler }) {
  
    const [isloading, setIsLoading] = useState(false)
  
    const columns = [
      {
        label: 'Date',
        accessor: 'date',
        display: true,
        sortable: true
      },
      {
        label: 'NOP',
        accessor: 'nop',
        display: true,
        sortable: true
      },
      {
        label: 'Same day deals',
        accessor: 'same_day_deals',
        display: true,
        sortable: true
      },
      {
        label: 'TMU ready deals',
        accessor: 'tmu_ready_deals',
        display: true,
        sortable: true
      },
      {
        label: 'TMU squaring',
        accessor: 'tmu_squring',
        display: true,
        sortable: true
      },
      {
        label: 'Spot total',
        accessor: 'spot_total',
        display: true,
        sortable: true
      },
      {
        label: 'Interbank MTM',
        accessor: 'interbank_mtm',
        display: true,
        sortable: true
      },
      {
        label: 'TMU Fwd.',
        accessor: 'tmu_fwd',
        display: true,
        sortable: true
      },
      {
        label: 'TMU take up loss',
        accessor: 'tmu_take_up_loss',
        display: true,
        sortable: true
      },
      {
        label: 'Bai salam income PKR',
        accessor: 'bai_salam_income_pkr',
        display: true,
        sortable: true
      },
      {
        label: 'Fwd. total',
        accessor: 'fwd_total',
        display: true,
        sortable: true
      },
      {
        label: 'Total',
        accessor: 'total',
        display: true,
        sortable: true
      },
    ]
  
    const [data, setData] = useState([
      {
        "id": null,
        "date": null,
        "nop": null,
        "same_day_deals": null,
        "tmu_ready_deals": null,
        "tmu_squring": null,
        "spot_total": null,
        "interbank_mtm": null,
        "tmu_fwd": null,
        "tmu_take_up_loss": null,
        "bai_salam_income_pkr": null,
        "fwd_total": null,
        "total": null,
      },
    ])
  
    // const fetchAPI = async () => {
    //     try {
    //         setIsLoading(true);
    //         const response = await fetch(ip + '/sfe05/RgKbULTbGgD*NGAEv*07xE2!2ISyVB5ur$*2HZ9Rs0&U0oYfj8/' + year + '/' + monthNumber + '/', {
    //             method: 'Get',
    //             headers: {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //                 'Authorization': 'Token ' + user.token + ''
    //             },
    //         });
    //         setIsLoading(false);
  
    //         let result = await response.json();
  
    //         if (response.status === 200) {
    //             setData(result.data);
    //         }
  
    //         else if (response.status === 401) {
    //             addMessageHandler({
    //                 title: 'Unable to load',
    //                 content: 'Blotter grid failed to load due to unauthorized request.',
    //                 type: 4
    //             })
    //         }
  
    //         else if (response.status === 406) {
    //             addMessageHandler({
    //                 title: 'Unable to load',
    //                 content: result.message,
    //                 type: 4
    //             })
    //         }
  
    //         else if (response.status === 500) {
    //             addMessageHandler({
    //                 title: 'Unable to load',
    //                 content: result.message,
    //                 type: 4
    //             })
    //         }
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }
  
    // useEffect(() => {
    //     fetchAPI();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [refresh, year, monthNumber]);
  
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
      "allColumns": null,
      "columnExpand": null,
      "onExpandButtonClicked": null,
      "onExpandSelectClicked": null,
      "filterFields": null,
      "onFilterSelect": null,
      "onFilterItemDelete": null,
    }
  
    return (
      <div className='table-container' style={{gridColumnStart:'1', gridColumnEnd:'4', gridRowStart:'2', gridRowEnd:'4'}}>

        {/* Table Title */}
        <div className='table-container-name' style={{ border: 'none', paddingBottom: '4px' }}>
          <p style={{ display: 'inline', cursor:'pointer', margin:'0px 0px 0px 10px' }}>Summary</p>
          {/* <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div> */}
        </div>
  
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
                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                    {columns[0].display && <td>{dateFormatter(object["date"])}</td>}
                    {columns[1].display && <td>{formatter(object["nop"])}</td>}
                    {columns[2].display && <td>{formatter(object["same_day_deals"])}</td>}
                    {columns[3].display && <td>{formatter(object["tmu_ready_deals"])}</td>}
                    {columns[4].display && <td>{formatter(object["tmu_squring"])}</td>}
                    {columns[5].display && <td>{formatter(object["spot_total"])}</td>}
                    {columns[6].display && <td>{formatter(object["interbank_mtm"])}</td>}
                    {columns[7].display && <td>{formatter(object["tmu_fwd"])}</td>}
                    {columns[8].display && <td>{formatter(object["tmu_take_up_loss"])}</td>}
                    {columns[9].display && <td>{formatter(object["bai_salam_income_pkr"])}</td>}
                    {columns[10].display && <td>{formatter(object["fwd_total"])}</td>}
                    {columns[11].display && <td>{formatter(object["total"])}</td>}
                  </tr>
                ))
              }
            </tbody>
          </table>
  
        </div>
      </div>
    )
  }

export default AMC_BlotterSummary