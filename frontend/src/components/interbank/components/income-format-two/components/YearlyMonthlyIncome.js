import { formatter } from '../../../../santasoft/components/Formatter'

import sortImgae from '../../../../santasoft/res/sort.png'
import sortUpImgae from '../../../../santasoft/res/sort-up.png'
import sortDownImgae from '../../../../santasoft/res/sort-down.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import TableTitle from '../../../../santasoft/components/table/TableTitle'
import TableSummary from '../../../../santasoft/components/table/TableSummary'
import TableHeader from '../../../../santasoft/components/table/TableHeader'

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

function YearlyMonthlyIncome({ user, refresh, year, setMonth, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const columns = [
        {
            label: 'Month',
            accessor: 'month',
            display: true,
            sortable: true
        },
        {
            label: 'IB spot',
            accessor: 'ib_spot',
            display: true,
            sortable: true
        },
        {
            label: 'IB fwd. MTM',
            accessor: 'fwd_ib_mtm',
            display: true,
            sortable: true
        },
        {
            label: 'TMU spot',
            accessor: 'tmu_spot',
            display: true,
            sortable: true
        },
        {
            label: 'TMU risk fwd.',
            accessor: 'tmu_risk_fwd',
            display: true,
            sortable: true
        },
        {
            label: 'TMU take-ups',
            accessor: 'tmu_take_ups',
            display: true,
            sortable: true
        },
        {
            label: 'Total',
            accessor: 'nf_total',
            display: true,
            sortable: true
        },
        {
            label: 'Salam income',
            accessor: 'salam_income',
            display: true,
            sortable: true
        },
        {
            label: 'IB desk 02',
            accessor: 'ib_desk_02',
            display: true,
            sortable: true
        },
        {
            label: 'IB desk 22',
            accessor: 'ib_desk_22',
            display: true,
            sortable: true
        },
        {
            label: 'IB desk 23',
            accessor: 'ib_desk_23',
            display: true,
            sortable: true
        },
        {
            label: 'IB desk 24',
            accessor: 'ib_desk_24',
            display: true,
            sortable: true
        },
        {
            label: 'IB desk 27',
            accessor: 'ib_desk_27',
            display: true,
            sortable: true
        },
        {
            label: 'IB desk 28',
            accessor: 'ib_desk_28',
            display: true,
            sortable: true
        },
        {
            label: 'Total',
            accessor: 'f_total',
            display: true,
            sortable: true
        },
        {
            label: 'Month total',
            accessor: 'month_total',
            display: true,
            sortable: true
        },
    ]

    const dataSummaryTitles = [
        {
            name: "Interbank spot: ",
            accessor: "interbankSpot"
        },
        {
            name: "Interbank forward MTM: ",
            accessor: "interbank_mtm"
        }
    ]

    const [data, setData] = useState([
        {
            "id": null,
            "month": null,
            "ib_spot": null,
            "fwd_ib_mtm": null,
            "tmu_spot": null,
            "tmu_risk_fwd": null,
            "tmu_take_ups": null,
            "nf_total": null,
            "salam_income": null,
            "ib_desk_02": null,
            "ib_desk_22": null,
            "ib_desk_23": null,
            "ib_desk_24": null,
            "ib_desk_27": null,
            "ib_desk_28": null,
            "f_total": null,
            "month_total": null,
        }
    ])

    const [dataSummary, setDataSummary] = useState({
        "id": 0,
        "interbankSpot": 0,
        "interbank_mtm": 0
    })

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/zVJeSrMI*$ndq6L3kARgj36P8JRAuEPlFrBMD@iIBgId@co6tN/' + year + '/', {
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
    }, [refresh, year]);

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
            <TableTitle title={'Yearly monthly flow - ' + year} actions={actions} />

            {/* Table Summary Bar */}
            <TableSummary dataSummaryTitles={dataSummaryTitles} dataSummary={dataSummary}  display={'inline'}/>

            {/* Table Data Grid */}
            <div className='table-container-grid'>
                <table>
                    <thead>
                        <tr>
                            <th style={{ borderBottom: 'none', textAlign: 'center' }}></th>
                            <th style={{ borderBottom: 'none', textAlign: 'center' }}></th>
                            <th colSpan="6" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Non Funded</th>
                            <th colSpan="8" style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}>Funded</th>
                            <th style={{ borderBottom: 'none', borderLeft: '1px solid rgb(148, 148, 148)', textAlign: 'center' }}></th>
                        </tr>
                        <TableHeader columns={columns} getSortingImage={getSortingImage} handleSortingChange={handleSortingChange} />
                    </thead>
                    <tbody>
                        {
                            data.map((object, index) => (
                                <tr key={index}>
                                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                    {columns[0].display && <td style={{ color: '#2196F3', cursor: 'pointer' }} onClick={() => setMonth(object.month)}>{object["month"]}</td>}
                                    {columns[1].display && <td>{formatter(object["ib_spot"])}</td>}
                                    {columns[2].display && <td>{formatter(object["fwd_ib_mtm"])}</td>}
                                    {columns[3].display && <td>{formatter(object["tmu_spot"])}</td>}
                                    {columns[4].display && <td>{formatter(object["tmu_risk_fwd"])}</td>}
                                    {columns[5].display && <td>{formatter(object["tmu_take_ups"])}</td>}
                                    {columns[6].display && <td>{formatter(object["f_total"])}</td>}
                                    {columns[7].display && <td>{formatter(object["salam_income"])}</td>}
                                    {columns[8].display && <td>{formatter(object["ib_desk_02"])}</td>}
                                    {columns[9].display && <td>{formatter(object["ib_desk_22"])}</td>}
                                    {columns[10].display && <td>{formatter(object["ib_desk_23"])}</td>}
                                    {columns[11].display && <td>{formatter(object["ib_desk_24"])}</td>}
                                    {columns[12].display && <td>{formatter(object["ib_desk_27"])}</td>}
                                    {columns[13].display && <td>{formatter(object["ib_desk_28"])}</td>}
                                    {columns[14].display && <td>{formatter(object["nf_total"])}</td>}
                                    {columns[15].display && <td>{formatter(object["month_total"])}</td>}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default YearlyMonthlyIncome