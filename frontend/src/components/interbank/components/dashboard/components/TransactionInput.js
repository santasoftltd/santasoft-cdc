import { dateFormatter } from '../../../../santasoft/components/Formatter'

import React from 'react'

function TransactionInput({ userInput, setUserInput, columns, dropdownLists, submitHandler }) {

    const onAmountEntered = () => {
        if(userInput.amount < 1000000)
        {
            setUserInput({...userInput, amount: userInput.amount * 1000000 })
        }
        else{
            setUserInput({...userInput, amount: userInput.amount })
        }
    }

    return (
        <tr className='transaction-input' style={{ backgroundColor: 'white' }}>
            <td></td>
            {columns[0].display &&
                <td>
                    <select onChange={e => setUserInput({ ...userInput, 'deal_type': e.target.value })} value={userInput.deal_type}>
                        <option value='Forward'>Forward</option>
                        <option value='Ready'>Ready</option>
                    </select>
                </td>
            }
            {columns[1].display && <td>{dateFormatter(userInput.deal_date)}</td>}
            
            {userInput.deal_type === 'Forward' 
                ? 
                    <td><input type="date" onChange={e => setUserInput({ ...userInput, value_date: e.target.value })} value={userInput.value_date} /></td>
                :
                    <td>{dateFormatter(userInput.value_date)}</td>
            }
            
            {columns[3].display &&
                <td>
                    <select onChange={e => setUserInput({ ...userInput, 'dealer_desk': e.target.value })} value={userInput.dealer_desk}>
                        <option value=''></option>
                        {
                            dropdownLists.dealerDeskList.map((item, key) => {
                                return <option key={key} value={item.id}>{item.id} - {item.name}</option>
                            })
                        }
                    </select>
                </td>
            }
            {columns[4].display &&
                <td>
                    <select onChange={e => setUserInput({ ...userInput, 'counter_party': e.target.value })} value={userInput.counter_party}>
                        <option value=''></option>
                        {
                            dropdownLists.counterPartyList.map((item, key) => {
                                return <option key={key} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </td>
            }
            {columns[5].display &&
                <td>
                    <select onChange={e => setUserInput({ ...userInput, 'buy_sell': e.target.value })} value={userInput.buy_sell}>
                        <option value='Buy'>Buy</option>
                        <option value='Sell'>Sell</option>
                    </select>
                </td>
            }
            {columns[6].display &&
                <td>
                    <select onChange={e => setUserInput({ ...userInput, 'ccy_1': e.target.value })} value={userInput.ccy_1}>
                        <option value=''></option>
                        {
                            dropdownLists.currency.map((item, key) => {
                                return <option key={key} value={item.name}>{item.name}</option>
                            })
                        }
                    </select>
                </td>
            }
            {columns[7].display &&
                <td>
                    <select onChange={e => setUserInput({ ...userInput, 'ccy_2': e.target.value })} value={userInput.ccy_2}>
                        <option value=''></option>
                        {
                            dropdownLists.currency.map((item, key) => {
                                return <option key={key} value={item.name}>{item.name}</option>
                            })
                        }
                    </select>
                </td>
            }
            {columns[8].display && <td><input type="text" onBlur={() => onAmountEntered()} onChange={e => setUserInput({ ...userInput, 'amount': e.target.value })} value={userInput.amount} /></td>}
            {columns[9].display && <td><input type="text" onChange={e => setUserInput({ ...userInput, 'rate': e.target.value })} value={userInput.rate} /></td>}
            {columns[10].display && <td>{userInput.equiv_amount}</td>}
            {columns[11].display && <td><input type="text" onChange={e => setUserInput({ ...userInput, 'ib_rate': e.target.value })} value={userInput.ib_rate} /></td>}
            {columns[12].display && 
                <td>
                    <select onChange={e => setUserInput({ ...userInput, 'deal_mode': e.target.value })} value={userInput.deal_mode}>
                        <option value=''></option>
                        {
                            dropdownLists.dealModeList.map((item, key) => {
                                return <option key={key} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </td>
            }
            {columns[13].display && <td>{userInput.posted}</td>}
            {columns[14].display && <td>{userInput.brokerage}</td>}
            {columns[15].display && <td><input type="text" onBlur={() => submitHandler()} onChange={e => setUserInput({ ...userInput, 'usd_rate': e.target.value })} value={userInput.usd_rate} /></td>}
            {columns[16].display && <td>{userInput.equiv_usd}</td>}
            {columns[17].display && <td>{userInput.equiv_pkr}</td>}
            {columns[18].display && <td>{userInput.dtm}</td>}
            {columns[19].display && <td>{userInput.reval_rate}</td>}
            {columns[20].display && <td>{userInput.gain_loss}</td>}
        </tr>
    )
}

export default TransactionInput