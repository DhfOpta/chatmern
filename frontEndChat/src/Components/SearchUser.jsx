import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './SearchUser.css'
const SearchUser = () => {
  const navgt=useNavigate()
  const [search, setSearch] = useState([])
  const [searchUnf, setSearchUnf] = useState(false)

  const [userSearch, setUserSearch] = useState({
    "searchUser": ''
  })
const tokn=localStorage.getItem('tokn')
  const getUserData = async (e) => {
    try {
      const name = e.target.name;
      const value = e.target.value;
      setUserSearch((prv) => {
        return { ...prv, [name]: value }
      })
      // if (userSearch.searchUser) {
      //   setSearchUnf(false)

      // }
    } catch (error) {
      console.log(error);
    }
  }
  const dataUserSearch = async () => {
    try {

      const data = await axios.get(`http://localhost:8080/api/searchUser?userName=${userSearch.searchUser}`,{
        headers:{
          "Authorization":tokn
        }
      })
      setSearchUnf(false)
      console.log(data);
      setSearch(data.data.msg)

    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        setSearchUnf(true)

      }

    }
  }
  useEffect(() => {
    if (userSearch.searchUser != '') {
      dataUserSearch()
    } else (
      setSearch([])
      
    )

  }, [userSearch])
  console.log(search);
  return (
    <>
      <Outlet />
      <div className='contSearch'>
        <div className='search'>
          <input type='text' placeholder='Search' className='searchBar' name='searchUser' value={userSearch.searchUser} onChange={getUserData} />
        </div>
      </div>

      <div className='searchResults'>
        {searchUnf ? <div className='unf'>
          <p>User Not Found</p>
        </div> :

          
            search.map((cvl) => {
              return <>
                <div className='manCont' key={cvl._id}  onClick={()=>{navgt(`/authDas/userDashboard/UserSerchFolDetail/${cvl._id}`)}}>
                  <div className='userDap'>
                    <img src={cvl.dp} alt='img' />
                  </div>
                  <div className='userName'>
                    <h4>{cvl.userName}</h4>
                    {/* <button className='flowBtn'>Follow</button> */}
                  </div>
                </div>
              </>
            })
          
        }

      </div>
    </>

  )
}

export default SearchUser