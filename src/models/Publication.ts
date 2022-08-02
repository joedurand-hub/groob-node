import { Schema, model } from 'mongoose'

const publicationSchema = new Schema({
    content: {
        type: String, required: true, trim: true
    },
    image: {
        type: String, required: false, trim: true
    },
    video: {
        type: String, required: false, trim: true
    },
    url: {
        type: String, required: false, trim: true
    },
    price: {
        type: Number, required: false, trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Publication', publicationSchema)