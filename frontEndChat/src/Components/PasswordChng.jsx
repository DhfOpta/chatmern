import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PasswordChng() {
    const [name, setName] = useState({
         userPassword: "",conformPassword:''
    })
    const tokn=localStorage.getItem('tokn')
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
    const postRegister=async()=>{
        try {
            if (name.userPassword===name.conformPassword&&name.userPassword!==''&&name.conformPassword!=='') {
                console.log(name.conformPassword);
                const data=await axios.patch('https://chatmern-27.onrender.com/api/upDatPaswr',{password:name.conformPassword},{headers:{"Authorization":tokn}})
                if (data.status==200) {
                    navgt('/authDas/userDashboard/SettingUserPrfl')
                    toast('Updated Succefull')
                }
            }else{
                toast('Password not valid')

            }
           
        } catch (error) {
            console.log(error);
        }
    }
  return (
<>
<div className='RegisterContnr'>

<div>
    <form onSubmit={(e) => e.preventDefault()}>
      
        <input type='password' placeholder='Enter Password' name='userPassword' onChange={gtValue}
            value={name.userPassword}
        />
          <input type='password' placeholder='Confirm Password' name='conformPassword' onChange={gtValue}
            value={name.conformPassword}
        />
        <button className='btn' onClick={postRegister} >
            Update
            {/* <input type='submit'/> */}

        </button>
       
    </form>

</div>
</div>
</>  )
}

export default PasswordChng