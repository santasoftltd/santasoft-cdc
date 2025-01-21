import { ip } from '../../../../../App';
import { dateFormatter, formatter } from '../../../../santasoft/components/Formatter'
import saveImage from '../../../../santasoft/res/save.png'
import Loader from '../../../../santasoft/components/loader/Loader';
import TableHeader from '../../../../santasoft/components/table/TableHeader';
import { useState, useEffect } from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import React from 'react'

function DailyCRRDateGrid({ user, refresh, date, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [columns, setColumns] = useState([
        {
            label: 'Date',
            accessor: 'date',
            display: true,
            sortable: true
        },
    ])

    const [data, setData] = useState([
        {
            "id": null,
            "date": null,
        }
    ])

    const [userInput, setUserInput] = useState(
        {
            "id": null,
            "date": date,
        }
    )

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/2tQ8EzLCnRzd2GSKLBTa7wCFTW2yiZsKO4IGYlBQeLd*yBhV@2F/' + date + '/', {
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

    const submitHandler = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sm01/2tQ8EzLCnRzd2GSKLBTa7wCFTW2yiZsKO4IGYlBQeLd*yBhV@2F/' + date + '/', {
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
                setData([result.data, ...data]);
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

    useEffect(() => {
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, date]);

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

    const actions = {
        "modifiable": false,
        "columns": columns,
        "data": data,
        "deleteHandler": null,
        "eraseHandler": null,
        "submitHandler": submitHandler,
        "onDownloadButtonClicked": null,
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
        <div className='table-container' style={{width:'200px'}}>

            {isloading && <Loader margin={'65%'} />}

            {/* Table Title */}
            <div className='table-container-name' style={{ border: 'none' }}>
                <p style={{ display: 'inline' }}>CRR Dates</p>
                <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.submitHandler()} className='action-pics' src={saveImage} title="Save" alt="Save" /></div>
            </div>

            {/* Table Data Grid */}
            <div className='table-container-grid'>
                <table>
                    <thead>
                        <TableHeader columns={columns} getSortingImage={null} handleSortingChange={null} />
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><input type='date' onChange={e => setUserInput({'id': null, 'date': e.target.value})} value={userInput.date}/></td>
                        </tr>
                        {
                            data.map((object, index) => (
                                <tr key={index}>
                                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                    {columns[0].display && <td>{dateFormatter(object["date"])}</td>}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default DailyCRRDateGrid