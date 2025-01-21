import { formatter, dateFormatter } from '../../../../../santasoft/components/Formatter'

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

function Securities({ user, refresh, date, singleTitle, isRefresh, fetchDeal, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [filter, setFilter] = useState('empty')

    const [sort, setSort] = useState('empty')

    const [security, setSecurity] = useState('1')

    const [columns, setColumns] = useState([
        {
            label: 'Contract Number',
            accessor: 'contract_number',
            display: true,
            sortable: true
        },
        {
            label: 'Lending/Borrowing',
            accessor: 'lending_borrowing',
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
            label: 'Issue Date',
            accessor: 'issue_date',
            display: true,
            sortable: true
        },
        {
            label: 'Issue Maturity',
            accessor: 'issue_maturity',
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
            label: 'Price',
            accessor: 'price',
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
            label: 'ACV',
            accessor: 'acv',
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
            label: 'Days to Maturity',
            accessor: 'days_to_maturitry',
            display: true,
            sortable: true
        },
        {
            label: 'LCD',
            accessor: 'last_coupon',
            display: true,
            sortable: true
        },
        {
            label: 'NCD',
            accessor: 'next_coupon',
            display: true,
            sortable: true
        },
    ])

    const [data, setData] = useState([
        {
            "id": null,
            "contract": null,
            "lending_borrowing": null,
            "counter_party": null,
            "issue_date": null,
            "issue_maturity": null,
            "face_value": null,
            "price": null,
            "yld": null,
            "acv": null,
            "total_deal_days": null,
            "days_to_maturitry": null,
            "last_coupon": null,
            "next_coupon": null,
        },
    ])

    const [dataSummary, setDataSummary] = useState({
        "id": 0,
        "count": 0,
    })

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/$dUojLjnhaRRTLYg9MIG4Q2nOLgdnVL6ni8T5nWf9zBsm2VG*i/' + date + '/' + security + '/' + filter + '/' + sort + '/' + currentPage + '/' + pageSize + '/null/', {
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

    useEffect(() => {
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, date, security, isRefresh]);

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
                const response = await fetch(ip + '/sm01/$dUojLjnhaRRTLYg9MIG4Q2nOLgdnVL6ni8T5nWf9zBsm2VG*i/' + date + '/' + security + '/' + filter + '/' + sort + '/' + currentPage + '/' + pageSize + '/download/', {
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
                <TableTitle title={'Available for Sale'} />
                :
                <div className='table-container-name' style={{ border: 'none ' }}>
                    <select onChange={e => setSecurity(e.target.value)} defaultValue='1'>
                        <option value="1">Available For Sale</option>
                        <option value="2">Held For Trading</option>
                        <option value="3">Held To Maturity</option>
                        <option value="4">For Repo</option>
                        <option value="5">For Rev-repo</option>
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
                        <TableHeader columns={columns} getSortingImage={null} handleSortingChange={null} />
                    </thead>
                    <tbody>
                        {data.map((object) => (
                            <tr key={object["id"]} onDoubleClick={() => fetchDeal(object["id"])}>
                                <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                {columns[0].display && <td>{object["contract_number"]}</td>}
                                {columns[1].display && <td>{object["lending_borrowing"]}</td>}
                                {columns[2].display && <td>{object["counter_party"]}</td>}
                                {columns[3].display && <td>{dateFormatter(object["issue_date"])}</td>}
                                {columns[4].display && <td>{dateFormatter(object["issue_maturity"])}</td>}
                                {columns[5].display && <td>{formatter(object["face_value"])}</td>}
                                {columns[6].display && <td>{formatter(object["price"])}</td>}
                                {columns[7].display && <td>{formatter(object["yld"])}</td>}
                                {columns[8].display && <td>{formatter(object["acv"])}</td>}
                                {columns[9].display && <td>{object["total_deal_days"]}</td>}
                                {columns[10].display && <td>{object["days_to_maturitry"]}</td>}
                                {columns[11].display && <td>{dateFormatter(object["last_coupon"])}</td>}
                                {columns[12].display && <td>{dateFormatter(object["next_coupon"])}</td>}
                            </tr>
                        ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Securities