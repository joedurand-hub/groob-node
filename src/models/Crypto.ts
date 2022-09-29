import { Schema, model } from 'mongoose'

const fiatSchema = new Schema({
    Coin: {
        type: String, required: false, trim: true
    },
    Red: { 
        type: String, required: false, trim: true
    },
    Address: {
        type: String, required: true, trim: true, default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true, versionKey: false })

export default model('Fiat', fiatSchema)