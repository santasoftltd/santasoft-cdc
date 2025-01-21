import { dateFormatter } from '../../../../santasoft/components/Formatter'
import Loader from '../../../../santasoft/components/loader/Loader'
import TableHeader from '../../../../santasoft/components/table/TableHeader'
import React from 'react'
import { useState, useEffect } from 'react'
import { ip } from '../../../../../App'

function SwapPointsDaysUpdate({ user, refresh, date, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const columns = [
        {
            label: 'Date',
            accessor: 'date',
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
        }
    ]

    const [data, setData] = useState([
        {
            "id": null,
            "date": null,
            "tenor": null,
            "days": null,
        },
    ])

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/3noGa70oeinwjNUQ*qhVzwgC1u2ho5g!Y2gbuOcYVfD3S4@JVH/' + date + '/0/', {
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
    }, [refresh, date]);

    const onChangeHandler = (e, object) => {
        setData(current =>
            current.map(obj => {
                if (obj['id'] === object['id']) {
                    return { ...object, 'days': e.target.value }
                }
                else {
                    return obj
                }
            })
        )
    }

    const onUpdate = async (object) => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/3noGa70oeinwjNUQ*qhVzwgC1u2ho5g!Y2gbuOcYVfD3S4@JVH/' + date + '/' + object['id'] + '/', {
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
                setData(current =>
                    current.map(obj => {
                        if (obj['id'] === object['id']) {
                            return result.object
                        }
                        else {
                            return obj
                        }
                    })
                );
                addMessageHandler({
                    title: 'Record Updated',
                    content: result.message,
                    type: 3
                });
            }

            else if (response.status === 400) {
                addMessageHandler({
                    title: 'Record not updated',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Record not updated',
                    content: 'Unable to update due to unauthorized request.',
                    type: 4
                })
            }

            else if (response.status === 412) {
                addMessageHandler({
                    title: 'Record not updated',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 404) {
                addMessageHandler({
                    title: 'Record not updated',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 409) {
                addMessageHandler({
                    title: 'Record not updated',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 406) {
                addMessageHandler({
                    title: 'Record not updated',
                    content: result.message,
                    type: 4
                })
            }

            else if (response.status === 500) {
                addMessageHandler({
                    title: 'Record not updated',
                    content: result.message,
                    type: 4
                })
            }
        }
        catch (err) {
            console.log(err.message);
        }
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

    return (
        <div className='table-container'>

            {isloading && <Loader margin={'45%'} />}

            {/* Table Title */}
            <div className='table-container-name' style={{ border: 'none' }}>
                <p style={{ display: 'inline' }}>Swap points days update</p>
            </div>

            {/* Table Data Grid */}
            <div className='table-container-grid'>
                <table>
                    <thead>
                        <TableHeader columns={columns} getSortingImage={null} handleSortingChange={null} />
                    </thead>
                    <tbody>
                        {
                            data.map((object => (
                                <tr key={object["id"]}>
                                    <td><input type='checkbox' onClick={() => onRowSelect(object["id"])} style={{ cursor: 'pointer' }} /></td>
                                    {columns[0].display && <td>{dateFormatter(object["date"])}</td>}
                                    {columns[1].display && <td>{object['tenor']}</td>}
                                    {columns[2].display && <td><input type="text" onChange={e => onChangeHandler(e, object)} onBlur={() => onUpdate(object)} value={object["days"]} /></td>}
                                </tr>
                            )))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default SwapPointsDaysUpdate