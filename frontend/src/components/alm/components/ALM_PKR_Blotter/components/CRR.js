import { formatter, dateFormatter } from '../../../../santasoft/components/Formatter'

import downloadImgae from '../../../../santasoft/res/download.png'
import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort.png'
import sortDownImgae from '../../../../santasoft/res/sort.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableActions from '../../../../santasoft/components/table/TableActions'
import TableSummary from '../../../../santasoft/components/table/TableSummary'
import TableHeader from '../../../../tmu/table/TableHeader'

import DailyCRRDate from '../../daily-crr-date/DailyCRRDate'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function CRR({ user, refresh, date, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [columns, setColumns] = useState([
        {
            label: 'Day',
            accessor: 'day',
            display: true,
            sortable: true
        },
        {
            label: 'Downstream',
            accessor: 'downstream',
            display: true,
            sortable: true
        },
        {
            label: 'Excess / Short',
            accessor: 'excess_short',
            display: true,
            sortable: true
        },
        {
            label: 'Actual',
            accessor: 'actual',
            display: true,
            sortable: true
        },
    ])

    const dataSummaryTitles = [
        {
            name: "Total Actual: ",
            accessor: "actualSum"
        },
    ]

    const [data, setData] = useState([
        // {
        //     "id": null,
        //     "day": null,
        //     "downstream": null,
        //     "excess_short": null,
        //     "actual": null,
        // },
    ])

    const [dataSummary, setDataSummary] = useState({
        "id": null,
        "actualSum": 0,
    })

    const [isDailyCRRDate, setIsDailyCRRDate] = useState(false)

    const onDailyCRRDateClicked = () => {
        if (isDailyCRRDate) {
            setIsDailyCRRDate(false)
        }
        else {
            setIsDailyCRRDate(true)
        }
    }

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/tQ8EzLCnRzd2GSKLBTa7wCFTW2yiZsKO4IGYlBQeLd*yBhV@2F/' + date + '/', {
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

    const onChangeHandler = (e, object, column) => {
        setData(current =>
            current.map(obj => {
                if (obj['id'] === object['id']) {
                    return { ...object, [column]: e.target.value }
                }
                else {
                    return obj
                }
            })
        )
    }

    const updateHandler = async (obj) => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/tQ8EzLCnRzd2GSKLBTa7wCFTW2yiZsKO4IGYlBQeLd*yBhV@2F/' + date + '/', {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            })
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setData(result.data);
                addMessageHandler({
                    title: 'Saved',
                    content: result.message,
                    type: 3
                })
            }

            else if (response.status === 400) {
                setData(result.data);
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
                setData(result.data);
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
                setData(result.data);
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

    useEffect(() => {
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, date]);

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
            {/* <TableTitle title={'TMU sheet'} actions={actions} /> */}

            <div className='table-container-name'>
                <p style={{ display: 'inline' }}>Daily CRR</p>
                <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
                <div className='transaction-grid-button' onClick={() => onDailyCRRDateClicked()}>New</div>
                {/* <div style={{ float: 'right', marginRight: '8px', marginTop: '0.08%', backgroundColor: '#2196F3', color: 'white', fontSize: 'small', fontWeight: 'bold', width: '120px', borderRadius: '4px', textAlign: 'center', cursor: 'pointer' }} onClick={() => runGainLossProcess()}>Calc. G&L</div> */}
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
                        {
                            data.map((object) => (
                                <tr key={object["id"]}>
                                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                    {columns[0].display && <td>{dateFormatter(object["day"])}</td>}
                                    {columns[1].display && <td> <input type="text" style={{ fontSize: 'x-small' }} value={formatter(object["downstream"])} onChange={e => onChangeHandler(e, object, 'downstream')} onBlur={ e => updateHandler(object)}/></td>}
                                    {columns[2].display && <td> <input type="text" style={{ fontSize: 'x-small' }} value={formatter(object["excess_short"])} onChange={e => onChangeHandler(e, object, 'excess_short')} onBlur={ e => updateHandler(object)}/></td>}
                                    {columns[3].display && <td> <input type="text" style={{ fontSize: 'x-small' }} value={formatter(object["actual"])} onChange={e => onChangeHandler(e, object, 'actual')} onBlur={ e => updateHandler(object)}/></td>}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

            {isDailyCRRDate && <DailyCRRDate user={user} refresh={refresh} date={date} onDailyCRRDateClicked={onDailyCRRDateClicked} addMessageHandler={addMessageHandler} />}

        </div>
    )
}

export default CRR