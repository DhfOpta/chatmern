const {Schema,model}=require('mongoose');

const chatSchema=new Schema({
    Sender_id:{type:Schema.Types.ObjectId,ref:"UserRegstr",require:true},
    Recever_id:{type:Schema.Types.ObjectId,ref:"UserRegstr",require:true},
    Chat:{type:String,require:true,minlength:1}
},{timestamps:true}
)


const chatModel=new model("ChatModel",chatSchema)
module.exports=chatModel