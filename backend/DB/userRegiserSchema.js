const {Schema,model}=require("mongoose")

const userSchm=new Schema({
    userName:{type:String,require:true},
    googleid:{type:String,unique:true},
    email:{type:String,unique:true,require:true},
    password:{type:String,require:true},
    dp:{type:String       
        //  contentType: String
        ,default:'https://t4.ftcdn.net/jpg/04/10/4s3/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'}

},{
timestamps:true})


const UserRegstr=new model('UserSchm',userSchm)

module.exports=UserRegstr