import ProductForm from './components/ProductForm'
import ProductGrid from './components/ProductGrid'
import FloatForm from "../../../santasoft/components/FloatForm/FloatForm"
import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"

import React from 'react'

import { useState } from 'react'

function Products({user, refresh, addMessageHandler, onSubModuleSideMenuClear}) {
    const [isNewEntry, setIsNewEntry] = useState(false)

    const onNewEntryClicked = () => {
      if(isNewEntry){
        setIsNewEntry(false)
      }
      else{
        setIsNewEntry(true)
      }
    }
  
    return (
      <div className='black-background'>
        <div className='float-component1  '>
          <div>
            <PopUpWindowHeader title={'Products'} onNewEntryClicked={null}/>
          </div>
          <div className='products-home'>
            <div className='products-sub-home'>
              <ProductGrid user={user} refresh={refresh} addMessageHandler={addMessageHandler}/>
              <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
            </div>
          </div>
        </div>
        {isNewEntry && <FloatForm newItem={true} title={'product'} onNewEntryClicked={onNewEntryClicked} floatFormBody={<ProductForm/>}/>}
      </div>
    )
}

export default Products