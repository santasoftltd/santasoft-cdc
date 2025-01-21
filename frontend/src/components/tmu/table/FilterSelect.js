import React from 'react'
import crossImgae from '../res/cross.png'
import { useState } from 'react'

import './table.css'

function FilterSelect({ columns, data, filterFields, onFIlterSelect, onFilterItemDelete }) {

  const [property, setProperty] = useState({ label: '', accessor: '' })

  const onAccessorSelect = accessor => {
    setProperty({ ...property, label: columns[accessor.target.options['selectedIndex'] - 1].label, accessor: accessor.target.value })
  }

  const onValueSelect = value => {
    onFIlterSelect(property, value)
    setProperty({ label: '', accessor: '' })
  }

  return (
    <div>
      {filterFields.length ?
        <div className='filterSelect'>

          {filterFields.map((object, index) => (
            <div key={index} className='filterSelect-item'>
              <label className='filterSelect-item-1'>{object.label} :</label>
              <label className='filterSelect-item-2'>{object[object.accessor]}</label>
              <div className='filterSelect-item-pic-div'><img className='filterSelect-item-pic' src={crossImgae} onClick={() => onFilterItemDelete(object)} title="cancel" alt="cancel" /></div>
            </div>
          ))}

        </div>

        : null
      }

      <select className='filterSelect-select' onChange={e => onAccessorSelect(e)} value={property.accessor}>
        <option className='filterSelect-select-option' key='' value=''>Select property</option>
        {columns.map((object, index) => (
          <option className='filterSelect-select-option' key={index} value={object.accessor}>{object.label}</option>
        ))}
      </select>

      {
        property.label !== '' &&
        <>
          <input type="text" list='items' className='filter-input' style={{ width: 'fit-content', padding: '0', margin: '0' }} placeholder="Type value" onBlur={e => onValueSelect(e.target.value)} />
          <datalist id='items'>
            {
              data.map((object, key) => {
                return <option key={key} value={object[property.accessor]}>{object[property.accessor]}</option>
              })
            }
          </datalist>
        </>
      }

    </div>
  )
}

export default FilterSelect