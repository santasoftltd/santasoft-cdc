import { ip } from '../../../../../App'
import downloadImgae from '../../../../santasoft/res/download.png'
import Loader from '../../../../santasoft/components/loader/Loader';
import { dateFormatter } from '../../../../santasoft/components/Formatter';

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import React from 'react'
import { useState, useEffect } from 'react'

function SbpRatesGrid({ user, refresh, date, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const columns = [
        {
            label: 'DATE',
            accessor: 'date',
            display: true,
            sortable: true
        },
        {
            label: 'FROM',
            accessor: 'from',
            display: true,
            sortable: true
        },
        {
            label: 'TO',
            accessor: 'to',
            display: true,
            sortable: true
        },
        {
            label: 'USD',
            accessor: 'USD',
            display: true,
            sortable: true
        },
        {
            label: 'EUR',
            accessor: 'EUR',
            display: true,
            sortable: true
        },
        {
            label: 'GBP',
            accessor: 'GBP',
            display: true,
            sortable: true
        },
        {
            label: 'AED',
            accessor: 'AED',
            display: true,
            sortable: true
        },
        {
            label: 'AUD',
            accessor: 'AUD',
            display: true,
            sortable: true
        },
        {
            label: 'CAD',
            accessor: 'CAD',
            display: true,
            sortable: true
        },
        {
            label: 'CHF',
            accessor: 'CHF',
            display: true,
            sortable: true
        },
        {
            label: 'HKD',
            accessor: 'HKD',
            display: true,
            sortable: true
        },
        {
            label: 'JPY',
            accessor: 'JPY',
            display: true,
            sortable: true
        },
        {
            label: 'SAR',
            accessor: 'SAR',
            display: true,
            sortable: true
        },
        {
            label: 'SEK',
            accessor: 'SEK',
            display: true,
            sortable: true
        },
        {
            label: 'SGD',
            accessor: 'SGD',
            display: true,
            sortable: true
        },
        {
            label: 'CNY',
            accessor: 'CNY',
            display: true,
            sortable: true
        },
        {
            label: 'CNH',
            accessor: 'CNH',
            display: true,
            sortable: true
        },
        {
            label: 'MYR',
            accessor: 'MYR',
            display: true,
            sortable: true
        },
        {
            label: 'THB',
            accessor: 'THB',
            display: true,
            sortable: true
        },
        {
            label: 'NOK',
            accessor: 'NOK',
            display: true,
            sortable: true
        },
        {
            label: 'DKK',
            accessor: 'DKK',
            display: true,
            sortable: true
        },
    ]

    const [data, setData] = useState([
        {
            "id": null,
            "date": null,
            "from": null,
            "to": null,
            "reval_rate": 123,
        }
    ])

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/n5UsNX4!T2Djkd@8yMs!uBiBQoQnF97Z@$d!xF$bLL&pvWSWs1/' + date + '/', {
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

    // 
    //   Download
    // 

    const onDownloadButtonClicked = async () => {
        let fileName = 'santasoft - ' + new Date()
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const fileData = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(fileData, fileName + fileExtension);
    }

    const actions = {
        "onDownloadButtonClicked": onDownloadButtonClicked,
    }

    const getRows = (index) => {

        let content = [];

        try {
            for (let i = index; i < index + 1; i++) {
                content.push(<td>{dateFormatter(data[i]["date"])}</td>);
                content.push(<td>{data[i]["dfrom"]}</td>);
                content.push(<td>{data[i]["dto"]}</td>);
                content.push(<td>{data[i]["reval_rate"]}</td>);
                content.push(<td>{data[i + 11]["reval_rate"]}</td>);
                content.push(<td>{data[i + 22]["reval_rate"]}</td>);
                content.push(<td>{data[i + 33]["reval_rate"]}</td>);
                content.push(<td>{data[i + 44]["reval_rate"]}</td>);
                content.push(<td>{data[i + 55]["reval_rate"]}</td>);
                content.push(<td>{data[i + 66]["reval_rate"]}</td>);
                content.push(<td>{data[i + 77]["reval_rate"]}</td>);
                content.push(<td>{data[i + 88]["reval_rate"]}</td>);
                content.push(<td>{data[i + 99]["reval_rate"]}</td>);
                content.push(<td>{data[i + 110]["reval_rate"]}</td>);
                content.push(<td>{data[i + 121]["reval_rate"]}</td>);
                content.push(<td>{data[i + 132]["reval_rate"]}</td>);
                content.push(<td>{data[i + 143]["reval_rate"]}</td>);
                content.push(<td>{data[i + 154]["reval_rate"]}</td>);
                content.push(<td>{data[i + 165]["reval_rate"]}</td>);
                content.push(<td>{data[i + 176]["reval_rate"]}</td>);
                content.push(<td>{data[i + 187]["reval_rate"]}</td>);
            }
            return content
        }
        catch {
            return [];
        }

    }

    return (<div className='table-container'>

                    {isloading && <Loader margin={'45%'} />}

                    {/* Table Title */}
                    <div className='table-container-name' style={{ border: 'none' }}>
                        <p style={{ display: 'inline' }}>SBP reval</p>
                        <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='action-pics' src={downloadImgae} title="Download" alt="Download" /></div>
                    </div>

                    {/* Table Data Grid */}
                    <div className='table-container-grid'>
                        <table>
                            <thead>
                                <tr>
                                    {columns.map((object) => (
                                        <th key={object.accessor}>
                                            {object.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>{getRows(0)}</tr>
                                <tr>{getRows(1)}</tr>
                                <tr>{getRows(2)}</tr>
                                <tr>{getRows(3)}</tr>
                                <tr>{getRows(4)}</tr>
                                <tr>{getRows(5)}</tr>
                                <tr>{getRows(6)}</tr>
                                <tr>{getRows(7)}</tr>
                                <tr>{getRows(8)}</tr>
                                <tr>{getRows(9)}</tr>
                                <tr>{getRows(10)}</tr>
                            </tbody>
                        </table>

                    </div>

                </div>
    )
}

export default SbpRatesGrid