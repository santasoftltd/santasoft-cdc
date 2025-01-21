import Login from './components/login/Login';
import Platfrom from './Platfrom';
import ChangePassword from './components/santasoft/components/change_password/ChangePassword';
import React from 'react';
import { useState, useEffect } from 'react';

// Development
export const ip = 'http://127.0.0.1:8000'

// SIT
// export const ip = 'http://127.0.0.1:4343'

// UAT
// export const ip = 'http://172.30.108.231:4343'

// Production
// export const ip = 'https://172.30.1.79:4343'

export let header = {'Content-type': 'application/json; charset=UTF-8',
'Content-Security-Policy': 'default-src \'self\';img-src \'self\' data:; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\';',
'X-Frame-Options': 'deny',
'Strict-Transport-Security': 'max-age=63072000; includeSubdomains',
'Permissions-Policy': 'microphone=(), geolocation=(), camera=()',

}

// export myInitObject

function App() {

  // Development
  const [user, setUser] = useState({id:'1', name:'Santasoft (Private) Limited', email:'info@santasoftltd.com', username:'santasoft', token:'f2862a64e5b1b4bb483340b01345ed88ad533d49', authorized:{'SFE01':true,'SFE05':true,'SM01':true,'SM15':true}})

  // SIT-UAT-Production
  // const [user, setUser] = useState({id:'', name:'', email:'', username:'', token:'', authorized:{'SFE01':true,'SFE05':true,'SFE10':true}})

  const [error, setError] = useState('')

  const [isChangePassword, setChangePassword] = useState(false)

  // Development
  const [token, setToken] = useState(true)

  // SIT-UAT-Production
  // const [token, setToken] = useState(false)

  async function login (userInput) {
    try{
      
      const response = await fetch(ip+'/si01/b2TL@g8CW6yRoCqDMN5TuB21&cTglu7QLl50Ukqiyx6Lyj!z2Q/', {
        method: 'POST',
        body: JSON.stringify(userInput),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      let result = await response.json();

      if(response.status === 200){
        setError('')
        setUser(result)
      }

      else if(response.status === 401){
        setError('Incorrect username or password.')
      }

      else if (response.status === 429) {
        setError('Too many requests. Please try after 1 minute.')
      }

      else if (response.status === 500) {
        setError(result.message)
      }

    }
    catch (err){
      console.log(err.message);
    }
  };

  const logout = () => {
    setUser({name:'', email:'', username:'', token:''})
    setToken(false)
  }

  const onChangePasswordClick = () => {
    if (isChangePassword) {
      setChangePassword(false)
    }
    else
    {
      setChangePassword(true)
    }
  }

  // SIT-UAT-Production
  // useEffect(() => {
  //   async function fetchAPI() {
  //     try {
  //       const response = await fetch(ip+'/si01/3b2TL@g8CW6yRoCqDMN5TuB21&cTglu7QLl50Ukqiyx6Lyj!z2Q/', {
  //         method: 'POST',
  //         body: JSON.stringify({ 'user': user.id }),
  //         headers: {
  //           ...header,
  //           'Authorization': 'Token '+ user.token +''
  //         },
  //       });

  //       let result = await response.json();
        
  //       if(response.status === 200 && (user.token === result.token)){
  //         setError('')
  //         setToken(true)
  //       }
  //       else if(response.status === 401 && user.username !== '')
  //       {
  //         setError('Unable to authenticate the request.')
  //       }
  //       else if((response.status === 500 || (user.token !== result.token)) && user.username !== '')
  //       {
  //         setError('Unable to authenticate the request.')
  //       }
  //     } 
  //     catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchAPI()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  return (
    <div>
      {(token === false && isChangePassword === false) && <Login login = {login} error={error} setError={setError} onChangePasswordClick={onChangePasswordClick}/>}
      {token && <Platfrom user={user} logout={logout}/>}
      {isChangePassword && <ChangePassword onChangePasswordClick={onChangePasswordClick}/> }
    </div>
  );
}

export default App;