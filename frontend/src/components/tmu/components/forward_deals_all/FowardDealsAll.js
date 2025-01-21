import sortImgae from '../../res/sort.png'
import sortUpImgae from '../../res/sort-up.png'
import sortDownImgae from '../../res/sort-down.png'

import './ForwardDealsAll.css'

import Loader from '../../../santasoft/components/loader/Loader'
import { formatter, dateFormatter } from '../../../../Formatter'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import TableTitle from '../../table/TableTitle'
import TableSummary from '../../table/TableSummary'
import TableActions from '../../table/TableActions'
import TableHeader from '../../table/TableHeader'

import DualDatePicker from '../../DualDatePicker'

import Forward from '../forward/Forward'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../App'

function ForwardDealsAll({ user, refresh, currentDate, date, dropdownLists, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [filter, setFilter] = useState('empty')

    const [sort, setSort] = useState('empty')

    const [dispalyForward, setDispalyForward] = useState(false)

    const [forwardId, setForwardId] = useState('')

    const [fromDate, setFromDate] = useState(currentDate)

    const [toDate, setToDate] = useState(currentDate)

    const onForwardTransactionClicked = id => {
        if (dispalyForward) {
            setDispalyForward(false)
        }
        else {
            setForwardId(id)
            setDispalyForward(true)
        }
    }

    const [columns, setColumns] = useState([
        {
            label: 'Remarks',
            accessor: 'take_close',
            display: true,
            sortable: true
        },
        {
            label: 'Dealer name',
            accessor: 'dealer_name',
            display: true,
            sortable: true
        },
        {
            label: 'Customer name',
            accessor: 'c_name',
            display: true,
            sortable: true
        },
        {
            label: 'Product',
            accessor: 'product',
            display: true,
            sortable: true
        },
        {
            label: 'Starting days',
            accessor: 'days',
            display: true,
            sortable: true
        },
        {
            label: 'Deal days',
            accessor: 'days2',
            display: true,
            sortable: true
        },
        {
            label: 'Currency',
            accessor: 'ccy',
            display: true,
            sortable: true
        },
        {
            label: 'Norl/Cross',
            accessor: 'n_c',
            display: true,
            sortable: true
        },
        {
            label: 'Export',
            accessor: 'export',
            display: true,
            sortable: true
        },
        {
            label: 'Import',
            accessor: 'importt',
            display: true,
            sortable: true
        },
        {
            label: 'Remaining amount',
            accessor: 'remaining_amount',
            display: true,
            sortable: true
        },
        {
            label: 'Deal rate',
            accessor: 'deal_rate',
            display: true,
            sortable: true
        },
        {
            label: 'I/B rate',
            accessor: 'i_b_rate',
            display: true,
            sortable: true
        },
        {
            label: 'Branch',
            accessor: 'branch',
            display: true,
            sortable: true
        },
        {
            label: 'Deal date',
            accessor: 'ttdate',
            display: true,
            sortable: true
        },
        {
            label: 'Option date',
            accessor: 'vdate',
            display: true,
            sortable: true
        },
        {
            label: 'Maturity date',
            accessor: 'vdate2',
            display: true,
            sortable: true
        },
        {
            label: '3rd ccy. cross',
            accessor: 'amt_3rd_ccy_cross',
            display: true,
            sortable: true
        },
        {
            label: 'I/B premium',
            accessor: 'amt_i_b_prem',
            display: true,
            sortable: true
        },
        {
            label: '3rd ccy. premium',
            accessor: 'amt_3rd_ccy_prem',
            display: true,
            sortable: true
        },
    ])

    const dataSummaryTitles = [
        {
            name: "Total export",
            accessor: "totalExport"
        },
        {
            name: "Total import",
            accessor: "totalImport"
        },
        {
            name: "Total remaining",
            accessor: "totalRemaining"
        },
    ]

    const [dataSummary, setDataSummary] = useState({
        "id": 0,
        "totalExport": 0,
        "totalImport": 0,
        "totalRemaining": 0,
        "count": 0
    })

    const [fetchedData, setFetchedData] = useState([
        {
            "id": null,
            "take_close": null,
            "dealer_name": null,
            "c_name": null,
            "product": null,
            "days": null,
            "days2": null,
            "ccy": null,
            "n_c": null,
            "export": null,
            "importt": null,
            "remaining_amoumt": null,
            "deal_rate": null,
            "i_b_rate": null,
            "branch": null,
            "ttdate": null,
            "vdate": null,
            "vdata2": null,
            "amt_3rd_ccy_cross": null,
            "amt_i_b_prem": null,
            "amt_3rd_ccy_prem": null,
        }
    ])

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe01/2nvkcYzRXg1ZzuYGQPN@HEcrjd*ZILn6mTFIxUIw$Qm3Vx7Aljh/' + filter + '/' + sort + '/empty/' + fromDate + '/' + toDate + '/', {
                method: 'Get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setFetchedData(result.fowardMaturityToday);
                setDataSummary(result.summary);
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Unable to load',
                    content: 'Forward maturity today grid failed to load due to unauthorized request.',
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
        //   clearInterval(interval);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, filter, sort, fromDate, toDate]);

    // 
    //  Paging 
    // 

    const [pageSize, setPageSize] = useState(100)

    const [currentPage, setCurrentPage] = useState(1);

    let totolPages = Math.ceil(dataSummary.count / pageSize)

    const onNextPage = () => {
        if (currentPage === totolPages) {
            setCurrentPage(totolPages)
        }
        else {
            setCurrentPage(currentPage + 1)
        }
    }

    const onPreviousPage = () => {
        if (currentPage === 1) {
            setCurrentPage(1)
        }
        else {
            setCurrentPage(currentPage - 1)
        }
    }

    const getPage = () => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return fetchedData.slice(firstPageIndex, lastPageIndex);
    }

    const [data, setData] = useState(getPage)

    useEffect(() => {
        setData(getPage)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pageSize, fetchedData]);

    const [showPage, setShowPage] = useState(false)

    const onShowPageClicked = () => {
        if (showPage) {
            setShowPage(false)
        }
        else {
            setShowPage(true)
        }
    }

    const [page, setPage] = useState([
        {
            label: 100,
            status: true
        },
        {
            label: 150,
            status: false
        },
        {
            label: 200,
            status: false
        },
    ])

    const pageSizeSelect = (label) => {
        const newState = page.map(obj => {
            if (obj.label === label) {
                return { ...obj, status: true }
            }
            else {
                return { ...obj, status: false }
            }
        })
        setPage(newState)
        setPageSize(label)
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

    const [order, setOrder] = useState("");

    const handleSortingChange = (accessor) => {
        if (order === '') {
            setOrder('asc')
            setSortField(accessor);
        }
        else if (order === 'asc') {
            setOrder('desc')
            setSortField(accessor);
        }
        else if (order === 'desc') {
            setOrder('')
            setSortField('');
        }
    };

    useEffect(() => {
        if (sortField !== '') {
            setSort(sortField + ',' + order)
        }
        else {
            setSort('empty')
        }
    }, [sortField, order]);

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
        console.log(filterObject)
        setFilterFields(filterFields =>
            filterFields.filter(obj => {
                return obj !== filterObject;
            }),
        )
    }

    useEffect(() => {
        if (filterFields.length) {
            setFilter(filterFields.map((item) => { return item.accessor + ',' + item[item.accessor] }))
        }
        else {
            setFilter('empty')
        }
    }, [filterFields]);

    // 
    //   Download
    // 

    const onDownloadButtonClicked = async () => {
        let fileName = 'santasoft - ' + new Date()
        if (selectedRows.length) {
            const selectedBlotter = fetchedData.filter(obj => {
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
            try {
                setIsLoading(true);
                const response = await fetch(ip + '/sfe01/2nvkcYzRXg1ZzuYGQPN@HEcrjd*ZILn6mTFIxUIw$Qm3Vx7Aljh/' + filter + '/' + sort + '/download/' + fromDate + '/' + toDate + '/', {
                    method: 'Get',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Authorization': 'Token ' + user.token + ''
                    },
                });
                setIsLoading(false);
                let result = await response.json();
                if (response.status === 200) {
                    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                    const fileExtension = ".xlsx";
                    const ws = XLSX.utils.json_to_sheet(result.data);
                    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
                    const data = new Blob([excelBuffer], { type: fileType });
                    FileSaver.saveAs(data, fileName + fileExtension);
                }
                else {
                    addMessageHandler({
                        title: 'Unable to download',
                        content: 'Someting went wrong. Please try agian later.',
                        type: 4
                    })
                }
            }
            catch (err) {
                console.log(err);
            }
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
        "count": dataSummary.count,
        "currentPage": currentPage,
        "page": page,
        "pageSize": pageSize,
        "showPage": showPage,
        "pageSizeSelect": pageSizeSelect,
        "onShowPageClicked": onShowPageClicked,
        "onNextPage": onNextPage,
        "onPreviousPage": onPreviousPage,
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
        <div className='home'>

            <DualDatePicker toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate}/>
            
            <div className='ForwardDealAll-sub-home'>
                
                <div className='table-container'>

                    {isloading && <Loader margin={'45%'} />}

                    {/* Table Title */}
                    <TableTitle title={'Forward deals'} />

                    {/* Table Summary Bar */}
                    <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary} />

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
                                    data.map((object, index) => (
                                        <tr key={index}>
                                            <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                            {columns[0].display && <td>{object["take_close"]}</td>}
                                            {columns[1].display && <td>{object["dealer_name"]}</td>}
                                            {columns[2].display && <td style={{ color: '#2196F3', cursor: 'pointer' }} onClick={e => onForwardTransactionClicked(object.id)}>{object["c_name"]}</td>}
                                            {columns[3].display && <td>{object["product"]}</td>}
                                            {columns[4].display && <td>{object["days"]}</td>}
                                            {columns[5].display && <td>{object["days2"]}</td>}
                                            {columns[6].display && <td>{object["ccy"]}</td>}
                                            {columns[7].display && <td>{object["n_c"]}</td>}
                                            {columns[8].display && <td>{formatter(object["export"])}</td>}
                                            {columns[9].display && <td>{formatter(object["importt"])}</td>}
                                            {columns[10].display && <td>{formatter(object["remaining_amount"])}</td>}
                                            {columns[11].display && <td>{formatter(object["deal_rate"])}</td>}
                                            {columns[12].display && <td>{formatter(object["i_b_rate"])}</td>}
                                            {columns[13].display && <td>{object["branch"]}</td>}
                                            {columns[14].display && <td>{dateFormatter(object["ttdate"])}</td>}
                                            {columns[15].display && <td>{dateFormatter(object["vdate"])}</td>}
                                            {columns[16].display && <td>{dateFormatter(object["vdate2"])}</td>}
                                            {columns[17].display && <td>{formatter(object["amt_3rd_ccy_cross"])}</td>}
                                            {columns[18].display && <td>{formatter(object["amt_i_b_prem"])}</td>}
                                            {columns[19].display && <td>{formatter(object["amt_3rd_ccy_prem"])}</td>}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

                {dispalyForward && <Forward user={user} refresh={refresh} date={date} onForwardTransactionClicked={onForwardTransactionClicked} forwardId={forwardId} dropdownLists={dropdownLists} addMessageHandler={addMessageHandler}/>}

            </div>
        </div>
    )
}

export default ForwardDealsAll