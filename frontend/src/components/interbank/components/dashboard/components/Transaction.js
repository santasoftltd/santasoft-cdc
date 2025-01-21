import { formatter, dateFormatter } from '../../../../santasoft/components/Formatter'

import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort-up.png'
import sortDownImgae from '../../../../santasoft/res/sort-down.png'
import downloadImgae from '../../../../santasoft/res/download.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableSummary from '../../../../santasoft/components/table/TableSummary'
import TableActions from '../../../../santasoft/components/table/TableActions'
import TableHeader from '../../../../santasoft/components/table/TableHeader'

import TransactionInput from './TransactionInput';

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

import '../Dashboard.css'

function Transaction({ user, refresh, date, dropdownLists, dataSummary, setDataSummary, fetchedData, setFetchedData, onUpdateHandler, addMessageHandler }) {

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
            label: 'Counter party',
            accessor: 'counter_party',
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
            label: 'First currency',
            accessor: 'ccy_1',
            display: true,
            sortable: true
        },
        {
            label: 'Second currency',
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
            label: 'Equiv. amount',
            accessor: 'equiv_amount',
            display: true,
            sortable: true
        },
        {
            label: 'Interbank rate',
            accessor: 'ib_rate',
            display: true,
            sortable: true
        },
        {
            label: 'Deal mode',
            accessor: 'deal_mode',
            display: true,
            sortable: true
        },
        {
            label: 'Posted',
            accessor: 'posted',
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
            label: 'USD rate',
            accessor: 'usd_rate',
            display: true,
            sortable: true
        },
        {
            label: 'Equiv. USD',
            accessor: 'equiv_usd',
            display: true,
            sortable: true
        },
        {
            label: 'Equiv. PKR',
            accessor: 'equiv_pkr',
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
            label: 'Reval rate',
            accessor: 'reval_rate',
            display: true,
            sortable: true
        },
        {
            label: 'Gain/Loss',
            accessor: 'gain_loss',
            display: true,
            sortable: true
        },
    ])

    const dataSummaryTitles = [
        {
            name: "Total amount: ",
            accessor: "total_amount"
        },
        {
            name: "Rate: ",
            accessor: "rate"
        },
        {
            name: "Total equiv. amount: ",
            accessor: "total_equiv_amount"
        },
        {
            name: "Total equiv. USD: ",
            accessor: "total_equiv_usd"
        },
        {
            name: "Total equiv. PKR: ",
            accessor: "total_equiv_pkr"
        },
        {
            name: "Total gain/loss: ",
            accessor: "total_gain_loss"
        }
    ]

    // const [data, setData] = useState([
    //     {
    //         "id": null,
    //         "deal_type": null,
    //         "deal_date": null,
    //         "value_date": null,
    //         "dealer_desk": null,
    //         "counter_party": null,
    //         "buy_sell": null,
    //         "ccy_1": null,
    //         "ccy_2": null,
    //         "amount": null,
    //         "rate": null,
    //         "equiv_amount": null,
    //         "ib_rate": null,
    //         "deal_mode": null,
    //         "posted": null,
    //         "brokerage": null,
    //         "usd_rate": null,
    //         "equiv_usd": null,
    //         "equiv_pkr": null,
    //         "dtm": null,
    //         "reval_rate": null,
    //         "gain_loss": null,
    //     }
    // ])

    // const [dataSummary, setDataSummary] = useState({
    //     "id": 0,
    //     "total_amount": 0,
    //     "rate": 0,
    //     "total_equiv_amount": 0,
    //     "total_equiv_usd": 0,
    //     "total_equiv_pkr": 0,
    //     "total_gain_loss": 0,
    // })

    const [userInput, setUserInput] = useState(
        {
            "id": null,
            "deal_type": 'Ready',
            "deal_date": date,
            "value_date": date,
            "dealer_desk": '',
            "counter_party": '',
            "buy_sell": 'Buy',
            "ccy_1": '',
            "ccy_2": '',
            "amount": '',
            "rate": '',
            "equiv_amount": '',
            "ib_rate": '',
            "deal_mode": '',
            "posted": 'N',
            "brokerage": '',
            "usd_rate": '',
            "equiv_usd": null,
            "equiv_pkr": null,
            "dtm": null,
            "reval_rate": null,
            "gain_loss": null,
        }
    )

    useEffect(() => {
        setUserInput({ ...userInput, 'deal_date': date, 'value_date': date })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    const eraseHandler = () => {
        setUserInput({
            "id": null,
            "deal_type": 'Ready',
            "deal_date": date,
            "value_date": date,
            "dealer_desk": '',
            "counter_party": '',
            "buy_sell": 'Buy',
            "ccy_1": '',
            "ccy_2": '',
            "amount": '',
            "rate": '',
            "equiv_amount": '',
            "ib_rate": '',
            "deal_mode": '',
            "posted": 'N',
            "brokerage": '',
            "usd_rate": '',
            "equiv_usd": '',
            "equiv_pkr": '',
            "dtm": '',
            "reval_rate": '',
            "gain_loss": '',
        })
    }

    const submitHandler = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/gGUPFrzJiw$DZEfGpIpIoC&R$U5oJaFEhr&mmB8qIbPiB1DEhG/' + filter + '/' + sort + '/empty/0/0/' + date + '/0/', {
                method: 'POST',
                body: JSON.stringify(userInput),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            })
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setFetchedData([result.object, ...fetchedData]);
                setUserInput({
                    "id": null,
                    "deal_type": 'Ready',
                    "deal_date": date,
                    "value_date": date,
                    "dealer_desk": '',
                    "counter_party": '',
                    "buy_sell": 'Buy',
                    "ccy_1": '',
                    "ccy_2": '',
                    "amount": '',
                    "rate": '',
                    "equiv_amount": '',
                    "ib_rate": '',
                    "deal_mode": '',
                    "posted": 'N',
                    "brokerage": '',
                    "usd_rate": '',
                    "equiv_usd": '',
                    "equiv_pkr": '',
                    "dtm": '',
                    "reval_rate": '',
                    "gain_loss": '',
                });
                setDataSummary(result.summary);
                addMessageHandler({
                    title: 'Transaction saved',
                    content: result.message,
                    type: 3
                })
            }

            else if (response.status === 400) {
                addMessageHandler({
                    title: 'Transaction not saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Transaction not saved',
                    content: 'Unable to saved due to unauthorized request.',
                    type: 4
                })
            }

            else if (response.status === 412) {
                addMessageHandler({
                    title: 'Transaction not saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 409) {
                addMessageHandler({
                    title: 'Transaction not saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 406) {
                addMessageHandler({
                    title: 'Transaction not saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 500) {
                addMessageHandler({
                    title: 'Transaction not saved',
                    content: result.message,
                    type: 4
                })
            }
        }
        catch (err) {
            console.log(err.message);
        }
    };

    const onUpdate = async (object) => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/gGUPFrzJiw$DZEfGpIpIoC&R$U5oJaFEhr&mmB8qIbPiB1DEhG/empty/empty/empty/0/0/' + date + '/' + object.id + '/', {
                method: 'PUT',
                body: JSON.stringify(object),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            })
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setFetchedData(current =>
                    current.map(obj => {
                        if (obj['id'] === object['id']) {
                            return result.object
                        }
                        else {
                            return obj
                        }
                    })
                );
                setDataSummary(result.summary);
                addMessageHandler({
                    title: 'Transaction Updated',
                    content: result.message,
                    type: 3
                });
            }

            else if (response.status === 400) {
                addMessageHandler({
                    title: 'Transaction not updated',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Transaction not updated',
                    content: 'Unable to update due to unauthorized request.',
                    type: 4
                })
            }

            else if (response.status === 412) {
                addMessageHandler({
                    title: 'Transaction not updated',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 404) {
                addMessageHandler({
                    title: 'Transaction not updated',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 409) {
                addMessageHandler({
                    title: 'Transaction not updated',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 406) {
                addMessageHandler({
                    title: 'Transaction not updated',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 500) {
                addMessageHandler({
                    title: 'Transaction not updated',
                    content: result.message,
                    type: 4
                })
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const deleteHandler = async () => {
        if (selectedRows.length > 1) {
            addMessageHandler({
                title: 'Multiple rows selected',
                content: 'Only one row can be deleted at a time',
                type: 2
            })
        }
        else {
            if (window.confirm("Selected deal will be deleted from the system!")) {
                try {
                    setIsLoading(true);
                    const response = await fetch(ip + '/sfe05/gGUPFrzJiw$DZEfGpIpIoC&R$U5oJaFEhr&mmB8qIbPiB1DEhG/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/' + date + '/' + selectedRows[0] + '/', {
                        method: 'DELETE',
                        body: JSON.stringify({ 'user': user.name }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            'Authorization': 'Token ' + user.token + ''
                        },
                    })
                    setIsLoading(false);

                    let result = await response.json();

                    if (response.status === 200) {
                        setFetchedData(current =>
                            current.filter(obj => obj['id'] !== selectedRows[0]).map(filterData => { return filterData })
                        );
                        setSelectedRows([]);
                        setDataSummary(result.summary);
                        addMessageHandler({
                            title: 'Transaction Deleted',
                            content: result.message,
                            type: 3
                        });
                    }

                    else if (response.status === 400) {
                        addMessageHandler({
                            title: 'Transaction not deleted',
                            content: result.message,
                            type: 2
                        })
                    }

                    else if (response.status === 401) {
                        addMessageHandler({
                            title: 'Transaction not deleted',
                            content: 'Unable to delete due to unauthorized request.',
                            type: 4
                        })
                    }

                    else if (response.status === 404) {
                        addMessageHandler({
                            title: 'Transaction not deleted',
                            content: result.message,
                            type: 4
                        })
                    }

                    else if (response.status === 406) {
                        addMessageHandler({
                            title: 'Transaction not deleted',
                            content: result.message,
                            type: 4
                        })
                    }

                    else if (response.status === 500) {
                        addMessageHandler({
                            title: 'Transaction not deleted',
                            content: result.message,
                            type: 4
                        })
                    }
                }
                catch (err) {
                    console.log(err.message);
                }
            }
        }
    }

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/gGUPFrzJiw$DZEfGpIpIoC&R$U5oJaFEhr&mmB8qIbPiB1DEhG/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/' + date + '/0/', {
                method: 'Get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setFetchedData(result.data);
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

    useEffect(() => {
        fetchAPI();
        // let interval = setInterval(() => fetchAPI(), 1000 * 30);
        // return function cleanup() {
        // clearInterval(interval);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, refresh, filter, sort]);

    // Call reval process

    const runRevalProcess = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/gGUPFrzJiw$DZEfGpIpIoC&R$U5oJaFEhr&mmB8qIbPiB1DEhG/' + filter + '/' + sort + '/reval/' + currentPage + '/' + pageSize + '/' + date + '/0/', {
                method: 'Get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setFetchedData(result.data);
                setDataSummary(result.summary);
                setDataCount(result.summary.count);
                addMessageHandler({
                    title: 'Gain/Loss calculated successfully',
                    content: result.message,
                    type: 3
                })
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Gain/Loss calculation failed',
                    content: 'Blotter grid failed to load due to unauthorized request.',
                    type: 4
                })
            }

            else if (response.status === 406) {
                addMessageHandler({
                    title: 'Gain/Loss calculation failed',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 500) {
                addMessageHandler({
                    title: 'Gain/Loss calculation failed',
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

    const [pageSize, setPageSize] = useState(50)

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
    }, [refresh, filter, sort, date, currentPage, pageSize]);

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
                const response = await fetch(ip + '/sfe05/gGUPFrzJiw$DZEfGpIpIoC&R$U5oJaFEhr&mmB8qIbPiB1DEhG/' + filter + '/' + sort + '/download/' + currentPage + '/' + pageSize + '/' + date + '/0/', {
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
        "modifiable": true,
        "columns": columns,
        "data": fetchedData,
        "deleteHandler": deleteHandler,
        "eraseHandler": eraseHandler,
        "submitHandler": submitHandler,
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

    const onChangeHandler = (e, object) => {
        setFetchedData(current =>
            current.map(obj => {
                if (obj['id'] === object['id']) {
                    return { ...object, 'gain_loss': e.target.value }
                }
                else {
                    return obj
                }
            })
        )
    }

    return (
        <div className='table-container interbank-dahsboard-third-child'>

            {isloading && <Loader margin={'45%'} />}

            {/* Table Title */}
            {/* <TableTitle title={'Transactions'} actions={actions} /> */}
            <div className='table-container-name'>
                <p style={{ display: 'inline' }}>Transactions</p>
                <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
                <div className='transaction-grid-button' onClick={() => runRevalProcess()}>Calc. Gain/Loss</div>
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
                        <TransactionInput userInput={userInput} setUserInput={setUserInput} columns={columns} dropdownLists={dropdownLists} submitHandler={submitHandler} />
                        {
                            fetchedData.map((object) => (
                                <tr key={object["id"]} onDoubleClick={() => onUpdateHandler(object)}>
                                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                    {columns[0].display && <td>{object["deal_type"]}</td>}
                                    {columns[1].display && <td>{dateFormatter(object["deal_date"])}</td>}
                                    {columns[2].display && <td>{dateFormatter(object["value_date"])}</td>}
                                    {columns[3].display && <td>{object["dealer_desk"]}</td>}
                                    {columns[4].display && <td>{object["counter_party"]}</td>}
                                    {columns[5].display && <td>{object["buy_sell"]}</td>}
                                    {columns[6].display && <td>{object["ccy_1"]}</td>}
                                    {columns[7].display && <td>{object["ccy_2"]}</td>}
                                    {columns[8].display && <td>{formatter(object["amount"])}</td>}
                                    {columns[9].display && <td>{formatter(object["rate"])}</td>}
                                    {columns[10].display && <td>{formatter(object["equiv_amount"])}</td>}
                                    {columns[11].display && <td>{formatter(object["ib_rate"])}</td>}
                                    {columns[12].display && <td>{object["deal_mode"]}</td>}
                                    {columns[13].display && <td>
                                        <select onChange={e => onUpdate({ ...object, 'posted': e.target.value })} defaultValue={object["posted"]}>
                                            <option value='N'></option>
                                            <option value='Y'>Y</option>
                                        </select>
                                    </td>}
                                    {columns[14].display && <td>{formatter(object["brokerage"])}</td>}
                                    {columns[15].display && <td>{formatter(object["usd_rate"])}</td>}
                                    {columns[16].display && <td>{formatter(object["equiv_usd"])}</td>}
                                    {columns[17].display && <td>{formatter(object["equiv_pkr"])}</td>}
                                    {columns[18].display && <td>{object["dtm"]}</td>}
                                    {columns[19].display && <td>{formatter(object["reval_rate"])}</td>}
                                    {columns[20].display && <td><input type="text" onChange={e => onChangeHandler(e, object)} onBlur={e => onUpdate({ ...object, 'gain_loss': e.target.value.replace(',', '') })} value={formatter(object["gain_loss"])} /></td>}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Transaction