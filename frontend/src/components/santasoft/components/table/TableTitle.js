import downloadImgae from '../../res/download.png'
import React from 'react'

function TableTitle({title, actions}) {
  return (
    <div className='table-container-name'>
      <p style={{ display: 'inline' }}>{title}</p>
      <div style={{ float: 'right', marginRight: '10px', marginBottom: '0.1%'}}><img onClick={() => actions.onDownloadButtonClicked(actions.data,actions.selectedRows,'transactions')} className='transaction-grid-picture' src={downloadImgae} title="Download" alt="Download"/></div>
    </div>
  )
}

export default TableTitle