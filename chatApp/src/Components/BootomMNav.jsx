import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './BootomMNav.css';
const BootomMNav = () => {
    return (
        <>
            <div className='container'>
                {/* <div> */}
                <NavLink to='/authDas/userDashboard/'>

                <div className='fstCont'>
                    {/* <div > */}
                            <SearchIcon className='icon'/>
                    {/* </div> */}
                </div>                        </NavLink>

                {/* </div> */}
                {/* <div> */}
                <NavLink to='/authDas/userDashboard/UserDetail'>
                
                <div className='secCont'>
                    {/* <div > */}
                            <PersonOutlineIcon  className='icon'/>

                    {/* </div> */}
                </div>
                </NavLink>

                {/* </div> */}
                {/* <div> */}
                <NavLink to='/authDas/userDashboard/SettingUserPrfl'>
                    <div className=' thrdCont'>
                        <div >

                            <ManageAccountsIcon className='icon'  />


                        </div>
                    </div>   
                </NavLink>
                {/* </div> */}


            </div>

        </>
    )
}

export default BootomMNav