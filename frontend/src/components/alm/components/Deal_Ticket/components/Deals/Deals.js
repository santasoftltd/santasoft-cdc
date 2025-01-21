import { formatter, dateFormatter, timestampFormatter } from '../../../../../santasoft/components/Formatter'

import sortImgae from '../../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../../santasoft/res/sort-up.png'
import sortDownImgae from '../../../../../santasoft/res/sort-down.png'
import downloadImgae from '../../../../../santasoft/res/download.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../../santasoft/components/loader/Loader'

import TableTitle from '../../../../../santasoft/components/table/TableTitle';
import TableHeader from '../../../../../santasoft/components/table/TableHeader'
import TableActions from '../../../../../santasoft/components/table/TableActions'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../../App';

function Deals({ user, refresh, date, singleTitle, isRefresh, fetchDeal, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [filter, setFilter] = useState('empty')

    const [sort, setSort] = useState('empty')

    const [deal, setDeal] = useState('today-deals')

    const [columns, setColumns] = useState([
        {
            label: 'Contract No',
            accessor: 'contract_number',
            display: true,
            sortable: true
        },
        {
            label: 'Lending/Borrowing',
            accessor: 'borrowing_lending',
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
            label: 'Deal Type',
            accessor: 'deal_type',
            display: true,
            sortable: true
        },
        {
            label: 'Secure/Unsecure',
            accessor: 'secure_unsecure',
            display: true,
            sortable: true
        },
        {
            label: 'Contract Type',
            accessor: 'contract_type',
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
            label: 'Make Date',
            accessor: 'make_date',
            display: true,
            sortable: true
        },
        {
            label: 'Start Date',
            accessor: 'deal_date',
            display: true,
            sortable: true
        },
        {
            label: 'Maturity Date',
            accessor: 'maturity_date',
            display: true,
            sortable: true
        },
        {
            label: 'Mode',
            accessor: 'mode',
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
            label: 'Yield',
            accessor: 'yld',
            display: true,
            sortable: true
        },
        {
            label: 'Total Deal Days',
            accessor: 'total_deal_days',
            display: true,
            sortable: true
        },
        {
            label: 'Days To Maturitry',
            accessor: 'days_to_maturitry',
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
            label: 'Last Coupon Date',
            accessor: 'lcd',
            display: true,
            sortable: true
        },
        {
            label: 'Next Coupon Date',
            accessor: 'ncd',
            display: true,
            sortable: true
        },
        {
            label: 'Validate',
            accessor: 'validate',
            display: true,
            sortable: true
        },
        {
            label: 'Confirm',
            accessor: 'confirm',
            display: true,
            sortable: true
        },
        {
            label: 'Brokerage',
            accessor: 'brokerage',
            display: true,
            sortable: true
        },
        {
            label: 'Timestamp',
            accessor: 'timestamp',
            display: true,
            sortable: true
        },
    ])

    const [data, setData] = useState([
        {
            "id": null,
            "contract_number": null,
            "borrowing_lending": null,
            "deal_type": null,
            "secure_unsecure": null,
            "contract_type": null,
            "instrument": null,
            "deal_date": null,
            "start_date": null,
            "maturity_date": null,
            "mode": null,
            "counter_party": null,
            "face_value": null,
            "yld": null,
            "total_deal_days": null,
            "days_to_maturitry": null,
            "issue_date": null,
            "lcd": null,
            "ncd": null,
            "confirm": null,
            "validate": null,
            "brokerage": null,
            "timestamp": null,
        },
    ])

    const [dataSummary, setDataSummary] = useState({
        "id": 0,
        "count": 0,
    })

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/pOTQBT*uyT*x2hp9PvV@@t!zMHAgqQI$VYhX1Fc$KQ7e0MFHkm/' + date + '/' + deal + '/' + filter + '/' + sort + '/' + currentPage + '/' + pageSize + '/null/', {
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
                setDataCount(result.summary.count);
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

    // useEffect(() => {
    //     fetchAPI();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [refresh, date, deal]);

    // 
    //  Paging 
    // 

    const [pageSize, setPageSize] = useState(50)

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
    }, [refresh, filter, sort, date, currentPage, pageSize, deal, isRefresh]);

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
            label: 50,
            status: true
        },
        {
            label: 100,
            status: false
        },
        {
            label: 150,
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
                const response = await fetch(ip + '/sm01/pOTQBT*uyT*x2hp9PvV@@t!zMHAgqQI$VYhX1Fc$KQ7e0MFHkm/' + date + '/' + deal + '/' + filter + '/' + sort + '/' + currentPage + '/' + pageSize + '/download/', {
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
        <div className='table-container'>

            {isloading && <Loader margin={'45%'} />}

            {/* Table Title */}
            {singleTitle ?
                <TableTitle title={'Today\'s Deals'} />
                :
                <div className='table-container-name' style={{ border: 'none ' }}>
                    <select onChange={e => setDeal(e.target.value)} value={deal}>
                        <option value="today-deals">Today's Deals</option>
                        <option value="today-maturities">Today's Maturities</option>
                        <option value="outstanding-deals">Outstanding Deals</option>
                        <option value="matured-deals">Matured Deals</option>
                    </select>
                    <div style={{ float: 'right', marginRight: '10px', marginTop: '0.2%' }}><img onClick={() => onDownloadButtonClicked(data, selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
                </div>
            }

            {/* Table Title */}
            {/* <div className='table-container-name' style={{ border: 'none ' }}>
                <p style={{ display: 'inline' }}>Available for Sale</p>
                <div style={{ float: 'right', marginRight: '10px', marginTop: '0.2%' }}><img onClick={() => onDownloadButtonClicked(data, selectedRows, 'transactions')} className='action-pics' src={downloadImgae} title="Download" alt="Download" /></div>
            </div> */}

            {/* Table Actions Bar */}
            <TableActions actions={actions} />

            {/* Table Data Grid */}
            <div className='table-container-grid'>
                <table>
                    <thead>
                        <TableHeader columns={columns} getSortingImage={getSortingImage} handleSortingChange={handleSortingChange} />
                    </thead>
                    <tbody>
                        {data.map((object) => (
                            <tr key={object["id"]} onDoubleClick={() => fetchDeal(object["id"])}>
                                <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                {columns[0].display && <td>{object["contract_number"]}</td>}
                                {columns[1].display && <td>{object["borrowing_lending"]}</td>}
                                {columns[2].display && <td>{object["counter_party"]}</td>}
                                {columns[3].display && <td>{object["deal_type"]}</td>}
                                {columns[4].display && <td>{object["secure_unsecure"]}</td>}
                                {columns[5].display && <td>{object["contract_type"]}</td>}
                                {columns[6].display && <td>{object["instrument"]}</td>}
                                {columns[7].display && <td>{dateFormatter(object["make_date"])}</td>}
                                {columns[8].display && <td>{dateFormatter(object["deal_date"])}</td>}
                                {columns[9].display && <td>{dateFormatter(object["maturity_date"])}</td>}
                                {columns[10].display && <td>{object["mode"]}</td>}
                                {columns[11].display && <td>{formatter(object["face_value"])}</td>}
                                {columns[12].display && <td>{formatter(object["yld"])}</td>}
                                {columns[13].display && <td>{object["total_deal_days"]}</td>}
                                {columns[14].display && <td>{object["days_to_maturitry"]}</td>}
                                {columns[15].display && <td>{dateFormatter(object["issue_date"])}</td>}
                                {columns[16].display && <td>{dateFormatter(object["lcd"])}</td>}
                                {columns[17].display && <td>{dateFormatter(object["ncd"])}</td>}
                                {columns[18].display && <td> {object["validate"] ? <input type='checkbox' checked /> : <input type='checkbox'/>} </td>}
                                {columns[19].display && <td> {object["confirm"] ? <input type='checkbox' checked /> : <input type='checkbox'/>} </td>}
                                {columns[20].display && <td>{formatter(object["brokerage"])}</td>}
                                {columns[21].display && <td>{timestampFormatter(object["timestamp"])}</td>}
                            </tr>
                        ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Deals