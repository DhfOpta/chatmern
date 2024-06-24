const express = require("express")
const path = require('path')
const app = express();
const cors = require("cors")
const COnect_DB = require('./DB/mongo')
const NODE_MODULE='production';
// dotenv.config();
//1st step:)
// const sockt=require('socket.io')()
const dotenv=require("dotenv")
dotenv.config();
// require("dotenv").config()
app.use(cors())
console.log(process.env.PORT);
const PORT = process.env.PORT || 8000;
app.use(express.json())

const rout = require('./router/rotr')
app.use('/api', rout)
// app.get('/', (req, res) => {
//     res.json({ msg: "Server start" })
// })
// -------------------------Deployment------------------------------
const __dirNam1 = path.resolve()
console.log(path.join('D:/reactfirst/cht/', '/frontEndChat/dist'), '/');
if (process.env.NODE_MODULE == 'production') {
    console.log(path.resolve('D:/reactfirst/cht/', "frontEndChat", "dist", "index.html"), 'cvbvb');
    app.use(express.static(path.join('D:/reactfirst/cht/', '/frontEndChat/dist')))
    app.get('*', (req, res) => {
        res.sendFile(        path.join(process.cwd(),'frontEndChat','dist','index.html')
)
        // path.resolve('D:/reactfirst/cht/', "frontEndChat", "dist", "index.html")
        // res.sendFile(path.resolve('D:/reactfirst/cht/', "chatApp", "build", "index-51091e7e1d46afc6.html"))
    })
}
else {
    app.get('/api', (req, res) => {
        res.send({ msg: "Server start..." })
    })
}

// -------------------------Deployment------------------------------


var server = app.listen(PORT, () => console.log("Server start on " + PORT), COnect_DB())






// server()
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: { origin: 'http://localhost:5173', credential: true }
})

io.on('connection', (socket) => {
    console.log('conected socket.io');
    //everytime user open chat they have own socket
    // console.log(socket);
    socket.on('setUp', (userData) => {
        console.log(userData, 'room');
        socket.join(userData)
        socket.emit('connected user')
    })
    socket.on('joinChat', (room) => {
        console.log(room, 'roomroom1');
        socket.join(room)

    })

    socket.on('sndMsg', (newMsg) => {
        var chat = newMsg
        console.log(newMsg, 'chatchat');
        // socket.emit(newMsg.Chat)

        if (!chat[0].Recever_id) {
            return console.log('no  user');
        } else {
            // socket.on('msgRecv', (newMsg)=>{

            socket.in(newMsg[0].Recever_id).emit('msgRv', newMsg)

            // })

        }

        // chat.users.forEach(element => {
        // if (element._id == newMsg.sender._id) {
        //     return
        // }
        // });
    })

}) 