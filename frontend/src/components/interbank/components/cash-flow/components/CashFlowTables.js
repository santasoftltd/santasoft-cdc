import { formatter, dateFormatter } from '../../../../santasoft/components/Formatter'
import downloadImgae from '../../../../santasoft/res/download.png'
import TableHeader from '../../../../santasoft/components/table/TableHeader'
import React from 'react'

function CashFlowTables({ columns, data, actions, month, year, monthNumber }) {

    return (
        <div className='table-container'>

            {/* Table Title */}
            <div className='table-container-name' style={{ border: 'none' }}>
                <p style={{ display: 'inline' }}>Cash flow - {month} {year}</p>
                <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%' }}><img onClick={() => actions.onDownloadButtonClicked(actions.data, actions.selectedRows, 'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download" /></div>
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
                                object["date"].includes(year) && object["date"].includes(monthNumber)
                                    ?
                                    (<tr key={index}>
                                        <td><input type='checkbox' style={{ cursor: 'pointer' }} /></td>
                                        {columns[0].display && <td>{dateFormatter(object["date"])}</td>}
                                        {columns[1].display && <td>{formatter(object["ccy1"])}</td>}
                                        {columns[2].display && <td>{formatter(object["ccy2"])}</td>}
                                        {columns[3].display && <td>{formatter(object["outflow"])}</td>}
                                        {columns[4].display && <td>{formatter(object["inflow"])}</td>}
                                    </tr>)
                                    :
                                    null
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CashFlowTables