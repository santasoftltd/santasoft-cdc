import { ip } from '../../../../../App';
import { dateFormatter, formatter } from '../../../../santasoft/components/Formatter'
import downloadImgae from '../../../../santasoft/res/download.png'
import Loader from '../../../../santasoft/components/loader/Loader';
import TableHeader from '../../../../santasoft/components/table/TableHeader';
import { useState, useEffect } from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import React from 'react'

function SwapPointsGrid({ user, refresh, date, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [currency, setCurrency] = useState('USD')

    const [currenciesList, setCurrenciesList] = useState(['USD'])

    const [columns, setColumns] = useState([
        {
            label: 'Date',
            accessor: 'date',
            display: true,
            sortable: true
        },
        {
            label: 'Currency',
            accessor: 'ccy',
            display: true,
            sortable: true
        },
        {
            label: 'Tenor',
            accessor: 'tenor',
            display: true,
            sortable: true
        },
        {
            label: 'Days',
            accessor: 'days',
            display: true,
            sortable: true
        },
        {
            label: 'Swap points',
            accessor: 'swap_points',
            display: true,
            sortable: true
        },
    ])

    const [data, setData] = useState([
        {
            "id": null,
            "date": null,
            "ccy": null,
            "tenor": null,
            "days": null,
            "swap_points": null,
        }
    ])

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/2noGa70oeinwjNUQ*qhVzwgC1u2ho5g!Y2gbuOcYVfD3S4@JVH/' + date + '/' + currency + '/', {
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
    }, [refresh, date, currency]);

    useEffect(() => {
        async function fetchAPI() {
            try {
                setIsLoading(true);
                const response = await fetch(ip + '/sfe01/lQF!OFzqLV!1BwK6!BmAyJDvlJCQCcgd41cR!*u3sNMmeOURd7/', {
                    method: 'Get',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Authorization': 'Token ' + user.token + ''
                    },
                });
                setIsLoading(false);

                let result = await response.json();

                if (response.status === 200) {
                    setCurrenciesList(result.currencyList);
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
        fetchAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

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
        "allColumns": allColumns,
        "columnExpand": columnExpand,
        "onExpandButtonClicked": onExpandButtonClicked,
        "onExpandSelectClicked": onExpandSelectClicked,
        "filterFields": null,
        "onFilterSelect": null,
        "onFilterItemDelete": null,
    }

    return (
        <div className='table-container'>

            {isloading && <Loader margin={'65%'} />}

            {/* Table Title */}
            <div className='table-container-name' style={{ border: 'none' }}>
                <p style={{ display: 'inline' }}>Swap points - </p>
                <select style={{ marginLeft: '0px' }} onChange={e => setCurrency(e.target.value)}>
                    {currenciesList.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
                <div style={{ float: 'right', marginRight: '10px', marginTop: '0.2%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='action-pics' src={downloadImgae} title="Download" alt="Download" /></div>
            </div>

            {/* Table Data Grid */}
            <div className='table-container-grid'>
                <table>
                    <thead>
                        <TableHeader columns={columns} getSortingImage={null} handleSortingChange={null} />
                    </thead>
                    <tbody>
                        {
                            data.map((object, index) => (
                                <tr key={index}>
                                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                    {columns[0].display && <td>{dateFormatter(object["date"])}</td>}
                                    {columns[1].display && <td>{object["ccy"]}</td>}
                                    {columns[2].display && <td>{object["tenor"]}</td>}
                                    {columns[3].display && <td>{object["days"]}</td>}
                                    {columns[4].display && <td>{formatter(object["swap_points"])}</td>}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default SwapPointsGrid