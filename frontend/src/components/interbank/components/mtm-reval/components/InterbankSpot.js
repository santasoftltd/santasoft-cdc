import { dateFormatter, formatter } from '../../../../santasoft/components/Formatter'

import downloadImgae from '../../../../santasoft/res/download.png'
import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort-up.png'
import sortDownImgae from '../../../../santasoft/res/sort-down.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableActions from '../../../../santasoft/components/table/TableActions'
import TableHeader from '../../../../santasoft/components/table/TableHeader'
import TableSummary from '../../../../santasoft/components/table/TableSummary';

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

function InterbankSpot({ user, refresh, date, currencyOne, currencyTwo, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [filter, setFilter] = useState('empty')

    const [sort, setSort] = useState('empty')

    const [columns, setColumns] = useState([
        {
            label: 'Deal type',
            accessor: 'deal_type',
            display: true,
            sortable: true
        },
        {
            label: 'Deal date',
            accessor: 'deal_date',
            display: true,
            sortable: true
        },
        {
            label: 'Value date',
            accessor: 'value_date',
            display: true,
            sortable: true
        },
        {
            label: 'Dealer desk',
            accessor: 'dealer_desk',
            display: true,
            sortable: true
        },
        {
            label: 'Counter',
            accessor: 'counter',
            display: true,
            sortable: true
        },
        {
            label: 'Buy/Sell',
            accessor: 'buy_sell',
            display: true,
            sortable: true
        },
        {
            label: 'Ccy. 1',
            accessor: 'ccy_1',
            display: true,
            sortable: true
        },
        {
            label: 'Ccy. 2',
            accessor: 'ccy_2',
            display: true,
            sortable: true
        },
        {
            label: 'Amount',
            accessor: 'amount',
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
            label: 'Equiv. USD',
            accessor: 'eqiv_usd',
            display: true,
            sortable: true
        },
        {
            label: 'DTM (As On)',
            accessor: 'dtm',
            display: true,
            sortable: true
        },
        {
            label: 'Swap points (As On)',
            accessor: 'swap_points',
            display: true,
            sortable: true
        },
        {
            label: 'Last points (As On)',
            accessor: 'last_points',
            display: true,
            sortable: true
        },
        {
            label: 'Diff.',
            accessor: 'difference',
            display: true,
            sortable: true
        },
        {
            label: 'GL',
            accessor: 'gl',
            display: true,
            sortable: true
        },
        {
            label: 'USD MTM (Cross)',
            accessor: 'usd_mtm_cross',
            display: true,
            sortable: true
        },
        {
            label: 'Ccy. 1 + USD',
            accessor: 'ccy_1_usd',
            display: true,
            sortable: true
        },
    ])

    const dataSummaryTitles = [
        {
            name: "Total amount: ",
            accessor: "totalAmount"
        },
        {
            name: "Total Equiv. USD: ",
            accessor: "totalEquivUsd"
        },
        {
            name: "Total GL: ",
            accessor: "totalGL"
        },
        {
            name: "Total USD MTM (Cross): ",
            accessor: "totalUsdMtmCross"
        },
        {
            name: "Total Ccy.1 + USD: ",
            accessor: "totalCcyUsd"
        }
    ]

    const [data, setData] = useState([
        {
            "id": null,
            "deal_type": null,
            "deal_date": null,
            "value_date": null,
            "dealer_desk": null,
            "counter": null,
            "buy_sell": null,
            "ccy_1": null,
            "ccy_2": null,
            "amount": null,
            "rate": null,
            "eqiv_usd": null,
            "dtm": null,
            "swap_points": null,
            "last_points": null,
            "difference": null,
            "gl": null,
            "usd_mtm_cross": null,
            "ccy_1_usd": null,
        }
    ])

    const [dataSummary, setDataSummary] = useState({
        "id": 0,
        "totalAmount": 0,
        "totalEquivUsd": 0,
        "totalGL": 0,
        "totalUsdMtmCross": 0,
        "totalCcyUsd": 0,
        "count": 0,
    })

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/$&gq2of8j9EE**!188gcF&SJRPnrfEPdnsDULA@B2hMrNVdd7P/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/' + date + '/' + currencyOne + '/' + currencyTwo + '/', {
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

    const calculate = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/$&gq2of8j9EE**!188gcF&SJRPnrfEPdnsDULA@B2hMrNVdd7P/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/' + date + '/' + currencyOne + '/' + currencyTwo + '/', {
                method: 'POST',
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
                addMessageHandler({
                    title: 'Successful',
                    content: 'Process completed successfully.',
                    type: 3
                })
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Failed',
                    content: 'Unable to load due to unauthorized request.',
                    type: 4
                })
            }

            else if (response.status === 406) {
                addMessageHandler({
                    title: 'Failed',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 500) {
                addMessageHandler({
                    title: 'Failed',
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
    //  Paging 
    // 

    const [pageSize, setPageSize] = useState(25)

    const [currentPage, setCurrentPage] = useState(1);

    const [dataCount, setDataCount] = useState(0);

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
    }, [refresh, filter, sort, date, currentPage, pageSize, currencyOne, currencyTwo]);

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
            label: 25,
            status: true
        },
        {
            label: 50,
            status: false
        },
        {
            label: 100,
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
                const response = await fetch(ip + '/sfe05/$&gq2of8j9EE**!188gcF&SJRPnrfEPdnsDULA@B2hMrNVdd7P/' + filter + '/' + sort + '/download/' + currentPage + '/' + pageSize + '/' + date + '/' + currencyOne + '/' + currencyTwo + '/', {
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
        "count": dataCount,
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
            {/* <TableTitle title={'Interbank spot'} actions={actions} /> */}

            <div className='table-container-name'>
                <p style={{ display: 'inline' }}>Interbank spot</p>
                <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.2%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
                <div className='transaction-grid-button' onClick={() => calculate()}>Claculate</div>
            </div>

            {/* Table Summary Bar */}
            <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary}  display={'inline'}/>

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
                                    {columns[0].display && <td>{object["deal_type"]}</td>}
                                    {columns[1].display && <td>{dateFormatter(object["deal_date"])}</td>}
                                    {columns[2].display && <td>{dateFormatter(object["value_date"])}</td>}
                                    {columns[3].display && <td>{object["dealer_desk"]}</td>}
                                    {columns[4].display && <td>{object["counter"]}</td>}
                                    {columns[5].display && <td>{formatter(object["buy_sell"])}</td>}
                                    {columns[6].display && <td>{formatter(object["ccy_1"])}</td>}
                                    {columns[7].display && <td>{formatter(object["ccy_2"])}</td>}
                                    {columns[8].display && <td>{formatter(object["amount"])}</td>}
                                    {columns[9].display && <td>{formatter(object["rate"])}</td>}
                                    {columns[10].display && <td>{formatter(object["eqiv_usd"])}</td>}
                                    {columns[11].display && <td>{formatter(object["dtm"])}</td>}
                                    {columns[12].display && <td>{object["swap_points"]}</td>}
                                    {columns[13].display && <td>{object["last_points"]}</td>}
                                    {columns[14].display && <td>{object["difference"]}</td>}
                                    {columns[15].display && <td>{formatter(object["gl"])}</td>}
                                    {columns[16].display && <td>{formatter(object["usd_mtm_cross"])}</td>}
                                    {columns[17].display && <td>{formatter(object["ccy_1_usd"])}</td>}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default InterbankSpot