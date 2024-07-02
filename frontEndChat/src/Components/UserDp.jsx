import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserDp.css';
const api = 'https://chatmern-27.onrender.com/api/usertDp/'
const UserDp = () => {
    const [img, setImg] = useState('https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg')
    const DpUserSet = localStorage.getItem('DpUserSet')
    const id = localStorage.getItem('val')

    const [warn, setWarn] = useState(true)
    const navgt = useNavigate()
    const param = useParams()
    console.log(param, id);
    console.log(DpUserSet + 'DpUserSet');
    const gtDp = async (e) => {
        try {
            console.log(e.target.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                console.log(reader.result + 'bvchv nvhv h');
                setImg(reader.result)
            }
            // localStorage.removeItem('DpUserSet')
        } catch (error) {
            console.log(error);
        }

    }
    console.log('befotr',DpUserSet);
    const updatDp = async () => {
        try {    
            
            if (param.chngDp === "chngDp" && id) {
                console.log(api+id);
                const data = await fetch(api + id, {
                    method: 'PATCH',
                    crossDomain: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }, body: JSON.stringify({ dp: img })
                })

                console.log(data.status)
                if (data.status == 200) { navgt('/userDashboard/SettingUserPrfl') } else { setWarn(false) }

            } else {
                const data = await fetch(api + DpUserSet, {
                    method: 'PATCH',
                    crossDomain: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }, body: JSON.stringify({ dp: img })
                })

                console.log(data.status)
                if (data.status == 200) { navgt('/Regiter/Login') } else { setWarn(false) }
            }
        // else{setWarn(false)}

        } 
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='Prfole'>
                <div className='pf'>
                    <div className='pfNm'>
                        <h2>Select a Profile picature:</h2>

                    </div>

                    <div className='rght'>
                        <div>
                            <img src={img} className='dpShaw' />
                        </div>
                        {/* <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input type='file' onChange={gtDp} />
                        </form>

                        </div> */}
                        <div className="input_container">


                            <form onSubmit={(e) => e.preventDefault()}>
                                <label for="files" className="btn">Browse Files</label>
                                <input id="files" style={{ display: "none" }} type="file" onChange={gtDp} />
                            </form>

                        </div>
                        {warn ? '' : <div class="danger">
                            <p>File Size must be less than <strong>50KB</strong> </p>
                        </div>}
                        <div>
                            <button className='btn' onClick={updatDp}>Select</button>

                        </div>
                    </div>




                </div>
            </div>
        </>)
}

export default UserDp