import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthRote = () => {
  const nvgt=useNavigate()
const tokn=localStorage.getItem('tokn')
console.log(tokn);
  // const Auth=async()=>{
  //   try {
  //     const data=await axios.get('http://localhost:8080/api/authRoute',{
  //       headers:{
  //         'Authorization':tokn
  //       }
  //     })
  //     console.log(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(()=>{
  //   Auth()
  // },[])
  return (<>
    <>{tokn?<>
<div style={{display:'grid',placeItems:'center',fontSize:'2rem',height:'100vh'}}><h3 >You are Login</h3></div>
{setTimeout(()=>{
nvgt('/authDas/userDashboard')
},88)}
    </>:<>
      <Outlet/>
    </>}
    
    </>  
  </>)

}

export default AuthRote