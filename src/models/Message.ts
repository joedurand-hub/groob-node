import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
    conversationId: {
        type: String, required: false, trim: true
    },
    remitter: {
        type: String, required: false, trim: true
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
})

export default model('Message', messageSchema)