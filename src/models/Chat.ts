import { Schema, model } from 'mongoose'

const chatSchema = new Schema({
    members: {
        type: [String]
    },
    messages: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    updated: {type: Date},
}, { timestamps: true, versionKey: false })

export default model('Chat', chatSchema)