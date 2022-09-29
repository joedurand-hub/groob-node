import { Schema, model } from 'mongoose'

const fiatSchema = new Schema({
    entidad: {
        type: String, required: true, trim: true
    },
    CBU: {
        type: Number, required: false, trim: true, default: 0,
    },
    CVU: { 
        type: Number, required: false, trim: true, default: 0,
    },
    alias: {
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