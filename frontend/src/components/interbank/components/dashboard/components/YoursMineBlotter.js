import { formatter } from '../../../../santasoft/components/Formatter'

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

function YoursMineBlotter({ user, date, refresh, onTableSelect, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [columns, setColumns] = useState([
        {
            label: 'Currency',
            accessor: 'ccy',
            display: true,
            sortable: true
        },
        {
            label: 'Yours',
            accessor: 'yours',
            display: true,
            sortable: true
        },
        {
            label: 'Mine',
            accessor: 'mine',
            display: true,
            sortable: true
        },
        {
            label: 'Forward yours',
            accessor: 'fwd_yours',
            display: true,
            sortable: true
        },
        {
            label: 'Forward mine',
            accessor: 'fwd_mine',
            display: true,
            sortable: true
        },
        {
            label: 'Long',
            accessor: 'long',
            display: true,
            sortable: true
        },
        {
            label: 'Short',
            accessor: 'short',
            display: true,
            sortable: true
        },
    ])

    const dataSummaryTitles = [
        {
            name: "Total yours: ",
            accessor: "total_yours"
        },
        {
            name: "Total mine: ",
            accessor: "total_mine"
        },
        {
            name: "Total fwd. yours: ",
            accessor: "total_fwd_yours"
        },
        {
            name: "Total fwd. mine: ",
            accessor: "total_fwd_mine"
        },
    ]

    const [data, setData] = useState([
        {
            "id": null,
            "ccy": null,
            "yours": null,
            "mine": null,
            "fwd_yours": null,
            "fwd_mine": null,
            "long": null,
            "short": null,
        },
    ])

    const [dataSummary, setDataSummary] = useState({
        "id": null,
        "total_yours": 0,
        "total_mine": 0,
        "total_fwd_yours": 0,
        "total_fwd_mine": 0,
    })

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/7b2ApEGyhsLeybV*aw1tg05lUaY2na2RdjFaxXHBYT&0UWPjDS/' + date + '/', {
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
        // let interval = setInterval(() => fetchAPI(), 1000 * 30);
        // return function cleanup() {
        // clearInterval(interval);
        // }
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
            <div className='table-container-name'>
                <select onChange={e => onTableSelect(e.target.value)} value='yours-mine-blotter'>
                    <option value="currency-blotter">Blotter - currency</option>
                    <option value="yours-mine-blotter">Blotter - Yours Mine</option>
                    <option value="sbp-blotter">Blotter - SBP</option>
                </select>
                <div style={{ float: 'right', marginRight: '10px', marginTop: '0.2%'}}><img onClick={() => actions.onDownloadButtonClicked(actions.data,actions.selectedRows,'transactions')} className='action-pics' src={downloadImgae} title="Download" alt="Download"/></div>
            </div>

            {/* Table Summary Bar */}
            <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary}  display={'inline'}/>

            {/* Table Actions Bar */}
            {/* <TableActions actions={actions} /> */}

            {/* Table Data Grid */}
            <div className='table-container-grid'>
                <table>
                    <thead>
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
                                            {columns[1].display && <td>{formatter(object["yours"])}</td>}
                                            {columns[2].display && <td>{formatter(object["mine"])}</td>}
                                            {columns[3].display && <td>{formatter(object["fwd_yours"])}</td>}
                                            {columns[4].display && <td>{formatter(object["fwd_mine"])}</td>}
                                            {columns[5].display && <td>{formatter(object["long"])}</td>}
                                            {columns[6].display && <td>{formatter(object["short"])}</td>}
                                        </tr>
                                        : null
                                ))
                                : data.map((object) => (
                                    <tr key={object["id"]}>
                                        <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                        {columns[0].display && <td>{object["ccy"]}</td>}
                                        {columns[1].display && <td>{formatter(object["yours"])}</td>}
                                        {columns[2].display && <td>{formatter(object["mine"])}</td>}
                                        {columns[3].display && <td>{formatter(object["fwd_yours"])}</td>}
                                        {columns[4].display && <td>{formatter(object["fwd_mine"])}</td>}
                                        {columns[5].display && <td>{formatter(object["long"])}</td>}
                                        {columns[6].display && <td>{formatter(object["short"])}</td>}
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default YoursMineBlotter