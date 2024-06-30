import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PublicRoute = () => {
  const tokn = localStorage.getItem('tokn')
  // let username = getCookie("username");

  console.log(tokn+'b  b',document.cookie);

  const [data, setData] = useState('')
  const nvgt = useNavigate()
  const goglTokn = async () => {
    try {
      console.log('googleTokn');
      const data = await axios.get('https://chatmern-27.onrender.com/googleTokn',{withCredentials:true})
      console.log(data.data.msg,data,'cvbnbvcvbnbvbbbbbbbbbbbbbbbbbb');
      const tokGl=await data.data.tokn
      console.log(tokGl,'gggttt');
      nvgt('/authDas/userDashboard')
      localStorage.setItem('tokn',tokGl)
            nvgt('/authDas/userDashboard')

    } catch (error) {
      console.log(error);
    }
  }
  
  const Auth = async () => {
    try {
      const data = await axios.get('https://chatmern-27.onrender.com/api/authRoute', {
        headers: {
          'Authorization': tokn
        }
      })
      console.log(data)
      if (data.data.msg == "Authenticated") {
        setData(false)
        // nvgt('/authDas/userDashboard')
      } else {
        nvgt('/Login')
        setData(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {

    if (!tokn||tokn=='undefined') {
      goglTokn()
      console.log('xcvcccccccccccccccccccccccccccccccccccccccc');
    }else{
      Auth()
    }

  }, [tokn])
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
