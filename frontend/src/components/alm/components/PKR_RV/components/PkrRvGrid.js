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

function PkrRvGrid({ user, refresh, date, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [columns, setColumns] = useState([
        {
            label: 'T Date',
            accessor: 't_date',
            display: true,
            sortable: true
        },
        {
            label: '0-7',
            accessor: '0_7',
            display: true,
            sortable: true
        },
        {
            label: '8-15',
            accessor: '8_15',
            display: true,
            sortable: true
        },
        {
            label: '16-30',
            accessor: '16_30',
            display: true,
            sortable: true
        },
        {
            label: '31-60',
            accessor: '31_60',
            display: true,
            sortable: true
        },
        {
            label: '61-90',
            accessor: '61_90',
            display: true,
            sortable: true
        },
        {
            label: '91-120',
            accessor: '91_120',
            display: true,
            sortable: true
        },
        {
            label: '121-180',
            accessor: '121_180',
            display: true,
            sortable: true
        },
        {
            label: '181-270',
            accessor: '181_270',
            display: true,
            sortable: true
        },
        {
            label: '271-365',
            accessor: '271_365',
            display: true,
            sortable: true
        },
        {
            label: 'Yr-2',
            accessor: 'Yr_2',
            display: true,
            sortable: true
        },
        {
            label: 'Yr-3',
            accessor: 'Yr_3',
            display: true,
            sortable: true
        },
        {
            label: 'Yr-4',
            accessor: 'Yr_4',
            display: true,
            sortable: true
        },
        {
            label: 'Yr-5',
            accessor: 'Yr_5',
            display: true,
            sortable: true
        },
        {
            label: 'Yr-6',
            accessor: 'Yr_6',
            display: true,
            sortable: true
        },
        {
            label: 'Yr-7',
            accessor: 'Yr_7',
            display: true,
            sortable: true
        },
        {
            label: 'Yr-8',
            accessor: 'Yr_8',
            display: true,
            sortable: true
        },
        {
            label: 'Yr-9',
            accessor: 'Yr_9',
            display: true,
            sortable: true
        },
        {
            label: 'Yr-10',
            accessor: 'Yr_10',
            display: true,
            sortable: true
        },
        {
            label: 'Yr-15',
            accessor: 'Yr_15',
            display: true,
            sortable: true
        },
        {
            label: 'Yr-20',
            accessor: 'Yr_20',
            display: true,
            sortable: true
        },
        {
            label: 'Date',
            accessor: 'date',
            display: true,
            sortable: true
        },
        {
            label: 'Issue',
            accessor: 'issue',
            display: true,
            sortable: true
        },
        {
            label: 'MTM YLD',
            accessor: 'mtm_yld',
            display: true,
            sortable: true
        },
    ])

    const [data, setData] = useState([
        {
            "id": null,
            "t_date": null,
            "0_7": null,
            "8_15": null,
            "16_30": null,
            "31_60": null,
            "61_90": null,
            "91_120": null,
            "121_180": null,
            "181_270": null,
            "271_365": null,
            "Yr_2": null,
            "Yr_3": null,
            "Yr_4": null,
            "Yr_5": null,
            "Yr_6": null,
            "Yr_7": null,
            "Yr_8": null,
            "Yr_9": null,
            "Yr_10": null,
            "Yr_15": null,
            "Yr_20": null,
            "date": null,
            "issue": null,
            "mtm_yld": null,
        },
    ])

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/123Y3PB6Hb74E9zW$CPKs3YwL4sBDdC8irt4FwZVT4Hkq0P1*Aigm/'+ date +'/', {
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
            <div className='table-container-name' style={{border:'none'}}>
                <p style={{ display: 'inline' }}>PKR RV (PIB/T-Bill)</p>
                <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
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
                                {columns[0].display && <td>{dateFormatter(object["t_date"])}</td>}
                                {columns[1].display && <td>{formatter(object["0_7"])}</td>}
                                {columns[2].display && <td>{formatter(object["8_15"])}</td>}
                                {columns[3].display && <td>{formatter(object["16_30"])}</td>}
                                {columns[4].display && <td>{formatter(object["31_60"])}</td>}
                                {columns[5].display && <td>{formatter(object["61_90"])}</td>}
                                {columns[6].display && <td>{formatter(object["91_120"])}</td>}
                                {columns[7].display && <td>{formatter(object["121_180"])}</td>}
                                {columns[8].display && <td>{formatter(object["181_270"])}</td>}
                                {columns[9].display && <td>{formatter(object["271_365"])}</td>}
                                {columns[10].display && <td>{formatter(object["Yr_2"])}</td>}
                                {columns[11].display && <td>{formatter(object["Yr_3"])}</td>}
                                {columns[12].display && <td>{formatter(object["Yr_4"])}</td>}
                                {columns[13].display && <td>{formatter(object["Yr_5"])}</td>}
                                {columns[14].display && <td>{formatter(object["Yr_6"])}</td>}
                                {columns[15].display && <td>{formatter(object["Yr_7"])}</td>}
                                {columns[16].display && <td>{formatter(object["Yr_8"])}</td>}
                                {columns[17].display && <td>{formatter(object["Yr_9"])}</td>}
                                {columns[18].display && <td>{formatter(object["Yr_10"])}</td>}
                                {columns[19].display && <td>{formatter(object["Yr_15"])}</td>}
                                {columns[20].display && <td>{formatter(object["Yr_20"])}</td>}
                                {columns[21].display && <td>{dateFormatter(object["date"])}</td>}
                                {columns[22].display && <td>{dateFormatter(object["issue"])}</td>}
                                {columns[23].display && <td>{formatter(object["mtm_yld"])}</td>}
                            </tr>
                        ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default PkrRvGrid