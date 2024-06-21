import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserDetail.css';

// userFollowDtal
const app = 'http://localhost:8080/api/folloeingData'
const api = 'http://localhost:8080/api/folloerData'
const a = 'http://localhost:8080/api/userSearchDataFoloing/'
const aa = 'http://localhost:8080/api/userSearchDataFoloer/'
const userDataApi = 'http://localhost:8080/api/userData'
const ap = 'http://localhost:8080/api/userFollowDtal/'
const follow = 'http://localhost:8080/api/follow'
const UserSerchFolDetail = () => {
    const [userData, setUserData] = useState([])
    const [folower, setfolower] = useState([])
    const [folowing, setfolowing] = useState([])
    const [folowerData, setFolowerData] = useState([])
    const [folowIngdData, setFolowIngData] = useState([])
    const [dataGtFolo, setDataGtFlo] = useState([])
    const [dataGtFoloNam, setDataGtFloNam] = useState('')
    const [folowNotFolow, setfolowNotFolow] = useState(false)
    const [folowNotFolowC, setfolowNotFolowC] = useState(false)

    const tokn = localStorage.getItem('tokn')
    const id = useParams()
    console.log(id.id);
    const navgt = useNavigate()
    const checkfolowNotFolow = async () => {
        try {
            const data = await axios.get('http://localhost:8080/api/userFolowOrNot/' + id.id, { headers: { "Authorization": tokn } })
            console.log(data.data.msg);
            if (data.data.msg == 'Folllow') {
                setfolowNotFolow(true)
            } else {
                setfolowNotFolow(false)

            }
        } catch (error) {
            console.log(error);
        }
    }
    const folowUser = async () => {
        try {
            const dataPost = await axios.post(follow, { userFoloerId: id.id }, { headers: { "Authorization": tokn } })
            setfolowNotFolow(true)
            console.log(dataPost);
        } catch (error) {
            console.log(error);
        }
    }
    const gtUserData = async () => {
        try {
            const data = await axios.get(`http://localhost:8080/api/followingUserData/${id.id}`, { headers: { "Authorization": tokn } })
            console.log(data);
            setUserData([data.data.msg])
        } catch (error) {
            console.log(error);
        }
    }
    const folowIngData = async () => {
        console.log('Followers');
        try {
            setDataGtFloNam('Foloing')
            const data = await axios.get(aa + id.id, {
                headers: {
                    "Authorization": tokn
                }
            })
            console.log(data);
            const dataGt = await data.data.msg
            console.log(dataGt);
            setfolower(dataGt)


        } catch (error) {
            console.log(error);
        }
    }


    console.log(folower, 'folowerfolowerfolowerfolowerfolowerfolowerfolowerfolowerfolowerfolower');
    const folowData = async () => {
        console.log('foling');
        setDataGtFloNam('Foloer')
        try {
            const data = await axios.get(a + id.id, {
                headers: {
                    "Authorization": tokn
                }
            })
            console.log(data);
            const dataGt = await data.data.msg
            console.log(dataGt);
            setfolowing(dataGt)

        } catch (error) {
            console.log(error);
        }
    }
    console.log(folowing, 'foling');
    console.log(userData);

    const gtFolowerData = async () => {
        try {
            setFolowIngData([])
            setDataGtFlo([])
            folowing.map(async (cvl) => {
                console.log(cvl.following, 'nhavhahavhavhavhavhavh   ahchachacah');
                const data = await axios.get(`http://localhost:8080/api/userFollowDtal/${cvl.following}`)
                console.log(data, 'datafoling');
                setFolowerData((prv) => {
                    return [...prv, data.data.msg[0]]
                })
                setDataGtFlo((prv) => {
                    return [...prv, data.data.msg[0]]
                })
            })




        } catch (error) {
            console.log(error);
        }
    }
    const gtFolowerIngData = async () => {
        try {

            setFolowerData([])

            setDataGtFlo([])
            folower.map(async (cvl) => {
                console.log(cvl.following, 'nhavhahavhavhavhavhavh   ahchachacah');
                const data = await axios.get(`http://localhost:8080/api/userFollowDtal/${cvl.userId}`)
                console.log(data, 'datafoling');
                setFolowIngData((prv) => {
                    return [...prv, data.data.msg[0]]
                })
                setDataGtFlo((prv) => {
                    return [...prv, data.data.msg[0]]
                })

            })


        } catch (error) {
            console.log(error);
        }
    }
    const ckck = async () => {
        try {
            const data = await axios.get('http://localhost:8080/api/checkuserorNot/' + id.id, {
                headers: {
                    "Authorization": tokn
                }
            })
            console.log(data);
            if (data.data.msg == 'Your Profile') {
                setfolowNotFolowC(true)
                // setFolowIngData([])
                // setDataGtFlo([])
            } else {
                setfolowNotFolowC(false)
                // setFolowIngData([])
                // setDataGtFlo([])
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        gtUserData()
        ckck()

        checkfolowNotFolow()
        setFolowIngData([])
        setFolowerData([])
        setDataGtFlo([])
        if ((folowing != [] && folowerData == '' && dataGtFoloNam == 'Foloer') || dataGtFoloNam == '') {

            gtFolowerData()
        }
        if ((folower != [] && folowIngdData == '' && dataGtFoloNam == 'Foloing') || dataGtFoloNam == '') {

            gtFolowerIngData()
        }


    }, [folowing, folower, navgt])

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
                    {
                        folowNotFolowC ? <>
                            {/* <div> */}
                            <button className='flowBtn' style={{ backgroundColor: 'transparent', color: "black", border: '.1rem solid black' }}>Your Profile</button>
                            {/* </div> */}

                        </> : folowNotFolow ? <>
                        {/* <div> */}
                            <button className='flowBtn' style={{ backgroundColor: 'transparent', color: "black", border: '.1rem solid black' }}>Following</button>

                        {/* </div> */}
                        </> :<>
                        {/* <div> */}
                                <button className='flowBtn' onClick={folowUser}>Follow</button>

                            {/* </div> */}
                        </>
                           
                    }
                    {folowNotFolowC ? <></> : <> <div>
                        <button className='flowBtn' onClick={() => {
                            navgt('/authDas/userDashboard/Chat/' + id.id)
                        }}>Chat</button>

                    </div></>}
                    {/* <div>
                            <button className='flowBtn' onClick={()=>{
                                navgt('/userDashboarrd/Chat/'+id.id)
                            }}>Chat</button>

                        </div> */}
                    {/* /userDashboarrd/Chat/ */}
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

export default UserSerchFolDetail