import { Schema, model } from 'mongoose'

const followingSchema = new Schema({
    following: {
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

export default model('Following', followingSchema)