import { Schema, model } from 'mongoose'

const publicationSchema = new Schema({
    content: {
        type: String, required: false, trim: true
    },
    image: {
        public_id: String,
        secure_url: String, 
        required: false, 
    },
    price: {
        type: Number, required: false, trim: true
    },
    likes: {
        type: Number, default: 0,
    },
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
})

export default model('Publication', publicationSchema)