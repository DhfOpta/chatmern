import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PublicRoute = () => {
  const tokn = localStorage.getItem('tokn')
  console.log(tokn);
  const [data, setData] = useState('')
  const nvgt = useNavigate()
  const Auth = async () => {
    try {
      const data = await axios.get('http://localhost:8080/api/authRoute', {
        headers: {
          'Authorization': tokn
        }
      })
      console.log(data)
      if (data.data.msg == "Authenticated") {
        setData(false)
        // nvgt('/authDas/userDashboard')
      } else{
        nvgt('/Login')
        setData(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    Auth()
   

  }, [])
  return (<>
    <>{data ? <>

      <div style={{ display: 'grid', placeItems: 'center', fontSize: '2rem', height: '100vh' }}><h3 >You are not Login</h3></div>
      {setTimeout(() => {
        nvgt('/Login')
      }, 888)}

    </> : <>

      <Outlet />
    </>}

    </>
  </>)

}

export default PublicRoute