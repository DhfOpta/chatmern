import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const  Logout=()=> {
    const [toknRmovr,settoknRmovr]=useState(false)
    const nvgt=useNavigate()
    const logOout=()=>{
        try {
          localStorage.removeItem('tokn')
          localStorage.removeItem('DpUserSet')
            nvgt('/Login')
        } catch (error) {
            console.log(error);
        }
    }
//     useEffect=()=>{
// logOout()
//     },[]
useEffect(()=>{

},[])
  return (
    <div>Logout</div>
  )
}

export default Logout