import React from 'react'

const ChatDatashow=React.memo(({liveChat,liveChatMsg,userDataa,ID})=> {
  return (
   <>
{ <ul  >
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
                                } else if (cvl.Sender_id === ID) {
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
                    </ul>}
   </>
  )
})

export default ChatDatashow