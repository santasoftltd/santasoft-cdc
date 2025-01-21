import React from 'react'

function TableHeader({ columns, getSortingImage, handleSortingChange }) {
  return (
    <tr>
      <th></th>
      {columns.map((object) => (
        <>
          {object.display &&
            <th key={object.accessor}>
              {object.label}
              {
                (getSortingImage !== null && object.sortable) && <img className='action-pics-sort' src={getSortingImage(object)} onClick={object.sortable ? () => handleSortingChange(object.accessor) : null} title="sort" alt="sort" />
              }
            </th>}
        </>
      ))}
    </tr>
  )
}

export default TableHeader