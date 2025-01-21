import { formatter, dateFormatter } from '../../../../santasoft/components/Formatter'

import columnsImgae from '../../../../santasoft/res/columns.png'
import leftImgae from '../../../../santasoft/res/left.png'
import rightImgae from '../../../../santasoft/res/right.png'
import dotsImgae from '../../../../santasoft/res/dots.png'
import downloadImgae from '../../../../santasoft/res/download.png'

import TableColumnDisplay from '../../../../santasoft/components/TableColumnDisplay'
import Paging from '../../../../santasoft/components/Paging'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableHeader from '../../../../santasoft/components/table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function NostroTransfer({ user, refresh, date, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [filter, setFilter] = useState('empty')

    const [fromDate, setFromDate] = useState(date)

    const [toDate, setToDate] = useState(date)

    const [account, setAccount] = useState('All')

    const [columns, setColumns] = useState([
        {
            label: 'Date',
            accessor: 'date',
            display: true,
            sortable: true
        },
        {
            label: 'From Account',
            accessor: 'fromAccount',
            display: true,
            sortable: true
        },
        {
            label: 'To Account',
            accessor: 'toAccount',
            display: true,
            sortable: true
        },
        {
            label: 'Amount',
            accessor: 'amount',
            display: true,
            sortable: true
        },
    ])

    // const dataSummaryTitles = [
    //     {
    //         name: "Total Opening: ",
    //         accessor: "total_opening"
    //     },
    //     {
    //         name: "Total Debit: ",
    //         accessor: "total_debit"
    //     },
    //     {
    //         name: "Total Credit: ",
    //         accessor: "total_credit"
    //     },
    //     {
    //         name: "Total Closing: ",
    //         accessor: "total_closing"
    //     },
    //     {
    //         name: "No. of Transactions: ",
    //         accessor: "count"
    //     },
    // ]

    const [data, setData] = useState([
        {
            "id": null,
            "date": null,
            "fromAccount": null,
            "toAccount": null,
            "amount": null,
        },
    ])

    const [dataSummary, setDataSummary] = useState({
        "id": null,
        "count": 0,
    })

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/Kj8kVuToFHRI&aBdQ7EI8AbXQyzBBs8ch@RhjX8XJ8CGq4Vw!5/' + fromDate + '/' + toDate + '/' + account + '/' + currentPage + '/' + pageSize + '/none/', {
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
                    content: 'Unable to load due to unauthorized request.',
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

    const [accountList, setAccountList] = useState([])

    useEffect(() => {
        async function fetchAccountList() {
            try {
                setIsLoading(true);
                const response = await fetch(ip + '/sm01/T*i68i3s8&!$h&sqKcG6!PPExiKX6HpSVuZ!C2DsVdApK6J&J!/All/', {
                    method: 'Get',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Authorization': 'Token ' + user.token + ''
                    },
                });
                setIsLoading(false);

                let result = await response.json();

                if (response.status === 200) {
                    setAccountList(result.data);
                }

                else if (response.status === 401) {
                    addMessageHandler({
                        title: 'Unable to load',
                        content: 'Currencies list failed to load due to unauthorized request.',
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
        fetchAccountList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    // 
    //  Paging 
    // 

    const [pageSize, setPageSize] = useState(100)

    const [currentPage, setCurrentPage] = useState(1);

    const [dataCount, setDataCount] = useState(256);

    // let totolPages = Math.ceil(dataSummary.count / pageSize)

    const onNextPage = () => {
        if (currentPage === dataCount) {
            setCurrentPage(dataCount)
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

    // const getPage = () => {
    //   const firstPageIndex = (currentPage - 1) * pageSize;
    //   const lastPageIndex = firstPageIndex + pageSize;
    //   return fetchedData.slice(firstPageIndex, lastPageIndex);
    // }

    // const [data, setData] = useState(getPage)

    useEffect(() => {
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, fromDate, toDate, account, currentPage, pageSize]);

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

    // // 
    // //  Sorting 
    // // 

    // const [sortField, setSortField] = useState("");

    // const [order, setOrder] = useState("");

    // const handleSortingChange = (accessor) => {
    //     if (order === '') {
    //         setOrder('asc')
    //         setSortField(accessor);
    //     }
    //     else if (order === 'asc') {
    //         setOrder('desc')
    //         setSortField(accessor);
    //     }
    //     else if (order === 'desc') {
    //         setOrder('')
    //         setSortField('');
    //     }
    // };

    // useEffect(() => {
    //     if (sortField !== '') {
    //         setSort(sortField + ',' + order)
    //     }
    //     else {
    //         setSort('empty')
    //     }
    // }, [sortField, order]);

    // const getSortingImage = (object) => {
    //     const image = object.sortable
    //         ? sortField === object.accessor && order === "asc"
    //             ? sortUpImgae
    //             : sortField === object.accessor && order === "desc"
    //                 ? sortDownImgae
    //                 : sortImgae
    //         : sortImgae;
    //     return image;
    // }

    // // 
    // //  Filtering 
    // // 

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
            try {
                setIsLoading(true);
                const response = await fetch(ip + '/sm01/Kj8kVuToFHRI&aBdQ7EI8AbXQyzBBs8ch@RhjX8XJ8CGq4Vw!5/' + fromDate + '/' + toDate + '/' + account + '/' + currentPage + '/' + pageSize + '/download/', {
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
        "onFilterSelect": null,
        "onFilterItemDelete": null,
    }

    const firstPageIndex = (actions.currentPage - 1) * actions.pageSize;
    const lastPageIndex = firstPageIndex + actions.pageSize;
    const getLastpageIndex = (lastPageIndex) => {
        if (lastPageIndex > actions.count) {
            let extra = lastPageIndex - actions.count
            return lastPageIndex - extra
        }
        return lastPageIndex
    }

    return (
        <div className='table-container'>

            {isloading && <Loader margin={'45%'} />}

            <div className='table-container-name' style={{border:'none'}}>
                <p style={{ display: 'inline' }}>Nostro Transfer</p>
            </div>

            {/* Table Actions Bar */}
            <div className='table-container-actions'>
                <div className='filter-container table-container-grid'>
                    <label style={{margin:'0px 1px 0px 10px'}}>Account:</label>
                    <select style={{ width: 'min-content', color:'#1c4966' }} onChange={e => setAccount(e.target.value)} value={account}>
                        <option value='All'>All</option>
                        {
                            accountList.map((item, key) => {
                                return <option key={key} value={item.name}>{item.name}</option>
                            })
                        }
                    </select>
                    <label style={{margin:'0px 0px 0px 10px'}}>From Date:</label>
                    <input style={{ width: 'min-content', color:'#1c4966' }} type="date" onChange={e => setFromDate(e.target.value)} value={fromDate} />
                    <label style={{margin:'0px 0px 0px 10px'}}>To Date:</label>
                    <input style={{ width: 'min-content', color:'#1c4966' }} type="date" onChange={e => setToDate(e.target.value)} value={toDate} />
                </div>
                <div className='actions-container'>

                    {actions.onDownloadButtonClicked !== null && <div><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='action-pics' src={downloadImgae} title="Download" alt="Download" /></div>}
                    <div><img onClick={() => actions.onExpandButtonClicked()} className='action-pics' src={columnsImgae} title="Column display" alt="Column display" /></div>
                    {actions.columnExpand && <TableColumnDisplay columns={actions.columns} allColumns={actions.allColumns} onExpandSelectClicked={actions.onExpandSelectClicked} />}
                    {actions.page !== null &&
                        <>
                            <div>
                                <img className='paging-pic' src={leftImgae} title="left" alt="left" onClick={() => actions.onPreviousPage()} />
                                <img className='paging-pic' src={rightImgae} title="right" alt="right" onClick={() => actions.onNextPage()} />
                                <p className='paging-p' >{firstPageIndex + 1}-{getLastpageIndex(lastPageIndex)} of {actions.count}</p>
                            </div>
                            <div onClick={() => actions.onShowPageClicked()}><img className='action-pics' src={dotsImgae} title="Rows index options" alt="Rows index options" /></div>
                            {actions.showPage && <Paging page={actions.page} onPageSelect={actions.pageSizeSelect} />}
                        </>
                    }
                </div>
            </div>

            {/* Table Data Grid */}
            <div className='table-container-grid'>
                <table>
                    <thead>
                        <TableHeader columns={columns} getSortingImage={null} handleSortingChange={null} />
                    </thead>
                    <tbody>
                        {
                            data.map((object) => (
                                <tr key={object["id"]}>
                                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                    {columns[0].display && <td>{dateFormatter(object["date"])}</td>}
                                    {columns[1].display && <td>{object["fromAccount"]}</td>}
                                    {columns[2].display && <td>{object["toAccount"]}</td>}
                                    {columns[3].display && <td>{formatter(object["amount"])}</td>}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default NostroTransfer