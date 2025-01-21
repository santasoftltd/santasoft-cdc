import { formatter, dateFormatter } from '../../../../santasoft/components/Formatter'

import downloadImgae from '../../../../santasoft/res/download.png'
import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort.png'
import sortDownImgae from '../../../../santasoft/res/sort.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableSummary from '../../../../santasoft/components/table/TableSummary'
import TableHeader from '../../../../santasoft/components/table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function AccruedIncomeFour({ user, refresh, fromDate, toDate, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [columns, setColumns] = useState([
        {
            label: 'Status',
            accessor: 'status',
            display: true,
            sortable: true
        },
        {
            label: 'Counter Party',
            accessor: 'counter_party',
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
            label: 'Yield',
            accessor: 'yield',
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
            label: 'Price',
            accessor: 'price',
            display: true,
            sortable: true
        },
        {
            label: 'Type',
            accessor: 'type',
            display: true,
            sortable: true
        },
        {
            label: 'Start Date',
            accessor: 'start_date',
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
            label: 'DTM',
            accessor: 'dtm',
            display: true,
            sortable: true
        },
        {
            label: 'Settlement Amount',
            accessor: 'settlement_amount',
            display: true,
            sortable: true
        },
        {
            label: 'Accrued',
            accessor: 'accrued',
            display: true,
            sortable: true
        },
        {
            label: 'Balance',
            accessor: 'balance',
            display: true,
            sortable: true
        },
        {
            label: 'NCD',
            accessor: 'ncd',
            display: true,
            sortable: true
        },
        {
            label: 'Period',
            accessor: 'period',
            display: true,
            sortable: true
        },
        {
            label: 'To Date I/E',
            accessor: 'to_date_I_E',
            display: true,
            sortable: true
        },
        {
            label: 'Remaining',
            accessor: 'remaining',
            display: true,
            sortable: true
        },
        {
            label: 'Total',
            accessor: 'total',
            display: true,
            sortable: true
        },
    ])

    const dataSummaryTitles = [
        {
          name: "Face Value: ",
          accessor: "face_value"
        },
        {
            name: "Settlement Amount: ",
            accessor: "settlement_amount"
        },
        {
          name: "Accrued Amount: ",
          accessor: "accrued_amount"
        },
        {
          name: "Balance: ",
          accessor: "balance"
        },
        {
          name: "Period: ",
          accessor: "period"
        },
        {
          name: "To Date I/E: ",
          accessor: "to_date_I_E"
        },
        {
          name: "Remaining: ",
          accessor: "remaining"
        },
        {
          name: "Total: ",
          accessor: "total"
        },
    ]

    const [data, setData] = useState([
        {
            "id": null,
            "status": null,
            "counter_party": null,
            "instrument": null,
            "yield": null,
            "face_value": null,
            "price": null,
            "type": null,
            "start_date": null,
            "maturity": null,
            "dtm": null,
            "settlement_amount": null,
            "accrued": null,
            "balance": null,
            "ncd": null,
            "period": null,
            "to_date_I_E": null,
            "remaining": null,
            "total": null,
        },
    ])

    const [dataSummary, setDataSummary] = useState({
        "id": null,
        "face_value": 0,
        "settlement_amount": 0,
        "accrued_amount": 0,
        "balance": 0,
        "period": 0,
        "to_date_I_E": 0,
        "remaining": 0,
        "total": 0,
    })

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/123Y3PB6Hb74E9zW$CPKs3YwL4sBDdC8irt4FwZVT4Hkq0P1*Aigm/'+ fromDate +'/', {
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
    }, [refresh, fromDate, toDate]);

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
        <div className='table-container accrued-treasury-sub-home-fourth-child'>

            {isloading && <Loader margin={'45%'} />}

            {/* Table Title */}
            <div className='table-container-name'>
                <p style={{ display: 'inline' }}>Accrued Income</p>
                <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
            </div>

            {/* Table Summary Bar */}
            <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary} display={'inline'} />

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
                                {columns[0].display && <td>{object["status"]}</td>}
                                {columns[1].display && <td>{object["counter_party"]}</td>}
                                {columns[2].display && <td>{object["instrument"]}</td>}
                                {columns[3].display && <td>{object["yield"]}</td>}
                                {columns[4].display && <td>{object["face_value"]}</td>}
                                {columns[5].display && <td>{object["price"]}</td>}
                                {columns[6].display && <td>{object["type"]}</td>}
                                {columns[7].display && <td>{object["start_date"]}</td>}
                                {columns[8].display && <td>{object["maturity"]}</td>}
                                {columns[9].display && <td>{object["dtm"]}</td>}
                                {columns[10].display && <td>{object["settlement_amount"]}</td>}
                                {columns[11].display && <td>{object["accrued"]}</td>}
                                {columns[12].display && <td>{object["balance"]}</td>}
                                {columns[13].display && <td>{object["ncd"]}</td>}
                                {columns[14].display && <td>{object["period"]}</td>}
                                {columns[15].display && <td>{object["to_date_I_E"]}</td>}
                                {columns[16].display && <td>{object["remaining"]}</td>}
                                {columns[17].display && <td>{object["total"]}</td>}
                            </tr>
                        ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default AccruedIncomeFour