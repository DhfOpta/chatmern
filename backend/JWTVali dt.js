const jwt =require("jsonwebtoken");
const UserRegstr = require("./DB/userRegiserSchema");

const validate=async(req,res,next)=>{

    const tokn=await req.header("Authorization");
    // console.log("Tokn"+tokn);
    if(!tokn){
        res.json({msg:'Invalid HTTP Request'})
        
    }else{
        try {
            const tknVrfy=await jwt.verify(tokn,process.env.JWT_SECURTY);
            // console.log(tknVrfy.email+" is a userName");
          
            const userData=await UserRegstr.findOne({email:tknVrfy.email});
            // console.log(userData);
            res.user=userData.userName;
            res.userEmail=userData.email;
res.userDp=userData.dp;
res.userID=userData._id;

            next()
        } catch (error) {
            console.log(error,'b');
            res.Msg=error
            next()
        }
    }

}





const validateLogn=async(req,res,next)=>{

    const tokn=await req.header("Authorization");
    console.log("Tokn"+tokn);
    if(!tokn){
        res.json({msg:'Invalid HTTP Request'})
    }else{
        try {
            const tknVrfy=await jwt.verify(tokn,process.env.JWT_SECURTY);
            console.log(tknVrfy.email+" is a userName");
            const userData=await UserRegstr.findOne({email:tknVrfy.email});
            console.log(userData);
            res.user=userData.userName;
            res.userEmail=userData.email;
// res.userDp=userData.dp;
res.userID=userData._id;

            next()
        } catch (error) {
            console.log(error);
        }
    }

}






module.exports={validate,validateLogn}