import React from 'react'
import searchImage from './res/search.png'

function SearchBar({ services }) {
  return (
    <div className='Header-item'>

      <div className='search-bar'>
        <div className='search-bar-items'>
          <img src={searchImage} className="search-bar-items1" title="Navigation menu" alt="Menu" />
        </div>
        <div className='search-bar-items'>
          <p className='search-bar-items2'>Search</p>
        </div>
        <div className='search-bar-items'>
          <input className='search-bar-items3' id="myInput" type="text" placeholder="Services, resources, docs" list='module_list'></input>
        </div>
      </div>

      <datalist id='module_list'>
        {
          services.map((item) => {
            return (item.modules.map((item2) => {
              return <option value={item2.value}>{item2.name}</option>
            }))
          })
        }
      </datalist>
    
    </div>
  )
}

export default SearchBar