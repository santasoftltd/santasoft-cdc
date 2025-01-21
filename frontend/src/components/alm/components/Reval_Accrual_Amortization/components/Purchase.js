import { formatter, dateFormatter } from '../../../../santasoft/components/Formatter'

import downloadImgae from '../../../../santasoft/res/download.png'
import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort.png'
import sortDownImgae from '../../../../santasoft/res/sort.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableActions from '../../../../santasoft/components/table/TableActions'
import TableHeader from '../../../../tmu/table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

function Purchase({ user, refresh, date, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [columns, setColumns] = useState([
        {
            label: 'Deal No.',
            accessor: 'deal_no',
            display: true,
            sortable: true
        },
        {
            label: 'Deal Date',
            accessor: 'deal_date',
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
            label: 'Instrument',
            accessor: 'instrument',
            display: true,
            sortable: true
        },
        {
            label: 'Face Value',
            accessor: 'face_value',
            display: true,
            sortable: true
        },
        {
            label: 'Issue Date',
            accessor: 'issue_date',
            display: true,
            sortable: true
        },
        {
            label: 'Maturity',
            accessor: 'maturity',
            display: true,
            sortable: true
        },
        {
            label: 'Original DTM',
            accessor: 'original_dtm',
            display: true,
            sortable: true
        },
        {
            label: 'Yield',
            accessor: 'yield',
            display: true,
            sortable: true
        },
        {
            label: 'Coupon',
            accessor: 'coupon',
            display: true,
            sortable: true
        },
        {
            label: 'Buying Price',
            accessor: 'buying_price',
            display: true,
            sortable: true
        },
        {
            label: 'Purchase Cost',
            accessor: 'purchase_cost',
            display: true,
            sortable: true
        },
        {
            label: 'DTM',
            accessor: 'dtm',
            display: true,
            sortable: true
        },
        {
            label: 'Current Price',
            accessor: 'current_price',
            display: true,
            sortable: true
        },
        {
            label: 'Amortized Cost',
            accessor: 'amortized_cost',
            display: true,
            sortable: true
        },
        {
            label: 'Total Amortization',
            accessor: 'total_amortization',
            display: true,
            sortable: true
        },
    ])

    const [data, setData] = useState([
        {
            "id": null,
            "deal_no": null,
            "deal_date": null,
            "currency": null,
            "instrument": null,
            "face_value": null,
            "issue_date": null,
            "maturity": null,
            "original_dtm": null,
            "yield": null,
            "coupon": null,
            "buying_price": null,
            "purchase_cost": null,
            "dtm": null,
            "current_price": null,
            "amortized_cost": null,
            "total_amortization": null,
        },
    ])

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
        <div className='table-container alm-reval-accrual-amortization-sub-home-first-child'>

          {isloading && <Loader margin={'45%'} />}

          {/* Table Title */}
          {/* <TableTitle title={'TMU sheet'} actions={actions} /> */}

          <div className='table-container-name' style={{border:'none'}}>
            <p style={{ display: 'inline' }}>Purchase</p>
            <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
          </div>

          {/* Table Summary Bar */}
          {/* <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary} display={'inline'} /> */}

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
                  data.map((object) => (
                    <tr key={object["id"]}>
                      <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                      {columns[0].display && <td>{object["deal_no"]}</td>}
                      {columns[1].display && <td>{dateFormatter(object["deal_date"])}</td>}
                      {columns[2].display && <td>{object["currency"]}</td>}
                      {columns[3].display && <td>{object["instrument"]}</td>}
                      {columns[4].display && <td>{formatter(object["face_value"])}</td>}
                      {columns[5].display && <td>{dateFormatter(object["issue_date"])}</td>}
                      {columns[6].display && <td>{dateFormatter(object["maturity"])}</td>}
                      {columns[7].display && <td>{object["original_dtm"]}</td>}
                      {columns[8].display && <td>{object["yield"]}</td>}
                      {columns[9].display && <td>{object["coupon"]}</td>}
                      {columns[10].display && <td>{formatter(object["buying_price"])}</td>}
                      {columns[11].display && <td>{formatter(object["purchase_cost"])}</td>}
                      {columns[12].display && <td>{object["dtm"]}</td>}
                      {columns[13].display && <td>{formatter(object["current_price"])}</td>}
                      {columns[14].display && <td>{formatter(object["amortized_cost"])}</td>}
                      {columns[15].display && <td>{formatter(object["total_amortization"])}</td>}
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </div>

        </div>
    )
}

export default Purchase