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

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

function SecurityGrid({ user, securityType, setSecurityType, setUserInput, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const getTypeBorder = (name) => {
        if (name === securityType) {
            return '2px solid #1c4966';
        }
        else {
            return 'none';
        }
    }

    const columns = [
        {
            label: '',
            accessor: 'edit',
            display: true,
            sortable: false
        },
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
            display: true,
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
            label: 'Audit trail',
            accessor: 'audit_trail',
            display: true,
            sortable: true
        },
    ]

    const [data, setData] = useState([
        // {
        //     "id": null,
        //     "security": null,
        //     "maturity": null,
        //     "shut_period": null,
        //     "dtm": null,
        //     "coupon": null,
        //     "coupon_frequency": null,
        //     "security_code": null,
        //     "input_by": null,
        //     "input_time": null,
        //     "authorized_by": null,
        //     "authorization_date": null,
        // },
    ])

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

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm15/FdirYW2qVPoIzLnbP07CW2adi1!0K2Mv*nTyUg5$7yWg*WwSQT/inputting/none/' + securityType + '/none/none/none/none/0/0/', {
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
    }, [securityType]);

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
        "allColumns": null,
        "columnExpand": null,
        "onExpandButtonClicked": null,
        "onExpandSelectClicked": null,
        "filterFields": null,
        "onFilterSelect": null,
        "onFilterItemDelete": null,
    }

    return (
        <div className='table-container'>

            {isloading && <Loader margin={'45%'} />}

            {/* Table Title */}
            <div className='table-container-name' style={{ border: 'none', paddingBottom: '4px' }}>
                <p style={{ display: 'inline', cursor: 'pointer', margin: '0px 0px 0px 10px' }}>Securities: </p>
                <p style={{ display: 'inline', borderBottom: getTypeBorder('MTB'), cursor: 'pointer', margin: '0px 8px 0px 10px' }} onClick={() => setSecurityType('MTB')}>T-Bill</p>
                <p style={{ display: 'inline', borderBottom: getTypeBorder('pib_fixed'), cursor: 'pointer', margin: '0px 8px 0px 10px' }} onClick={() => setSecurityType('pib_fixed')}>PIB-Fixed</p>
                <p style={{ display: 'inline', borderBottom: getTypeBorder('pib_floater'), cursor: 'pointer', margin: '0px 8px 0px 10px' }} onClick={() => setSecurityType('pib_floater')}>PIB-Floating</p>
                <p style={{ display: 'inline', borderBottom: getTypeBorder('gis_fixed'), cursor: 'pointer', margin: '0px 8px 0px 10px' }} onClick={() => setSecurityType('gis_fixed')}>Ijara Sukuk-FRR</p>
                <p style={{ display: 'inline', borderBottom: getTypeBorder('gis_floater'), cursor: 'pointer', margin: '0px 8px 0px 10px' }} onClick={() => setSecurityType('gis_floater')}>Ijara Sukuk-VRR</p>
                {/* <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div> */}
            </div>

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
                                    {(columns[0].display && object["status"] === 'Pending') ? <td><div className='transaction-grid-multiple-button' style={{backgroundColor:'#213af3'}} onClick={() => fetchByID(object["id"])}>Edit</div></td>
                                    :<td><div className='transaction-grid-multiple-button' style={{backgroundColor:'#bababa', cursor:'not-allowed'}}>Edit</div></td>}
                                    {columns[1].display && <td>{object["security"]}</td>}
                                    {columns[2].display && <td>{dateFormatter(object["maturity"])}</td>}
                                    {columns[3].display && <td>{dateFormatter(object["shut_period"])}</td>}
                                    {columns[4].display && <td>{formatter(object["dtm"])}</td>}
                                    {columns[5].display && <td>{object["coupon"]}</td>}
                                    {columns[6].display && <td>{object["coupon_frequency"]}</td>}
                                    {columns[7].display && <td>{object["security_code"]}</td>}
                                    {columns[8].display && <td>{object["status"]}</td>}
                                    {columns[9].display && <td>{object["created_by"]}</td>}
                                    {columns[10].display && <td>{timestampFormatter(object["created_date"])}</td>}
                                    {columns[11].display && <td>{object["approved_by"]}</td>}
                                    {columns[12].display && <td>{timestampFormatter(object["approved_date"])}</td>}
                                    {columns[13].display && <td>{object["last_modified_by"]}</td>}
                                    {columns[14].display && <td>{timestampFormatter(object["last_modified_date"])}</td>}
                                    {columns[15].display && <td style={{cursor:'pointer', textDecoration:'underline'}}>view</td>}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default SecurityGrid