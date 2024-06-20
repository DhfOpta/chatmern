const mongooe=require('mongoose')
require("dotenv").config()

const URL=process.env.MONGODB_URI;
console.log(URL);
const COnect_DB=async()=>{
    try {
       await  mongooe.connect(URL);
       
        console.log('DB Connected:)');
    } catch (error) {
        console.log(error);
        process.exit(0)
    }
}

module.exports=COnect_DB