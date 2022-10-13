import { Schema, model } from 'mongoose'

const paymentSchema = new Schema({
    paymentId: String, 
    date_created: String,
    user_id: String,
    data: {
        id: String,
    },
    explicitContent: { type: Boolean, default: false},
    comments: {
        type: [String], default: [],  maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    userName: {type: String},
    profilePicture: {type: String}
}, { timestamps: true, versionKey: false })

export default model('Payment', paymentSchema)