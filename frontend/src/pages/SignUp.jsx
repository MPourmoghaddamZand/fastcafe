import React, { useEffect, useState } from 'react'
import InputField from '../layout/InputField'
import useSign from '../store/useSign'
import axios from 'axios';
const SignUp = () => {
    const { loginStatus, changeStatus, signUpUser, getUserData, loginUser, user, error } = useSign();
    const [inputUserName, setInputUserName] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const handleChangeStatus = () => {
        changeStatus()
    }

    useEffect(() => {
        getUserData();
    }, [])


    return (
        <>
            {user ?
                <p className=''> Name: {user.userName}</p >
                :
                <div className='w-full h-screen bg-orange-400 flex justify-center items-center'>
                    <div className='w-10/12 mx-auto bg-white rounded-md shadow-lg text-center py-7 flex flex-col justify-evenly items-center gap-10'>
                        <h2 className='text-3xl font-bold'>{loginStatus ? 'Login' : 'Sign in'}</h2>
                        <div>
                            {error != null && <p className='text-error'>{error}</p>}
                            <InputField value={inputUserName} onChange={(e) => setInputUserName(e.target.value)} title={'UserName'} placeholder={'Type here...'} />
                            <InputField value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} title={'Password'} placeholder={'Type here...'} />
                            <button onClick={() => loginStatus ? loginUser(inputUserName, inputPassword) : signUpUser(inputUserName, inputPassword)} className="btn btn-primary mt-5 w-full">{loginStatus ? "Login" : 'Sign Up'}</button>
                            <button onClick={handleChangeStatus} className='text-sm underline text-blue-600'>{loginStatus ? 'Sign Up' : "Login"}</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SignUp