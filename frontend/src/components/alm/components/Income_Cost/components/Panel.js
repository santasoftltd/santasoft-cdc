import React from 'react'

function Panel() {
  return (
    <div className='table-container'>

      <div className='table-container-name'>
        <p style={{ display: 'inline' }}>Panel</p>
      </div>

      <div className='alm-income-cost-sub-home-fist-child'>

        <div className='alm-income-cost-sub-home-fist-child-container'>
          <input type="text" style={{ 'width': '98%' }} />
          <label>KIBOR</label>
          <select style={{ 'width': '100%' }} defaultValue={''}>
            <option value=''></option>
          </select>
          <input type="text" style={{ 'width': '98%' }} />
        </div>

        <div className='alm-income-cost-sub-home-fist-child-container'>
          <input type="text" style={{ 'width': '98%' }} />
          <label>LIBOR</label>
          <select style={{ 'width': '100%' }} defaultValue={''}>
            <option value=''></option>
          </select>
          <input type="text" style={{ 'width': '98%' }} />
        </div>

        <div className='alm-income-cost-sub-home-fist-child-container'>
          <input type="text" style={{ 'width': '98%' }} />
          <label>PKRV</label>
          <select style={{ 'width': '100%' }} defaultValue={''}>
            <option value=''></option>
          </select>
          <input type="text" style={{ 'width': '98%' }} />
        </div>

      </div>

    </div>
  )
}

export default Panel