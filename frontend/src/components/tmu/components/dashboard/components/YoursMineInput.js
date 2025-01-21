import React from 'react'
import { useEffect } from 'react'

import { numberWithCommas } from '../../../../santasoft/components/Formatter';

function YoursMineInput({userInput, setUserInput, columns, dropdownLists, submitHandler}) {

    useEffect(() => {
        var product = dropdownLists.product.filter(obj => { return obj.name === userInput.product })
        if (product.length) {
            product = product[0]
            setUserInput({ ...userInput, 'desk': product.desk })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInput.product]);

    return (
        <tr className='transaction-input' style={{ backgroundColor: 'white' }}>
            <td style={{ borderLeft: 'none' }}></td>
            {columns[0].display && <td>{userInput.dealer_name}</td>}
            {columns[1].display &&
                <td>
                    <select name="ccy" id="id_ccy" onChange={e => setUserInput({ ...userInput, 'ccy': e.target.value })} value={userInput.ccy}>
                        <option value=''></option>
                        {
                            dropdownLists.currency.map((item, key) => {
                                return <option key={key} value={item.name}>{item.name}</option>
                            })
                        }
                    </select>
                </td>
            }
            {columns[2].display && <td><input type="text" name="sell" id="id_sell" onChange={e => setUserInput({...userInput, 'sell': e.target.value})} value={numberWithCommas(userInput.sell)} /></td>}
            {columns[3].display && <td><input type="text" name="buy" id="id_buy" onChange={e => setUserInput({...userInput, 'buy': e.target.value})} value={numberWithCommas(userInput.buy)} /></td>}
            {columns[4].display && <td><input type="text" name="bid_rate" id="id_bid_rate" onChange={e => setUserInput({...userInput, 'bid_rate': e.target.value})} value={userInput.bid_rate} /></td>}
            {columns[5].display && <td><input type="text" name="offer_rate" id="id_offer_rate" onChange={e => setUserInput({...userInput, 'offer_rate': e.target.value})} value={userInput.offer_rate} /></td>}
            {columns[6].display &&
                <td>
                    <select name="product" id="id_product" onChange={e => setUserInput({ ...userInput, 'product': e.target.value })} value={userInput.product}>
                        <option value=''></option>
                        {
                            dropdownLists.product.map((item, key) => {
                                return <option key={key} value={item.name}>{item.name}</option>
                            })
                        }
                    </select>
                </td>
            }
            {columns[7].display && <td><input type="date" name="maturity" id="id_maturity" onChange={e => setUserInput({...userInput, 'maturity': e.target.value})} value={userInput.maturity} /></td>}
            {columns[8].display && <td><input type="text" name="fwd_rate" id="id_fwd_rate" onChange={e => setUserInput({...userInput, 'fwd_rate': e.target.value})} value={userInput.fwd_rate} /></td>}
            {columns[9].display && <td>{userInput.ib_status}</td>}
            {columns[10].display && <td>{userInput.desk}</td>}
            {columns[11].display &&
                <td>
                    <select name="remarks" id="id_remarks" onChange={e => setUserInput({ ...userInput, 'remarks': e.target.value })} value={userInput.remarks} onBlur={() => submitHandler()}>
                        <option value=''></option>
                        <option value='Normal'>Normal</option>
                        <option value='Cross'>Cross</option>
                    </select>
                </td>
            }
        </tr>
    )
}

export default YoursMineInput