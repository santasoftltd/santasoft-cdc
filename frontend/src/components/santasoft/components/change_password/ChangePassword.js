import React from 'react'
import './ChangePassword.css'
import { useState } from 'react'

import { ip, header } from '../../../../App'

export default function ChangePassword({ onChangePasswordClick }) {

    const [userInput, setUserInput] = useState({ username: '', oldPassword: '', newPassword: '', repeatNewPassword: '' })

    const [error, setError] = useState('')

    const submitHandler = e => {
        e.preventDefault();
        changePassword();
    }

    function myFunction() {
        var x = document.getElementById("id_password1");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }

        var y = document.getElementById("id_password2");
        if (y.type === "password") {
            y.type = "text";
        } else {
            y.type = "password";
        }

        var z = document.getElementById("id_password3");
        if (z.type === "password") {
            z.type = "text";
        } else {
            z.type = "password";
        }
    }

    async function changePassword() {
        try {

            const response = await fetch(ip + '/si01/2b2TL@g8CW6yRoCqDMN5TuB21&cTglu7QLl50Ukqiyx6Lyj!z2Q/', {
                method: 'PUT',
                body: JSON.stringify(userInput),
                headers: header,
            })

            let result = await response.json();

            if (response.status === 200) {
                setError('Password updated successfully. Kindly click on Go Bank? and login again.')
            }

            else if (response.status === 400) {
                setError(result.message)
            }

            else if (response.status === 429) {
                setError('Too many requests. Please try after 1 minute.')
            }

            else if (response.status === 500) {
                setError('Something went wrong. Please try again.')
            }

        }
        catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <div className='Header'></div>
            <div className='changePasswordBody'>
                <form className='change_login_box' onSubmit={submitHandler}>
                    <label id='mylabel'>Username</label>
                    <br />
                    <input type="text" name="username" maxLength="100" id="id_username" onChange={e => setUserInput({ ...userInput, username: e.target.value })} value={userInput.username} />
                    <br />
                    <label id='mylabel'>Old Password</label>
                    <br />
                    <input type="password" name="password" maxLength="100" id="id_password1" onChange={e => setUserInput({ ...userInput, oldPassword: e.target.value })} value={userInput.oldPassword} />
                    <br />
                    <label id='mylabel'>New Password</label>
                    <br />
                    <input type="password" name="password" maxLength="100" id="id_password2" onChange={e => setUserInput({ ...userInput, newPassword: e.target.value })} value={userInput.newPassword} />
                    <br />
                    <label id='mylabel'>Repeat New Password</label>
                    <br />
                    <input type="password" name="password" maxLength="100" id="id_password3" onChange={e => setUserInput({ ...userInput, repeatNewPassword: e.target.value })} value={userInput.repeatNewPassword} />
                    <br />
                    <input type="checkbox" onClick={() => myFunction()} style={{ marginLeft: '20px', marginRight: '15px', marginBottom: '15px' }} /><label id='message-login'>Show Password</label>
                    <br />
                    {error !== '' &&
                        <ul>
                            <li id="message-login" className="{{ message.tags }}">{error}</li>
                        </ul>
                    }
                    <br />
                    <label id='change_password2' onClick={() => onChangePasswordClick()}>Go back?</label>
                    <button type="submit" id='changebutton'>Update password</button>
                </form>
            </div>

        </div>
    )
}
