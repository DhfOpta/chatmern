const express = require("express")
const path = require('path')
const app = express();
const cors = require("cors")
const COnect_DB = require('./DB/mongo')
const NODE_MODULE = 'production';
const UserRegstr = require('./DB/userRegiserSchema')
const session = require('express-session')
const passport = require('passport')
const aout2Gogl = require('passport-google-oauth2').Strategy
const JWT = require('jsonwebtoken');
const { LocalStorage } = require('node-localstorage')
localStorage = new LocalStorage('./scratch')

const { MongoClient } = require("mongodb");

const clientID = process.env.clientID
const clientSecret = process.env.clientSecret

const dotenv = require("dotenv")
dotenv.config();
// require("dotenv").config()
app.use(cors())
console.log(process.env.PORT);
const PORT = process.env.PORT || 8000;
app.use(express.json())

const rout = require('./router/rotr');
const { validate } = require("./JWTVali dt");
app.use('/api', rout)
// app.get('/', (req, res) => {
//     res.json({ msg: "Server start" })
// })

////////////////////////////////////passport////////////////////

var tokn;
// clientSecret clientID
app.use(session({
    secret: 'DhfOpta@1234',
    resave: false,
    saveUninitialized: true

}))
app.use(passport.initialize())
app.use(passport.session())

// let tokn=undefined;
passport.use(
    new aout2Gogl({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: 'https://chatmern-27.onrender.com/auth/google/callback',
        scope: ['profile', "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile, 'bcnccbcb', profile._json.sub);
                let user = await UserRegstr.findOne({ $or: [{ googleid: profile._json.sub }, { email: profile.emails[0].value }] })
                if (!user) {
                    user = new UserRegstr({
                        googleid: profile._json.sub,
                        userName: profile.displayName,
                        dp: profile.photos[0].value,
                        email: profile.emails[0].value
                    })

                    console.log('acount not  have');
                    await user.save()
                } else {
                    console.log('acconut have already!!!:)');
                    console.log(user, 'has', profile._json.sub)

                    const { id } = profile
                    console.log(id, 'by emails');
                    await UserRegstr.updateOne({ email: profile.emails[0].value },
                        { $set: { googleid: id } }
                    )

                }
               
                return done(null, user)
            } catch (error) {
                return done(error, null)
            }
        })
)
// console.log(tokn,'n');

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})
console.log(tokn, 'tokntokntokntokn jon');

app.get('/auth/google', passport.authenticate("google", { scope: ['profile', "email"] }))
app.get('/auth/google/callback', passport.authenticate("google", {
    successRedirect: "https://chatmern-281.onrender.com/authDas/userDashboard",
    failureRedirect: "https://chatmern-281.onrender.com"
}))
 
app.get('/googleTokn', async (req, res) =>{
    try {
        console.log(req.user,'reqqq');
        const { userName, email, googleid } = req.user
console.log(' userName, email, googleid userName, email, googleid', userName, email, googleid);
        const JWTGnrt = async () => {
            try {

                return JWT.sign({
                    userName, email, googleid
                }, process.env.JWT_SECURTY, {
                    expiresIn: "1d"
                })
            } catch (error) {
                console.log(error);
            }
        }
        const tok = await JWTGnrt()
        console.log('xcvbncccccccmnawait JWTGnrt()', tok);
        res.status(200).json({
            msg: "login SuccesFull by passport",
            tokn: await JWTGnrt()
        })
    } catch (error) {
        console.log('errorby gt',error);
    }
})



/////////////////////////////////////passport///////////////////


// -------------------------Deployment------------------------------
const __dirNam1 = path.resolve()
console.log(path.join('D:/reactfirst/cht/', '/frontEndChat/dist'), '/');
if (process.env.NODE_MODULE == 'production') {
    console.log(path.resolve('D:/reactfirst/cht/', "frontEndChat", "dist", "index.html"), 'cvbvb');
    // var tokn = 'null';
    console.log('prodct');
    app.use(express.json())


    app.use(express.static(path.join('D:/reactfirst/cht/', '/frontEndChat/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'frontEndChat', 'dist', 'index.html'))

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
    cors: { origin: 'https://chatmern-281.onrender.com', credential: true }
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


        }


    })

}) 
