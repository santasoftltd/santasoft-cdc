import React from 'react'
import './floatForm.css'

function FloatForm({newItem, buttonTitle, title, onNewEntryClicked, submitHandler, floatFormBody, height}) {
  return (
    <div className='form-background'>
        <div className='form'  style={{height: height}}>
            <div className='form-header'>
                <div className='form-header-container'>
                    <p className='form-header-title'>{newItem ? 'New' : 'Update'} {title}</p>
                </div>
            </div>
            <div className='form-body'>
                {floatFormBody}
            </div>
            <div className='form-footer'>
                <div className='form-footer-container'>
                    {
                        newItem 
                        ?   <button className='form-button form-action-button' onClick={() => submitHandler()}>{buttonTitle !== null ? buttonTitle : 'Create'}</button>
                        :   <button className='form-button form-action-button' onClick={() => submitHandler()}>{buttonTitle !== null ? buttonTitle : 'Update'}</button>
                    }
                    <button className='form-button form-cancel-button' onClick={() => onNewEntryClicked()}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FloatForm