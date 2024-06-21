import axios from 'axios'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import BootomMNav from './BootomMNav'
import './UserDeshboard.css'
const api = 'http://localhost:8080/api/user'
const UserDeshboard = () => {
    const tokn = localStorage.getItem('tokn')
    console.log(tokn);
    const getUserID = async () => {
        try {
            const data = await axios.get(api, { headers: { Authorization: tokn } })
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserID()
    }, [])
    return (
        <>
        <div>
        <Outlet/>
        <BootomMNav/>
        {/* <FixedBottomNavigation/>                 */}
        </div>
            {/* <div className='container'>
                <div className='lft'>
</div>
                <div className='rght'><h2>right</h2></div>

            </div> */}
        </>)
}

export default UserDeshboard