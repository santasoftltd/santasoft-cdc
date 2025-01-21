import React from 'react'
import { useEffect } from 'react'

import { ip } from '../../../../../App';

import { numberWithCommas } from '../../../../santasoft/components/Formatter';

export const clearTransactionNewInput = () => {
    document.getElementById("id_c_name").value = "";
    document.getElementById("id_cif").value = "";
    document.getElementById("id_branch_code").value = "";
    document.getElementById("id_cltype").value = "";
    document.getElementById("id_recv").value = "N";
    document.getElementById("id_product").value = "";
    document.getElementById("id_calc").value = ".";
    document.getElementById("id_days").value = 0;
    document.getElementById("id_days2").value = 0;
    document.getElementById("id_ccy").value = "";
    document.getElementById("id_n_c").value = "Nor";
    document.getElementById("id_export").value = "";
    document.getElementById("id_importt").value = "";
    document.getElementById("id_deal_rate").value = "";
    document.getElementById("id_i_b_rate").value = "";
    document.getElementById("id_third_ccy_cross").value = "";
    document.getElementById("id_i_b_premium").value = "";
    document.getElementById("id_option_premium").value = "";
    document.getElementById("id_third_ccy_premium").value = "";
    document.getElementById("id_branch").value = "";
    document.getElementById("id_nostro_ac").value = "";
    // document.getElementById("id_take_close").value = ".";
}

function TransactionNewInput({ userInput, user, setUserInput, addDays, columns, submitHandler, dropdownLists, addMessageHandler }) {

    async function fetchBranchAPI(branchCode) {
        try {
            const response = await fetch(ip + '/sfe01/p0WGWX&O$LZzk5uynjw&Bpb2qeYxu@VGX7ij8eft7X*wRJLtU1/' + branchCode + '/', {
                method: 'Get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Token ' + user.token + ''
                },
            });

            let result = await response.json();

            if (response.status === 200 && result.branchList.length !== 0) {
                setUserInput({ ...userInput, 'branch': result.branchList[0].branch_name })
            }

            else if (response.status === 401) {
                addMessageHandler({
                    title: 'Unable to load',
                    content: 'Branch name failed to load due.',
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
        fetchBranchAPI(userInput.branch_code);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInput.branch_code]);

    useEffect(() => {
        var customer = dropdownLists.customer.filter(obj => { return obj.name === userInput.c_name })
        if (customer.length) {
            customer = customer[0]
            setUserInput({ ...userInput, 'cif': customer.cif, 'cltype': customer.client_type })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInput.c_name]);

    useEffect(() => {
        var customer = dropdownLists.customer.filter(obj => { return obj.cif === parseInt(userInput.cif) })
        if (customer.length) {
            customer = customer[0]
            setUserInput({ ...userInput, 'c_name': customer.name, 'cltype': customer.client_type })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInput.cif]);

    return (
        <tr className='transaction-input' style={{ backgroundColor: 'white' }}>

            <td style={{ borderLeft: 'none' }}></td>
            {columns[0].display && <td>{userInput.dealer_name}</td>}
            {columns[1].display && <td><input type="text" name="branch_code" id="id_branch_code" onChange={e => { setUserInput({ ...userInput, 'branch_code': e.target.value }) }} onBlur={e => dropdownLists.onBranchCodeEntered(e.target.value) } /></td>}

            {userInput.c_name !== ''
                ? columns[2].display && <td><input type="text" name="c_name" list='c_name' id="id_c_name" onChange={e => setUserInput({ ...userInput, 'c_name': e.target.value })} value={userInput.c_name} /></td>
                : columns[2].display && <td><input type="text" name="c_name" list='c_name' id="id_c_name" onChange={e => setUserInput({ ...userInput, 'c_name': e.target.value })} value={userInput.c_name} /></td>
            }

            {userInput.cif !== ''
                ? columns[3].display && <td><input type="text" name="c_cif" id="id_cif" onChange={e => setUserInput({ ...userInput, 'cif': e.target.value })} value={userInput.cif} /></td>
                : columns[3].display && <td><input type="text" name="c_cif" id="id_cif" onChange={e => setUserInput({ ...userInput, 'cif': e.target.value })} value={userInput.cif} /></td>
            }

            {userInput.cltype !== ''
                ? columns[4].display && <td><input type="text" name="cltype" id="id_cltype" onChange={e => setUserInput({ ...userInput, 'cltype': e.target.value })} value={userInput.cltype} /></td>
                : columns[4].display && <td><input type="text" name="cltype" id="id_cltype" onChange={e => setUserInput({ ...userInput, 'cltype': e.target.value })} value={userInput.cltype} /></td>
            }

            {columns[5].display && <td><input type="text" name="recv" maxLength="100" id="id_recv" onBlur={e => setUserInput({ ...userInput, 'recv': e.target.value })} defaultValue='N' /></td>}
            {columns[6].display &&
                <td>
                    <select name="product" id="id_product" onBlur={e => setUserInput({ ...userInput, 'product': e.target.value })}>
                        <option value=''></option>
                        {
                            dropdownLists.product.map((item, key) => {
                                return <option key={key} value={item.name}>{item.name}</option>
                            })
                        }
                    </select>
                </td>
            }
            {columns[7].display && <td><input type="text" name="calc" maxLength="100" id="id_calc" onBlur={e => setUserInput({ ...userInput, 'calc': e.target.value })} defaultValue='.' /></td>}
            {columns[8].display && <td><input type="number" name="days" maxLength="100" id="id_days" onBlur={e => addDays('no', e.target.value)} defaultValue={0} /></td>}
            {columns[9].display && <td>{userInput.vdate}</td>}
            {columns[10].display && <td><input type="number" name="days2" maxLength="100" id="id_days2" onBlur={e => addDays('yes', e.target.value)} defaultValue={0} /></td>}
            {columns[11].display && <td>{userInput.vdate2}</td>}
            {columns[12].display &&
                <td>
                    <select name="ccy" id="id_ccy" onBlur={e => setUserInput({ ...userInput, 'ccy': e.target.value })}>
                        <option value=''></option>
                        {
                            dropdownLists.currency.map((item, key) => {
                                return <option key={key} value={item.name}>{item.name}</option>
                            })
                        }
                    </select>
                </td>
            }
            {columns[13].display &&
                <td>
                    <select name="n_c" id="id_n_c" onBlur={e => setUserInput({ ...userInput, 'n_c': e.target.value })} defaultValue={'Nor'}>
                        <option value=''></option>
                        <option value='Nor'>Normal</option>
                        <option value='Cro'>Cross</option>
                    </select>
                </td>
            }
            {columns[14].display && <td><input type="text" name="export" id="id_export" value={numberWithCommas(userInput.export)} onChange={e => setUserInput({ ...userInput, 'export': e.target.value })} /></td>}
            {columns[15].display && <td><input type="number" name="importt" id="id_importt" value={numberWithCommas(userInput.importt)} onBlur={e => setUserInput({ ...userInput, 'importt': e.target.value })} /></td>}
            {columns[16].display && <td><input type="number" name="deal_rate" id="id_deal_rate" onBlur={e => setUserInput({ ...userInput, 'deal_rate': e.target.value })} /></td>}
            {columns[17].display && <td><input type="number" name="i_b_rate" id="id_i_b_rate" onBlur={e => setUserInput({ ...userInput, 'i_b_rate': e.target.value })} /></td>}
            {columns[18].display && <td><input type="number" name="third_ccy_cross" id="id_third_ccy_cross" onBlur={e => setUserInput({ ...userInput, 'third_ccy_cross': e.target.value })} /></td>}
            {columns[19].display && <td><input type="number" name="i_b_premium" id="id_i_b_premium" onBlur={e => setUserInput({ ...userInput, 'i_b_premium': e.target.value })} /></td>}
            {columns[20].display && <td><input type="number" name="option_premium" id="id_option_premium" onBlur={e => setUserInput({ ...userInput, 'option_premium': e.target.value })} /></td>}
            {columns[21].display && <td><input type="number" name="third_ccy_premium" id="id_third_ccy_premium" onBlur={e => setUserInput({ ...userInput, 'third_ccy_premium': e.target.value })} /></td>}

            {userInput.branch !== ''
                ? columns[22].display && <td><input type="text" name="branch" id="id_branch" onBlur={e => setUserInput({ ...userInput, 'branch': e.target.value })} value={userInput.branch} /></td>
                : columns[22].display && <td><input type="text" name="branch" id="id_branch" onBlur={e => setUserInput({ ...userInput, 'branch': e.target.value })} /></td>
            }


            {columns[23].display && <td><input onFocus={() => submitHandler()} /></td>}
            {columns[24].display && <td>{userInput.profit}</td>}
            {columns[25].display &&
                <td>
                    <select name="nostro_ac" id="id_nostro_ac" onBlur={e => setUserInput({ ...userInput, 'nostro_ac': e.target.value })}>
                        <option value=''></option>
                        {
                            dropdownLists.nostro.filter(obj => obj.ccy === userInput.ccy).map(item => <option key={item.nostro} value={item.nostro}>{item.nostro}</option>)
                        }
                    </select>
                </td>
            }
            {columns[26].display && <td>{userInput.ttdate}</td>}
            {columns[27].display && <td>{userInput.timestamp}</td>}
            {columns[28].display && <td>{userInput.at_risk_income_fwd}</td>}
            {columns[29].display && <td>{userInput.at_risk_income_salam}</td>}
            {columns[30].display && <td>{userInput.take_up_loss}</td>}
            {columns[31].display && <td>{userInput.pkr}</td>}
            {columns[32].display && <td>{userInput.usd}</td>}
            {columns[33].display && <td>{userInput.salam_yield}</td>}
            {columns[34].display && <td>{userInput.fbp_profit}</td>}
            {columns[35].display && <td>{userInput.salam_cost}</td>}
            {columns[36].display && <td>{userInput.fbp_loss}</td>}
            {columns[37].display && <td>{userInput.fwd_take_up}</td>}
            {columns[38].display && <td>{userInput.take_close}</td>}
            {columns[39].display && <td>{userInput.c_rem}</td>}
            <datalist id='c_name'>
                {
                    dropdownLists.customer.map((item, key) => {
                        return <option key={key} value={item.name}>{item.name}</option>
                    })
                }
            </datalist>
        </tr>
    )
}

export default TransactionNewInput