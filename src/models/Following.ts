import { Schema, model } from 'mongoose'

const followingSchema = new Schema({
    following: {
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

export default model('Following', followingSchema)