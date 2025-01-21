import sortImgae from '../../../res/sort.png'
import sortUpImgae from '../../../res/sort-up.png'
import sortDownImgae from '../../../res/sort-down.png'

import { useState, useEffect } from 'react'
import React from 'react'

import Loader from '../../../../santasoft/components/loader/Loader'

import TableActions from '../../../../santasoft/components/table/TableActions'
import TableHeader from '../../../../santasoft/components/table/TableHeader'

import { ip } from '../../../../../App'

import '../IpsAccountType.css'

import { dateFormatter } from '../../../../santasoft/components/Formatter'

function IpsAccountTypeGrid({ user, refresh, date, data, setData, setUserInput, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [filter, setFilter] = useState('empty')

    const [sort, setSort] = useState('empty')

    const [period, setPeriod] = useState('future')

    const [columns, setColumns] = useState([
        {
            label: 'Date',
            accessor: 'date',
            display: true,
            sortable: false
        },
        {
            label: 'Description',
            accessor: 'description',
            display: true,
            sortable: false
        },
    ])

    // const [data, setData] = useState([
    //     // {
    //     //     "id": null,
    //     //     "date": null,
    //     //     "description": null,
    //     // }
    // ])

    // const fetchAPI = async () => {
    //     try {
    //         setIsLoading(true);
    //         const response = await fetch(ip + '/sfe05/57lLHq4yGGY5bpQFFL2azHQbX&A6zY4GfAD7OeJYjk67!CFpJV/' + period + '/' + date + '/' + currentPage + '/' + pageSize + '/', {
    //             method: 'Get',
    //             headers: {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //                 'Authorization': 'Token ' + user.token + ''
    //             },
    //         });
    //         setIsLoading(false);

    //         let result = await response.json();

    //         if (response.status === 200) {
    //             setData(result.data);
    //             setDataCount(result.count.count);
    //         }

    //         else if (response.status === 401) {
    //             addMessageHandler({
    //                 title: 'Unable to load',
    //                 content: 'Customers grid failed to load due to unauthorized request.',
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

    // 
    //  Paging 
    // 

    const [pageSize, setPageSize] = useState(100)

    const [currentPage, setCurrentPage] = useState(1);

    const [dataCount, setDataCount] = useState(0)

    // let totolPages = fetchedData.length

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

    // useEffect(() => {
    //     fetchAPI();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [refresh, period, currentPage, pageSize]);

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

    const actions = {
        "modifiable": false,
        "columns": columns,
        "data": data,
        "deleteHandler": null,
        "eraseHandler": null,
        "submitHandler": null,
        "onDownloadButtonClicked": null,
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

            {isloading && <Loader margin={'65%'} />}

            {/* Table Title */}
            <div style={{ borderBottom: 'none' }} className='table-container-name'>
                <p style={{display:'inline'}}>Records</p>
                <select style={{float:'right'}} onChange={e => setPeriod(e.target.value)} value={period}>
                    <option value="future">Future Holidays</option>
                    <option value="past">Past Holidays</option>
                </select>
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
                                <tr key={index} onDoubleClick={() => setUserInput(object)}>
                                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                    {columns[0].display && <td>{dateFormatter(object["date"])}</td>}
                                    {columns[1].display && <td>{object["description"]}</td>}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default IpsAccountTypeGrid