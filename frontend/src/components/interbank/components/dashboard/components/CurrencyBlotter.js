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

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

function CurrencyBlotter({ user, date, refresh, onTableSelect, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [columns, setColumns] = useState([
        {
            label: 'Currency',
            accessor: 'ccy',
            display: true,
            sortable: true
        },
        {
            label: 'Opening',
            accessor: 'opening',
            display: true,
            sortable: true
        },
        {
            label: 'Rate',
            accessor: 'rate',
            display: true,
            sortable: true
        },
        {
            label: 'Long',
            accessor: 'tmu_ib_long',
            display: true,
            sortable: true
        },
        {
            label: 'Short',
            accessor: 'tmu_ib_short',
            display: true,
            sortable: true
        },
        {
            label: 'Net',
            accessor: 'net',
            display: true,
            sortable: true
        },
        {
            label: 'Avg. rate',
            accessor: 'avg_rate',
            display: true,
            sortable: true
        },
        {
            label: 'P & L',
            accessor: 'p_l',
            display: true,
            sortable: true
        },
        {
            label: 'Long',
            accessor: 'feel_long',
            display: true,
            sortable: true
        },
        {
            label: 'Short',
            accessor: 'feel_short',
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
            label: 'NOP (USD)',
            accessor: 'usd_nop',
            display: true,
            sortable: true
        },
    ])

    const dataSummaryTitles = [
        {
            name: "Total NOP (USD): ",
            accessor: "total_usd_nop"
        },
        {
            name: "Total P&L: ",
            accessor: "total_p_l"
        },
        {
            name: "Total 3rd Ccy P&L: ",
            accessor: "third_ccy_p_l"
        }
    ]

    const [data, setData] = useState([
        {
            "id": null,
            "ccy": null,
            "opening": null,
            "rate": null,
            "tmu_ib_long": null,
            "tmu_ib_short": null,
            "net": null,
            "avg_rate": null,
            "p_l": null,
            "feel_long": null,
            "feel_short": null,
            "nop": null,
            "usd_nop": null,
        },
    ])

    const [dataSummary, setDataSummary] = useState({
        "id": null,
        "total_p_l": 0,
        "total_usd_nop": 0,
        "third_ccy_p_l": 0,
    })

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/RdBghvlqC8@*4*9RSC0qjumvRo3fK3OqngBP@Ug6UYtxi8Cmda/none/' + date + '/', {
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
                setDataSummary({...result.summary, 'third_ccy_p_l': result.summary['total_p_l'] - data[0]['p_l']});
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
        // let interval = setInterval(() => fetchAPI(), 1000 * 30);
        // return function cleanup() {
            // clearInterval(interval);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, date]);

    const closingsSubmitHandler = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/RdBghvlqC8@*4*9RSC0qjumvRo3fK3OqngBP@Ug6UYtxi8Cmda/closing/' + date + '/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                addMessageHandler({
                    title: 'Closings saved',
                    content: result.message,
                    type: 3
                })
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Closings not saved',
                    content: 'Blotter grid failed to load due to unauthorized request.',
                    type: 4
                })
            }

            else if (response.status === 406) {
                addMessageHandler({
                    title: 'Closings not saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 500) {
                addMessageHandler({
                    title: 'Closings not saved',
                    content: result.message,
                    type: 4
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const plSubmitHandler = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/RdBghvlqC8@*4*9RSC0qjumvRo3fK3OqngBP@Ug6UYtxi8Cmda/pl/' + date + '/', {
                method: 'POST',
                body: JSON.stringify({'total_p_l': dataSummary['total_p_l'], 'third_ccy_p_l': dataSummary['third_ccy_p_l']}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                addMessageHandler({
                    title: 'P&L saved',
                    content: result.message,
                    type: 3
                })
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'P&L not saved',
                    content: 'Blotter grid failed to load due to unauthorized request.',
                    type: 4
                })
            }

            else if (response.status === 406) {
                addMessageHandler({
                    title: 'P&L not saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 500) {
                addMessageHandler({
                    title: 'P&L not saved',
                    content: result.message,
                    type: 4
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const updateHandler = async (obj) => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/RdBghvlqC8@*4*9RSC0qjumvRo3fK3OqngBP@Ug6UYtxi8Cmda/closing/' + data[0].lastDate + '/', {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                addMessageHandler({
                    title: 'Closing saved',
                    content: result.message,
                    type: 3
                })
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
                    title: 'Process failed',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 500) {
                addMessageHandler({
                    title: 'Process failed',
                    content: result.message,
                    type: 4
                })
            }
        }
        catch (err) {
            console.log(err);
        }
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

            {isloading && <Loader margin={'45%'} />}

            {/* Table Title */}
            <div className='table-container-name'>
                <select onChange={e => onTableSelect(e.target.value)} value='currency-blotter'>
                    <option value="currency-blotter">Blotter - currency</option>
                    <option value="yours-mine-blotter">Blotter - Yours Mine</option>
                    <option value="sbp-blotter">Blotter - SBP</option>
                </select>
                <div style={{ float: 'right', marginRight: '10px', marginTop: '0.2%'}}><img onClick={() => actions.onDownloadButtonClicked(actions.data,actions.selectedRows,'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download"/></div>
                <div className='transaction-grid-button' onClick={() => closingsSubmitHandler()}>Save closings</div>
                <div className='transaction-grid-button' onClick={() => plSubmitHandler()}>Save P&L</div>
                <div style={{ float: 'right', marginRight: '10px', marginTop: '0.4%' }}>Last date: {dateFormatter(data[0].lastDate)}</div>
            </div>

            {/* Table Summary Bar */}
            <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary} display={'inline'}/>

            {/* Table Data Grid */}
            <div className='table-container-grid'>
                <table>
                    <thead>
                        <tr>
                            <th style={{ borderBottom: 'none', textAlign: 'center' }}></th>
                            <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                            <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                            <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                            <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Interbank & TMU</th>
                            <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                            <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                            <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                            <th colSpan="2" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Feel</th>
                            <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                            <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                        </tr>
                        <TableHeader columns={columns} getSortingImage={getSortingImage} handleSortingChange={handleSortingChange} />
                    </thead>
                    <tbody>
                        {
                            filterFields.length ?
                                data.map((object) => (
                                    isFilter(object) ?
                                        <tr key={object["id"]}>
                                            <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                            {columns[0].display && <td>{object["ccy"]}</td>}
                                            {columns[1].display && <td> <input type="text" defaultValue={formatter(object["opening"])} onBlur={ e => updateHandler({'currency': object["ccy"], 'opening': e.target.value})}/></td>}
                                            {columns[2].display && <td>{formatter(object["rate"])}</td>}
                                            {columns[3].display && <td>{formatter(object["tmu_ib_long"])}</td>}
                                            {columns[4].display && <td>{formatter(object["tmu_ib_short"])}</td>}
                                            {columns[5].display && <td>{formatter(object["net"])}</td>}
                                            {columns[6].display && <td>{formatter(object["avg_rate"])}</td>}
                                            {columns[7].display && <td>{formatter(object["p_l"])}</td>}
                                            {columns[8].display && <td>{formatter(object["feel_long"])}</td>}
                                            {columns[9].display && <td>{formatter(object["feel_short"])}</td>}
                                            {columns[10].display && <td>{formatter(object["nop"])}</td>}
                                            {columns[11].display && <td>{formatter(object["usd_nop"])}</td>}
                                        </tr>
                                        : null
                                ))
                                : data.map((object) => (
                                    <tr key={object["id"]}>
                                        <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                        {columns[0].display && <td>{object["ccy"]}</td>}
                                        {columns[1].display && <td> <input type="text" defaultValue={formatter(object["opening"])} onBlur={ e => updateHandler({'currency': object["ccy"], 'opening': e.target.value})}/></td>}
                                        {columns[2].display && <td>{formatter(object["rate"])}</td>}
                                        {columns[3].display && <td>{formatter(object["tmu_ib_long"])}</td>}
                                        {columns[4].display && <td>{formatter(object["tmu_ib_short"])}</td>}
                                        {columns[5].display && <td>{formatter(object["net"])}</td>}
                                        {columns[6].display && <td>{formatter(object["avg_rate"])}</td>}
                                        {columns[7].display && <td>{formatter(object["p_l"])}</td>}
                                        {columns[8].display && <td>{formatter(object["feel_long"])}</td>}
                                        {columns[9].display && <td>{formatter(object["feel_short"])}</td>}
                                        {columns[10].display && <td>{formatter(object["nop"])}</td>}
                                        {columns[11].display && <td>{formatter(object["usd_nop"])}</td>}
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default CurrencyBlotter