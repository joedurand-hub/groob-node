import { Schema, model } from 'mongoose'

const followerSchema = new Schema({
    follower: {
        type: String, unique: true, trim: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    }],
}, {
    timestamps: true,
    versionKey: false
})

export default model('Follower', followerSchema)