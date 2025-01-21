import React from 'react'
import './Form.css'
import logoImage from './res/logo.jpeg'
import { useState } from 'react'

function Form({login, error}) {

  const [userInput, setUserInput] = useState({username:'', password:''})

  const submitHandler = e => {
    e.preventDefault();
    login(userInput);
  }

  return (
    <div className='sub_box'>
      <img src={logoImage} id='logoimg' alt="SantaSoft (Private) Limited" width='45%'/>
      <form className='login_box' onSubmit={submitHandler}>
        <label id='mylabel'>Username</label>
        <br/>
        <input type="text" name="username" maxLength="100" id="id_username" onChange={e => setUserInput({...userInput, username: e.target.value})} value={userInput.username}/>
        <br/>
        <label id='mylabel'>Password</label>
        <br/>
        <input type="password" name="password" maxLength="100" id="id_password" onChange={e => setUserInput({...userInput, password: e.target.value})} value={userInput.password}/>
        <br/>
        <button type="submit">Sign in</button>
        {error !== '' &&
          <ul>
            <li id="message-login" className="{{ message.tags }}">{error}</li>
          </ul>
        }
      </form>
    </div>
  )
}

export default Form