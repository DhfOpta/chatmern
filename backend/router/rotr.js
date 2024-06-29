const express=require("express");
const router=express.Router()
const {api,register,login,user,follow,chat, getUserData,updateDp,searchUser,getFolloeData,followingUserData,gtUserData,getFollIngeData,gtSearchUserDataFoloIng,gtSearchUserDataFoloer,userFolowOrNot,checkuserorNot,chatDataGt,authRote,upDatPaswr}=require("../Controller/api");
const { validate } = require("../JWTVali dt");
router.route('/api').get(api);
router.route('/userRegistration').post(register)
router.route('/userLogin').post(login)
router.route('/user').get(validate,user)
router.route('/authRoute').get(validate ,authRote)
router.route('/follow').post(validate,follow)
router.route('/chat').post(validate,chat)
router.route('/chatDataGt/:id').get(validate,chatDataGt)

router.route('/searchUser').get(validate,searchUser)
router.route('/userData').get(validate,getUserData);
router.route('/usertDp/:id').patch(updateDp)
router.route('/upDatPaswr').patch(validate,upDatPaswr)

router.route('/folloerData').get(validate,getFolloeData)
router.route('/folloeingData').get(validate,getFollIngeData)

router.route('/followingUserData/:id').get(validate,followingUserData)
router.route('/userFollowDtal/:id').get(gtUserData) //searchUserData
router.route('/userSearchDataFoloing/:id').get(gtSearchUserDataFoloIng)
router.route('/userSearchDataFoloer/:id').get(gtSearchUserDataFoloer)
router.route('/userFolowOrNot/:id').get(validate,userFolowOrNot)
router.route('/checkuserorNot/:id').get(validate,checkuserorNot)
// followingUserData
// router.route('/googleVarify')
// gtUserData

module.exports=router