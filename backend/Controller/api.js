const UserRegstr = require('../DB/userRegiserSchema')
const FollowersnFollowing = require('../DB/Follower')
const chatModel = require('../DB/ChatMeg')
const validtr = require("validator")
const JWT = require('jsonwebtoken');
const bcrt = require("bcrypt")
const { Buffer } = require('node:buffer');
const { isString } = require('node:util');
// const { log } = require('node:console');
// const { password } = require('bun');
const ObjectID = require('mongodb').ObjectID;

const api = (req, res) => {
    res.json({ msg: "Server start api" })
}



const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { userName, email, password, dp } = req.body;
        const userExist = await UserRegstr.findOne({ email })

        const validEmail = await validtr.isEmail(email)
        const validPAssw = await validtr.isStrongPassword(password)
        // console.log(validEmail, validPAssw);
        if (userExist) {
            // console.log("User Already Exist");
            res.status(400).json({ msg: " User Already Exist" })
        } else
            if (userName.length < 3) {
                // console.log("nam");
                res.status(406).json({ msg: " User Name should be at least 3 charater" })

            } else if (!validEmail) {
                // console.log("emal");
                res.status(406).json({ msg: " Please Enter Valid EmailID." })

            } else if (!validPAssw) {
                res.status(406).json({ msg: "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1" })

            } else {
                const salt = await bcrt.genSalt(10);
                const hash = await bcrt.hash(password, salt)
                // console.log(hash);
                const JWTGnrt = async () => {
                    try {

                        return JWT.sign({
                            userName, email, password
                        }, process.env.JWT_SECURTY, {
                            expiresIn: "1d"
                        })
                    } catch (error) {
                        // console.log(error);
                    }
                }

                const userRegttr = await UserRegstr.create({ userName, email, password: hash, dp })
                res.json({
                    msg: {
                        userRegttr
                    },
                    tokn: await JWTGnrt()
                })
            }
    } catch (error) {
        console.log(error);
    }
}


const login = async (req, res) => {
    try {
        const { userName, email, password } = req.body;



        const validEmail = await validtr.isEmail(email)
        const validPAssw = await validtr.isStrongPassword(password)


        const UserExist = await UserRegstr.findOne({ email })
        if (!UserExist) {
            // console.log("User Not Exist");
            res.status(401).json({ msg: " User Not Exist" })
        } else
            // if (userName==UserExist.userName) {
            console.log("nam");
        //     res.json({ msg: " User Name not valid" })

        // } else 
        if (!validEmail) {
            // console.log("emal");
            res.status(406).json({ msg: " Please Enter Valid EmailID." })

        } else if (!validPAssw) {
            res.status(406).json({ msg: "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1" })


            // else if (userName==UserExist.userName && email==UserExist.email) {}

        } else {

            // const salt=await bcrt.genSalt(10);
            const comp = await bcrt.compare(password, UserExist.password)
            // console.log(comp);
            if (userName == UserExist.userName && email == UserExist.email && comp) {
                const JWTVarfy = async () => {
                    try {

                        return JWT.sign({
                            userName, email, password
                        }, process.env.JWT_SECURTY, {
                            expiresIn: "1d"
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }
                res.status(200).json({
                    msg: "login SuccesFull",
                    tokn: await JWTVarfy()
                }
                )
            } else {
                res.status(401).json({
                    msg: "Not Valid Credetional"
                })
            }
            // const userRegttr = await UserRegstr.create({ userName, email, password, dp })

        }


    } catch (error) {
        console.log(error);

    }
}

const user = async (req, res) => {
    try {
        // console.log("userData by tokn :)))))" + res.user + "  " + res.userEmail + ' ' + res.userDp + ' id:' + res.userID);
        res.status(200).json({ userID: res.userID })

    } catch (error) {
        console.log(error);
    }
}

const follow = async (req, res) => {
    try {
        // console.log("mvnvnvnnvnvnvnvnvnvnvn");
        // followersnFollowing
        // console.log(res.userEmail + '  post');
        const { userFoloerId } = req.body;
        // console.log(userFoloerId + " Folw");
        const followersnFolow = await FollowersnFollowing.create({ userId: res.userID, following: userFoloerId })
        // console.log(followersnFolow + " na mabaj a ama m am");
        res.json({ msg: "Follow" })
    } catch (error) {
        console.log(error);
    }

}


const chat = async (req, res) => {
    try {
        // console.log(res.user + "  chat");
        const { Recever_id, Chat } = req.body;
        const dataSend = await chatModel.create({ Sender_id: res.userID, Recever_id, Chat })
        console.log(dataSend, 'dataChat Send');
        res.json({ msg: dataSend })


    } catch (error) {
        console.log(error + "nvcn");
        res.json({ msg: "Message Empty" })

    }
}


const getUserData = async (req, res) => {
    try {
        const id = res.userID
        // console.log(id);
        const data = await UserRegstr.find({ _id: id }).select({ "password": 0 });
        // console.log(data + 'fata');
        res.status(200).json({ msg: data })

    } catch (error) {
        // console.log(error);
    }
}
const updateDp = async (req, res) => {
    const { dp } = req.body
    try {

        // console.log(dp + 'nvhvhv');
        const email =req.params.id
        console.log(email===Number+ ' bvhv');
if (email===Number ) {
  

    const data = await UserRegstr.findOneAndUpdate({ email: email }, { dp })
    // console.log(data + 'navhavhjavhavhavhavahvahvahvahah ah ah');
    res.status(200).json({ msg: "Updated" })
}
else{
    const data = await UserRegstr.findOneAndUpdate({ _id: email }, { dp })
    res.status(200).json({ msg: "Updated" })

}       
//  const data = await UserRegstr.findOneAndUpdate({ email: email }, { dp })
//         // console.log(data + 'navhavhjavhavhavhavahvahvahvahah ah ah');
//         res.status(200).json({ msg: "Updated" })
//         // const upDateDp=await data.findBy

    } catch (error) {
        console.log(error + 'udtDp');
    }
}
const searchUser = async (req, res) => {
    try {
        console.log(req.query);
        const user = res.user
        // console.log(user);
        const { userName } = req.query
        // console.log(userName);
        const data = await UserRegstr.find({ userName: { $regex: userName, $options: 'i', $nin: [user] } }).select({ 'password': 0 })
        // console.log(data + 'data');
        if (data == '') {
            res.status(401).json({ msg: 'User Not Found' })

        } else {
            res.status(200).json({ msg: data })

        }
    } catch (error) {
        console.log(error + "searchUser");
        res.status(500).json({ msg: error })

    }
}
const getFolloeData = async (req, res) => {
    try {
        const id = res.userID
        // console.log(id);
        const data = await FollowersnFollowing.find({ userId: id });
        // console.log(data + 'Datadata');
        res.status(200).json({ msg: data })
    } catch (error) {
        console.log(error);
    }
}


const followingUserData = async (req, res) => {
    try {
        const _id = req.params.id
        // console.log(_id + " jbjjb");
        const data = await UserRegstr.findOne({ _id }).select({ "password": 0 })
        res.status(200).json({ msg: data })
    } catch (error) {
        console.log(error);
    }
}
const gtUserData = async (req, res) => {
    try {
        const id = req.params.id
        // console.log(id + 'ididid');
        // console.log(ObjectID.createFromHexString(id) );
        const data = await UserRegstr.find({ '_id': id }).select({ "password": 0 })
        // console.log(data);
        res.status(200).json({ msg: data })
    } catch (error) {
        console.log(error);
    }
}
const getFollIngeData = async (req, res) => {
    try {
        const following = res.userID
        // console.log(following, 'h hsvhsvhsvhv');
        const dataGt = await FollowersnFollowing.find({ following: following })
        // console.log(dataGt, 'vhvhvhvhvhvh');
        res.status(200).json({ msg: dataGt })
    } catch (error) {
        console.log(error);
    }
}

const gtSearchUserDataFoloIng = async (req, res) => {
    try {
        const id = req.params.id
        // console.log(id+'hhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhh');
        const data = await FollowersnFollowing.find({ userId: id });
        // console.log(data + 'Datadata');
        res.status(200).json({ msg: data })
    } catch (error) {
        console.log(error);
    }
}
const gtSearchUserDataFoloer = async (req, res) => {
    try {
        const following = req.params.id
        // console.log(following, 'h hsvhsvhsvhv');
        const dataGt = await FollowersnFollowing.find({ following: following })
        // console.log(dataGt, 'vhvhvhvhvhvh');
        res.status(200).json({ msg: dataGt })
    } catch (error) {
        console.log(error);
    }
}
const userFolowOrNot = async (req, res) => {
    try {
        const userID = res.userID
        const following = req.params.id

        const dataGt = await FollowersnFollowing.find({ $and: [{ userId: userID }, { following }] })
        // console.log(dataGt,'userFolowOrNotuserFolowOrNotuserFolowOrNotuserFolowOrNot');
        if (dataGt != '') {
            res.status(200).json({ msg: 'Folllow' })
        } else {
            res.status(200).json({ msg: 'Not Folllow' })

        }
    } catch (error) {
        console.log(error);
    }
}
const checkuserorNot = async (req, res) => {
    try {

        const userID = res.userID
        const id = req.params.id
        if (userID == id) {
            res.status(200).json({ msg: 'Your Profile' })

        } else {
            res.status(200).json({ msg: 'Not Your Profile' })
        }
    } catch (error) {
        console.log(error);
    }
}
const chatDataGt = async (req, res) => {
    try {
        const userID = res.userID
        const id = req.params.id

        const data2 = await chatModel.find({
            $or: [{ $and: [{ Sender_id: userID }, { Recever_id: id }] }, { $and: [{ Sender_id: id }, { Recever_id: userID }] }]
            // $and:[{Sender_id:id},{Recever_id:userID}]
        }).sort({ 'createdAt': 1 })
        console.log(data2, 'da2');
        if (data2 != '') {
            res.status(200).json({ msg: data2 })

        }
        else {
            res.status(200).json({ msg: 'Start Message' })

        }
    } catch (error) {
        console.log(error);
    }
}
const authRote = async (req, res) => {
    try {
        console.log(res.Msg,
            'bbn'
        );
        if (res.Msg) {
            res.status(200).json({ msg: "Not Authenticated", Error: res.Msg })

        }
        res.status(200).json({ msg: "Authenticated", ID: res.userID })

    } catch (error) {
        console.log(error);
    }
}
const upDatPaswr = async (req, res) => {
    try {
        const {password}=req.body
        console.log(res.userID,password,
            'bbnn'
        );
        const salt = await bcrt.genSalt(10);
        const hash = await bcrt.hash(password, salt)
        const data = await UserRegstr.findOneAndUpdate({ _id:res.userID },{password:hash})
if (data) {
    res.status(200).json({ msg: "Password Updated Succesfull" })

}

    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    api, register, login, user, follow, chat, getUserData, updateDp, searchUser, getFolloeData, followingUserData, gtUserData, getFollIngeData
    , gtSearchUserDataFoloIng, gtSearchUserDataFoloer, userFolowOrNot, checkuserorNot, chatDataGt, authRote,upDatPaswr
}