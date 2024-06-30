import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import immg from '../../public/search.png';
import card from '/public/search.png';

import './Register.css';

const api = 'https://chatmern-27.onrender.com/api/userRegistration';
const Register = () => {

    const [name, setName] = useState({
        userName: "", userEmail: "", userPassword: ""
    })
    const navgt=useNavigate()
    const gtValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setName((prv) => {
            return {
                ...prv,
                [name]: value
            }
        })
    }

    const postRegister = async () => {

        const jsonData = {
            "userName": name.userName, "email": name.userEmail, "password": name.userPassword,"googleid":undefined
        };
        try {
            const dataPost = await axios.post(api, jsonData)
            console.log(dataPost);
            if (dataPost.status == 200) {
                toast.success(dataPost.data.msg)
                localStorage.setItem("DpUserSet", name.userEmail)
                navgt('/UserDp')
                
            }
        } catch (error) {
            console.log(error);
            toast.warn(error.response.data.msg)

        }
    }
    const gogleChck=()=>{
        window.open('https://chatmern-27.onrender.com/auth/google/callback',"_self")
    }
    // 
    return (
        <>
            <div className='RegisterContnr'>

                <div className='div'>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type='text' placeholder='Enter User Name' name='userName' onChange={gtValue}
                            value={name.userName}
                        />
                        <input type='email' placeholder='Enter Email' name='userEmail' onChange={gtValue}
                            value={name.userEmail}
                        />
                        <input type='password' placeholder='Enter Password' name='userPassword' onChange={gtValue}
                            value={name.userPassword}
                        />
                        <button className='btn' onClick={postRegister} >
                            Register
                            {/* <input type='submit'/> */}

                        </button>
                        <div className='alhvrgt'>
                            <p>Already have an Account? <NavLink to='/Login' className="nav"><span>Login</span></NavLink></p>
                        </div>
                        <div className='gl'>
                        <button onClick={gogleChck}><img src={card} />Sigin With Google</button>
                    </div>
                    </form>
                  

                </div>
            </div>
        </>
    )
}

export default Register