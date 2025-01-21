import { formatter, dateFormatter, timestampFormatter } from '../../../../santasoft/components/Formatter'

import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort-up.png'
import sortDownImgae from '../../../../santasoft/res/sort-down.png'

import editImgae from '../../../../santasoft/res/edit.png'
import downloadImgae from '../../../../santasoft/res/download.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableHeader from '../../../../santasoft/components/table/TableHeader'
import TableActions from '../../../../santasoft/components/table/TableActions'

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

function SecurityGridForAuthorization({ user, setFloatFormHandler, setUserInput, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [securityType, setSecurityType] = useState('MTB')

    const [status, setStatus] = useState('pending')

    const [filter, setFilter] = useState('empty')

    const [sort, setSort] = useState('empty')

    const [reason, setReason] = useState('')

    const getTypeBorder = (name) => {
        if (name === securityType) {
            return '2px solid #1c4966';
        }
        else {
            return 'none';
        }
    }

    const getBackgroundColor = (name) => {
        if (name === status) {
            return '#1c4966';
        }
        else {
            return 'rgb(218, 218, 218)';
        }
    }

    const getTextColor = (name) => {
        if (name === status) {
            return 'white';
        }
        else {
            return '#1c4966';
        }
    }

    const [columns, setColumns] = useState([
        {
            label: 'Security',
            accessor: 'security',
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
            label: 'Shut Period',
            accessor: 'shut_period',
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
            label: 'Coupon',
            accessor: 'coupon',
            display: true,
            sortable: true
        },
        {
            label: 'Coupon Frequency',
            accessor: 'coupon_frequency',
            display: true,
            sortable: true
        },
        {
            label: 'Security code',
            accessor: 'security_code',
            display: true,
            sortable: true
        },
        {
            label: 'Status',
            accessor: 'status',
            display: false,
            sortable: true
        },
        {
            label: 'Created by',
            accessor: 'created_by',
            display: true,
            sortable: true
        },
        {
            label: 'Created date',
            accessor: 'created_date',
            display: true,
            sortable: true
        },
        {
            label: 'Last modified by',
            accessor: 'last_modified_by',
            display: true,
            sortable: true
        },
        {
            label: 'Last modified date',
            accessor: 'last_modified_date',
            display: true,
            sortable: true
        },
        {
            label: 'Rejected by',
            accessor: 'rejected_by',
            display: true,
            sortable: true
        },
        {
            label: 'Rejection date',
            accessor: 'rejection_date',
            display: true,
            sortable: true
        },
        {
            label: 'Reversed by',
            accessor: 'reversed_by',
            display: true,
            sortable: true
        },
        {
            label: 'Reversed date',
            accessor: 'reversed_date',
            display: true,
            sortable: true
        },
        {
            label: 'Approved by',
            accessor: 'approved_by',
            display: true,
            sortable: true
        },
        {
            label: 'Approved date',
            accessor: 'approved_date',
            display: true,
            sortable: true
        },
        {
            label: 'Reason',
            accessor: 'rejection_reason',
            display: true,
            sortable: false
        },
        {
            label: 'Reason',
            accessor: 'reversal_reason',
            display: true,
            sortable: false
        },
        {
            label: 'Action',
            accessor: 'action',
            display: true,
            sortable: false
        },
        {
            label: 'Comment',
            accessor: 'comment',
            display: true,
            sortable: false
        },
        {
            label: 'Audit trail',
            accessor: 'audit_trail',
            display: true,
            sortable: false
        },
    ])

    useEffect(() => {
        if (status === 'pending') {
            const newState = columns.map(obj => {
                if (obj.accessor === 'rejected_by' || obj.accessor === 'rejection_date' || obj.accessor === 'reversed_by' || obj.accessor === 'reversed_date' || obj.accessor === 'approved_by' || obj.accessor === 'approved_date' || obj.accessor === 'rejection_reason' || obj.accessor === 'reversal_reason') {
                    return { ...obj, display: false }
                }
                else {
                    return { ...obj, display: true }
                }
            })
            setColumns(newState)
        }
        else if (status === 'rejected') {
            const newState = columns.map(obj => {
                if (obj.accessor === 'reversed_by' || obj.accessor === 'reversed_date' || obj.accessor === 'approved_by' || obj.accessor === 'approved_date' || obj.accessor === 'reversal_reason' || obj.accessor === 'comment') {
                    return { ...obj, display: false }
                }
                else {
                    return { ...obj, display: true }
                }
            })
            setColumns(newState)
        }
        else if (status === 'reversed') {
            const newState = columns.map(obj => {
                if (obj.accessor === 'rejected_by' || obj.accessor === 'rejection_date' || obj.accessor === 'approved_by' || obj.accessor === 'approved_date' || obj.accessor === 'rejection_reason' || obj.accessor === 'comment') {
                    return { ...obj, display: false }
                }
                else {
                    return { ...obj, display: true }
                }
            })
            setColumns(newState)
        }
        else if (status === 'approved') {
            const newState = columns.map(obj => {
                if (obj.accessor === 'reversed_by' || obj.accessor === 'reversed_date' || obj.accessor === 'rejected_by' || obj.accessor === 'rejection_date' || obj.accessor === 'reversal_reason' || obj.accessor === 'rejection_reason') {
                    return { ...obj, display: false }
                }
                else {
                    return { ...obj, display: true }
                }
            })
            setColumns(newState)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    const [data, setData] = useState([
        {
            "id": null,
            "security": null,
            "maturity": null,
            "shut_period": null,
            "dtm": null,
            "coupon": null,
            "coupon_frequency": null,
            "security_code": null,
            "created_by": null,
            "created_date": null,
            "last_modified_by": null,
            "last_modified_date": null,
            "rejected_by": null,
            "rejected_date": null,
            "rejection_reason": null,
            "reversed_by": null,
            "reversed_date": null,
            "reversal_reason": null,
            "approved_by": null,
            "approved_date": null,
        },
    ])

    // const fetchByID = async (id) => {
    //     try {
    //         setIsLoading(true);
    //         const response = await fetch(ip + '/sm15/FdirYW2qVPoIzLnbP07CW2adi1!0K2Mv*nTyUg5$7yWg*WwSQT/updating/none/none/' + id + '/', {
    //             method: 'Get',
    //             headers: {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //                 'Authorization': 'Token ' + user.token + ''
    //             },
    //         });
    //         setIsLoading(false);

    //         let result = await response.json();

    //         if (response.status === 200) {
    //             setUserInput(result.data);
    //         }

    //         else if (response.status === 401) {
    //             addMessageHandler({
    //                 title: 'Unable to load',
    //                 content: 'Blotter grid failed to load due to unauthorized request.',
    //                 type: 4
    //             })
    //         }

    //         else if (response.status === 406) {
    //             addMessageHandler({
    //                 title: 'Unable to load',
    //                 content: result.message,
    //                 type: 4
    //             })
    //         }

    //         else if (response.status === 500) {
    //             addMessageHandler({
    //                 title: 'Unable to load',
    //                 content: result.message,
    //                 type: 4
    //             })
    //         }
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm15/FdirYW2qVPoIzLnbP07CW2adi1!0K2Mv*nTyUg5$7yWg*WwSQT/approval/' + status + '/' + securityType + '/none/' + filter + '/' + sort + '/empty/' + currentPage + '/' + pageSize + '/', {
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
                setDataCount(result.count.count);
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

    const submitHandler = async (id, action) => {
        try {
            // if (checkRequiredField()) {
            setIsLoading(true);
            const response = await fetch(ip + '/sm15/FdirYW2qVPoIzLnbP07CW2adi1!0K2Mv*nTyUg5$7yWg*WwSQT/none/none/none/none/none/none/empty/0/0/', {
                method: 'POST',
                body: JSON.stringify({ id: id, action: action, reason: reason }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            })
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setReason('')
                addMessageHandler({
                    title: 'Success',
                    content: result.message,
                    type: 3
                })
                fetchAPI()
            }

            else if (response.status === 400) {
                addMessageHandler({
                    title: 'Failed',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Failed',
                    content: 'Unauthorized request.',
                    type: 4
                })
            }

            else if (response.status === 412) {
                addMessageHandler({
                    title: 'Failed',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 409) {
                addMessageHandler({
                    title: 'Failed',
                    content: result.message,
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
            // }
        }
        catch (err) {
            console.log(err.message);
        }
    };

    const fetchByID = async (id) => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm15/FdirYW2qVPoIzLnbP07CW2adi1!0K2Mv*nTyUg5$7yWg*WwSQT/updating/none/none/' + id + '/none/none/none/0/0/', {
                method: 'Get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setUserInput(result.data);
                setFloatFormHandler()
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
    // }, [securityType, status]);

    // 
    //  Paging 
    // 

    const [pageSize, setPageSize] = useState(100)

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
    }, [filter, sort, currentPage, pageSize, securityType, status]);

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
                const response = await fetch(ip + '/sfe05/WCfYb@p4WFqNCMjl6O!Si4bCYOH6NWlrB88wXYC8m$L*Cho&UP/' + filter + '/' + sort + '/download/' + currentPage + '/' + pageSize + '/' + date + '/' + currencyOne + '/' + currencyTwo + '/', {
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
        <div className='fixed-income-securities-sub-home-approval-dashboard'>
            <div className='table-container'>

                {isloading && <Loader margin={'45%'} />}

                {/* Table Title */}
                <div className='table-container-name' style={{ paddingBottom: '4px', height: '16px', paddingTop: '5px' }}>
                    <div className='fixed-income-securities-sub-home-approval-dashboard-options' style={{ backgroundColor: getBackgroundColor('pending') }} onClick={() => setStatus('pending')}><p style={{ display: 'inline', margin: '0px 8px 0px 10px', color: getTextColor('pending') }}>Pending</p></div>
                    <div className='fixed-income-securities-sub-home-approval-dashboard-options' style={{ backgroundColor: getBackgroundColor('rejected') }} onClick={() => setStatus('rejected')}><p style={{ display: 'inline', margin: '0px 8px 0px 10px', color: getTextColor('rejected') }}>Rejected</p></div>
                    <div className='fixed-income-securities-sub-home-approval-dashboard-options' style={{ backgroundColor: getBackgroundColor('reversed') }} onClick={() => setStatus('reversed')}><p style={{ display: 'inline', margin: '0px 8px 0px 10px', color: getTextColor('reversed') }}>Reversed</p></div>
                    <div className='fixed-income-securities-sub-home-approval-dashboard-options' style={{ backgroundColor: getBackgroundColor('approved') }} onClick={() => setStatus('approved')}><p style={{ display: 'inline', margin: '0px 8px 0px 10px', color: getTextColor('approved') }}>Approved</p></div>
                    {/* <p style={{ display: 'inline', borderBottom: getTypeBorder('gis_floater'), cursor: 'pointer', margin: '0px 8px 0px 10px' }} onClick={() => setSecurityType('gis_floater')}>Ijara Sukuk-VRR</p> */}
                    {/* <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div> */}
                </div>

                {/* Table Title */}
                <div className='table-container-name' style={{ border: 'none', paddingBottom: '4px', paddingTop: '0px' }}>
                    <p style={{ display: 'inline', cursor: 'pointer', margin: '0px 0px 0px 10px' }}>Securities: </p>
                    <p style={{ display: 'inline', borderBottom: getTypeBorder('MTB'), cursor: 'pointer', margin: '0px 8px 0px 10px' }} onClick={() => setSecurityType('MTB')}>T-Bill</p>
                    <p style={{ display: 'inline', borderBottom: getTypeBorder('pib_fixed'), cursor: 'pointer', margin: '0px 8px 0px 10px' }} onClick={() => setSecurityType('pib_fixed')}>PIB-Fixed</p>
                    <p style={{ display: 'inline', borderBottom: getTypeBorder('pib_floater'), cursor: 'pointer', margin: '0px 8px 0px 10px' }} onClick={() => setSecurityType('pib_floater')}>PIB-Floating</p>
                    <p style={{ display: 'inline', borderBottom: getTypeBorder('gis_fixed'), cursor: 'pointer', margin: '0px 8px 0px 10px' }} onClick={() => setSecurityType('gis_fixed')}>Ijara Sukuk-FRR</p>
                    <p style={{ display: 'inline', borderBottom: getTypeBorder('gis_floater'), cursor: 'pointer', margin: '0px 8px 0px 10px' }} onClick={() => setSecurityType('gis_floater')}>Ijara Sukuk-VRR</p>
                    {/* <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div> */}
                </div>

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
                                        {columns[0].display && <td>{object["security"]}</td>}
                                        {columns[1].display && <td>{dateFormatter(object["maturity"])}</td>}
                                        {columns[2].display && <td>{dateFormatter(object["shut_period"])}</td>}
                                        {columns[3].display && <td>{formatter(object["dtm"])}</td>}
                                        {columns[4].display && <td>{object["coupon"]}</td>}
                                        {columns[5].display && <td>{object["coupon_frequency"]}</td>}
                                        {columns[6].display && <td>{object["security_code"]}</td>}
                                        {columns[7].display && <td>{object["status"]}</td>}
                                        {columns[8].display && <td>{object["created_by"]}</td>}
                                        {columns[9].display && <td>{timestampFormatter(object["created_date"])}</td>}
                                        {columns[10].display && <td>{object["last_modified_by"]}</td>}
                                        {columns[11].display && <td>{timestampFormatter(object["last_modified_date"])}</td>}
                                        {(columns[12].display && status === 'rejected') && <td>{object["rejected_by"]}</td>}
                                        {(columns[13].display && status === 'rejected') && <td>{timestampFormatter(object["rejected_date"])}</td>}
                                        {(columns[14].display && status === 'reversed') && <td>{object["reversed_by"]}</td>}
                                        {(columns[15].display && status === 'reversed') && <td>{timestampFormatter(object["reversed_date"])}</td>}
                                        {(columns[16].display && status === 'approved') && <td>{object["approved_by"]}</td>}
                                        {(columns[17].display && status === 'approved') && <td>{timestampFormatter(object["approved_date"])}</td>}
                                        {(columns[18].display && status === 'rejected') && <td>{object["rejection_reason"]}</td>}
                                        {(columns[19].display && status === 'reversed') && <td>{object["reversal_reason"]}</td>}
                                        {(columns[20].display && status === 'pending') && <td>
                                            <div className='transaction-grid-multiple-button' style={{ backgroundColor: '#1bbd19' }} onClick={() => submitHandler(object["id"], 'approve')}>Approved</div>
                                            <div className='transaction-grid-multiple-button' style={{ backgroundColor: '#f32136' }} onClick={() => submitHandler(object["id"], 'reject')}>Reject</div>
                                            <div className='transaction-grid-multiple-button' style={{ backgroundColor: '#213af3' }} onClick={() => fetchByID(object["id"])}>Edit</div>
                                        </td>}
                                        {(columns[20].display && status === 'rejected') && <td>
                                            <div className='transaction-grid-multiple-button' style={{ backgroundColor: '#213af3' }} onClick={() => fetchByID(object["id"])}>Edit</div>
                                        </td>}
                                        {(columns[20].display && status === 'reversed') && <td>
                                            <div className='transaction-grid-multiple-button' style={{ backgroundColor: '#213af3' }} onClick={() => fetchByID(object["id"])}>Edit</div>
                                        </td>}
                                        {(columns[20].display && status === 'approved') && <td>
                                            <div className='transaction-grid-multiple-button' style={{ backgroundColor: '#f35921' }} onClick={() => submitHandler(object["id"], 'reverse')}>Reversed</div>
                                        </td>}
                                        {(columns[21].display && status === 'pending') && <td><input type="text" style={{ width: '250px' }} onChange={e => setReason(e.target.value)} value={reason} /></td>}
                                        {(columns[21].display && status === 'approved') && <td><input type="text" style={{ width: '250px' }} onChange={e => setReason(e.target.value)} value={reason} /></td>}
                                        {columns[22].display && <td style={{ cursor: 'pointer', textDecoration: 'underline' }}>view</td>}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default SecurityGridForAuthorization