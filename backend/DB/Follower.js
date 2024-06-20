const { Schema, model } = require("mongoose")

// const sch = new Schema({
//     followersId: { type: Schema.Types.ObjectId, ref: 'UserRegstr' }
// }, { timestamps: true })

const folloeSchema = new Schema({
    userId: { type: String },
    following: {
       type: String
        // followersId: { type: Schema.Types.ObjectId, ref: 'UserRegstr' }
     }  
    //   followers: {
    //     type:Schema.Types.ObjectId,ref:"UserRegstr"
    //     // followersId: { type: Schema.Types.ObjectId, ref: 'UserRegstr' }
    // }

},{
    timestamps: true
})
const FollowersnFollowing = new model('folloeSchema', folloeSchema)

module.exports = FollowersnFollowing