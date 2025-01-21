import columnsImgae from '../../res/columns.png'
import filterImgae from '../../res/filter.png'
import leftImgae from '../../res/left.png'
import rightImgae from '../../res/right.png'
import dotsImgae from '../../res/dots.png'
import trashImgae from '../../res/trash.png'
import clearImgae from '../../res/clear.png'
import saveImgae from '../../res/save.png'
import downloadImgae from '../../res/download.png'

import FilterSelect from './FilterSelect'
import TableColumnDisplay from '../TableColumnDisplay'
import Paging from '../Paging'

import React from 'react'

function TableActions({actions}) {

  const firstPageIndex = (actions.currentPage - 1) * actions.pageSize;
  const lastPageIndex = firstPageIndex + actions.pageSize;
  const getLastpageIndex = (lastPageIndex) => {
    if(lastPageIndex > actions.count){
      let extra = lastPageIndex - actions.count
      return lastPageIndex - extra
    }
    return lastPageIndex
  }
  
  return (
    <div className='table-container-actions'>
        <div className='filter-container'>
          <img className='filter-container-img' src={filterImgae} title="Filter" alt="Filter"/>
          <p>Filter</p>
          <FilterSelect columns={actions.columns} data={actions.data} filterFields={actions.filterFields} onFIlterSelect={actions.onFilterSelect} onFilterItemDelete={actions.onFilterItemDelete}/>
        </div>
        <div className='actions-container'>
            {actions.modifiable &&
                actions.selectedRows.length ?
                <div style={{margin:'0'}}>
                  <div><img onClick={() => actions.deleteHandler()} className='action-pics' src={trashImgae} title="Delete" alt="Delete"/></div>
                </div>
                : null
            }
            {actions.modifiable &&<div><img onClick={() => actions.eraseHandler()} className='action-pics' src={clearImgae} title="Clear" alt="Clear"/></div>}
            {actions.modifiable &&<div><img onClick={() => actions.submitHandler()} className='action-pics' src={saveImgae} title="Save" alt="Save"/></div>}
            {actions.onDownloadButtonClicked !== null && <div><img onClick={() => actions.onDownloadButtonClicked(actions.data,actions.selectedRows,'transactions')} className='action-pics' src={downloadImgae} title="Download" alt="Download"/></div>}
            <div><img  onClick={() => actions.onExpandButtonClicked()} className='action-pics' src={columnsImgae} title="Column display" alt="Column display"/></div>
            {actions.columnExpand && <TableColumnDisplay columns={actions.columns} allColumns={actions.allColumns} onExpandSelectClicked={actions.onExpandSelectClicked}/>}
            {actions.page !== null &&
              <>
                <div>
                  <img className='paging-pic' src={leftImgae} title="left" alt="left" onClick={() => actions.onPreviousPage()}/>
                  <img className='paging-pic' src={rightImgae} title="right" alt="right" onClick={() => actions.onNextPage()}/>
                  <p className='paging-p' >{firstPageIndex+1}-{getLastpageIndex(lastPageIndex)} of {actions.count}</p>
                </div>
                <div onClick={() => actions.onShowPageClicked()}><img className='action-pics' src={dotsImgae} title="Rows index options" alt="Rows index options"/></div>
                {actions.showPage && <Paging page={actions.page} onPageSelect={actions.pageSizeSelect}/>}
              </>
            }
        </div>
    </div>
  )
}

export default TableActions