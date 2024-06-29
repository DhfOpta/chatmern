import SendRoundedIcon from '@mui/icons-material/SendRounded';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './Chat.css';
const ap = '/chatDataGt/:id'
const userDataApi = 'https://chatmern-27.onrender.com/api/userData'//loginuserdetl
const ep = 'https://chatmern-27.onrender.com'
var socket, selectedChatCompar;
const Chat = () => {
    const [userData, setUserData] = useState({})
    const [liveChat, setLiveChat] = useState([])
    const tokn = localStorage.getItem('tokn')
    const [chat, setChat] = useState('')
    const id = useParams()
    const [userDataa, setUserDataa] = useState([])
    const [userDataackt, setUserDataaSckt] = useState({})

    const [userId, setUserId] = useState(userDataa._id)

    const [liveChatMsg, setLiveChatMsg] = useState(false)
    const [liveChatMsgPost, setLiveChatMsgPost] = useState(false)
    const [sokt, setSokt] = useState(false)
    const [set, setSet] = useState(false)
    const val = localStorage.getItem('val')
    console.log(val, 'val');
    console.log(userDataa._id);
    useEffect(() => {
        socket = io(ep)
        console.log(userDataa);

        socket.emit('setUp', val)
        socket.on('connection', () => { setSokt(true) })


    }, [])

    const gtUserDataa = async () => {
        try {
            const data = await axios.get('https://chatmern-27.onrender.com/api/userData', {
                headers: {
                    "Authorization": tokn

                }
            })
            console.log(data.data.msg[0]);
            setUserDataa(data.data.msg[0])
            // setUserDataaSckt(data.data.msg[0])
            // setUserId(userDataa._id)
            //   setLiveChatMsg(false)
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(()=>{

    //         },[])

    const gtUserData = async () => {
        try {
            const data = await axios.get(`https://chatmern-27.onrender.com/api/followingUserData/${id.id}`, { headers: { "Authorization": tokn } })
            console.log(data);
            setUserData(data.data.msg)
            socket.emit('joinChat', id.id)
        } catch (error) {
            console.log(error);
        }
    }

    const dataChatGt = async () => {
        try {
            const data = await axios.get('https://chatmern-27.onrender.com/api/chatDataGt/' + id.id, { headers: { "Authorization": tokn } })
            // console.log(data);
            if (data.data.msg != 'Start Message') {
                setLiveChat(data.data.msg)
                // setLiveChatMsgPost(true)
                // setLiveChatMsg(false)

            } else {
                setLiveChatMsg(true)
            }
            // socket.emit('joinChat', id.id)

        } catch (error) {
            console.log(error);
        }
    }

    const dataPost = async () => {
        try {
            setLiveChatMsg(false)
            const dataPost = await axios.post('https://chatmern-27.onrender.com/api/chat', { Recever_id: id.id, Chat: chat }, { headers: { "Authorization": tokn } })
            console.log(dataPost);
            console.log([dataPost.data.msg]);
            
            socket.emit('sndMsg', [dataPost.data.msg])
            // if (set) { setSet(false) } else { setSet(true) }
            setTimeout(() => {
                // document.querySelector('#chtCn').scrollTo(0, 20500);
                document.getElementById('chtCn').scrollTop = document.getElementById('chtCn').scrollHeight


            }, 1000);
            // setSet(!set)
            dataChatGt()
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        setTimeout(() => {
            // document.querySelector('#chtCn').scrollTo(0, 20500) + 200;
            document.getElementById('chtCn').scrollTop = document.getElementById('chtCn').scrollHeight
        }, 1000);
        dataChatGt()
        // if (liveChat!='') {
            // setLiveChatMsg(false)

        // }

        gtUserData()

        gtUserDataa()


    }, [])
    // const dat=[]
    useEffect(() => {
        socket.on('msgRv', (newMsg) => {
            console.log(newMsg);
            var dat = [...newMsg]
            console.log(dat);
            //         
            return setLiveChat([...liveChat, ...newMsg]), document.getElementById('chtCn').scrollTop = document.getElementById('chtCn').scrollHeight

            //  dataChatGt()

        }
        )
    })
    // useEffect(() => {
    //     dataChatGt(); document.getElementById('chtCn').scrollTop = document.getElementById('chtCn').scrollHeight
    // }, [])
    console.log(liveChat, userDataa._id);
    return (

        <>
            <div className='contn'>
                <div className='uperPart'>
                    <div className='uprlft'>
                        <img
                            src={userData.dp} alt='img'
                        />           </div>
                    <div className='uprrght'>
                        <p>{userData.userName}</p>
                        <span>{userData.email}</span>
                    </div>
                </div>
                <div className='chatSctn' id='chtCn' >
                    <ul  >
                        {liveChatMsg ? <><div className='liveChatMsg'><h3>Start Chat</h3></div></> :
                            liveChat.map((cvl) => {
                                var dt = new Date(cvl.createdAt).getHours()
                                var dt1 = new Date(cvl.createdAt).getMinutes()
                                if (cvl.Sender_id === userDataa._id) {
                                    return <><div key={cvl._id}>
                                        <li className='send'>
                                            {cvl.Chat}

                                        </li>
                                    </div>
                                        <span className='send tme'>{dt + ':' + dt1}</span>
                                    </>
                                } else if (cvl.Sender_id === id.id) {
                                    return <> <div key={cvl._id}>
                                        <li className='reply'>
                                            {cvl.Chat}

                                        </li>
                                    </div>
                                        <span className='send tmelft '>{dt + ':' + dt1}</span>
                                    </>
                                }


                            })
                        }
                    </ul>
                </div>
                <div className='bottmCont'>
                    <div className='txtFld'>
                        <input type='text' placeholder='Message' name='text' value={chat} onChange={(e) => { setChat(e.target.value) }} />
                    </div>
                    <div className='sendBtn'>
                        <button onClick={dataPost}><SendRoundedIcon className='btnSend' /></button>
                    </div>
                </div>
            </div>
        </>)
}

export default Chat