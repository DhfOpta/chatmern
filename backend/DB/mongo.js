const mongooe=require('mongoose')
 const dotenv=require("dotenv")
 dotenv.config();
const URL=process.env.MONGODB_URI;
console.log(URL);
console.log(process.env.MONGODB_URI);

const COnect_DB=async()=>{
    try {
       await  mongooe.connect(URL);
       
        console.log('DB Connected:)');
    } catch (error) {
        console.log(error);
        // process.exit(0)
    }
}

module.exports=COnect_DB