import { Schema, model } from 'mongoose'

const salesSchema = new Schema({
    pay: {
        type: [String]
    },
}, { timestamps: true, versionKey: false })

export default model('Sales', salesSchema)