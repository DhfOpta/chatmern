import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const api='http://localhost:8080/api/userLogin';
const Login = () => {
    
    const [name, setName] = useState({
        userName: "", userEmail: "", userPassword: ""
    })
    const navgt=useNavigate()

    const gtValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setName((prv) => {
            return { ...prv, 
                [name]: value }
        })
    }

const postRegister=async()=>{
    
    const jsonData={
        "userName":name.userName,"email":name.userEmail,"password":name.userPassword
    };
    try {
        const dataPost=await axios.post(api,jsonData)
        console.log(dataPost);
        if (dataPost.status=='200') {
            toast.success(dataPost.data.msg)
            localStorage.setItem('tokn',dataPost.data.tokn)
            navgt('/authDas/userDashboard')
        }
          

    } catch (error) {
        console.log(error);
        toast.warn(error.response.data.msg)
    }
}
    return (
        <>
            <div className='RegisterContnr'>

                <div>
                    <form onSubmit={(e)=>e.preventDefault()}>
                        <input type='text' placeholder='Enter User Name' name='userName' onChange={gtValue}
                            value={name.userName}
                        />
                        <input type='email' placeholder='Enter Email' name='userEmail' onChange={gtValue}
                            value={name.userEmail}
                        />
                        <input type='password' placeholder='Enter Password' name='userPassword' onChange={gtValue}
                            value={name.userPassword}
                        />
                        <button className='btn' onClick={postRegister}>
LogIn
                        </button>
                       
                        <div className='alhvrgt'>
                        <p>Not have an Account? <NavLink to='/' className="nav"><span>Sign Up</span></NavLink></p>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login