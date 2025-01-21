import { formatter, dateFormatter, numberWithCommas } from '../../../../santasoft/components/Formatter'

import downloadImgae from '../../../../santasoft/res/download.png'
import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort.png'
import sortDownImgae from '../../../../santasoft/res/sort.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableHeader from '../../../../santasoft/components/table/TableHeader'

import { useState, useEffect } from 'react'
import React from 'react'

import { ip } from '../../../../../App'

function BranchPositionGrid({ user, refresh, date, addMessageHandler, infoBarOnedata, infoBarFourdata, inflowOutflowDataSummary }) {

    const [isloading, setIsLoading] = useState(false)

    const [columns, setColumns] = useState([
        {
            label: 'Branch',
            accessor: 'branch',
            display: true,
            sortable: true
        },
        {
            label: 'Opening',
            accessor: 'opening',
            display: true,
            sortable: true
        },
        {
            label: 'Inflow',
            accessor: 'inflow',
            display: true,
            sortable: true
        },
        {
            label: 'Outflow',
            accessor: 'outflow',
            display: true,
            sortable: true
        },
        {
            label: 'Closing',
            accessor: 'closing',
            display: true,
            sortable: true
        },
    ])

    const [userInput, setUserInput] = useState(
        {
            "id": null,
            "date": null,
            "branch": null,
            "opening": 0,
            "inflow": 0,
            "outflow": 0,
            "closing": 0,
            "branch_code": null,
        },
    )

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/Y3PB6Hb74E9zW$CPKs3YwL4sBDdC8irt4FwZVT4Hkq0P1*Aigm/' + date + '/', {
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

    useEffect(() => {
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, date]);

    const submitHandlerInflowOutflow = async (obj) => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/Y3PB6Hb74E9zW$CPKs3YwL4sBDdC8irt4FwZVT4Hkq0P1*Aigm/' + date + '/', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            })
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                setUserInput(result.data);
                addMessageHandler({
                    title: 'Saved',
                    content: result.message,
                    type: 3
                })
            }

            else if (response.status === 400) {
                setUserInput(result.data);
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: 'Unable to saved due to unauthorized request.',
                    type: 4
                })
            }

            else if (response.status === 412) {
                setUserInput(result.data);
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 409) {
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 406) {
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 500) {
                setUserInput(result.data);
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: result.message,
                    type: 4
                })
            }
        }
        catch (err) {
            console.log(err.message);
        }
    };

    // const onChangeHandler = (e, object, column) => {
    //     setData(current =>
    //         current.map(obj => {
    //             if (obj['id'] === object['id']) {
    //                 return { ...object, [column]: e.target.value }
    //             }
    //             else {
    //                 return obj
    //             }
    //         })
    //     )
    // }

    const saveClosingHandler = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/Y3PB6Hb74E9zW$CPKs3YwL4sBDdC8irt4FwZVT4Hkq0P1*Aigm/' + date + '/', {
                method: 'PUT',
                body: JSON.stringify(userInput),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            })
            setIsLoading(false);

            let result = await response.json();

            if (response.status === 200) {
                addMessageHandler({
                    title: 'Saved',
                    content: result.message,
                    type: 3
                })
            }

            else if (response.status === 400) {
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: 'Unable to saved due to unauthorized request.',
                    type: 4
                })
            }

            else if (response.status === 412) {
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 409) {
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 406) {
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 500) {
                addMessageHandler({
                    title: 'Error: Not Saved',
                    content: result.message,
                    type: 4
                })
            }
        }
        catch (err) {
            console.log(err.message);
        }
    };

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
            const sorted = [...userInput].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setUserInput(sorted);
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
            const selectedBlotter = userInput.filter(obj => {
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
            const ws = XLSX.utils.json_to_sheet(userInput);
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const fileData = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(fileData, fileName + fileExtension);
        }
    }

    const actions = {
        "modifiable": false,
        "columns": columns,
        "data": userInput,
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
        <div className='table-container' style={{minHeight:'min-content'}}>

            {isloading && <Loader margin={'45%'} />}

            {/* Table Title */}
            <div className='table-container-name' style={{border:'none'}}>
                <p style={{ display: 'inline' }}>Position</p>
                <div style={{ float: 'right', marginRight: '10px', marginTop: '0.2%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.userInput, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
                <div className='transaction-grid-button' onClick={() => saveClosingHandler()}>Save closings</div>
                {userInput.length !== 0
                    ? <div style={{ float: 'right', marginRight: '10px', marginTop: '0.3%' }}>Last date: {dateFormatter(userInput.date)}</div>
                    : <div style={{ float: 'right', marginRight: '10px', marginTop: '0.3%' }}>Last date: 00-00-0000</div>}
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
                        {/* {data.map((object) => ( */}
                        <tr>
                            <td></td>
                            {columns[0].display && <td>{userInput["branch"]}</td>}
                            {columns[1].display && <td> <input type="text" value={(userInput["opening"])} onChange={e => setUserInput({...userInput, 'opening': e.target.value})} onBlur={ () => submitHandlerInflowOutflow(userInput)}/></td>}
                            {columns[2].display && <td> <input type="text" value={(userInput["inflow"])} onChange={e => setUserInput({...userInput, 'inflow': e.target.value})} onBlur={ () => submitHandlerInflowOutflow(userInput)}/> </td>}
                            {columns[3].display && <td> <input type="text" value={(userInput["outflow"])} onChange={e => setUserInput({...userInput, 'outflow': e.target.value})} onBlur={ () => submitHandlerInflowOutflow(userInput)}/> </td>}
                            {columns[4].display && <td>{formatter(userInput["closing"])}</td>}
                            
                            {/* {columns[4].display && <td>{formatter(object["closing"])}</td>} */}
                        </tr>
                        {/* // )) */}
                        {/* // } */}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default BranchPositionGrid