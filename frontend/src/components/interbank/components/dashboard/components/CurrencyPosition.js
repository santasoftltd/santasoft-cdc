import { formatter } from '../../../../santasoft/components/Formatter'

import downloadImgae from '../../../../santasoft/res/download.png'

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Loader from '../../../../santasoft/components/loader/Loader'

import React from 'react'
import { useState, useEffect } from 'react'

import { ip } from '../../../../../App'

import '../Dashboard.css'

function CurrencyPosition({ user, refresh, date, dropdownLists, addMessageHandler }) {

    const [isloading, setIsLoading] = useState(false)

    const [currency, setCurrency] = useState('USD')

    const [data, setData] = useState(
        {
            "id": null,
            "ccy": null,
            "opening": null,
            "yours": null,
            "B1": null,
            "tmu_ib_long": null,
            "mine": null,
            "S1": null,
            "tmu_ib_short": null,
            "closing": null,
            "nostroOpening": null,
            "maturities": null,
            "nostroCustomerBuy": null,
            "nostroIB_Buy": null,
            "nostroBuyInflow": null,
            "nostroCustomerSell": null,
            "nostroIB_Sell": null,
            "nostroSellInflow": null,
            "nostroClosing": null,
        }
    )

    const fetchAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(ip + '/sfe05/KcOuocqiXVNEAZe3VNRnKx*XxSawr@IOH8PizsM4EyI1paLqGo/' + date + '/' + currency + '/', {
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
    }, [date, refresh, currency]);

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

    return (
        <div className='table-container'>

            {isloading && <Loader margin={'45%'} />}

            {/* Table Title */}

            <div className='table-container-name'>
                <p style={{ display: 'inline' }}>Currency position - </p>
                <select style={{ marginLeft: '0px' }} onChange={e => setCurrency(e.target.value)}>
                    {
                        dropdownLists.currency.map((item, key) => {
                            return <option key={key} value={item.name}>{item.name}</option>
                        })
                    }
                </select>
                <div style={{ float: 'right', marginRight: '10px', marginTop: '0.2%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
            </div>

            <div className='currency-position-container'>
                <div>
                    <div>
                        <p className='currency-position-container-label' style={{ fontWeight: 'bold' }}>NOP</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label'>Opening:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.opening)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-heading'>Buy</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'></p>
                        <p className='currency-position-container-label currency-position-container-label-value'></p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Customer:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.yours)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Interbnak:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.B1)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Total:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.tmu_ib_long)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-heading'>Sell</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Customer:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.mine)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Interbnak:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.S1)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Total:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.tmu_ib_short)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label'>Closing:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.closing)}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p className='currency-position-container-label' style={{ fontWeight: 'bold' }}>Nostro</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label'>Opening:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.nostroOpening)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-heading'>Buy</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label  currency-position-container-sub-heading'>Maturities:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.maturities)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Customer:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.nostroCustomerBuy)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Interbnak:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.nostroIB_Buy)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Total:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.nostroBuyInflow)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-heading'>Sell</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Customer:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.nostroCustomerSell)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Interbnak:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.nostroIB_Sell)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label currency-position-container-sub-heading'>Total:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.nostroSellInflow)}</p>
                    </div>
                    <div>
                        <p className='currency-position-container-label'>Closing:</p>
                        <p className='currency-position-container-label currency-position-container-label-value'>{formatter(data.nostroClosing)}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CurrencyPosition