import React from 'react'
import '../Customers.css'

function CustomerForm() {
  return (
    <div className='form-body-container'>
                    
        <div className='form-body-container-one-field'>
            <label>Short text</label>
            <input type='text'></input>
        </div>
                    
        <div className='form-body-container-one-field'>
            <label>Long text</label>
            <input type='text' style={{width:'99%'}}></input>
        </div>

        <div className='form-body-container-two-field'>
            <div className='form-body-container-one-field'>
                <label style={{marginTop:'3.5%'}}>Short text 01</label>
                <input type='text' style={{width:'90%'}}></input>
            </div>
            <div className='form-body-container-one-field'>
                <label style={{marginLeft:'8%',marginTop:'3.5%'}}>Short text 02</label>
                <input type='text' style={{width:'90%', marginLeft:'8%'}}></input>
            </div>
        </div>
                    
        <div className='form-body-container-one-field'>
            <label>Select</label>
            <select>
                <option></option>
                <option>Option 01</option>
                <option>Option 02</option>
            </select>
        </div>
                    
        <div className='form-body-container-one-field'>
            <label>Date</label>
            <input type='date'></input>
        </div>
                
    </div>
  )
}

export default CustomerForm