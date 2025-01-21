import { formatter, dateFormatter } from '../../../santasoft/components/Formatter'

import sortImgae from '../../../santasoft/res/sort.png'
import sortUpImgae from '../../../santasoft/res/sort.png'
import sortDownImgae from '../../../santasoft/res/sort.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../santasoft/components/loader/Loader'
import DatePicker from '../../../santasoft/components/DatePicker'

import TableTitle from '../../../santasoft/components/table/TableTitle'
import TableSummary from '../../../santasoft/components/table/TableSummary'
import TableHeader from '../../../santasoft/components/table/TableHeader'

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../App'
import './IncomeFormatOne.css'

function IncomeFormatOne({ user, refresh, date, setDate, addMessageHandler }) {

  const [isloading, setIsLoading] = useState(false)

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getYear = (date) => {
    date = date.split('-')
    return date[0]
  }

  const getMonth = (date) => {
    date = date.split('-')
    return date[1]
  }

  const getMonthName = (date) => {
    date = date.split('-')
    return months[date[1]-1]
  }

  const [year, setYear] = useState(getYear(date))

  const [month, setMonth] = useState(getMonth(date))

  const [monthName, setMonthName] = useState(getMonthName(date))

  useEffect(() => {
    setYear(getYear(date));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    setMonth(getMonth(date));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    setMonthName(getMonthName(date));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

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
      label: 'TMU squring',
      accessor: 'tmu_squring',
      display: true,
      sortable: true
    },
    {
      label: 'Spot income',
      accessor: 'spot_income',
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
      label: 'Fwd. IB MTM',
      accessor: 'fwd_ib_mtm',
      display: true,
      sortable: true
    },
    {
      label: 'Third ccy. cross',
      accessor: 'third_ccy_cross',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity',
      accessor: 'maturity_desk_02',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity',
      accessor: 'maturity_desk_22',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity',
      accessor: 'maturity_desk_23',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity',
      accessor: 'maturity_desk_24',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity',
      accessor: 'maturity_desk_27',
      display: true,
      sortable: true
    },
    {
      label: 'Maturity',
      accessor: 'maturity_desk_28',
      display: true,
      sortable: true
    },
  ]

  const dataSummaryTitles = [
    {
      name: 'NOP: ',
      accessor: 'nop',
    },
    {
      name: 'Same day deals: ',
      accessor: 'same_day_deals',
    },
    {
      name: 'TMU squring: ',
      accessor: 'tmu_squring',
    },
    {
      name: 'Spot income: ',
      accessor: 'spot_income',
    },
    {
      name: 'Spot total: ',
      accessor: 'spot_total',
    },
    {
      name: 'Fwd. IB MTM: ',
      accessor: 'interbank_mtm',
    },
    {
      name: '3rd ccy. cross: ',
      accessor: 'third_ccy_cross',
    },
    {
      name: 'Desk 02: ',
      accessor: 'maturity_desk_02',
    },
    {
      name: 'Desk 22: ',
      accessor: 'maturity_desk_22',
    },
    {
      name: 'Desk 23: ',
      accessor: 'maturity_desk_23',
    },
    {
      name: 'Desk 24: ',
      accessor: 'maturity_desk_24',
    },
    {
      name: 'Desk 27: ',
      accessor: 'maturity_desk_27',
    },
    {
      name: 'Desk 28: ',
      accessor: 'maturity_desk_28',
    },
  ]

  const [data, setData] = useState([
    {
      "id": null,
      "date": null,
      "nop": null,
      "same_day_deals": null,
      "tmu_squring": null,
      "spot_income": null,
      "spot_total": null,
      "interbank_mtm": null,
      "third_ccy_cross": null,
      "maturity_desk_02": null,
      "maturity_desk_22": null,
      "maturity_desk_23": null,
      "maturity_desk_24": null,
      "maturity_desk_27": null,
      "maturity_desk_28": null,
    }
  ])

  const [dataSummary, setDataSummary] = useState({
    "id": 0,
    "nop": 0,
    "same_day_deals": 0,
    "tmu_squring": 0,
    "spot_income": 0,
    "spot_total": 0,
    "interbank_mtm": 0,
    "third_ccy_cross": 0,
    "maturity_desk_02": 0,
    "maturity_desk_22": 0,
    "maturity_desk_23": 0,
    "maturity_desk_24": 0,
    "maturity_desk_27": 0,
    "maturity_desk_28": 0,
  })

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ip + '/sfe05/g4mUmV8blmwd5r75kfZEoanguyknNv5VxBJP03M7psg3zgzwdG/' + year + '/' + month + '/', {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, year, month]);

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
    <div className='home'>
      <DatePicker date={date} setDate={setDate} />
      <div className='income-format-one-sub-home'>
        <div className='table-container'>

          {isloading && <Loader margin={'45%'} />}

          {/* Table Title */}
          <TableTitle title={'Foreign excahnge income flow - ' + monthName + ' ' + year} actions={actions} />

          {/* Table Summary Bar */}
          <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary}  display={'inline'}/>

          {/* Table Data Grid */}
          <div className='table-container-grid'>
            <table>
              <thead>
                <tr>
                  <th style={{ borderBottom: 'none', textAlign: 'center' }}></th>
                  <th style={{ borderBottom: 'none', textAlign: 'center' }}></th>
                  <th colSpan="5" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>FX trading desk - 01</th>
                  <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                  <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                  <th colSpan="1" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Desk 02</th>
                  <th colSpan="1" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Desk 22</th>
                  <th colSpan="1" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Desk 23</th>
                  <th colSpan="1" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Desk 24</th>
                  <th colSpan="1" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Desk 27</th>
                  <th colSpan="1" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Desk 28</th>
                </tr>
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
                      {columns[3].display && <td>{formatter(object["tmu_squring"])}</td>}
                      {columns[4].display && <td>{formatter(object["spot_income"])}</td>}
                      {columns[5].display && <td>{formatter(object["spot_total"])}</td>}
                      {columns[6].display && <td>{formatter(object["interbank_mtm"])}</td>}
                      {columns[7].display && <td>{formatter(object["third_ccy_cross"])}</td>}
                      {columns[8].display && <td>{formatter(object["maturity_desk_02"])}</td>}
                      {columns[9].display && <td>{formatter(object["maturity_desk_22"])}</td>}
                      {columns[10].display && <td>{formatter(object["maturity_desk_23"])}</td>}
                      {columns[11].display && <td>{formatter(object["maturity_desk_24"])}</td>}
                      {columns[12].display && <td>{formatter(object["maturity_desk_27"])}</td>}
                      {columns[13].display && <td>{formatter(object["maturity_desk_28"])}</td>}
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

export default IncomeFormatOne