import { Schema, model } from 'mongoose'

const followerSchema = new Schema({
    follower: {
        type: String, unique: false, trim: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: false,
    }],
}, {
    timestamps: true,
    versionKey: false
})

export default model('Follower', followerSchema)