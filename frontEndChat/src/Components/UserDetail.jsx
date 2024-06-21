import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDetail.css';


const userDataApi = 'http://localhost:8080/api/userData'//loginuserdetl

const api1 = 'http://localhost:8080/api/userFollowDtal/${cvl.following}'
const app = 'http://localhost:8080/api/folloeingData'//foloingdatafromdb
const api = 'http://localhost:8080/api/folloerData'//foloergdatafromdb
const api2 = 'http://localhost:8080/api/userFollowDtal/${cvl.userId}'

// const app='http://localhost:8080/api/folloeingData'

const ap = 'http://localhost:8080/api/userFollowDtal/:id'
const UserDetail = () => {
  const [userData, setUserData] = useState([])
  const [folower, setfolower] = useState([])
  const [folowing, setfolowing] = useState([])
  const [folowerData, setFolowerData] = useState([])
  const [folowIngdData, setFolowIngData] = useState([])
  const [dataGtFolo, setDataGtFlo] = useState([])
  const [dataGtFoloNam, setDataGtFloNam] = useState('')
  const navgt = useNavigate()

  const tokn = localStorage.getItem('tokn')

  const gtUserData = async () => {
    try {
      const data = await axios.get(userDataApi, {
        headers: {
          "Authorization": tokn

        }
      })
      console.log(data);
      setUserData(data.data.msg)
      localStorage.setItem('val',data.data.msg[0]._id)
    } catch (error) {
      console.log(error);
    }
  }
  // const folowIngData = async () => {
  //   console.log('Followers');
  //   try {
  //     setDataGtFloNam('Foloing')
  //     const data = await axios.get(app, {
  //       headers: {
  //         "Authorization": tokn
  //       }
  //     })
  //     console.log(data);
  //     // setfolower(data.data.msg)
  //     const dataGt = await data.data.msg
  //     console.log(dataGt);
  //     setfolower(dataGt)

  //     // })
  //     // dataGt()
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  // console.log(folower,'folowerfolowerfolowerfolowerfolowerfolowerfolowerfolowerfolowerfolower');
  // const folowData = async () => {
  //   console.log('foling');
  //   setDataGtFloNam('Foloer')
  //   try {
  //     const data = await axios.get(api, {
  //       headers: {
  //         "Authorization": tokn
  //       }
  //     })
  //     console.log(data);
  //     // setfolower(data.data.msg)
  //     const dataGt = await data.data.msg
  //     console.log(dataGt);
  //     setfolowing(dataGt)
  //     setFolowerData(dataGt)
  //     setDataGtFlo(dataGt)
  //     // })
  //     // dataGt()
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // console.log(folowing, 'foling');
  // console.log(userData);

  // const gtFolowerData = async () => {
  //   try { 

  //           setFolowIngData([])
  //       setDataGtFlo([])
  //     folowing.map(async (cvl) => {
  //       console.log(cvl.following, 'nhavhahavhavhavhavhavh   ahchachacah');
  //       const data = await axios.get(`http://localhost:8080/api/userFollowDtal/${cvl.following}`)
  //       console.log(data, 'datafoling');
  //       setFolowerData((prv) => {
  //         return [...prv, data.data.msg[0]]
  //       })
  //       setDataGtFlo((prv) => {
  //         return [...prv, data.data.msg[0]]
  //       })
  //       // setDataGtFlo()
  //       // setFolowerData
  //       // setDataGtFlo('folowerData')
  //     })
  //           // setDataGtFloNam('Foloer')





  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const gtFolowerIngData = async () => {
  //   try {


  //     setfolowing([])
  //     setDataGtFlo([])

  // folower.map(async (cvl) => {
  //   console.log(cvl.following, 'nhavhahavhavhavhavhavh   ahchachacah');
  //   const data = await axios.get(`http://localhost:8080/api/userFollowDtal/${cvl.userId}`)
  //   console.log(data, 'datafoling');
  //   setFolowIngData((prv) => {
  //     return [...prv, data.data.msg[0]]
  //   })
  //   setDataGtFlo((prv) => {
  //     return [...prv, data.data.msg[0]]
  //   })

  // })


  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const folowData = async () => {
    try {

      if (dataGtFoloNam != 'Foloer') {
        setFolowerData([])
      }
      setDataGtFloNam('Foloer')
      const data = await axios.get(`http://localhost:8080/api/folloerData`, {
        headers: {
          "Authorization": tokn
        }
      })
      console.log(data.data.msg);
      setfolowing(data.data.msg)

    } catch (error) {
      console.log(error);
    }
  }
  const folowIngData = async () => {
    try {

      if (dataGtFoloNam == 'Foloer') {
        setFolowerData([])
      }
      // setFolowerData([])
      setDataGtFloNam('Foloing')
      const data = await axios.get(`http://localhost:8080/api/folloeingData`, {
        headers: {
          "Authorization": tokn
        }
      })
      console.log(data.data.msg);
      setfolower(data.data.msg)

    } catch (error) {
      console.log(error);
    }
  }
  const gtFoloIngUserData = async () => {
    try {

      setDataGtFlo([])
      folowing.map(async (cvl) => {
        console.log(cvl.following, 'nhavhahavhavhavhavhavh   ahchachacah');
        const data = await axios.get(`http://localhost:8080/api//userFollowDtal/${cvl.following}`, {
          headers: {
            "Authorization": tokn
          }
        }

        )
        console.log(data.data.msg, 'datafoling');
        setFolowerData((prv) => { return [...prv, data.data.msg[0]] })
        setDataGtFlo((prv) => { return [...prv, data.data.msg[0]] })
      })
    } catch (error) {
      console.log(error);
    }
  }
  const gtFolorUserData = async () => {
    try {

      setDataGtFlo([])
      folower.map(async (cvl) => {
        console.log(cvl.userId, 'nhavhahavhavhavhavhavh   ahchachacah');
        const data = await axios.get(`http://localhost:8080/api/userFollowDtal/${cvl.userId}`, {
          headers: {
            "Authorization": tokn
          }
        }

        )
        console.log(data.data.msg, 'datafoling');
        setFolowerData((prv) => { return [...prv, data.data.msg[0]] })
        setDataGtFlo((prv) => { return [...prv, data.data.msg[0]] })
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    gtUserData()
  },[])
  useEffect(() => {
    
    if ((folowing != [] && folowerData == '' && dataGtFoloNam == 'Foloer') || dataGtFoloNam == '') {
      gtFoloIngUserData()
    }
    if ((folower != [] && folowerData == '' && dataGtFoloNam == 'Foloing') || dataGtFoloNam == '') {
      gtFolorUserData()
    }



  }, [folowing, folower])
  console.log(folowerData, folowIngdData);
  return (
    <>
      <div className='mainContnr'>


        <div className='userDpupper'>
          {userData.map((cvl) => {
            return <>
              <div className='userDap' key={cvl._id}>
                <img src={cvl.dp} alt='img' />
              </div>
              <div className='userName'>
                <h4>{cvl.userName}</h4>
                <div className='folFol' >
                  <div >
                    <h6 className='folFolr'>FolloWing</h6>
                    <div>

                    <h6 className='folFolr'>{folowing.length}</h6>
                    </div>
                  </div>
                  <div >
                    <h6 className='folFolr'>FolloWers</h6>
                    <div>
                    <h6 className='folFolr'>{folower.length}</h6>

                    </div>
                  </div>
                </div>
 
              </div>
            </>
          })}

        </div>
        <br></br><hr /><br />
        <div className='dwnSctn'>
          {/* <div> */}
            <button className='flowBtn' onClick={folowData} >Following</button>

          {/* </div> */}
          {/* <div> */}
            <button className='flowBtn' onClick={folowIngData}>Followers</button>

          {/* </div> */}
        </div>
        {/* foloer n following show */}
        <div className='searchResults'>
          {dataGtFolo.map((cvl) => {
            return <>
              <div className='manCont' key={cvl._id} onClick={() => { navgt(`/authDas/userDashboard/UserSerchFolDetail/${cvl._id}`) }}>
                <div className='userDap'>
                  <img src={cvl.dp} />
                </div>
                <div className='userName'>
                  <h4>{cvl.userName}</h4>
                  {/* <button className='flowBtn'>Follow</button> */}
                </div>
              </div>
            </>
          })}
        </div>
      </div>
    </>
  )
}

export default UserDetail