import CustomerGrid from "./components/CustomersGrid"
import CustomerForm from "./components/CustomerForm"
import FloatForm from "../../../santasoft/components/FloatForm/FloatForm"
import PopUpWindowHeader from "../../../santasoft/components/header/PopUpWindowHeader"

import './Customers.css'

import { useState } from 'react'

function Customers({user, refresh, addMessageHandler, onSubModuleSideMenuClear}) {

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
      <div className='float-component1'>
        <div>
          <PopUpWindowHeader title={'Corporate Customers'} onNewEntryClicked={null}/>
        </div>
        <div className='Customers-home'>
          <div className='Customers-sub-home'>
            <CustomerGrid user={user} refresh={refresh} addMessageHandler={addMessageHandler}/>
            <button className='cancel-button' onClick={() => onSubModuleSideMenuClear()}>Cancel</button>
          </div>
        </div>
      </div>
      {isNewEntry && <FloatForm newItem={true} title={'customer'} onNewEntryClicked={onNewEntryClicked} floatFormBody={<CustomerForm/>}/>}
    </div>
  )
}

export default Customers