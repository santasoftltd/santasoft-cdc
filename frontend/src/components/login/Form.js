import React from 'react'
import './Form.css'
// import logoImage from './res/logo.jpeg'

import logoImage2 from './res/Santasoft-logo-black.png'

import { useState } from 'react'

function Form({ login, error, setError, onChangePasswordClick }) {

  const [userInput, setUserInput] = useState({ username: '', password: '' })

  const submitHandler = e => {
    e.preventDefault();
    login(userInput);
  }

  const clearFeild = () => {
    setUserInput({ ...userInput, password: '' })
    setError('')
  }

  function myFunction() {
    var x = document.getElementById("id_password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div className='sub_box2'>
      <img src={logoImage2} id='logoimg' alt="SantaSoft (Private) Limited" width='60%' />
      <form className='login_box' onSubmit={submitHandler}>
        <label id='mylabel'>Username</label>
        <br />
        <input type="text" name="username" maxLength="100" id="id_username" onChange={e => setUserInput({ ...userInput, username: e.target.value })} value={userInput.username} />
        <br />
        <label id='mylabel'>Password</label>
        <br />
        <input type="password" name="password" maxLength="100" id="id_password" onFocus={() => clearFeild()} onChange={e => setUserInput({ ...userInput, password: e.target.value })} value={userInput.password} />
        {error !== '' &&
          <ul>
            <li id="message-login" className="{{ message.tags }}">{error}</li>
          </ul>
        }
        <br />
        <input type="checkbox" onClick={() => myFunction()} style={{ marginLeft: '20px', marginRight: '15px', marginBottom: '15px' }} /><label id='message-login'>Show Password</label>
        <br />
        <button type="submit">Sign in</button>
        <br />
        <label id='change_password' onClick={() => onChangePasswordClick()}>Change password?</label>
      </form>
    </div>
  )
}

export default Form